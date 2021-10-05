import React from 'react';
import ReactMarkdown from 'react-markdown';
import { navigate } from 'gatsby';
import {
  CardGroup,
  Grid,
  GridContainer,
  Button,
} from '@trussworks/react-uswds';

import Card, { CardProps } from '../components/card/Card';
import './Topics.scss';

import content from '../pages/content/topics.content.yml';
import mainPageContent from '../pages/index.content.yml';

type topicContent = {
  topic: CardProps[];
};

export default function TopicsSection() {
  const { topic }: topicContent = content;
  const { topicsSection } = mainPageContent.home.topicSection;

  return (
    <section className="topics-section" id="test-section-id">
      <GridContainer>
        <Grid>
          <h2 className="font-heading-xl margin-y-0 topics-title">
            Popular Topics
          </h2>
          <ReactMarkdown>{topicsSection.popularTopics}</ReactMarkdown>
        </Grid>
        <Grid>
          <CardGroup>
            {topic.map((t: any) => (
              <Card
                key={t.title}
                link={'/topic/' + t.title}
                layout="topic"
                image={t.image}
                imgAlt={t.title + ' icon'}
                title={t.hero.title}
              />
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
