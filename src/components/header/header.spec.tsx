import * as React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { mockGatsbyImageData } from '../../../test/test-utils';

import Header from './Header';

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

describe('Header', () => {
  beforeEach(() => {
    mockGatsbyImageData();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders header links', () => {
    const siteTitle = 'Test1';
    const { getByText } = render(<Header headerLinks={headerLinks} />);

    const title = getByText(siteTitle);

    expect(title).toBeInTheDocument();
  });

  it('sticky header appears on scroll up', () => {
    const cmp = render(<Header headerLinks={headerLinks} />);
    const header = cmp.container.querySelector('.cwp-header');

    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 100 } });
    });
    expect(header?.classList.contains('sticky-nav')).toBe(false);

    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 50 } });
    });

    expect(header?.classList.contains('sticky-nav')).toBe(true);
  });
});
