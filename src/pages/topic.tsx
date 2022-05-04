import React, { useState } from 'react';
import { CardGroup, Grid, GridContainer } from '@trussworks/react-uswds';

import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Card from '../components/card/Card';
import Hero from '../components/hero/Hero';
import Layout from '../components/layout/Layout';

// this import and usage in a src/pages file is necessary for graphql-types to run properly
import useGatsbyImages from '../hooks/useGatsbyImages';

import { Topic as TopicType } from '../types/topic';
import content from './content/topics.content.yml';

import './home.scss';

export default function Topic() {
  const searchIcon = useGatsbyImages()['images/header/search.svg'].publicURL;
  const [input, setInput] = useState('');
  const [topics, setTopics] = useState(content.topics as TopicType[]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e?.currentTarget.value);
    const filteredTopics = content.topics.filter((topic: TopicType) =>
      topic.hero.title
        .toLowerCase()
        .includes(e?.currentTarget.value.toLowerCase()),
    );
    setTopics(filteredTopics);
  };

  return (
    <Layout>
      <section id="test-section-id">
        <Hero
          className="cwp-topic-hero"
          path="images/heros/all-topics.jpg"
          alt="All topics hero image"
          backgroundColor="dark"
          title="All Topics"
        />
      </section>
      <Breadcrumbs crumbLabel="All Topics" />
      <main className="cwp-topics-main">
        <section aria-label="Big search component">
          <form
            className="usa-search usa-search--big"
            role="search"
            onSubmit={handleSubmit}
          >
            <label className="usa-sr-only" htmlFor="topic-search">
              Search
            </label>

            <input
              className="usa-input"
              id="topic-search"
              type="search"
              name="search"
              placeholder="Search topics"
              value={input}
              onChange={handleInput}
            />
            <img className="search-icon" src={searchIcon} alt="search icon" />
          </form>
        </section>
        <section className="topics-section" id="test-section-id">
          <GridContainer>
            <Grid>
              <CardGroup>
                {topics.map(t => (
                  <Card
                    className="tablet:grid-col-4 desktop:grid-col-3 widescreen:grid-col-2"
                    key={t.title}
                    link={`/topic/${t.title}`}
                    layout="topic"
                    image={t.image}
                    imgAlt={t.title + ' icon'}
                    title={t.hero.title}
                  />
                ))}
              </CardGroup>
            </Grid>
          </GridContainer>
        </section>
      </main>
    </Layout>
  );
}
