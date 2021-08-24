import * as React from 'react';
import { render } from '@testing-library/react';

import Hero from './Hero';

describe('Hero', () => {
  it('renders Hero component', () => {
    const siteTitle = 'Topics';
    const { getByText } = render(<Hero />);

    const title = getByText(siteTitle);

    expect(title).toBeInTheDocument();
  });
});