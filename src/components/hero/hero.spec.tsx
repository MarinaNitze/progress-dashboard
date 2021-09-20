import * as React from 'react';
import { render } from '@testing-library/react';

import Hero from './Hero';

describe('Hero', () => {
  it('renders Hero component', () => {
    const heroTitle = 'Hero Title';
    const heroDescription = 'Hero Description';
    const { getByText } = render(
      <Hero title={heroTitle} content={heroDescription} />,
    );

    const title = getByText(heroTitle);
    const description = getByText(heroDescription);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
