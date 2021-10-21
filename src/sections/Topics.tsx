import React from 'react';
import ReactMarkdown from 'react-markdown';
import { navigate } from 'gatsby';
import {
  CardGroup,
  Grid,
  GridContainer,
  Button,
} from '@trussworks/react-uswds';

import { Topic } from '../types/topic';
import Card from '../components/card/Card';
import './Topics.scss';
import content from '../pages/content/topics.content.yml';
import mainPageContent from '../pages/index.content.yml';

type TopicSection = {
  topicSection: { topics: string[]; popularTopics: string };
};

export default function TopicsSection() {
  const topics: Topic[] = content.topics;
  const { topicSection }: TopicSection = mainPageContent.home;
  const selectedTopics = topics.filter(({ title }) =>
    topicSection.topics.includes(title),
  );

  return (
    <section className="topics-section" id="test-section-id">
      <GridContainer>
        <Grid>
          <h2 className="margin-y-0 topics-title">Popular topics</h2>
          <ReactMarkdown>{topicSection.popularTopics}</ReactMarkdown>
        </Grid>
        <Grid>
          <CardGroup>
            {selectedTopics.map(t => (
              <Card
                key={t.title}
                link={`/topic/${t.title}`}
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
