import React from "react";
import { graphql } from 'gatsby'
import Layout from "../components/layout";
import SEO from "../components/seo";
import remark from "remark";
import recommended from "remark-preset-lint-recommended";
import remarkHtml from "remark-html";

function IndexPage({data}) {
  const content = data.indexPage.frontmatter;

  return (
    <Layout>
      <SEO
        keywords={[`progress dashboard`]}
        title="Progress Dashboard"
      />
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
`

export default IndexPage;
