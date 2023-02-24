import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import content from './content/recommendations.content.yml';
import Hero from '../components/hero/Hero';
import Layout from '../components/layout/Layout';
import React, { useState } from 'react';
import useGatsbyImages from '../hooks/useGatsbyImages';
import { Link } from 'gatsby';
import { Recommendation as RecommendationType } from '../types/recommendation';
import './home.scss';

type alphabetRecType = {
  letter: string;
  recs: RecommendationType[];
};

export default function Recommendation() {
  const searchIcon = useGatsbyImages()['images/header/search.svg'].publicURL;
  const [input, setInput] = useState('');
  const OgRecommendations: RecommendationType[] = content.recommendations;
  const [recommendations, setRecommendations] = useState(OgRecommendations);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e?.currentTarget.value);
    const filteredRecommendations = OgRecommendations.filter(recommendation =>
      recommendation.heading
        .toLowerCase()
        .includes(e?.currentTarget.value.toLowerCase()),
    );
    setRecommendations(filteredRecommendations);
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const reduceRecsAlphabet = () => {
    return alphabet.reduce<alphabetRecType[]>((acc, char) => {
      const recs = recommendations.filter(
        rec => rec.heading[0].toUpperCase() === char,
      );
      return [...acc, { letter: char, recs }];
    }, []);
  };

  return (
    <Layout>
      <section id="test-section-id">
        <Hero
          className="cwp-topic-hero"
          path="images/heros/all-recs.jpg"
          alt="All recommendation hero image"
          backgroundColor="dark"
          title="All Recommendations"
        />
      </section>
      <Breadcrumbs crumbLabel="All Recommendations" />
      <main className="cwp-recommendations-main">
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
          {reduceRecsAlphabet().map(alphabetRec => {
            return (
              alphabetRec.recs.length > 0 && (
                <section
                  id={`${alphabetRec.letter}-section`}
                  key={alphabetRec.letter}
                >
                  <h2>{alphabetRec.letter}</h2>
                  <ul>
                    {alphabetRec.recs.map(rec => {
                      return (
                        <li key={rec.title}>
                          <Link to={`/recommendation/${rec.title}`}>
                            {rec.heading}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )
            );
          })}
        </section>
      </main>
    </Layout>
  );
}
