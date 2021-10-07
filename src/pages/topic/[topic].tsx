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
import './topic.scss';

export default function State({ params: { topic } }: PageProps) {
  const topics: topicContent[] = content.topics;
  const selectedTopic = topics.find(t => t.title === topic);
  const addHash = (title: string, url: string) => {
    window.history.replaceState(null, title, url);
  };
  const items: AnchorLinkProps[] = [
    {
      to: `/topic/${selectedTopic?.title}#about-this-topic`,
      title: 'About this topic',
      onAnchorLinkClick: () => addHash('About this topic', '#about-this-topic'),
    },
    {
      to: `/topic/${selectedTopic?.title}#why-this-matters`,
      title: 'Why this matters',
      onAnchorLinkClick: () => addHash('Why this matters', '#why-this-matters'),
    },
    {
      to: `/topic/${selectedTopic?.title}#what-we-can-do`,
      title: 'What we can do',
      onAnchorLinkClick: () => addHash('What we can do', '#what-we-can-do'),
    },
    {
      to: `/topic/${selectedTopic?.title}#how-programs-are-doing-this`,
      title: 'How programs are doing this',
      className: 'text-wrap-line',
      onAnchorLinkClick: () =>
        addHash('How programs are doing this', '#how-programs-are-doing-this'),
    },
  ];

  return (
    <Layout>
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
      <GridContainer className="cwp-topic">
        <Grid className="usa-layout-docs__sidenav" desktop={{ col: 3 }}>
          <SideAnchorNav items={items} />
        </Grid>

        <Grid
          className="usa-layout-docs__main usa-prose usa-layout-docs"
          id="main-content"
          desktop={{ col: 9 }}
        >
          <main className="cwp-main">
            {selectedTopic?.about && (
              <Grid id="about-this-topic">
                <section>
                  <h2 className="font-heading-xl margin-y-0 section-title">
                    {items[0].title}
                  </h2>
                  <ReactMarkdown className="section-content">
                    {selectedTopic.about}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
            {selectedTopic?.why && (
              <Grid id="why-this-matters">
                <section>
                  <h2 className="font-heading-xl margin-y-0 section-title">
                    {items[1].title}
                  </h2>
                  <ReactMarkdown className="section-content">
                    {selectedTopic.why}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
            {selectedTopic?.what && (
              <Grid id="what-we-can-do">
                <section>
                  <h2 className="font-heading-xl margin-y-0 section-title">
                    {items[2].title}
                  </h2>
                  <ReactMarkdown className="section-content">
                    {selectedTopic.what}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
          </main>
        </Grid>
      </GridContainer>
    </Layout>
  );
}
