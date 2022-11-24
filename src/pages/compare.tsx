import React, { useState } from 'react';
import { Link } from 'gatsby';

import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Hero from '../components/hero/Hero';
import Layout from '../components/layout/Layout';

import useDataPractices from '../hooks/useDataPractices';
import useGatsbyImages from '../hooks/useGatsbyImages';

import './home.scss';
import { COMPARE_TOPIC_FULL_TITLE_MAP } from '../utils/compare';
import { Topic } from '../types/compare';

export default function Compare() {
  const searchIcon = useGatsbyImages()['images/header/search.svg'].publicURL;
  const [input, setInput] = useState('');
  const OgPractices = [
    ...new Set(
      useDataPractices().rawPractices.nodes.map(
        node => node.data?.Topic as Topic,
      ),
    ),
  ];
  const [practices, setPractices] = useState(OgPractices);

  type alphabetRecType = {
    letter: string;
    practice: string[];
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e?.currentTarget.value);
    const filteredPractices = OgPractices.filter(
      practice =>
        COMPARE_TOPIC_FULL_TITLE_MAP[practice]
          ?.toLowerCase()
          .includes(e?.currentTarget.value.toLowerCase()) ?? false,
    );
    setPractices(filteredPractices);
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const reducePracticesAlphabet = () => {
    return alphabet.reduce<alphabetRecType[]>((acc, char) => {
      const orderedPractices = practices
        .map(practice => practice && COMPARE_TOPIC_FULL_TITLE_MAP[practice])
        .filter(practice => practice && practice[0].toUpperCase() === char);
      return [...acc, { letter: char, practice: orderedPractices }];
    }, []);
  };

  const getPraticeNameFromFullTitle: (fullTitle: string) => Topic = (
    fullTitle: string,
  ) =>
    (Object.entries(COMPARE_TOPIC_FULL_TITLE_MAP).find(
      ([_, value]) => value === fullTitle,
    ) ?? [''])[0] as Topic;

  return (
    <Layout>
      <section id="test-section-id">
        <Hero
          className="cwp-topic-hero"
          backgroundColor="dark"
          title="All Practice Areas"
        />
      </section>
      <Breadcrumbs crumbLabel="All Practice Areas" />
      <main className="cwp-recommendations-main">
        <section aria-label="Big search component">
          <form
            className="usa-search usa-search--big"
            role="search"
            onSubmit={handleSubmit}
          >
            <label className="usa-sr-only" htmlFor="practice-search">
              Search
            </label>
            <input
              className="usa-input"
              id="practice-search"
              type="search"
              name="search"
              placeholder="Search practice Areas"
              value={input}
              onChange={handleInput}
            />
            <img className="search-icon" src={searchIcon} alt="search icon" />
          </form>
        </section>
        <section className="recommendations-section" id="test-section-id">
          {reducePracticesAlphabet().map(alphabetPractice => {
            return (
              alphabetPractice.practice.length > 0 && (
                <section
                  id={`${alphabetPractice.letter}-section`}
                  key={alphabetPractice.letter}
                >
                  <h2>{alphabetPractice.letter}</h2>
                  <ul>
                    {alphabetPractice.practice.map(practice => {
                      return (
                        <li key={practice}>
                          <Link
                            to={`/compare/${getPraticeNameFromFullTitle(
                              practice,
                            )}`}
                          >
                            {practice}
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
