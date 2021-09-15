import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('renders header links', () => {
    const siteTitle = 'Topics';
    const { getByText } = render(<Header />);

    const title = getByText(siteTitle);

    expect(title).toBeInTheDocument();
  });

  it('sticky header appears on scroll up', () => {
    const cmp = render(<Header />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    fireEvent.scroll(window, { target: { scrollY: 50 } });
    const header = cmp.container.querySelector('.pd-header');

    expect(header?.classList.contains('sticky-nav')).toBe(true);
  });
});
