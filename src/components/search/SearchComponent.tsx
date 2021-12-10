import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';

import { Topic as TopicType } from '../../types/topic';
import TopicContent from '../../pages/content/topics.content.yml';

import { Recommendation as RecommendationType } from '../../types/recommendation';
import RecommendationContent from '../../pages/content/recommendations.content.yml';

import './Search.scss';

import useGatsbyImages from '../../hooks/useGatsbyImages';

type SearchProps = {
  home?: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({
  home = false,
  searchTerm,
  setSearchTerm,
}: SearchProps) {
  const searchIcon = useGatsbyImages()['images/header/search.svg'].publicURL;
  const [topics, setTopics] = useState(TopicContent.topics as TopicType[]);
  const [recommendations, setRecommendations] = useState(
    RecommendationContent.recommendations as RecommendationType[],
  );

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e?.target.value;
    setSearchTerm(searchWord);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setTopics([]);
      setRecommendations([]);
    } else {
      const filteredTopics = TopicContent.topics.filter((topic: TopicType) =>
        topic.hero.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
      const filteredRecommendations =
        RecommendationContent.recommendations.filter(
          (recommendation: RecommendationType) =>
            recommendation.heading
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase()),
        );
      setTopics(filteredTopics);
      setRecommendations(filteredRecommendations);
    }
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search', { state: { searchTerm: searchTerm } });
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
          <button className="searchIcon" type="submit">
            Search
            <img src={searchIcon} alt="search icon" />
          </button>
        </div>
        {searchTerm.length !== 0 && (
          <div className="searchResult">
            {home &&
              topics
                .map(topic => (
                  <Link
                    key={topic.title}
                    className="resultItem"
                    to={`/topic/${topic.title}`}
                  >
                    <p>{topic.hero.title}</p>
                  </Link>
                ))
                .concat(
                  // combining topic and recommendation arrays into a single array despite their different source and data formats
                  recommendations.map(recommendation => (
                    <Link
                      key={recommendation.title}
                      className="resultItem"
                      to={`/recommendation/${recommendation.title}`}
                    >
                      <p>{recommendation.heading}</p>
                    </Link>
                  )),
                )
                // sorting the array of topics and recommendations alphabetically by title
                .sort((a, b) => ((a?.key ?? '') > (b?.key ?? '') ? 1 : -1))
                // limiting results to just 7 for design requirements
                .slice(0, 7)}
          </div>
        )}
      </form>
    </section>
  );
}
