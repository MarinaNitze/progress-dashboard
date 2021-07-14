import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { SiteData } from '../../types/siteMetadata';

import Header from '../header/header';
import SEO from '../seo/seo';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const data: SiteData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  );
  return (
    <div>
      <SEO title="Progress Dashboard" />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
    </div>
  );
}
