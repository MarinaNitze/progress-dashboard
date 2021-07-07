import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { SiteData } from '../types/siteMetadata';
import SEO from './seo';

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
      <h1>{data.site.siteMetadata.title}</h1>
      <main>{children}</main>
    </div>
  );
}
