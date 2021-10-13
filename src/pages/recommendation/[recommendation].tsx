import { PageProps } from 'gatsby';
import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import ReactMarkdown from 'react-markdown';
import { AnchorLinkProps } from 'gatsby-plugin-anchor-links';

import Layout from '../../components/layout/Layout';
import content from '../content/recommendations.content.yml';
import { Recommendation } from '../../types/recommendation';
import Hero from '../../components/hero/Hero';
import SideAnchorNav from '../../components/side-anchor-nav/SideAnchorNav';
import useGatsbyImages from '../../hooks/useGatsbyImages';
import './recommendation.scss';
import { ImageSharp } from '../../../graphql-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';

export default function State({ params: { recommendation } }: PageProps) {
  const costsIcon = useGatsbyImages()['images/topics/icon-costs.svg'].publicURL;
  const benefitsIcon =
    useGatsbyImages()['images/topics/icon-benefits.svg'].publicURL;
  const recommendations: Recommendation[] = content.recommendations;
  const selectedRecommendation = recommendations.find(
    t => t.title === recommendation,
  );
  const imageNode =
    selectedRecommendation?.who?.image &&
    useGatsbyImages()[selectedRecommendation.who.image.slice(5)];
  const gatsbyImage: ImageSharp['gatsbyImageData'] =
    imageNode && getImage(imageNode);
  const imageComponent = gatsbyImage && (
    <GatsbyImage
      className="image"
      image={gatsbyImage}
      alt={`${selectedRecommendation?.title}-who-is-doing-this`}
    />
  );
  const addHash = (title: string, url: string) => {
    window.history.replaceState(null, title, url);
  };
  const itemFilterKey: (keyof Recommendation)[] = [
    'about',
    'how',
    'costs',
    'benefits',
    'outcome',
    'who',
  ];
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
    {
      to: `/recommendation/${selectedRecommendation?.title}#inspiration`,
      title: 'Get Inspiration',
      onAnchorLinkClick: () => addHash("Who's doing this", '#inspiration'),
    },
  ].filter(
    (_it, index) =>
      !!(
        selectedRecommendation && selectedRecommendation[itemFilterKey[index]]
      ),
  );

  return (
    <Layout>
      <section id="test-section-id">
        {selectedRecommendation?.heading && (
          <Hero
            backgroundColor={'white'}
            title={selectedRecommendation.heading}
          />
        )}
      </section>
      <Breadcrumbs
        crumbLabel={selectedRecommendation?.title}
        page="recommendation"
      />
      <GridContainer className="cwp-recommendation">
        <Grid desktop={{ col: 3 }}>
          <SideAnchorNav items={items} />
        </Grid>

        <Grid
          className="usa-layout-docs__main usa-prose usa-layout-docs"
          id="main-content"
          desktop={{ col: 12 }}
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
                  <Grid row>
                    <Grid desktop={{ col: 6 }}>
                      <h3 className="cab">
                        <img
                          className="icon"
                          src={costsIcon}
                          alt="costs icon"
                        />{' '}
                        <span className="cab-heading">Costs</span>
                        <hr />
                      </h3>
                      <ul>
                        {selectedRecommendation.benefits.map(ben => (
                          <li key={ben}>{ben}</li>
                        ))}
                      </ul>
                    </Grid>
                    <Grid desktop={{ col: 6 }}>
                      <h3 className="cab">
                        <img
                          className="icon"
                          src={benefitsIcon}
                          alt="benefits icon"
                        />{' '}
                        <span className="cab-heading">Benefits</span>
                        <hr />
                      </h3>
                      <ul
                        className={selectedRecommendation?.costs && 'divider'}
                      >
                        {selectedRecommendation.costs.map(cost => (
                          <li key={cost}>{cost}</li>
                        ))}
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
                    {items[3].title}
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
                    {items[4].title}
                  </h2>
                  {selectedRecommendation.who.number && (
                    <>
                      <h3>{selectedRecommendation.who.number} of 54</h3>
                      <p>
                        states and territories have implimented this
                        recommendation.
                      </p>
                    </>
                  )}
                  {selectedRecommendation.who.image && imageComponent}
                  {selectedRecommendation.who.what && (
                    <ReactMarkdown className="section-content">
                      {selectedRecommendation.who.what}
                    </ReactMarkdown>
                  )}
                </section>
              </Grid>
            )}
            {selectedRecommendation?.inspiration && (
              <Grid id="inspiration">
                <section>
                  <h2 className="font-heading-xl margin-y-0 section-title">
                    {items[5].title}
                  </h2>
                  <ReactMarkdown>
                    {selectedRecommendation.inspiration}
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
