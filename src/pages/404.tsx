import React from 'react';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo title="404: Not found" />
      <div>
        <h2>404</h2>
        <p>Not found</p>
      </div>
    </Layout>
  );
}
