import React from 'react';
import useGatsbyImages from '../../hooks/useGatsbyImages';
import useSortData, { Direction } from '../../hooks/useSortData';
import './Table.scss';

export type TableHeading<T extends { [key: string]: any }> = {
  dataKey: Extract<keyof T, string>;
  sortable?: boolean;
  heading?: string;
  renderCellContent?: (rowData: T) => JSX.Element;
};

type TableProps<T extends { [key: string]: any }> = {
  columns: TableHeading<T>[];
  data: T[];
  dataCy?: string;
};

export default function Table<T extends { [key: string]: any }>({
  columns,
  data,
  dataCy,
}: TableProps<T>) {
  const sortIcon =
    useGatsbyImages()['images/topics/icon-sort-down.svg'].publicURL;
  const { items, requestSort, columnMap } = useSortData<T>(
    data,
    columns.reduce<Map<keyof T, Direction>>(
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
              <td key={`${col.dataKey}-cell`}>
                {col.renderCellContent
                  ? col.renderCellContent(row)
                  : row[col.dataKey]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
