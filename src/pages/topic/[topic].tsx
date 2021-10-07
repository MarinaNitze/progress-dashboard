import { PageProps } from 'gatsby';
import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import ReactMarkdown from 'react-markdown';
import { AnchorLinkProps } from 'gatsby-plugin-anchor-links';

import Layout from '../../components/layout/Layout';
import content from '../content/topics.content.yml';
import { topicContent } from '../../utils/util';
import Hero from '../../components/hero/Hero';
import SideAnchorNav from '../../components/side-anchor-nav/SideAnchorNav';

export default function State({ params: { topic } }: PageProps) {
  const topics: topicContent[] = content.topics;
  const selectedTopic = topics.find(t => t.title === topic);
  const items: AnchorLinkProps[] = [
    {
      to: `/topic/${selectedTopic?.title}/#about-this-topic`,
      title: 'About this topic',
    },
    {
      to: `/topic/${selectedTopic?.title}/#why-this-matters`,
      title: 'Why this matters',
    },
    {
      to: `/topic/${selectedTopic?.title}/#what-we-can-do`,
      title: 'What we can do',
    },
    {
      to: `/topic/${selectedTopic?.title}/#how-programs-are-doing-this`,
      title: 'How programs are doing this',
      className: 'text-wrap-line',
    },
  ];
  const getId = (to: string) => to.split('/')[3].slice(1);
  console.log(topics);
  console.log(selectedTopic);

  return (
    <Layout>
      <main className="cwp-main">
        <section id="test-section-id" className="cwp-hero">
          {selectedTopic?.hero && (
            <Hero
              path={selectedTopic.hero.image.slice(5)}
              alt={selectedTopic.hero.imgAlt}
              backgroundColor={selectedTopic.hero.backgroundColor}
              title={selectedTopic.hero.title}
            />
          )}
        </section>
        <GridContainer>
          <Grid className="usa-layout-docs__sidenav" desktop={{ col: 3 }}>
            <nav aria-label="Secondary navigation">
              <SideAnchorNav items={items} />
            </nav>
          </Grid>

          {selectedTopic?.about && (
            <Grid id={getId(items[0].to)}>
              <h2 className="font-heading-xl margin-y-0 topics-title">
                {items[0].title}
              </h2>
              <ReactMarkdown>{selectedTopic?.about}</ReactMarkdown>
            </Grid>
          )}
          {selectedTopic?.why && (
            <Grid id={getId(items[1].to)}>
              <h2 className="font-heading-xl margin-y-0 topics-title">
                {items[1].title}
              </h2>
              <ReactMarkdown>{selectedTopic?.why}</ReactMarkdown>
            </Grid>
          )}
          {selectedTopic?.what && (
            <Grid id={getId(items[2].to)}>
              <h2 className="font-heading-xl margin-y-0 topics-title">
                {items[2].title}
              </h2>
              <ReactMarkdown>{selectedTopic?.what}</ReactMarkdown>
            </Grid>
          )}
        </GridContainer>
      </main>
    </Layout>
  );
}
