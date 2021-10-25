import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

type SEOProps = {
  description?: string;
  lang?: string;
  meta?: [];
  keywords?: string[];
  title: string;
};

export default function Seo({
  description,
  lang = 'en',
  meta = [],
  keywords = [],
  title,
}: SEOProps) {
  const { site } = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);

  const metaDescription = description ?? site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : [],
        )
        .concat(meta)}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Petrona:wght@400;700;900&display=swap"
        rel="stylesheet"
      ></link>
    </Helmet>
  );
}
