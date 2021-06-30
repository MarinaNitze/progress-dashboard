import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

export default function IndexPage({ data }) {
  return (
    <Layout>
      <Seo keywords={[`progress dashboard`]} title="Progress Dashboard" />
      <div dangerouslySetInnerHTML={{ __html: data.indexPage.html }}></div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexTemplate {
    indexPage: markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
      html
    }
  }
`;
