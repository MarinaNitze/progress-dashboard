import React from 'react';
import { CardGroup, Grid, GridContainer } from '@trussworks/react-uswds';

import Card, { CardProps } from '../components/card/Card';

export default function TopicsSection() {

  // TODO: pull card list from cms
  const cardList: Array<CardProps> = [
    {
      heading: 'Foster Parent Licensing',
      layout: 'topic',
      imgPath:
        'https://images.unsplash.com/photo-1543596734-951d6f4f052c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=450&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9',
      linkDestination: '/topic/foster-parent-licensing',
    },
    {
      heading: 'Background Checks',
      layout: 'topic',
      imgPath:
        'https://images.unsplash.com/photo-1543596734-951d6f4f052c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=450&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9',
      linkDestination: '/topic/background-checks',
    },
    {
      heading: 'Extended Foster Care',
      layout: 'topic',
      imgPath:
        'https://images.unsplash.com/photo-1543596734-951d6f4f052c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=450&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9',
      linkDestination: '/CTA',
    },
    {
      heading: 'Family Finding',
      layout: 'topic',
      imgPath:
        'https://images.unsplash.com/photo-1543596734-951d6f4f052c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=450&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9',
      linkDestination: '/topic/family-finding',
    },
    {
      heading: 'Inquiry management',
      layout: 'topic',
      imgPath:
        'https://images.unsplash.com/photo-1543596734-951d6f4f052c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=450&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9',
      linkDestination: '/topic/inquiry-management',
    },
    {
      heading: 'License Renewal',
      layout: 'topic',
      imgPath:
        'https://images.unsplash.com/photo-1543596734-951d6f4f052c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=450&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9',
      linkDestination: '/topic/license-renewal',
    },
    {
      heading: 'Recruitment',
      layout: 'topic',
      imgPath:
        'https://images.unsplash.com/photo-1543596734-951d6f4f052c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=450&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9',
      linkDestination: '/topic/recruitment',
    },
    {
      heading: 'Retention',
      layout: 'topic',
      imgPath:
        'https://images.unsplash.com/photo-1543596734-951d6f4f052c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=450&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9',
      linkDestination: '/topic/retention',
    }
  ];

  return (
      <section id="test-section-id">
        <GridContainer>
          <h2 className="font-heading-xl margin-y-0">Popular Topics</h2>
          <p>
            Scalable cards to highlight curated list of topics. Depending on how many we have, this may require more than 3 in a single row, but we’ll decide that later. Will allow for several rows as needed. Likely be capped with a rectangular image, and include a heading. Heading and image will be clickable.
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
      </section>
  );
}
