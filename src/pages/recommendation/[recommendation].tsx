import { PageProps } from 'gatsby';
import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import ReactMarkdown from 'react-markdown';
import { AnchorLinkProps } from 'gatsby-plugin-anchor-links';

import Layout from '../../components/layout/Layout';
import content from '../content/recommendations.content.yml';
import { recommendationContent } from '../../utils/util';
import Hero from '../../components/hero/Hero';
import SideAnchorNav from '../../components/side-anchor-nav/SideAnchorNav';
import './recommendation.scss';

export default function State({ params: { recommendation } }: PageProps) {
  const topics: recommendationContent[] = content.recommendations;
  const selectedRecommendation = topics.find(t => t.title === recommendation);
  const addHash = (title: string, url: string) => {
    window.history.replaceState(null, title, url);
  };
  const itemFilterKey = ['about', 'how', 'costs', 'benefits', 'outcome', 'who'];
  const items: AnchorLinkProps[] = [
    {
      to: `/recommendation/${selectedRecommendation?.title}#about-this-recommendation`,
      title: 'About this recommendation',
      onAnchorLinkClick: () =>
        addHash('About this recommendation', '#about-this-recommendation'),
    },
    {
      to: `/recommendation/${selectedRecommendation?.title}#how-to-do-this`,
      title: 'How to do this',
      onAnchorLinkClick: () => addHash('How to do this', '#how-to-do-this'),
    },
    {
      to: `/recommendation/${selectedRecommendation?.title}#anticipated-costs-and-benefits`,
      title: 'Anticipated costs and benefits',
      onAnchorLinkClick: () =>
        addHash(
          'Anticipated costs and benefits',
          '#anticipated-costs-and-benefits',
        ),
    },
    {
      to: `/recommendation/${selectedRecommendation?.title}#outcome-data`,
      title: 'Outcome data',
      onAnchorLinkClick: () => addHash('Outcome data', '#outcome-data'),
    },
    {
      to: `/recommendation/${selectedRecommendation?.title}#whos-doing-this`,
      title: "Who's doing this",
      onAnchorLinkClick: () => addHash("Who's doing this", '#whos-doing-this'),
    },
  ].filter(
    (_it, index) =>
      !!(
        selectedRecommendation &&
        selectedRecommendation[
          itemFilterKey[index] as
            | 'about'
            | 'how'
            | 'costs'
            | 'benefits'
            | 'outcome'
            | 'who'
        ]
      ),
  );

  return (
    <Layout>
      <section id="test-section-id" className="cwp-hero">
        {selectedRecommendation?.heading && (
          <Hero
            backgroundColor={'white'}
            title={selectedRecommendation.heading}
          />
        )}
      </section>
      <GridContainer className="cwp-recommendation">
        <Grid className="usa-layout-docs__sidenav" desktop={{ col: 3 }}>
          <SideAnchorNav items={items} />
        </Grid>

        <Grid
          className="usa-layout-docs__main usa-prose usa-layout-docs"
          id="main-content"
          desktop={{ col: 9 }}
        >
          <main className="cwp-main">
            {selectedRecommendation?.about && (
              <Grid id="about-this-recommendation">
                <section>
                  <h2 className="font-heading-xl margin-y-0 section-title">
                    {items[0].title}
                  </h2>
                  <ReactMarkdown className="section-content">
                    {selectedRecommendation.about}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
            {selectedRecommendation?.how && (
              <Grid id="how-to-do-this">
                <section>
                  <h2 className="font-heading-xl margin-y-0 section-title">
                    {items[1].title}
                  </h2>
                  <ReactMarkdown className="section-content">
                    {selectedRecommendation.how}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
            {(selectedRecommendation?.costs ||
              selectedRecommendation?.benefits) && (
              <Grid id="anticipated-costs-and-benefits">
                <section>
                  <h2 className="font-heading-xl margin-y-0 section-title">
                    {items[2].title}
                  </h2>
                  {/* todo: format as table or something else? */}
                  <Grid row>
                    <Grid desktop={{ col: 6 }}>
                      <h5 className="cab-header">Costs<hr/></h5>
                      <ul>
                        {selectedRecommendation.benefits.map( ben => (<li>{ben}</li>))}
                      </ul>
                    </Grid>
                    <Grid desktop={{ col: 6 }}>
                      <h5 className="cab-header">Benefits<hr/></h5>
                      <ul className={selectedRecommendation?.costs && "divider"}>
                        {selectedRecommendation.costs.map( cost => (<li>{cost}</li>))}
                      </ul>
                    </Grid>
                  </Grid>
                </section>
              </Grid>
            )}
            {selectedRecommendation?.outcome && (
              <Grid id="outcome-data">
                <section>
                  <h2 className="font-heading-xl margin-y-0 section-title">
                    {items[1].title}
                  </h2>
                  <ReactMarkdown className="section-content">
                    {selectedRecommendation.outcome}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
            {selectedRecommendation?.who && (
              <Grid id="whos-doing-this">
                <section>
                  <h2 className="font-heading-xl margin-y-0 section-title">
                    {items[1].title}
                  </h2>
                  {/* todo: get image */}
                  {selectedRecommendation.who.number && (
                    <>
                      <h4>{selectedRecommendation.who.number} of 54</h4>
                      <p>
                        states and territories have implimented this
                        recommendation.
                      </p>
                    </>
                  )}
                  {selectedRecommendation.who.image &&
                    selectedRecommendation.who.image}
                </section>
              </Grid>
            )}
          </main>
        </Grid>
      </GridContainer>
    </Layout>
  );
}
