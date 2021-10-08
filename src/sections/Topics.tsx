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

export default function TopicsSection() {
  const topics: Topic[] = content.topics;
  const { topicSection } = mainPageContent.home;
  const selectedTopics: Topic[] = topicSection.topics.map((title: any) =>
    topics.find(t => t.title === title),
  );

  return (
    <section className="topics-section" id="test-section-id">
      <GridContainer>
        <Grid>
          <h2 className="font-heading-xl margin-y-0 topics-title">
            Popular Topics
          </h2>
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
