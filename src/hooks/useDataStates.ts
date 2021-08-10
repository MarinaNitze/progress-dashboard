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
            name
          }
        }
      }
    }
  `);

  const mapStates = useCallback(
    (states: AirtableNodeData<GeoState>) => {
      return states.reduce<{ [key: string]: { name: string; abbrev: string } }>(
        (statesMap, { data }) => {
          return {
            ...statesMap,
            [data.code]: {
              name: data.name,
              abbrev: data.abbrev,
            },
          };
        },
        {},
      );
    },
    [statesData],
  );

  return { statesData: mapStates(statesData?.nodes ?? []) };
}
