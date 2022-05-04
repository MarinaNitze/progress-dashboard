import React, { ReactNode } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

import SEO from '../seo/Seo';

const headerLinks = [
  {
    to: '/topic',
    text: 'Topics',
    dataCy: 'cwp-nav-topic-link',
  },
  {
    to: '/recommendation',
    text: 'Recommendations',
    dataCy: 'cwp-nav-recommendation-link',
  },
  {
    to: '/compare',
    text: 'Compare',
    dataCy: 'cwp-nav-compare-link',
  },
  {
    to: '/about',
    text: 'About',
    dataCy: 'cwp-nav-compare-link',
  },
  {
    to: '/search',
    text: 'Search',
    dataCy: 'cwp-nav-search-link',
  },
];

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <SEO title="Progress Dashboard" />
      <Header headerLinks={headerLinks} />
      {children}
      <Footer />
    </div>
  );
}
