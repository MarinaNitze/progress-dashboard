import React, { useEffect, useState } from 'react';
import { PageProps } from 'gatsby';
import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';
import SearchComponent from '../components/search/SearchComponent';
import { ButtonGroup } from '@trussworks/react-uswds';

import { Topic as TopicType } from '../types/topic';
import topicContent from './content/topics.content.yml';

import { Recommendation as RecommendationType } from '../types/recommendation';
import recommendationContent from './content/recommendations.content.yml';

import './home.scss';
import { formatForSearchPage, formatSearchFilter } from '../utils/util';
import { TypeFilter } from '../types/typeFilter';

export default function Search({ location }: PageProps) {
  const state = location.state as { searchTerm: string };
  const [searchTerm, setSearchTerm] = useState(state?.searchTerm ?? '');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

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
          ? formatForSearchPage(tOrR as TopicType, 'topic')
          : formatForSearchPage(tOrR as RecommendationType, 'recommendation'),
      )
      .sort((a, b) => ((a?.key ?? '') > (b?.key ?? '') ? 1 : -1)),
  );

  useEffect(() => {
    // filters data based on search term
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
    // Filters topics and recommendations from the search results based on user input using the key 'layout' to distinguish as only topics have that key
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

  useEffect(() => {
    // updated the list of results when the filtered data is updated
    setFormattedResults(
      searchedAndFilteredTAndR
        .map(tOrR =>
          Object.keys(tOrR).includes('layout')
            ? formatForSearchPage(tOrR as TopicType, 'topic')
            : formatForSearchPage(tOrR as RecommendationType, 'recommendation'),
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
              formatSearchFilter(
                searchedTAndR as (TopicType | RecommendationType)[],
                filter as TypeFilter,
                typeFilter,
                setTypeFilter,
              ),
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
