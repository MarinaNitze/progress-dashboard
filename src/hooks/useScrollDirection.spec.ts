import { renderHook } from '@testing-library/react-hooks';

import useScrollDirection from './useScrollDirection';

describe('when useScrollDirection rendered', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should default scroll to "down"', () => {
    const ref = {
      current: 0,
    };

    const {
      result: { current },
    } = renderHook(() => useScrollDirection(ref));

    expect(current).toBe('down');
    expect(ref.current).toBe(0);
  });
});