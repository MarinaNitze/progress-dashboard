import { renderHook } from '@testing-library/react-hooks';
import { mockDataStates } from '../../test/mockDataStates';
import { mockStaticData } from '../../test/test-utils';
import { AirtableData } from '../types/airtable/airtableData';
import { GeoState } from '../types/airtable/geoState';
import useDataStates from './useDataStates';

describe('when rendered', () => {
  it('returns a list of US states', () => {
    const nodes = [...mockDataStates.map(st => ({ data: { ...st } }))];
    mockStaticData<AirtableData<GeoState>>({
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
      [key: string]: { name: string; abbrev: string };
    }>((statesMap, { data }) => {
      return {
        ...statesMap,
        [data.code]: {
          name: data.name,
          abbrev: data.abbrev,
        },
      };
    }, {});

    expect(statesData).toStrictEqual(expectedResult);
  });
});
