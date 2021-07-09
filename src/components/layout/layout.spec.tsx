import React from 'react';
import { render } from '@testing-library/react';

import Layout from './layout';
import { SiteData } from '../../types/siteMetadata';
import { useStaticQuery } from 'gatsby';

describe('Layout', () => {
  beforeEach(() => {
    useStaticQuery.mockReturnValue({
      site: {
        siteMetadata: {
          title: 'Progress Dashboard',
        },
      },
    });
  });

  it('renders a header', () => {
    const data: SiteData = {
      site: {
        siteMetadata: {
          title: 'Progress Dashboard',
        },
      },
    };

    const { container } = render(
      <Layout data={data}>
        <p>children text</p>
      </Layout>,
    );

    expect(container.querySelector(`header`)).toBeInTheDocument();
  });

  it(`renders children`, () => {
    const text = `__Hello world__`;
    const data: SiteData = {
      site: {
        siteMetadata: {
          title: 'Progress Dashboard',
        },
      },
    };

    const { getByText } = render(
      <Layout data={data}>
        <p>{text}</p>
      </Layout>,
    );

    const child = getByText(text);

    expect(child).toBeInTheDocument();
  });
});
