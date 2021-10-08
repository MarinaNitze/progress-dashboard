import React from 'react';
import useGatsbyImages from '../../hooks/useGatsbyImages';
import useSortData, { Direction } from '../../hooks/useSortData';

import './Table.scss';

export type TableHeading<T = any> = {
  dataKey: T;
  sortable?: boolean;
  heading?: string;
};
export type TableData<T = unknown, K = keyof T> = {
  dataKey: K;
  value: T;
};

type TableProps<T = any> = {
  columns: TableHeading[];
  data: T[];
  dataCy?: string;
};

export default function Table({ columns, data, dataCy }: TableProps) {
  const sortIcon =
    useGatsbyImages()['images/topics/icon-sort-down.svg'].publicURL;
  const { items, requestSort, columnMap } = useSortData(
    data,
    columns.reduce<Map<string, Direction>>(
      (map, col) =>
        col.sortable ? map.set(col.dataKey, Direction.Ascending) : map,
      new Map(),
    ),
  );

  return (
    <table
      data-cy={dataCy ?? 'table-cmp'}
      className="usa-table usa-table--borderless cwp-table"
    >
      <thead>
        <tr>
          {columns.map(({ dataKey, heading, sortable }) => (
            <th key={`header-${heading}`}>
              {heading}{' '}
              <img
                data-id={dataKey}
                data-cy={`${dataKey}-sort-column-icon`}
                key={`${dataKey}-sort-column-icon`}
                className={`sort-icon ${
                  columnMap.get(dataKey) === Direction.Descending ? 'desc' : ''
                } ${sortable ? '' : 'disabled'}`}
                src={sortIcon}
                alt={`${dataKey}-sort-column-icon`}
                onClick={() => requestSort(dataKey)}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((row, key) => (
          <tr key={`${key}-row`}>
            {columns.map(col => (
              <td key={`${row[col.dataKey]}-cell`}>{row[col.dataKey]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
