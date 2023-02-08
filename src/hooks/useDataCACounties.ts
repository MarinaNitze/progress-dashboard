import { graphql, useStaticQuery } from 'gatsby';
import { CaCountiesDataQuery } from '../../graphql-types';

export default function useDataCACounties() {
  const { CACountiesData } = useStaticQuery<CaCountiesDataQuery>(graphql`
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

  const mapCounties = (
    states: CaCountiesDataQuery['CACountiesData']['nodes'],
  ) => {
    return states.reduce<{
      [key: string]: {
        name: string;
        population: string | number;
      };
    }>((statesMap, { data }) => {
      return {
        ...statesMap,
        [data?.name?.replaceAll(' ', '_') ?? 'missing_name']: {
          name: data?.name ?? '',
          population: data?.population ?? '',
        },
      };
    }, {});
  };

  return { caCountiesData: mapCounties(CACountiesData?.nodes ?? []) };
}
