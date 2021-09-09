import React from 'react';
import { render } from '@testing-library/react';
import { DefaultSeoQueryQuery } from '../../../graphql-types';
import { mockStaticData } from '../../../test/test-utils';

import Layout from './Layout';

describe('Layout', () => {
  it('renders a header', () => {
    mockStaticData<DefaultSeoQueryQuery>({
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
    mockStaticData<DefaultSeoQueryQuery>({
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
