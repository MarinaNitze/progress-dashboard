import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';

export default function NotFoundPage() {
  const [isMount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return <h2>Loading...</h2>;
  }

  return (
    <Layout>
      <Seo title="404: Not found" />
      <div>
        <h2 data-cy="404-heading">404</h2>
        <p data-cy="404-text">Not found</p>
      </div>
    </Layout>
  );
}
