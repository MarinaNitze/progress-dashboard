import React, { useState } from 'react';

import Hero from '../components/hero/Hero';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';

import { Recommendation as RecommendationType } from '../types/recommendation';
import content from './content/recommendations.content.yml';

import useGatsbyImages from '../hooks/useGatsbyImages';

import './home.scss';

export default function Recommendation() {
  const searchIcon = useGatsbyImages()['images/header/search.svg'].publicURL;
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState(
    content.recommendations as RecommendationType[],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e?.currentTarget.value);
    const filteredRecommendations = content.recommendations.filter(
      (recommendation: RecommendationType) =>
        recommendation.heading
          .toLowerCase()
          .includes(e?.currentTarget.value.toLowerCase()),
    );
    setRecommendations(filteredRecommendations);
  };

  return (
    <Layout>
      <section id="test-section-id">
        <Hero
          className="cwp-topic-hero"
          path="images/heros/hero-home.png"
          alt="All recommendation hero image"
          backgroundColor="dark"
          title="All Recommendations"
        />
      </section>
      <Breadcrumbs crumbLabel="All Recommendations" />
      <section aria-label="Big search component">
        <form
          className="usa-search usa-search--big"
          role="search"
          onSubmit={handleSubmit}
        >
          <label className="usa-sr-only" htmlFor="recommendation-search">
            Search
          </label>

          <input
            className="usa-input"
            id="recommendation-search"
            type="search"
            name="search"
            placeholder="Search recommendations"
            value={input}
            onChange={handleInput}
          />
          <img className="search-icon" src={searchIcon} alt="search icon" />
        </form>
      </section>
      <section className="recommendations-section" id="test-section-id">
        {recommendations.map(rec => {
          return <p key={rec.title}>{rec.heading}</p>;
        })}
      </section>
    </Layout>
  );
}
