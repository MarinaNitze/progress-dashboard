import React, { useState } from 'react';
import { Link } from 'gatsby';

import { Topic as TopicType } from '../../types/topic';
import TopicContent from '../../pages/content/topics.content.yml';

import { Recommendation as RecommendationType } from '../../types/recommendation';
import RecommendationContent from '../../pages/content/recommendations.content.yml';

import './Search.scss';

import useGatsbyImages from '../../hooks/useGatsbyImages';

export default function Search() {
  const searchIcon = useGatsbyImages()['images/header/search.svg'].publicURL;
  const [searchTerm, setSearchTerm] = useState('');
  const [topics, setTopics] = useState(TopicContent.topics as TopicType[]);
  const allRecommendations: RecommendationType[] =
    RecommendationContent.recommendations;
  const [recommendations, setRecommendations] = useState(allRecommendations);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e?.target.value;
    setSearchTerm(searchWord);

    if (searchTerm === '') {
      setTopics([]);
      setRecommendations([]);
    } else {
      const filteredTopics = TopicContent.topics.filter((topic: TopicType) =>
        topic.hero.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
      const filteredRecommendations = allRecommendations.filter(
        recommendation =>
          recommendation.heading
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
      );
      setTopics(filteredTopics);
      setRecommendations(filteredRecommendations);
      console.log('filteredTopics', filteredTopics);
      console.log('filteredRecs', filteredRecommendations);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="search">
      <form onSubmit={handleSubmit}>
        <div className="searchInput">
          <input
            type="text"
            placeholder="Search the playbook"
            value={searchTerm}
            onChange={handleFilter}
            aria-label="Search"
          />
          <button className="searchIcon">
            Search
            <img src={searchIcon} alt="search icon" />
          </button>
        </div>
        {searchTerm.length !== 0 && (
          <div className="searchResult">
            {topics.slice(0, 15).map(topic => (
              <Link className="resultItem" to="/">
                <p>{topic.hero.title}</p>
              </Link>
            ))}
            {recommendations.slice(0, 15).map(recommendation => (
              <Link className="resultItem" to="/">
                <p>{recommendation.heading}</p>
              </Link>
            ))}
          </div>
        )}
      </form>
    </section>
  );
}
