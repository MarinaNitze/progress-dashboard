import React, { useEffect, useState } from 'react';
import { PageProps } from 'gatsby';
import { ButtonGroup } from '@trussworks/react-uswds';

import Hero from '../components/hero/Hero';
import Layout from '../components/layout/Layout';
import SearchComponent from '../components/search/SearchComponent';

import { Topic as TopicType } from '../types/topic';
import topicContent from './content/topics.content.yml';

import { Recommendation as RecommendationType } from '../types/recommendation';
import recommendationContent from './content/recommendations.content.yml';

import { formatSearchFilter, formatAndSortSearchResults } from '../utils/util';
import { TypeFilter } from '../types/typeFilter';

import './home.scss';

export default function Search({ location }: PageProps) {
  const state = location.state as { searchTerm: string };
  const [searchTerm, setSearchTerm] = useState(state?.searchTerm ?? '');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  const allTopics: TopicType[] = topicContent.topics;
  const allRecommendations: RecommendationType[] =
    recommendationContent.recommendations;
  const [searchedTopics, setSearchedTopics] = useState<TopicType[]>(allTopics);
  const [searchedRecommendations, setSearchedRecommendations] =
    useState<RecommendationType[]>(allRecommendations);

  useEffect(() => {
    // filters data based on search term
    if (searchTerm === '') {
      setSearchedTopics(allTopics);
      setSearchedRecommendations(allRecommendations);
    } else {
      setSearchedTopics(
        allTopics.filter((topic: TopicType) =>
          topic.hero.title
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
        ),
      );
      setSearchedRecommendations(
        allRecommendations.filter((recommendation: RecommendationType) =>
          recommendation.heading
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
        ),
      );
    }
  }, [searchTerm]);

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
              formatSearchFilter(
                [...searchedTopics, ...searchedRecommendations],
                filter as TypeFilter,
                typeFilter,
                setTypeFilter,
              ),
            )}
          </ButtonGroup>
        </div>
      </section>
      <main className="cwp-search-main">
        <section id="search-results">
          {typeFilter === 'all'
            ? formatAndSortSearchResults([
                ...searchedTopics,
                ...searchedRecommendations,
              ])
            : typeFilter === 'topics'
            ? formatAndSortSearchResults(searchedTopics)
            : formatAndSortSearchResults(searchedRecommendations)}
        </section>
      </main>
    </Layout>
  );
}
