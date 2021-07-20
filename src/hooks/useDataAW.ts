import { useStaticQuery, graphql } from 'gatsby';
import { AirtableData } from '../types/airtable/airtableData';
import { RowAW } from '../types/airtable/rowAW';

export default function useDataAW() {
  const { awData } = useStaticQuery<AirtableData<RowAW>>(graphql`
    query {
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
