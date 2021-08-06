import { renderHook } from '@testing-library/react-hooks';
import { mockDataStates } from '../../test/mockDataStates';
import { mockStaticData } from '../../test/test-utils';
import { AirtableData } from '../types/airtable/airtableData';
import { GeoState } from '../types/airtable/geoState';
import useDataStates from './useDataStates';

describe('when rendered', () => {
  it('returns a list of US states', () => {
    mockStaticData<AirtableData<GeoState>>({
      statesData: {
        nodes: [...mockDataStates.map(st => ({ data: { ...st } }))],
      },
    });
    const {
      result: {
        current: { statesData },
      },
    } = renderHook(() => useDataStates());
    const expectedResult = mockDataStates;

    expect(statesData).toStrictEqual(expectedResult);
  });
});
