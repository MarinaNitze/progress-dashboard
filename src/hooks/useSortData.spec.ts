import useSortData, { Direction } from './useSortData';
import { Recommendation } from '../types/recommendation';
import { renderHook } from '@testing-library/react-hooks';
import { TableHeading } from '../components/table/Table';

const data: Partial<Recommendation>[] = [
  {
    about: 'Content1',
    summary: 'Start the background check process early',
    title: 'Title/URL',
  },
  {
    about: 'Content2',
    summary: 'Accept background checks electronically',
    title: 'Title/URL',
  },
  {
    about: 'Content3',
    summary: 'Bring background check forms to orientation',
    title: 'Title/URL',
  },
];

const columns: TableHeading<Recommendation>[] = [
  {
    dataKey: 'summary',
    sortable: true,
    heading: 'Recommendations',
  },
  {
    dataKey: 'about',
    sortable: true,
    heading: `What's needed (Time/Cost)`,
  },
  {
    dataKey: 'title',
    sortable: false,
    heading: 'Case study',
  },
];

describe('when useSortData rendered', () => {
  it('should go in ascending order and only return sortable columns', () => {
    const {
      result: { current },
    } = renderHook(() =>
      useSortData(
        data,
        columns.reduce<Map<keyof Recommendation, Direction>>(
          (map, val) =>
            val.sortable ? map.set(val.dataKey, Direction.Ascending) : map,
          new Map(),
        ),
      ),
    );

    const expectedOrder = [Direction.Ascending, Direction.Ascending];
    expect([...current.columnMap.values()]).toStrictEqual(expectedOrder);
  });
});
