import React, { ReactNode } from 'react';

import Header from '../header/Header';
import SEO from '../seo/Seo';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <SEO title="Progress Dashboard" />
      <Header />
      {children}
    </div>
  );
}
