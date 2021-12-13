import React from 'react';
import { Topic as TopicType } from '../types/topic';
import { Recommendation as RecommendationType } from '../types/recommendation';
import { Link } from 'gatsby';
import { Button } from '@trussworks/react-uswds';
import ReactMarkdown from 'react-markdown';
import { TypeFilter } from '../types/typeFilter';

type GeoState = {
  abbrev: string;
  code: string;
  name: string;
  admin: string;
  population: number | string;
};

export const findGeoState = (statesGeoData: GeoState[], stateCode: string) =>
  statesGeoData.find(({ code }) => stateCode === code) ?? null;

const formatForSearchPage = (content: TopicType | RecommendationType) => (
  <div key={content.title}>
    <Link
      to={`/${
        Object.keys(content).includes('layout') ? 'topic' : 'recommendation'
      }/${content.title}`}
    >
      <h2>
        {Object.keys(content).includes('layout')
          ? (content as TopicType).hero.title
          : (content as RecommendationType).heading}
      </h2>
    </Link>
    <span>
      <strong>
        {Object.keys(content).includes('layout') ? 'Topic' : 'Recommendation'}
      </strong>
    </span>
    <ReactMarkdown>{content.about}</ReactMarkdown>
  </div>
);

export const formatAndSortSearchResults = (
  topicsAndRecommendations: (TopicType | RecommendationType)[],
) =>
  topicsAndRecommendations
    .map(topicOrRec => formatForSearchPage(topicOrRec))
    .sort((a, b) => ((a?.key ?? '') > (b?.key ?? '') ? 1 : -1));

export const formatSearchFilter = (
  data: (TopicType | RecommendationType)[],
  filter: TypeFilter,
  typeFilter: TypeFilter,
  setter: React.Dispatch<React.SetStateAction<TypeFilter>>,
) => {
  const count =
    filter === 'all'
      ? data.length
      : filter === 'topics'
      ? data.filter(tOrR => Object.keys(tOrR).includes('layout')).length
      : data.filter(tOrR => !Object.keys(tOrR).includes('layout')).length;

  return (
    <Button
      type="button"
      className={typeFilter === filter ? 'active' : 'inactive'}
      key={filter}
      onClick={() => {
        setter(filter as TypeFilter);
      }}
    >
      {filter[0].toUpperCase() + filter.slice(1)} ({count})
    </Button>
  );
};
