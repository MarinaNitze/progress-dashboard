import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";

import { home } from "./index.content.yml";

export default function IndexPage({ data }) {
  return (
    <Layout>
      <title>{ home.title }</title>
      <Seo keywords={[`progress dashboard`]} title="Progress Dashboard" />
      <div dangerouslySetInnerHTML={{ __html: data.indexPage.html }}></div>
    </Layout>
  );
}
