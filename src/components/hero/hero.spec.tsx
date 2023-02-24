import * as React from 'react';
import Hero from './Hero';
import { render } from '@testing-library/react';

describe('Hero', () => {
  it('renders Hero component', () => {
    const heroTitle = 'Hero Title';
    const { getByText } = render(<Hero title={heroTitle} alt="test-alt" />);

    const title = getByText(heroTitle);

    expect(title).toBeInTheDocument();
  });
});
