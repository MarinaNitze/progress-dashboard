import React, { useState, useEffect } from 'react';
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
  const [recommendations, setRecommendations] = useState(RecommendationContent.recommendations as RecommendationType[]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e?.target.value;
    setSearchTerm(searchWord);
  }

  useEffect( ()=> {
        if (searchTerm === '') {
      setTopics([]);
      setRecommendations([]);
    } else {
      const filteredTopics = TopicContent.topics.filter((topic: TopicType) =>
        topic.hero.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
      const filteredRecommendations = RecommendationContent.recommendations.filter(
        (recommendation: RecommendationType) =>
          recommendation.heading
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
      );
      setTopics(filteredTopics);
      setRecommendations(filteredRecommendations);
    }
  }, [searchTerm])

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
            {topics.map(topic => (
              <Link
                key={topic.title}
                className="resultItem"
                to={`/topic/${topic.title}`}
              >
                <p>{topic.hero.title}</p>
              </Link>
            ))
            .concat( recommendations.map(recommendation => (
              <Link
                key={recommendation.title}
                className="resultItem"
                to={`/recommendation/${recommendation.title}`}
              >
                <p>{recommendation.heading}</p>
              </Link>
            )))
            .sort((a, b) => ((a?.key ?? '') > (b?.key ?? '')) ? 1 : -1)
            .slice(0,7)
            }
          </div>
        )}
      </form>
    </section>
  );
}
