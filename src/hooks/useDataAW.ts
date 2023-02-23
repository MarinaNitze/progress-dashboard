import { AwDataQuery } from '../../graphql-types';
import { graphql, useStaticQuery } from 'gatsby';

export default function useDataAW() {
  const { awData } = useStaticQuery<AwDataQuery>(graphql`
    query awData {
      awData: allAirtable(filter: { table: { eq: "AW" } }) {
        nodes {
          data {
            contact_type
            electronic_form
            email
            fax
            fee
            ink
            mail
            notary
            notes
            original_copy
            response
            response_time
            state
            typed_or_printed
            witness
          }
        }
      }
    }
  `);

  return { awData };
}
