import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import content from '../content/recommendations.content.yml';
import Hero from '../../components/hero/Hero';
import Layout from '../../components/layout/Layout';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import SideAnchorNav from '../../components/side-anchor-nav/SideAnchorNav';
import useGatsbyImages from '../../hooks/useGatsbyImages';
import { AnchorLinkProps } from 'gatsby-plugin-anchor-links';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import { ImageSharp } from '../../../graphql-types';
import { PageProps } from 'gatsby';
import { Recommendation as RecommendationType } from '../../types/recommendation';
import './recommendation.scss';

export default function Recommendation({
  params: { recommendation },
}: PageProps) {
  const costsIcon = useGatsbyImages()['images/topics/icon-costs.svg'].publicURL;
  const benefitsIcon =
    useGatsbyImages()['images/topics/icon-benefits.svg'].publicURL;
  const recommendations: RecommendationType[] = content.recommendations;
  const selectedRecommendation = recommendations.find(
    t => t.title === recommendation,
  );
  const imageNode =
    selectedRecommendation?.who?.image &&
    useGatsbyImages()[selectedRecommendation.who.image.slice(3)];
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
  const itemFilterKey: (keyof RecommendationType)[] = [
    'about',
    'how',
    'costs',
    'outcome',
    'who',
    'inspiration',
  ];
  const allItems: AnchorLinkProps[] = [
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
  ];

  const items: AnchorLinkProps[] = allItems.filter((_it, index) => {
    if (itemFilterKey[index] === 'costs')
      return !!(
        selectedRecommendation &&
        (selectedRecommendation['costs'] || selectedRecommendation['benefits'])
      );
    return !!(
      selectedRecommendation && selectedRecommendation[itemFilterKey[index]]
    );
  });

  return (
    <Layout>
      <section id="test-section-id">
        {selectedRecommendation?.heading && (
          <Hero
            className="recommendation-hero"
            backgroundColor={'white'}
            title={selectedRecommendation.heading}
          />
        )}
      </section>
      <Breadcrumbs
        crumbLabel={selectedRecommendation?.heading}
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
          <main className="cwp-main recommendation">
            {selectedRecommendation?.about && (
              <Grid id="about-this-recommendation">
                <section>
                  <h2 className="section-title">{allItems[0].title}</h2>
                  <ReactMarkdown className="section-content">
                    {selectedRecommendation.about}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
            {selectedRecommendation?.how && (
              <Grid id="how-to-do-this">
                <section>
                  <h2 className="section-title">{allItems[1].title}</h2>
                  <ReactMarkdown className="section-content">
                    {selectedRecommendation.how}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
            {(selectedRecommendation?.costs ||
              selectedRecommendation?.benefits) && (
              <Grid id="anticipated-costs-and-benefits">
                <section className="cost-benefit-table">
                  <h2 className="section-title">{allItems[2].title}</h2>
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
                        {selectedRecommendation.costs.map(cost => (
                          <li key={cost}>{cost}</li>
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
                        {selectedRecommendation.benefits.map(benefit => (
                          <li key={benefit}>{benefit}</li>
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
                  <h2 className="section-title">{allItems[3].title}</h2>
                  <ReactMarkdown className="section-content">
                    {selectedRecommendation.outcome}
                  </ReactMarkdown>
                </section>
              </Grid>
            )}
            {selectedRecommendation?.who && (
              <Grid id="whos-doing-this">
                <section>
                  <h2 className="section-title">{allItems[4].title}</h2>
                  {selectedRecommendation.who.number && (
                    <>
                      <p>
                        <strong>
                          {selectedRecommendation.who.number} of 54
                        </strong>{' '}
                        states and territories have implemented this
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
                  <h2 className="section-title">{allItems[5].title}</h2>
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
