import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Hero from '../components/hero/Hero';
import Layout from '../components/layout/Layout';
import React, { useState } from 'react';
import useGatsbyImages from '../hooks/useGatsbyImages';
import { Link } from 'gatsby';
import './home.scss';
import { COMPARE_DASHBOARDS, getPathToDashboard } from '../utils/compare';

type ByLetter = {
  letter: string;
  compareDashboards: string[];
};

export default function Compare() {
  const searchIcon = useGatsbyImages()['images/header/search.svg'].publicURL;
  const [searchString, setSearchString] = useState('');

  const [filteredCompareDashboards, setFilteredCompareDashboards] =
    useState(COMPARE_DASHBOARDS);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
  };

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e?.currentTarget.value);
    setFilteredCompareDashboards(
      COMPARE_DASHBOARDS.filter(dashboard =>
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
                            <Link to={getPathToDashboard(dash)}>{dash}</Link>
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
