import { GridContainer } from '@trussworks/react-uswds';
import React from 'react';
import FeatureContainer from '../components/feature-section/FeatureSection';

import Layout from '../components/layout/Layout';

export default function IndexPage() {
  return (
    <Layout>
      <main>
        <section id="test-section-id" className="usa-section">
          <GridContainer>
            <p>Hero content</p>
          </GridContainer>
        </section>
        <FeatureContainer />
      </main>
    </Layout>
  );
}
