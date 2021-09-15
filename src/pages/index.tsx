import { GridContainer } from '@trussworks/react-uswds';
import React from 'react';
import Features from '../sections/Features';
import Topics from '../sections/Topics';

import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';
import content from './index.content.yml';

const IndexPage: React.FC = () => {
  const { hero } = content.home;
  console.log(hero);

  return (
    <Layout>
      <main className="cwp-main">
        <section id="test-section-id" className="usa-section cwp-section">
          <GridContainer>
            <Hero
              path="images/heros/hero-home.png"
              alt={hero?.imgAlt}
              backgroundColor={hero?.backgroundColor}
              title={hero?.title}
              description={hero?.content}
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
