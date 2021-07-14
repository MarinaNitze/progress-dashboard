import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { SiteData } from '../types/siteMetadata';

type IndexPageProps = {
  data: SiteData;
};

export default function IndexPage({ data: { site } }: IndexPageProps) {
  return (
    <Layout>
      <title>{site.siteMetadata.title}</title>
    </Layout>
  );
}

export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
