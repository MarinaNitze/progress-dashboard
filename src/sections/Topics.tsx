import React from 'react';
import { navigate } from 'gatsby';
import {
  CardGroup,
  Grid,
  GridContainer,
  Button,
} from '@trussworks/react-uswds';

import Card, { CardProps } from '../components/card/Card';

export default function TopicsSection({ images }: any) {
  // TODO: pull card list from cms
  const cardList: Array<CardProps> = [
    {
      heading: 'Foster Parent Licensing',
      layout: 'topic',
      imgPath: 'images/cards/Topic-FPL.svg',
      imgAlt: 'Foster Parent Licensing Icon',
      images,
      linkDestination: '/topic/foster-parent-licensing',
    },
    {
      heading: 'Background Checks',
      layout: 'topic',
      imgPath: 'images/cards/Topic-BC.svg',
      imgAlt: 'Background Checks Icon',
      images,
      linkDestination: '/topic/background-checks',
    },
    {
      heading: 'Extended Foster Care',
      layout: 'topic',
      imgPath: 'images/cards/Topic-EFC.svg',
      imgAlt: 'Extended Foster Care Icon',
      images,
      linkDestination: '/CTA',
    },
    {
      heading: 'Family Finding',
      layout: 'topic',
      imgPath: 'images/cards/Topic-FF.svg',
      imgAlt: 'Family Finding Icon',
      images,
      linkDestination: '/topic/family-finding',
    },
    {
      heading: 'Inquiry management',
      layout: 'topic',
      imgPath: 'images/cards/Topic-IM.svg',
      imgAlt: 'Inquiry Management Icon',
      images,
      linkDestination: '/topic/inquiry-management',
    },
    {
      heading: 'License Renewal',
      layout: 'topic',
      imgPath: 'images/cards/Topic-LR.svg',
      imgAlt: 'Licensing Renewal Icon',
      images,
      linkDestination: '/topic/license-renewal',
    },
    {
      heading: 'Recruitment',
      layout: 'topic',
      imgPath: 'images/cards/Topic-Recruitment.svg',
      imgAlt: 'Recruitment Icon',
      images,
      linkDestination: '/topic/recruitment',
    },
  ];

  const handleClick = () => {
    navigate('/topic');
  };

  return (
    <section id="test-section-id">
      <GridContainer>
        <h2 className="font-heading-xl margin-y-0">Popular Topics</h2>
        <p>
          Scalable cards to highlight curated list of topics. Depending on how
          many we have, this may require more than 3 in a single row, but we’ll
          decide that later. Will allow for several rows as needed. Likely be
          capped with a rectangular image, and include a heading. Heading and
          image will be clickable.
        </p>
      </GridContainer>

      <GridContainer>
        <Grid row>
          <CardGroup>
            {cardList.map(c => (
              <Card key={c.heading} {...c} />
            ))}
          </CardGroup>
        </Grid>
      </GridContainer>
      <GridContainer>
        <Grid row>
          <Button
            type="button"
            onClick={() => handleClick}
          >
            View all Topics
          </Button>
        </Grid>
      </GridContainer>
    </section>
  );
}
