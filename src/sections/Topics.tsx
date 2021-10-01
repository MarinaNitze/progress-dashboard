import React from 'react';
import { navigate, graphql, useStaticQuery } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import {
  CardGroup,
  Grid,
  GridContainer,
  Button,
} from '@trussworks/react-uswds';

import Card, { CardProps } from '../components/card/Card';
import './Topics.scss';
import content from '../pages/index.content.yml';
import { TopicsQuery } from '../../graphql-types';

export default function TopicsSection() {
  const { topics }: TopicsQuery = useStaticQuery(graphql`
    query Topics {
      topics: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "content/topics/" } }
      ) {
        edges {
          node {
            frontmatter {
              title
              hero {
                title
                image
                backgroundColor
                imgAlt
              }
              image
              layout
            }
          }
        }
      }
    }
  `);

  const { topicSection } = content.home;
  const popularTopics = topics.edges.filter(topic =>
    topicSection.topics.includes(topic?.node?.frontmatter?.title),
  );
  const cardList = popularTopics.map(topic => ({
    title: topic?.node?.frontmatter?.hero?.title ?? 'na',
    layout: topic?.node?.frontmatter?.layout ?? 'topic',
    image: topic?.node?.frontmatter?.image ?? 'na',
    imgAlt: topic?.node?.frontmatter?.hero?.title + ' icon' ?? 'na',
    link: 'topic/' + topic?.node?.frontmatter?.title ?? 'na',
  })) as CardProps[];

  return (
    <section className="topics-section" id="test-section-id">
      <GridContainer>
        <Grid>
          <h2 className="font-heading-xl margin-y-0 topics-title">
            Popular Topics
          </h2>
          <ReactMarkdown>{topicSection.popularTopics ?? ''}</ReactMarkdown>
        </Grid>
        <Grid>
          <CardGroup>
            {cardList.map(c => (
              <Card key={c.title} {...c} />
            ))}
          </CardGroup>
        </Grid>
        <Grid>
          <Button
            data-cy="topics-button-home"
            type="button"
            onClick={() => {
              navigate('/topic');
            }}
          >
            View all Topics
          </Button>
        </Grid>
      </GridContainer>
    </section>
  );
}
