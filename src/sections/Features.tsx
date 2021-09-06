import React from 'react';
import { CardGroup, Grid, GridContainer } from '@trussworks/react-uswds';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import Card, { CardProps } from '../components/card/Card';

export default function FeatureSection({ images }: any) {
  // TODO: pull card list from cms
  const cardList: Array<CardProps> = [
    {
      heading: 'Full width feature',
      layout: 'lg',
      imgPath: 'images/cards/Full-Feature-Img.png',
      imgAlt: 'feature image',
      linkText: 'CTA',
      linkDestination: '/CTA',
      children: (
        <p>
          This will be for “showcase” items — large releases/updates. Will
          likely feature an image along with heading, body copy, and link
          (either text or button — tbd)
        </p>
      ),
    },
    {
      heading: 'Medium feature',
      layout: 'md',
      imgPath: 'images/cards/Medium-Feature.png',
      imgAlt: 'medium feature',
      children: (
        <p>
          Will serve as an intermediate block for when there aren’t a ton of new
          updates, but we still want to make an impact visually, but not compete
          with the main feature. These would need heading, body copy, and link.
          Image is optional, but wouldn’t be full width/background.
        </p>
      ),
    },
    {
      heading: 'Small feature',
      layout: 'sm',
      imgPath: 'images/cards/Small-Feature-Footer.png',
      imgAlt: 'small feature',
      children: (
        <p>
          Smaller impact, themed curated list of new items. Likely linked ULs
          with possible H4 heading format to cateogorize as needed. Could be
          repeated to fill a row.
        </p>
      ),
    },
  ];

  const cardListWithImages = cardList.map( card => {
    const imageNode: any =
    images &&
    images.edges.find((img: any) => img.node.relativePath === card.imgPath)?.node;
    const gatsbyImage = getImage(imageNode);
    const image = gatsbyImage && (
          <GatsbyImage
              className={card.layout !== "sm" ? "image" : ''}
              image={gatsbyImage}
              alt={card.imgAlt ?? card.heading}
            />
    )
    return {...card, image}
  })

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
            {cardListWithImages.map(c => (
              <Card key={c.heading} {...c} />
            ))}
          </CardGroup>
        </Grid>
      </GridContainer>
    </section>
  );
}
