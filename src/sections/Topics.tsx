import React from 'react';
import { navigate } from 'gatsby';
import {
  CardGroup,
  Grid,
  GridContainer,
  Button,
} from '@trussworks/react-uswds';

import Card, { CardProps } from '../components/card/Card';
import { CardImagesQuery } from '../../graphql-types';

export default function TopicsSection({ cardImages }: CardImagesQuery) {
  // TODO: pull card list from cms
  const cardList: Array<CardProps> = [
    {
      heading: 'Foster Parent Licensing',
      layout: 'topic',
      imgPath: 'images/cards/Topic-FPL.svg',
      imgAlt: 'Foster Parent Licensing Icon',
      linkDestination: '/topic/foster-parent-licensing',
    },
    {
      heading: 'Background Checks',
      layout: 'topic',
      imgPath: 'images/cards/Topic-BC.svg',
      imgAlt: 'Background Checks Icon',
      linkDestination: '/topic/background-checks',
    },
    {
      heading: 'Extended Foster Care',
      layout: 'topic',
      imgPath: 'images/cards/Topic-EFC.svg',
      imgAlt: 'Extended Foster Care Icon',
      linkDestination: '/CTA',
    },
    {
      heading: 'Family Finding',
      layout: 'topic',
      imgPath: 'images/cards/Topic-FF.svg',
      imgAlt: 'Family Finding Icon',
      linkDestination: '/topic/family-finding',
    },
    {
      heading: 'Inquiry management',
      layout: 'topic',
      imgPath: 'images/cards/Topic-IM.svg',
      imgAlt: 'Inquiry Management Icon',
      linkDestination: '/topic/inquiry-management',
    },
    {
      heading: 'License Renewal',
      layout: 'topic',
      imgPath: 'images/cards/Topic-LR.svg',
      imgAlt: 'Licensing Renewal Icon',
      linkDestination: '/topic/license-renewal',
    },
    {
      heading: 'Recruitment',
      layout: 'topic',
      imgPath: 'images/cards/Topic-Recruitment.svg',
      imgAlt: 'Recruitment Icon',
      linkDestination: '/topic/recruitment',
    },
  ];

  const cardListWithImages = cardList.map(card => {
    const imageNode: any =
      cardImages &&
      cardImages.edges.find(
        (img: any) => img.node.relativePath === card.imgPath,
      )?.node;
    const svgImage = imageNode.publicURL;
    const image = svgImage && (
      <img src={svgImage} alt={card.imgAlt ?? card.heading} />
    );
    return { ...card, image };
  });

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
            {cardListWithImages.map(c => (
              <Card key={c.heading} {...c} />
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
