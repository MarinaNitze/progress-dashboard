import { GridContainer } from '@trussworks/react-uswds';
import React from 'react';
import Features from '../sections/Features';
import Topics from '../sections/Topics';

import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';
import content from './index.content.yml';
import './home.scss';

const IndexPage: React.FC = () => {
  const { hero, mission } = content.home;

  return (
    <Layout>
      <main className="cwp-main">
        <section id="test-section-id" className="usa-section">
          {hero && (
            <GridContainer>
              <Hero
                path={hero.image.slice(3)}
                alt={hero.imgAlt}
                backgroundColor={hero.backgroundColor}
                title={hero.title}
                content={hero.content}
              >
                <p>Search Component Placeholder</p>
              </Hero>
            </GridContainer>
          )}
        </section>
        <Features />
        <Topics />
        {mission && (
          <Hero
            path={mission.image.slice(3)}
            alt={mission.imgAlt}
            className="mission-hero"
            backgroundColor={mission.backgroundColor}
            imageAlign="left"
          >
            <h2 className="mission-title">{mission.title}</h2>
            <p>{mission.content}</p>
          </Hero>
        )}
      </main>
    </Layout>
  );
};
export default IndexPage;
