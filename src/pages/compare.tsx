import React, { useState } from 'react';
import { Link } from 'gatsby';

import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Hero from '../components/hero/Hero';
import Layout from '../components/layout/Layout';

import useGatsbyImages from '../hooks/useGatsbyImages';

import './home.scss';

enum PracticeArea {
  backgroundChecks = 'Out of State Child Abuse and Neglect Checks (Adam Walsh Checks)',
  familyFinding = 'Kin Finding (Nationwide)',
  familyFinding_CACounties = 'Kin Finding (California)',
}

const DEPRECATED_PA_PARAMS = {
  [PracticeArea.familyFinding]: 'Family Finding',
  [PracticeArea.backgroundChecks]: 'Background Checks',
};

type ByLetter = {
  letter: string;
  practiceAreas: PracticeArea[];
};

export default function Compare() {
  const searchIcon = useGatsbyImages()['images/header/search.svg'].publicURL;
  const [searchString, setSearchString] = useState('');

  const PRACTICE_AREAS = Object.values(PracticeArea);
  const [practiceAreas, setPracticeAreas] = useState(PRACTICE_AREAS);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e?.currentTarget.value);
    setPracticeAreas(
      PRACTICE_AREAS.filter(practice =>
        practice.toLowerCase().includes(e?.currentTarget.value.toLowerCase()),
      ),
    );
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const getPracticeAreasByLetter = () => {
    return alphabet.reduce<ByLetter[]>((acc, char) => {
      return [
        ...acc,
        {
          letter: char,
          practiceAreas: practiceAreas.filter(
            practice => practice && practice[0].toUpperCase() === char,
          ),
        },
      ];
    }, []);
  };

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
              value={searchString}
              onChange={handleInputOnChange}
            />
            <img className="search-icon" src={searchIcon} alt="search icon" />
          </form>
        </section>
        <section className="recommendations-section" id="test-section-id">
          {getPracticeAreasByLetter().map(({ letter, practiceAreas }) => {
            return (
              practiceAreas.length > 0 && (
                <section id={`${letter}-section`} key={letter}>
                  <h2>{letter}</h2>
                  <ul>
                    {practiceAreas.map(pa => {
                      return (
                        <li key={pa}>
                          <Link
                            to={
                              pa === PracticeArea.familyFinding_CACounties
                                ? `/compare/counties/CA/${pa}`
                                : `/compare/${DEPRECATED_PA_PARAMS[pa]}`
                            }
                          >
                            {pa}
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
