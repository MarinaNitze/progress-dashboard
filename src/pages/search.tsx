import React, { useState } from 'react';
import { PageProps } from "gatsby"
import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';
import SearchComponent from '../components/search/Search';

import { Topic as TopicType } from '../types/topic';
import topicContent from './content/topics.content.yml';

import { Recommendation as RecommendationType } from '../types/recommendation';
import recommendationContent from './content/recommendations.content.yml';

import './home.scss'

// type TypeFilter = "all" | "topics" | "recommendations";

export default function Search({location}: PageProps) {
  const state  = location.state as {searchTerm: string};
  const [searchTerm, setSearchTerm] = useState(state.searchTerm ?? "");
  // const [typeFilter, setTypeFilter] = useState<TypeFilter>("all")
  const allTopics: TopicType[] = topicContent.topics
  const allRecommendations: RecommendationType[] = recommendationContent.recommendations
  console.log(allTopics, allRecommendations, location)
  return (
    <Layout>
      <section id="test-section-id" className="cwp-hero">
        <Hero
          className="cwp-search-hero"
          backgroundColor="white"
          title="Search results for:"
          children={<SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}
        />
        <hr/>
      </section>
      <section id="search-filter">
        <h2>filter</h2>

      </section>
      <section id="search-results">
      <p>results</p>
      </section>
      </Layout>
  )
}