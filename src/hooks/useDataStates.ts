import { graphql, useStaticQuery } from 'gatsby';
import { StatesDataQuery } from '../../graphql-types';

export default function useDataStates() {
  const { statesData } = useStaticQuery<StatesDataQuery>(graphql`
    query StatesData {
      statesData: allAirtable(filter: { table: { eq: "States" } }) {
        nodes {
          data {
            abbrev
            code
            name
            population
            admin
          }
        }
      }
    }
  `);

  const mapStates = (states: StatesDataQuery['statesData']['nodes']) => {
    return states.reduce<{
      [key: string]: {
        name: string;
        abbrev: string;
        population: string | number;
        admin: string;
      };
    }>((statesMap, { data }) => {
      return {
        ...statesMap,
        [data?.code ?? 'missing code']: {
          name: data?.name ?? '',
          abbrev: data?.abbrev ?? '',
          population: data?.population ?? '',
          admin: data?.admin ?? '',
        },
      };
    }, {});
  };

  return { statesData: mapStates(statesData?.nodes ?? []) };
}
