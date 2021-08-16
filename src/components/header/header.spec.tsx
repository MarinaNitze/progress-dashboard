import * as React from 'react';
import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('renders header links', () => {
    const siteTitle = 'Topics';
    const { getByText } = render(<Header />);

    const title = getByText(siteTitle);

    expect(title).toBeInTheDocument();
  });
});
