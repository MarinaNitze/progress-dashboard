import { useStaticQuery, graphql } from 'gatsby';
import { useCallback } from 'react';
import { AirtableData, AirtableNodeData } from '../types/airtable/airtableData';
import { GeoState } from '../types/airtable/geoState';

export default function useDataStates() {
  const { statesData } = useStaticQuery<AirtableData<GeoState>>(graphql`
    query {
      statesData: allAirtable(filter: { table: { eq: "States" } }) {
        nodes {
          data {
            abbrev
            code
            state
          }
        }
      }
    }
  `);

  const flattenStates = useCallback(
    (states: AirtableNodeData<GeoState>) => {
      return states.map<GeoState>(({ data }) => ({ ...data }));
    },
    [statesData],
  );

  return { statesData: flattenStates(statesData?.nodes ?? []) };
}
