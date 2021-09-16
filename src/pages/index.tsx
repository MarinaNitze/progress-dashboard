import { GridContainer } from '@trussworks/react-uswds';
import React from 'react';
import Features from '../sections/Features';
import Topics from '../sections/Topics';

import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <main className="cwp-main">
        <section id="test-section-id" className="usa-section cwp-section">
          <GridContainer>
            <Hero
              path="images/heros/hero-home.png"
              alt="Hero Image"
              backgroundColor="primary"
              title={'[Playbook Tagline]'}
              description={
                'Quick intro that sets the stage for the site, what people can do, and how to do it.'
              }
            >
              <p>Search Component Placeholder</p>
            </Hero>
          </GridContainer>
        </section>
        <Features />
        <Topics />
      </main>
    </Layout>
  );
};
export default IndexPage;
