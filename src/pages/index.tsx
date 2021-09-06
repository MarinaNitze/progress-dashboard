import { GridContainer } from '@trussworks/react-uswds';
import React from 'react';
import { graphql } from 'gatsby';
import Features from '../sections/Features';
import Topics from '../sections/Topics';

import { CardImagesQuery } from '../../graphql-types';

import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';

const IndexPage: React.FC<{ data: CardImagesQuery }> = ({ data }) => {
  return (
    <Layout>
      <main>
        <section id="test-section-id" className="usa-section">
          <GridContainer>
            <Hero
              title={'[Playbook Tagline]'}
              description={
                'Quick intro that sets the stage for the site, what people can do, and how to do it.'
              }
            >
              <p>Search Component Placeholder</p>
            </Hero>
          </GridContainer>
        </section>
        <Features cardImages={data.cardImages} />
        <Topics cardImages={data.cardImages} />
      </main>
    </Layout>
  );
};
export default IndexPage;

export const pageQuery = graphql`
  query CardImages {
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
  }
`;
