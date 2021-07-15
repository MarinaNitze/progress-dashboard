import React from 'react';
import { render } from '@testing-library/react';
import { SiteData } from '../../types/siteMetadata';
import { mockStaticData } from '../../../test/test-utils';

import Layout from './layout';

describe('Layout', () => {
  it('renders a header', () => {
    mockStaticData<SiteData>({
      site: {
        siteMetadata: {
          title: 'Progress Dashboard',
        },
      },
    });

    const { container } = render(
      <Layout>
        <p>children text</p>
      </Layout>,
    );

    expect(container.querySelector(`header`)).toBeInTheDocument();
  });

  it(`renders children`, () => {
    const text = `__Hello world__`;
    mockStaticData<SiteData>({
      site: {
        siteMetadata: {
          title: 'Progress Dashboard',
        },
      },
    });

    const { getByText } = render(
      <Layout>
        <p>{text}</p>
      </Layout>,
    );

    const child = getByText(text);

    expect(child).toBeInTheDocument();
  });
});
