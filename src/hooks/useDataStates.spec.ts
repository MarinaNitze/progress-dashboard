import { renderHook } from '@testing-library/react-hooks';
import { mockDataStates } from '../../test/mockDataStates';
import { mockStaticData } from '../../test/test-utils';
import { StatesDataQuery } from '../../graphql-types';
import useDataStates from './useDataStates';

describe('when rendered', () => {
  it('returns a list of US states', () => {
    const nodes = [...mockDataStates.map(st => ({ data: { ...st } }))];
    mockStaticData<StatesDataQuery>({
      statesData: {
        nodes,
      },
    });
    const {
      result: {
        current: { statesData },
      },
    } = renderHook(() => useDataStates());
    const expectedResult = nodes.reduce<{
      [key: string]: {
        name: string;
        abbrev: string;
        population: string | number;
        admin: string;
      };
    }>((statesMap, { data }) => {
      return {
        ...statesMap,
        [data?.code ?? 'missing code']: {
          name: data?.name ?? '',
          abbrev: data?.abbrev ?? '',
          population: data?.population ?? '',
          admin: data?.admin ?? '',
        },
      };
    }, {});

    expect(statesData).toStrictEqual(expectedResult);
  });
});
