import { useState } from 'react';

export enum Direction {
  Ascending = 'asc',
  Descending = 'desc',
}

type ColumnKeyMap = Map<string, Direction>;

export default function useSortData(items: any[], columnMapKeys: ColumnKeyMap) {
  const [columnMap, setcolumnMap] = useState(columnMapKeys);
  const [sortableItems, setSortableItems] = useState(items);

  const sortedItems = (key: string) => {
    return [...items].sort((a, b) => {
      if (a[key] < b[key]) {
        return columnMap.get(key) === Direction.Ascending ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return columnMap.get(key) === Direction.Ascending ? 1 : -1;
      }
      return 0;
    });
  };

  const requestSort = (key: string) => {
    if (columnMap.has(key)) {
      setSortableItems(sortedItems(key));
      setcolumnMap(map =>
        map.set(
          key,
          columnMap.get(key) === Direction.Ascending
            ? Direction.Descending
            : Direction.Ascending,
        ),
      );
    }
  };

  return { items: sortableItems, requestSort, columnMap };
}
