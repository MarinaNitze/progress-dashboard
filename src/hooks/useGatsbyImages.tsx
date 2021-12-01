import { HeroAndCardImagesQuery } from '../../graphql-types';
import { useStaticQuery, graphql } from 'gatsby';

type useGatsbyImageResponse = {
  [key: string]: any;
};

export default function useGatsbyImages(): useGatsbyImageResponse {
  const {
    heroImages,
    topicImages,
    featureImages,
    headerImages,
    footerImages,
    recommendationImages,
    compareImages,
  } = useStaticQuery<HeroAndCardImagesQuery>(graphql`
    query HeroAndCardImages {
      heroImages: allFile(
        filter: { relativeDirectory: { eq: "images/heros" } }
      ) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
            extension
          }
        }
      }
      featureImages: allFile(
        filter: { relativeDirectory: { eq: "images/features" } }
      ) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
            extension
          }
        }
      }
      recommendationImages: allFile(
        filter: { relativeDirectory: { eq: "images/recommendations" } }
      ) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
            extension
          }
        }
      }
      topicImages: allFile(
        filter: { relativeDirectory: { eq: "images/topics" } }
      ) {
        edges {
          node {
            relativePath
            extension
            publicURL
          }
        }
      }
      headerImages: allFile(
        filter: { relativeDirectory: { eq: "images/header" } }
      ) {
        edges {
          node {
            relativePath
            extension
            publicURL
          }
        }
      }
      footerImages: allFile(
        filter: { relativeDirectory: { eq: "images/footer" } }
      ) {
        edges {
          node {
            relativePath
            extension
            publicURL
          }
        }
      }
      compareImages: allFile(
        filter: { relativeDirectory: { eq: "images/compare" } }
      ) {
        edges {
          node {
            relativePath
            extension
            publicURL
          }
        }
      }
    }
  `);

  const images = [
    heroImages,
    topicImages,
    featureImages,
    headerImages,
    footerImages,
    recommendationImages,
    compareImages,
  ].reduce((acc, images) => {
    images?.edges.forEach(edge => {
      const path: string = edge.node.relativePath;
      acc[path] = edge.node;
      return acc;
    });
    return acc;
  }, {} as useGatsbyImageResponse);

  return images;
}
