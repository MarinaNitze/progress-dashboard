import React, { useState } from 'react';
import { Link } from 'gatsby';

import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Hero from '../components/hero/Hero';
import Layout from '../components/layout/Layout';

import useGatsbyImages from '../hooks/useGatsbyImages';

import './home.scss';
import { PracticeArea } from '../types/compare';

enum CompareDashboardTitle {
  backgroundChecks = 'Out of State Child Abuse and Neglect Checks (Adam Walsh Checks)',
  familyFinding = 'Kin Finding (Nationwide)',
  familyFinding_CACounties = 'Kin Finding (California)',
}

type ByLetter = {
  letter: string;
  compareDashboards: CompareDashboardTitle[];
};

function getDashboardPracticeArea(
  dashboard: CompareDashboardTitle,
): PracticeArea {
  if (dashboard.includes('Adam Walsh')) return 'Background Checks';
  return 'Family Finding';
}

export default function Compare() {
  const searchIcon = useGatsbyImages()['images/header/search.svg'].publicURL;
  const [searchString, setSearchString] = useState('');

  const [filteredCompareDashboards, setFilteredCompareTopics] = useState(
    Object.values(CompareDashboardTitle),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e?.currentTarget.value);
    setFilteredCompareTopics(
      Object.values(CompareDashboardTitle).filter(dashboard =>
        dashboard.toLowerCase().includes(e?.currentTarget.value.toLowerCase()),
      ),
    );
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const getCompareDashboardsByLetter = () => {
    return alphabet.reduce<ByLetter[]>((acc, char) => {
      return [
        ...acc,
        {
          letter: char,
          compareDashboards: filteredCompareDashboards.filter(
            dash => dash && dash[0].toUpperCase() === char,
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
          {getCompareDashboardsByLetter().map(
            ({ letter, compareDashboards }) => {
              return (
                compareDashboards.length > 0 && (
                  <section id={`${letter}-section`} key={letter}>
                    <h2>{letter}</h2>
                    <ul>
                      {compareDashboards.map(dash => {
                        return (
                          <li key={dash}>
                            <Link
                              to={
                                dash ===
                                CompareDashboardTitle.familyFinding_CACounties
                                  ? `/compare/CA/${getDashboardPracticeArea(
                                      dash,
                                    )}`
                                  : `/compare/states/${getDashboardPracticeArea(
                                      dash,
                                    )}`
                              }
                            >
                              {dash}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                )
              );
            },
          )}
        </section>
      </main>
    </Layout>
  );
}
