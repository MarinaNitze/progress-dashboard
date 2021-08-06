import { findGeoState } from './util';
import { mockDataStates } from '../../test/mockDataStates';

describe('util functions', () => {
  it('finds valid US state by code', () => {
    const expectedResult = {
      state: 'Washington',
      abbrev: 'Wash.',
      code: 'WA',
    };

    expect(findGeoState(mockDataStates, 'WA')).toStrictEqual(expectedResult);
  });

  it('does not find state by code', () => {
    expect(findGeoState(mockDataStates, 'AK')).toBeNull;
  });
});
