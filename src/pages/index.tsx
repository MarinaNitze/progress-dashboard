import { GridContainer } from '@trussworks/react-uswds';
import React from 'react';
import FeatureSection from '../components/feature-section/FeatureSection';

import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';

export default function IndexPage() {
  return (
    <Layout>
      <main>
        <section id="test-section-id" className="usa-section">
          <GridContainer>
            <Hero
              title={'[Playbook Tagline]'}
              backgroundImgPath={'../../img/hero.png'}
              description={
                'Quick intro that sets the stage for the site, what people can do, and how to do it.'
              }
            >
              <p>Hero content</p>
            </Hero>
          </GridContainer>
        </section>
        <FeatureSection />
      </main>
    </Layout>
  );
}
