import React, { useEffect, useState } from 'react';
import { Link, PageProps } from 'gatsby';
import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';
import SearchComponent from '../components/search/SearchComponent';
import { Button, ButtonGroup } from '@trussworks/react-uswds';

import { Topic as TopicType } from '../types/topic';
import topicContent from './content/topics.content.yml';

import { Recommendation as RecommendationType } from '../types/recommendation';
import recommendationContent from './content/recommendations.content.yml';

import './home.scss';
import ReactMarkdown from 'react-markdown';

type TypeFilter = 'all' | 'topics' | 'recommendations';

export default function Search({ location }: PageProps) {
  const state = location.state as { searchTerm: string };
  const [searchTerm, setSearchTerm] = useState(state.searchTerm ?? '');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const formatTopic = (topic: TopicType) => (
    <div key={topic.title}>
      <Link to={`/topic/${topic.title}`}>
        <h2>{topic.hero.title}</h2>
      </Link>
      <span>
        <strong>Topic</strong>
      </span>
      <ReactMarkdown>{topic.about}</ReactMarkdown>
    </div>
  );

  const formatRecommendation = (recommendation: RecommendationType) => (
    <div key={recommendation.title}>
      <Link to={`/topic/${recommendation.title}`}>
        <h2>{recommendation.heading}</h2>
      </Link>
      <span>
        <strong>Recommendation</strong>
      </span>
      <ReactMarkdown>{recommendation.about}</ReactMarkdown>
    </div>
  );

  const allTopics: TopicType[] = topicContent.topics;
  const allRecommendations: RecommendationType[] =
    recommendationContent.recommendations;
  const [searchedTAndR, setSearchedTAndR] = useState<
    (TopicType | RecommendationType)[]
  >([...allTopics, ...allRecommendations]);
  const [searchedAndFilteredTAndR, setSearchedAndFilteredTAndR] = useState<
    (TopicType | RecommendationType)[]
  >([...allTopics, ...allRecommendations]);
  const [formattedResults, setFormattedResults] = useState(
    searchedAndFilteredTAndR
      .map(tOrR =>
        Object.keys(tOrR).includes('layout')
          ? formatTopic(tOrR as TopicType)
          : formatRecommendation(tOrR as RecommendationType),
      )
      .sort((a, b) => ((a?.key ?? '') > (b?.key ?? '') ? 1 : -1)),
  );

  useEffect(() => {
    if (searchTerm === '') {
      setSearchedTAndR([...allTopics, ...allRecommendations]);
    } else {
      const filteredTopics = allTopics.filter((topic: TopicType) =>
        topic.hero.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
      const filteredRecommendations = allRecommendations.filter(
        (recommendation: RecommendationType) =>
          recommendation.heading
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
      );
      setSearchedTAndR([...filteredTopics, ...filteredRecommendations]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (typeFilter === 'all') {
      setSearchedAndFilteredTAndR(searchedTAndR);
    } else if (typeFilter === 'topics') {
      setSearchedAndFilteredTAndR(
        searchedTAndR.filter(tOrR => Object.keys(tOrR).includes('layout')),
      );
    } else {
      setSearchedAndFilteredTAndR(
        searchedTAndR.filter(tOrR => !Object.keys(tOrR).includes('layout')),
      );
    }
  }, [typeFilter, searchedTAndR]);

  const formatFilter = (filter: TypeFilter) => {
    const count =
      filter === 'all'
        ? searchedTAndR.length
        : filter === 'topics'
        ? searchedTAndR.filter(tOrR => Object.keys(tOrR).includes('layout'))
            .length
        : searchedTAndR.filter(tOrR => !Object.keys(tOrR).includes('layout'))
            .length;

    return (
      <Button
        type="button"
        className={typeFilter === filter ? 'active' : 'inactive'}
        key={filter}
        onClick={() => {
          setTypeFilter(filter as TypeFilter);
        }}
      >
        {filter[0].toUpperCase() + filter.slice(1)} ({count})
      </Button>
    );
  };

  useEffect(() => {
    setFormattedResults(
      searchedAndFilteredTAndR
        .map(tOrR =>
          Object.keys(tOrR).includes('layout')
            ? formatTopic(tOrR as TopicType)
            : formatRecommendation(tOrR as RecommendationType),
        )
        .sort((a, b) => ((a?.key ?? '') > (b?.key ?? '') ? 1 : -1)),
    );
  }, [searchedAndFilteredTAndR]);

  return (
    <Layout>
      <Hero
        className="cwp-search-hero"
        backgroundColor="white"
        title="Search results for:"
        children={
          <SearchComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        }
      />
      <hr />
      <section id="search-filter">
        <div className="filters">
          <ButtonGroup type="default">
            {['all', 'topics', 'recommendations'].map(filter =>
              formatFilter(filter as TypeFilter),
            )}
          </ButtonGroup>
        </div>
      </section>
      <main className="cwp-search-main">
        <section id="search-results">{formattedResults}</section>
      </main>
    </Layout>
  );
}
