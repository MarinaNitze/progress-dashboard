import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { SiteData } from '../types/siteMetadata';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
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
      <h1>{data.site.siteMetadata.title}</h1>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
