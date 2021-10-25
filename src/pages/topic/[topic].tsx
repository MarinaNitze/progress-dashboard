import { PageProps } from 'gatsby';
import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import ReactMarkdown from 'react-markdown';
import { AnchorLinkProps } from 'gatsby-plugin-anchor-links';
import Layout from '../../components/layout/Layout';
import { Topic } from '../../types/topic';
import Hero from '../../components/hero/Hero';
import SideAnchorNav from '../../components/side-anchor-nav/SideAnchorNav';
import Table, { TableHeading } from '../../components/table/Table';
import { Recommendation } from '../../types/recommendation';
import { Link } from 'gatsby';

import content from '../content/topics.content.yml';
import recContent from '../content/recommendations.content.yml';
import './topic.scss';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';

const columns: TableHeading<Recommendation>[] = [
  {
    dataKey: 'heading',
    sortable: true,
    heading: 'Recommendations',
    renderCellContent: ({ heading, title }) => (
      <Link className="recLink" to={`/recommendation/${title}`}>
        {heading}
      </Link>
    ),
  },
  {
    dataKey: 'need',
    sortable: false,
    heading: `What's needed (Time/Cost)`,
  },
  {
    dataKey: 'title',
    sortable: false,
    heading: 'Case study',
  },
];

export default function State({ params: { topic } }: PageProps) {
  const topics: Topic[] = content.topics;
  const recommendations: Recommendation[] = recContent.recommendations;
  const selectedTopic = topics.find(t => t.title === topic);
  const addHash = (title: string, url: string) => {
    window.history.replaceState(null, title, url);
  };
  const itemFilterKey: (keyof Topic)[] = [
    'about',
    'why',
    'what',
    'recommendations',
  ];
  const allItems: AnchorLinkProps[] = [
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

  const items: AnchorLinkProps[] = allItems.filter(
    (_it, index) => !!(selectedTopic && selectedTopic[itemFilterKey[index]]),
  );

  return (
    <Layout>
      <section id="test-section-id">
        {selectedTopic?.hero && (
          <Hero
            className="cwp-topic-hero"
            path={selectedTopic.hero.image.slice(5)}
            alt={selectedTopic.hero.imgAlt}
            backgroundColor={selectedTopic.hero.backgroundColor}
            title={selectedTopic.hero.title}
          />
        )}
      </section>
      <Breadcrumbs crumbLabel={selectedTopic?.hero.title} page="topic" />
      <GridContainer className="cwp-topic">
        <Grid className="usa-layout-docs__sidenav" desktop={{ col: 3 }}>
          <SideAnchorNav items={items} />
        </Grid>

        <Grid
          className="usa-layout-docs__main usa-prose usa-layout-docs"
          id="main-content"
          desktop={{ col: 12 }}
        >
          <main className="cwp-main">
            {selectedTopic?.about && (
              <Grid data-cy="about-this-topic" id="about-this-topic">
                <section>
                  <h2 className="margin-y-0 section-title">
                    {allItems[0].title}
                  </h2>
                  <ReactMarkdown className="section-content">
                    {selectedTopic.about}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
            {selectedTopic?.why && (
              <Grid data-cy="why-this-matters" id="why-this-matters">
                <section>
                  <h2 className="section-title">{allItems[1].title}</h2>
                  <ReactMarkdown className="section-content">
                    {selectedTopic.why}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
            {selectedTopic?.what && (
              <Grid data-cy="what-we-can-do" id="what-we-can-do">
                <section>
                  <h2 className="section-title">{allItems[2].title}</h2>
                  <ReactMarkdown className="section-content">
                    {selectedTopic.what}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
            <Grid
              data-cy="how-programs-are-doing-this"
              id="how-programs-are-doing-this"
            >
              {selectedTopic?.recommendations && (
                <section>
                  <h2 className="section-title">{allItems[3].title}</h2>
                  <Table
                    dataCy="topic-recommendation-table"
                    data={recommendations.filter(rec => {
                      if (selectedTopic.recommendations.includes(rec.title)) {
                        return {
                          ...rec,
                          need: 'Content',
                        };
                      }
                    })}
                    columns={columns}
                  />
                </section>
              )}
            </Grid>
          </main>
        </Grid>
      </GridContainer>
    </Layout>
  );
}
