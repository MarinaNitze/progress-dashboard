import { HeroAndCardImagesQuery } from '../graphql-types';
import { useStaticQuery } from 'gatsby';

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
  recommendationImages: {
    edges: [
      {
        node: {
          extension: 'png',
          relativePath: 'images/recommendations/us-map.png',
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
      {
        node: {
          extension: 'svg',
          publicURL: '/static/188086bb11fd11789d6bd9a30a11abfb/cwp-logo.svg',
          relativePath: 'images/topics/icon-sort-down.svg',
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
      {
        node: {
          extension: 'svg',
          publicURL: '/static/188086bb11fd11789d6bd9a30a11abfb/menu-mobile.svg',
          relativePath: 'images/header/menu-mobile.svg',
        },
      },
    ],
  },
  compareImages: {
    edges: [
      {
        node: {
          extension: 'svg',
          publicURL: '/static/188086bb11fd11789d6bd9a30a11abfb/cwp-logo.svg',
          relativePath: 'images/compare/1Of5.svg',
        },
      },
      {
        node: {
          extension: 'svg',
          publicURL: '/static/188086bb11fd11789d6bd9a30a11abfb/search.svg',
          relativePath: 'images/compare/1Of5.svg',
        },
      },
    ],
  },
  footerImages: {
    edges: [
      {
        node: {
          extension: 'svg',
          publicURL: '/static/test/bloom-works-logo.svg',
          relativePath: 'images/footer/bloom-works-logo.svg',
        },
      },
      {
        node: {
          extension: 'svg',
          publicURL: '/static/test/thinkofus-logo.svg',
          relativePath: 'images/footer/thinkofus-logo.svg',
        },
      },
      {
        node: {
          extension: 'svg',
          publicURL: '/static/test/new-america-logo.svg',
          relativePath: 'images/footer/new-america-logo.svg',
        },
      },
      {
        node: {
          extension: 'svg',
          publicURL: '/static/test/foster-america-logo.svg',
          relativePath: 'images/footer/foster-america-logo.svg',
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
