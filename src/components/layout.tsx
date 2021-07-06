import React, { ReactNode } from "react";
import { useStaticQuery, graphql } from "gatsby";

type LayoutProps = {
  children: ReactNode
}

type MainData = {
  site: {
    siteMetadata: {
      title: string;
    }
  }
}

function Layout({ children }: LayoutProps) {
  const data: MainData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
