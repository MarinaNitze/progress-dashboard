import React, { useEffect, useState } from 'react';
import { Link, PageProps } from 'gatsby';
import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';
import SearchComponent from '../components/search/Search';

import { Topic as TopicType } from '../types/topic';
import topicContent from './content/topics.content.yml';

import { Recommendation as RecommendationType } from '../types/recommendation';
import recommendationContent from './content/recommendations.content.yml';

import './home.scss';
import ReactMarkdown from 'react-markdown';

// type TypeFilter = "all" | "topics" | "recommendations";

export default function Search({ location }: PageProps) {
  const state = location.state as { searchTerm: string };
  const [searchTerm, setSearchTerm] = useState(state.searchTerm ?? '');
  // const [typeFilter, setTypeFilter] = useState<TypeFilter>("all")
  const allTopics: TopicType[] = topicContent.topics;
  const allRecommendations: RecommendationType[] =
    recommendationContent.recommendations;
  const [searchedTAndR, setSearchedTAndR] = useState<(TopicType|RecommendationType)[]>([...allTopics, ...allRecommendations])

  console.log(searchedTAndR)


  useEffect(() => {
    if (searchTerm === '') {
     setSearchedTAndR([...allTopics, ...allRecommendations])
    } else {
      const filteredTopics = allTopics.filter((topic: TopicType) =>
        topic.hero.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
      const filteredRecommendations =
        allRecommendations.filter(
          (recommendation: RecommendationType) =>
            recommendation.heading
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase()),
        );
      setSearchedTAndR([...filteredTopics, ...filteredRecommendations])
    }
  }, [searchTerm]);

  const formatTopic = (topic: TopicType) =>
    (<div key={topic.title}>
      <Link to={`/topic/${topic.title}`} ><h2>{topic.hero.title}</h2></Link>
      <span><strong>Topic</strong></span>
      <ReactMarkdown>{topic.about}</ReactMarkdown>
    </div>)

  const formatRecommendation = (recommendation: RecommendationType) =>
   ( <div key={recommendation.title}>
      <Link to={`/topic/${recommendation.title}`} ><h2>{recommendation.heading}</h2></Link>
      <span><strong>Recommendation</strong></span>
      <ReactMarkdown>{recommendation.about}</ReactMarkdown>
    </div>)


  return (
    <Layout>
      <section id="test-section-id" className="cwp-hero">
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
      </section>
      <section id="search-filter">
        <h2>filter</h2>
      </section>
      <main className="cwp-search-main">
      <section id="search-results">
        {searchedTAndR.map( tOrR => Object.keys(tOrR).includes('layout') ? formatTopic(tOrR as TopicType) : formatRecommendation(tOrR as RecommendationType)).sort( (a,b) => (a?.key ?? '') > (b?.key ?? '') ? 1 : -1)}
      </section>
      </main>
    </Layout>
  );
}
