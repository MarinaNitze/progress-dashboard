import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo title="404: Not found" />
      <div>
        <h2 className="bg-yellow-400 text-2xl font-bold inline-block my-8 p-3">
          404
        </h2>
        <p>Not found</p>
      </div>
    </Layout>
  );
}
