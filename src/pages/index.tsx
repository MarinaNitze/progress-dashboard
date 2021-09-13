import { GridContainer } from '@trussworks/react-uswds';
import React from 'react';
import { graphql } from 'gatsby';
import Features from '../sections/Features';
import Topics from '../sections/Topics';

import { ImagesQuery } from '../../graphql-types';

import useGatsbyImage from '../hooks/useGatsbyImage';
import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';

const IndexPage: React.FC<{ data: ImagesQuery }> = ({ data }) => {
  const heroImage = useGatsbyImage({
    images: data.heroImages,
    path: 'images/heros/hero-1.png',
  });

  return (
    <Layout>
      <main>
        <section id="test-section-id" className="usa-section">
          <GridContainer>
            <Hero
              backgroundImg={heroImage}
              backgroundColor="primary"
              title={'[Playbook Tagline]'}
              description={
                'Quick intro that sets the stage for the site, what people can do, and how to do it. Quick intro that sets the stage for the site, what people can do, and how to do it. Quick intro that sets the stage for the site, what people can do, and how to do it. Quick intro that sets the stage for the site, what people can do, and how to do it. Quick intro that sets the stage for the site, what people can do, and how to do it. Quick intro that sets the stage for the site, what people can do, and how to do it. Quick intro that sets the stage for the site, what people can do, and how to do it. Quick intro that sets the stage for the site, what people can do, and how to do it. Quick intro that sets the stage for the site, what people can do, and how to do it. Quick intro that sets the stage for the site, what people can do, and how to do it. Quick intro that sets the stage for the site, what people can do, and how to do it. '
              }
            >
              <p>Search Component Placeholder</p>
            </Hero>
          </GridContainer>
        </section>
        <Features {...data.cardImages} />
        <Topics {...data.cardImages} />
      </main>
    </Layout>
  );
};
export default IndexPage;

export const pageQuery = graphql`
  query Images {
    cardImages: allFile(filter: { relativeDirectory: { eq: "images/cards" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
          extension
          publicURL
        }
      }
    }
    heroImages: allFile(filter: { relativeDirectory: { eq: "images/heros" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
          extension
          publicURL
        }
      }
    }
  }
`;
