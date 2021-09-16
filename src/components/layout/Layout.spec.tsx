import React from 'react';
import { render } from '@testing-library/react';
import {
  DefaultSeoQueryQuery,
  HeroAndCardImagesQuery,
} from '../../../graphql-types';
import { mockStaticData, mockImageData } from '../../../test/test-utils';

import Layout from './Layout';

describe('Layout', () => {
  beforeEach(() => {
    mockStaticData<DefaultSeoQueryQuery & HeroAndCardImagesQuery>({
      site: {
        siteMetadata: {
          title: 'Progress Dashboard',
        },
      },
      // This is mapped to property name in the test-utils mocked images
      ...mockImageData(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a header', () => {
    const { container } = render(
      <Layout>
        <p>children text</p>
      </Layout>,
    );

    expect(container.querySelector(`header`)).toBeInTheDocument();
  });

  it(`renders children`, () => {
    const text = `__Hello world__`;
    const { getByText } = render(
      <Layout>
        <p>{text}</p>
      </Layout>,
    );

    const child = getByText(text);

    expect(child).toBeInTheDocument();
  });
});
