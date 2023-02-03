import { graphql, useStaticQuery } from 'gatsby';

export default function useDataCACounties() {
  useStaticQuery(graphql`
    query CACountiesData {
      CACountiesData: allAirtable(filter: { table: { eq: "CA Counties" } }) {
        nodes {
          data {
            name
            population
          }
        }
      }
    }
  `);
}
