import { HeroAndCardImagesQuery } from '../../graphql-types';
import { useStaticQuery, graphql } from 'gatsby';

type useGatsbyImageResponse = {
  [key: string]: any;
};

export default function useGatsbyImages(): useGatsbyImageResponse {
  const { heroImages, topicImages, featureImages, headerImages } =
    useStaticQuery<HeroAndCardImagesQuery>(graphql`
      query HeroAndCardImages {
        heroImages: allFile(
          filter: { relativeDirectory: { eq: "images/heros" } }
        ) {
          edges {
            node {
              relativePath
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
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
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
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
      }
    `);

  const images = [heroImages, topicImages, featureImages, headerImages].reduce(
    (acc, images) => {
      images?.edges.forEach(edge => {
        const path: string = edge.node.relativePath;
        acc[path] = edge.node;
        return acc;
      });
      return acc;
    },
    {} as useGatsbyImageResponse,
  );

  return images;
}
