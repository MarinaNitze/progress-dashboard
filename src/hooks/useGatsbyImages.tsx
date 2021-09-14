import { HeroAndCardImagesQuery } from '../../graphql-types';
import { useStaticQuery, graphql } from 'gatsby';

type useGatsbyImageProps = {
  path: string;
};

type useGatsbyImageResponse = {
  image: any;
};

export default function useGatsbyImages({
  path,
}: useGatsbyImageProps): useGatsbyImageResponse {
  const { heroImages, topicImages, featureImages } =
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
      }
    `);

  const stub = path.slice(7, 12);
  let image;
  switch (stub) {
    case 'heros':
      image = heroImages?.edges.find(
        (edge: any) => edge?.node?.relativePath === path,
      )?.node;
      break;
    case 'topic':
      image = topicImages?.edges.find(
        (edge: any) => edge?.node?.relativePath === path,
      )?.node;
      break;
    case 'featu':
      image = featureImages?.edges.find(
        (edge: any) => edge?.node?.relativePath === path,
      )?.node;
      break;
    default:
      image = heroImages?.edges[0]?.node;
      break;
  }

  return { image };
}
