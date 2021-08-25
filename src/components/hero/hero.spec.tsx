import * as React from 'react';
import { render } from '@testing-library/react';

import Hero from './Hero';

describe('Hero', () => {
  it('renders Hero component', () => {
    const heroTitle = 'Hero Title';
    const heroDesctiption = 'Hero Desctiption';
    const { getByText } = render(
      <Hero title={heroTitle} description={heroDesctiption} />,
    );

    const title = getByText(heroTitle);
    const description = getByText(heroDesctiption);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
