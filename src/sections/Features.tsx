import Card, { CardProps } from '../components/card/Card';
import content from '../pages/index.content.yml';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { CardGroup, Grid, GridContainer } from '@trussworks/react-uswds';
import './Features.scss';

type featureContent = {
  largeFeature: CardProps;
  mediumFeature: CardProps;
  smallFeature: CardProps;
  whatsNew: string;
};

export default function FeatureSection() {
  const {
    largeFeature,
    mediumFeature,
    smallFeature,
    whatsNew,
  }: featureContent = content.home.features;

  return (
    <section id="test-section-id">
      <GridContainer>
        <Grid>
          <h2 className="features-title">What's new</h2>
          {whatsNew && <ReactMarkdown>{whatsNew}</ReactMarkdown>}
          <CardGroup>
            <Card
              key={largeFeature.title}
              dataCy="lg-feature-home"
              {...largeFeature}
            />
            <Card
              dataCy="md-feature-home"
              key={mediumFeature.title}
              {...mediumFeature}
            />
            <Card
              dataCy="sm-feature-home"
              key={smallFeature.title}
              {...smallFeature}
            />
          </CardGroup>
        </Grid>
      </GridContainer>
    </section>
  );
}
