import React from 'react';
import { navigate } from 'gatsby';
import {
  CardGroup,
  Grid,
  GridContainer,
  Button,
} from '@trussworks/react-uswds';

import Card, { CardProps } from '../components/card/Card';

export default function TopicsSection() {
  // TODO: pull card list from cms
  const cardList: Array<CardProps> = [
    {
      title: 'Foster Parent Licensing',
      layout: 'topic',
      image: '../images/topics/Topic-FPL.svg',
      imgAlt: 'Foster Parent Licensing Icon',
      link: '/topic/foster-parent-licensing',
    },
    {
      title: 'Background Checks',
      layout: 'topic',
      image: '../images/topics/Topic-BC.svg',
      imgAlt: 'Background Checks Icon',
      link: '/topic/background-checks',
    },
    {
      title: 'Extended Foster Care',
      layout: 'topic',
      image: '../images/topics/Topic-EFC.svg',
      imgAlt: 'Extended Foster Care Icon',
      link: '/CTA',
    },
    {
      title: 'Family Finding',
      layout: 'topic',
      image: '../images/topics/Topic-FF.svg',
      imgAlt: 'Family Finding Icon',
      link: '/topic/family-finding',
    },
    {
      title: 'Inquiry management',
      layout: 'topic',
      image: '../images/topics/Topic-IM.svg',
      imgAlt: 'Inquiry Management Icon',
      link: '/topic/inquiry-management',
    },
    {
      title: 'License Renewal',
      layout: 'topic',
      image: '../images/topics/Topic-LR.svg',
      imgAlt: 'Licensing Renewal Icon',
      link: '/topic/license-renewal',
    },
    {
      title: 'Recruitment',
      layout: 'topic',
      image: '../images/topics/Topic-Recruitment.svg',
      imgAlt: 'Recruitment Icon',
      link: '/topic/recruitment',
    },
  ];

  return (
    <section id="test-section-id">
      <GridContainer>
        <Grid>
          <h2 className="font-heading-xl margin-y-0">Popular Topics</h2>
          <p>
            Scalable cards to highlight curated list of topics. Depending on how
            many we have, this may require more than 3 in a single row, but
            we’ll decide that later. Will allow for several rows as needed.
            Likely be capped with a rectangular image, and include a heading.
            Heading and image will be clickable.
          </p>
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
