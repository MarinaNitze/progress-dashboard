import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';

import content from './index.content.yml';

type IndexPageProps = {
  data: { indexPage: { html: string } };
};

export default function IndexPage({ data }: IndexPageProps) {
  return (
    <Layout>
      <title>{content.home.title}</title>
      <Seo keywords={['progress dashboard']} title="Progress Dashboard" />
      <div dangerouslySetInnerHTML={{ __html: data.indexPage.html }}></div>
    </Layout>
  );
}
