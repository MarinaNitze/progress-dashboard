module.exports = {
  siteMetadata: {
    title: `Progress Dashboard`,
    description: `A dashboard for child welfare`,
    author: `@bloom-works`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: false,
        purgeOnly: [`src/css/style.css`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/img`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `XXXXXXXX`, // TODO
        head: false,
        anonymize: true,
        pageTransitionDelay: 0,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: `keyrG4HTxPrE0fKPo`, // may instead specify via env, see below
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: `appmONHlYvyKW37rj`,
            tableName: `Sheet1`,
            separateNodeType: false, // boolean, default is false, see the documentation on naming conflicts for more information
            separateMapType: false, // boolean, default is false, see the documentation on using markdown and attachments for more information
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
  ],
};
