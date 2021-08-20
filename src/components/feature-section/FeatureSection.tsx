import React from 'react';
import { CardGroup, Grid, GridContainer } from '@trussworks/react-uswds';

import Card from '../card/Card';

export default function FeatureSection() {
  return (
    <>
      <section id="test-section-id">
        <GridContainer>
          <h2 className="font-heading-xl margin-y-0">What's new</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Luctus
            massa natoque risus ut porttitor. Urna commodo amet non massa dui
            quis. Id pellentesque purus enim suspendisse et sed gravida enim
            sed.
          </p>
        </GridContainer>
      </section>
      <GridContainer>
        <Grid row>
          <CardGroup>
            <Card
              heading="Full width feature"
              size="lg"
              imgPath="https://images.unsplash.com/photo-1543596734-951d6f4f052c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=450&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9"
            >
              <p>
                This will be for “showcase” items — large releases/updates. Will
                likely feature an image along with heading, body copy, and link
                (either text or button — tbd)
              </p>
            </Card>
          </CardGroup>
        </Grid>
        <Grid row>
          <CardGroup>
            <Card
              gridLayout={{ tablet: { col: 4 } }}
              heading="Small feature"
              size="sm"
            >
              <p>
                Smaller impact, themed curated list of new items. Likely linked
                ULs with possible H4 heading format to cateogorize as needed.
                Could be repeated to fill a row.
              </p>
            </Card>
            <Card
              gridLayout={{ tablet: { col: 8 } }}
              heading="Medium feature"
              size="md"
            >
              <p>
                Will serve as an intermediate block for when there aren’t a ton
                of new updates, but we still want to make an impact visually,
                but not compete with the main feature. These would need heading,
                body copy, and link. Image is optional, but wouldn’t be full
                width/background.
              </p>
            </Card>
          </CardGroup>
        </Grid>
      </GridContainer>
    </>
  );
}
