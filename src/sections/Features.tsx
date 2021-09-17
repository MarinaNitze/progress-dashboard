import React from 'react';
import { CardGroup, Grid, GridContainer } from '@trussworks/react-uswds';

import Card, { CardProps } from '../components/card/Card';

import content from '../pages/index.content.yml';

type featuresProps = {
  largeFeature: CardProps;
  mediumFeature: CardProps;
  smallFeature: CardProps;
};

export default function FeatureSection() {
  const { largeFeature, mediumFeature, smallFeature }: featuresProps =
    content.home.features;

  return (
    <section id="test-section-id">
      <GridContainer>
        <Grid>
          <h2 className="font-heading-xl margin-y-0">What's new</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Luctus
            massa natoque risus ut porttitor. Urna commodo amet non massa dui
            quis. Id pellentesque purus enim suspendisse et sed gravida enim
            sed.
          </p>
          <CardGroup>
            <Card key={largeFeature.title} {...largeFeature} />
            <Card key={mediumFeature.title} {...mediumFeature} />
            <Card key={smallFeature.title} {...smallFeature} />
          </CardGroup>
        </Grid>
      </GridContainer>
    </section>
  );
}
