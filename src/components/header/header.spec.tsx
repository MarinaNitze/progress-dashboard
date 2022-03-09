import * as React from 'react';
import { render } from '@testing-library/react';
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
});
