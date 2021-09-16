import { useStaticQuery } from 'gatsby';
import { HeroAndCardImagesQuery } from '../graphql-types';

export const mockImageData = () => ({
  heroImages: {
    edges: [
      {
        node: {
          extension: 'png',
          relativePath: 'images/heros/hero-home.png',
        },
      },
    ],
  },
  featureImages: {
    edges: [
      {
        node: {
          extension: 'png',
          relativePath: 'images/heros/hero-home.png',
        },
      },
    ],
  },
  topicImages: {
    edges: [
      {
        node: {
          extension: 'svg',
          publicURL: '/static/188086bb11fd11789d6bd9a30a11abfb/cwp-logo.svg',
          relativePath: 'images/header/cwp-logo.svg',
        },
      },
    ],
  },
  headerImages: {
    edges: [
      {
        node: {
          extension: 'svg',
          publicURL: '/static/188086bb11fd11789d6bd9a30a11abfb/cwp-logo.svg',
          relativePath: 'images/header/cwp-logo.svg',
        },
      },
      {
        node: {
          extension: 'svg',
          publicURL: '/static/188086bb11fd11789d6bd9a30a11abfb/search.svg',
          relativePath: 'images/header/search.svg',
        },
      },
    ],
  },
});

export const mockStaticData = <T = unknown>(data: T) =>
  (useStaticQuery as jest.Mock).mockReturnValue({ ...data });

export const mockGatsbyImageData = () => {
  mockStaticData<HeroAndCardImagesQuery>(mockImageData());
};
