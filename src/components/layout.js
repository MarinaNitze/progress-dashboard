import React from "react";
import { useStaticQuery, graphql } from "gatsby";

function Layout({ hero, title, subtitle, children }) {
  const data = useStaticQuery(
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
