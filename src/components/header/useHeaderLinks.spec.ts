import { renderHook } from '@testing-library/react-hooks';
import useHeaderLinks from './useHeaderLinks';

const headerLinks = [
  {
    to: '/test-1',
    text: 'Test1',
  },
  {
    to: '/test-2',
    text: 'Test2',
  },
];

describe('when useHeaderLinks rendered', () => {
  it('should contain two links', () => {
    const { result } = renderHook(() => useHeaderLinks(headerLinks));

    const links = result.current.renderHeaderLinks();

    expect(links.length).toBe(2);
  });
});
