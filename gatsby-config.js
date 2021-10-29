require(`dotenv`).config({ path: `.env` });

module.exports = {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: `Progress Dashboard`,
    description: `A dashboard for child welfare`,
    author: `@bloom-works`,
  },
  plugins: [
    'gatsby-plugin-sass',
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
        apiKey: process.env.AIRTABLE_API_KEY, // may instead specify via env, see below
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `AW`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `States`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'progress-dashboard',
        protocol: 'http',
        hostname: 'progress-dashboard.s3-website-us-east-1.amazonaws.com',
      },
    },
    `gatsby-plugin-ts`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-anchor-links`,
  ],
};
