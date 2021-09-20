import React, { ReactNode } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

import SEO from '../seo/Seo';

const headerLinks = [
  {
    to: '/topic',
    text: 'Topics',
  },
  {
    to: '/recommendations',
    text: 'Recommendations',
  },
  {
    to: '/compare',
    text: 'Compare',
  },
  {
    to: '/stories',
    text: 'Stories',
  },
  {
    to: '/search',
    text: 'Search',
    iconPath: 'images/header/search.svg',
    iconClassname: 'search-icon',
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
