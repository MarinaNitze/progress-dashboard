import { Grid, GridContainer } from '@trussworks/react-uswds';
import { AnchorLinkProps } from 'gatsby-plugin-anchor-links';
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import useDataAW from '../hooks/useDataAW';
import { PageProps } from 'gatsby';

import SideAnchorNav from '../components/side-anchor-nav/SideAnchorNav';
import content from '../components/side-anchor-nav/content.yml';

const items: AnchorLinkProps[] = [
  {
    to: '#about-this-topic',
    title: 'About this topic',
  },
  {
    to: '#why-this-matters',
    title: 'Why this matters',
  },
  {
    to: '#what-we-can-do',
    title: 'What we can do',
  },
  {
    to: '#how-programs-are-doing-this',
    title: 'How programs are doing this',
    className: 'text-wrap-line',
  },
];

const { text } = content.example;

// This is a placeholder component route that will leverage hook into Airtable.
export default function Topic({ location }: PageProps) {
  const { awData } = useDataAW();
  const [anchorLinks, setAnchorLinks] = useState(items);

  console.log(awData?.nodes);

  useEffect(() => {
    setAnchorLinks(
      items.map(item => ({
        className: location.hash.includes(item.to) ? 'active' : '',
        ...item,
      })),
    );
  }, [location.hash]);

  return (
    <Layout>
      <section className="usa-section">
        <GridContainer>
          <Grid row gap>
            <Grid className="usa-layout-docs__sidenav" desktop={{ col: 3 }}>
              <nav aria-label="Secondary navigation">
                <SideAnchorNav items={anchorLinks} />
              </nav>
            </Grid>
            <main
              className="usa-layout-docs__main desktop:grid-col-9 usa-prose usa-layout-docs"
              id="main-content"
            >
              <h3 id="about-this-topic">About this topic</h3>
              <p>{text}</p>

              <h3 id="why-this-matters">Why this matters</h3>
              <p>{text}</p>

              <h3 id="what-we-can-do">What we can do</h3>
              <p>{text}</p>

              <h3 id="how-programs-are-doing-this">
                How programs are doing this
              </h3>
              <p>{text}</p>
            </main>
          </Grid>
        </GridContainer>
      </section>
    </Layout>
  );
}
