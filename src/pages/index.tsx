import React from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';
import Features from '../sections/Features';
import Topics from '../sections/Topics';
import content from './index.content.yml';
import './home.scss';

const IndexPage = () => {
  const { hero, mission } = content.home;

  return (
    <Layout>
      <section id="test-section-id" className="cwp-hero">
        {hero && (
          <Hero
            className="cwp-home-hero"
            path={hero.image.slice(3)}
            alt={hero.imgAlt}
            backgroundColor={hero.backgroundColor}
            title={hero.title}
          >
            <ReactMarkdown>{hero.content}</ReactMarkdown>
            <p>Search Component Placeholder</p>
          </Hero>
        )}
      </section>
      <main className="cwp-main">
        <Features />
        <Topics />
        {mission && (
          <Hero
            dataCy="mission-hero-home"
            path={mission.image.slice(3)}
            alt={mission.imgAlt}
            className="mission-hero"
            backgroundColor={mission.backgroundColor}
            imageAlign="left"
            title={mission.title}
          >
            <ReactMarkdown className="mission-content">
              {mission.content}
            </ReactMarkdown>
          </Hero>
        )}
      </main>
    </Layout>
  );
};
export default IndexPage;
