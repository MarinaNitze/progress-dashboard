import React from 'react';
import { CardGroup, Grid, GridContainer } from '@trussworks/react-uswds';

import Card, { CardProps } from '../components/card/Card';

import content from '../pages/index.content.yml';

type featuresProps = {
  largeFeature: CardProps,
  mediumFeature: CardProps,
  smallFeature: CardProps,
}

export default function FeatureSection() {
  const {largeFeature, mediumFeature, smallFeature}: featuresProps = content.home.features
  // console.log(features)
  // TODO: pull card list from cms
  // const largeFeature = Object.assign({}, features.largeFeature, {layout: 'lg'})
  // const cardList: Array<CardProps> = [features.largeFeature, features.mediumFeature, features.smallFeature]

  // let _test = [
  //   {
  //     title: 'Full width feature',
  //     layout: 'lg',
  //     imgPath: 'images/features/Full-Feature-Img.png',
  //     imgAlt: 'feature image',
  //     linkText: 'CTA',
  //     link: '/CTA',
  //     children: (
  //       <p>
  //         This will be for “showcase” items — large releases/updates. Will
  //         likely feature an image along with heading, body copy, and link
  //         (either text or button — tbd)
  //       </p>
  //     ),
  //   },
  //   {
  //     title: 'Medium feature',
  //     layout: 'md',
  //     imgPath: 'images/features/Medium-Feature.png',
  //     imgAlt: 'medium feature',
  //     children: (
  //       <p>
  //         Will serve as an intermediate block for when there aren’t a ton of new
  //         updates, but we still want to make an impact visually, but not compete
  //         with the main feature. These would need heading, body copy, and link.
  //         Image is optional, but wouldn’t be full width/background.
  //       </p>
  //     ),
  //   },
  //   {
  //     title: 'Small feature',
  //     layout: 'sm',
  //     imgPath: 'images/features/Small-Feature-Footer.png',
  //     imgAlt: 'small feature',
  //     children: (
  //       <p>
  //         Smaller impact, themed curated list of new items. Likely linked ULs
  //         with possible H4 heading format to cateogorize as needed. Could be
  //         repeated to fill a row.
  //       </p>
  //     ),
  //   },
  // ];

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
