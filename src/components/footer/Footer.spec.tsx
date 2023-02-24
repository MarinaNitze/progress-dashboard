import Footer from './Footer';
import React from 'react';
import { mockGatsbyImageData } from '../../../test/test-utils';
import { render } from '@testing-library/react';

describe('Footer', () => {
  beforeEach(() => {
    mockGatsbyImageData();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders footer images', () => {
    const siteTitle = 'Made in cooperation with';
    const { getByText } = render(<Footer />);

    const title = getByText(siteTitle);

    expect(title).toBeInTheDocument();
  });
});
