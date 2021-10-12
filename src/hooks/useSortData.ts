import { useState } from 'react';

export enum Direction {
  Ascending = 'asc',
  Descending = 'desc',
}

export default function useSortData<T>(
  items: T[],
  columnMapKeys: Map<keyof T, Direction>,
) {
  const [columnMap, setColumnMap] = useState(columnMapKeys);
  const [sortableItems, setSortableItems] = useState(items);

  const sortedItems = (key: keyof T) => {
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

  const requestSort = (key: keyof T) => {
    if (columnMap.has(key)) {
      setSortableItems(sortedItems(key));
      setColumnMap(map =>
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
