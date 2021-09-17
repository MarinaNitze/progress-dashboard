import React from 'react';
import { mockGatsbyImageData } from '../../../test/test-utils';
import { render } from '@testing-library/react';

import Footer from './Footer';

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
