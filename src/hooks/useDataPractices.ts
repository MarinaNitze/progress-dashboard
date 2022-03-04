import { useStaticQuery, graphql } from 'gatsby';
import { PracticesDataQuery } from '../../graphql-types';
import useDataStates from './useDataStates';
import { stateCode } from '../types/stateCode';

export type Practice =
  | 'No witnesses'
  | 'No fee'
  | 'No notary'
  | 'General inbox for receiving requests'
  | 'Accepts electronic requests';

export default function useDataPractices() {
  const { practicesData } = useStaticQuery<PracticesDataQuery>(graphql`
    query PracticesData {
      practicesData: allAirtable(filter: { table: { eq: "Practices" } }) {
        nodes {
          data {
            Name
            Topic
            AL
            AK
            AS
            AZ
            AR
            CA
            CO
            CT
            DE
            DC
            FL
            GA
            GU
            HI
            ID
            IL
            IN
            IA
            KS
            KY
            LA
            ME
            MD
            MA
            MI
            MN
            MS
            MO
            MT
            NE
            NV
            NH
            NJ
            NM
            NY
            NC
            ND
            OH
            OK
            OR
            PA
            PR
            RI
            SC
            SD
            TX
            UT
            VT
            VA
            WA
            WV
            WI
            WY
          }
        }
      }
    }
  `);

  const states = useDataStates();
  const boolValue = (topic: string, value: any) => {
    if (topic === 'Background Checks') {
      return value === 'Fully Implemented' ? true : false;
    }
    return false;
  };

  const mapPracticesByState = (
    practices: PracticesDataQuery['practicesData']['nodes'],
  ) => {
    let practicesByState = [];
    for (const key in states.statesData) {
      practicesByState.push({
        code: key,
        name: states.statesData[key].name,
        population: states.statesData[key].population,
        admin: states.statesData[key].admin,
        practices: practices.map(p => ({
          practiceName: p.data?.Name as Practice,
          topic: p.data?.Topic,
          value: p.data?.[key as stateCode],
          bool: boolValue(p.data?.Topic ?? '', p.data?.[key as stateCode]),
        })),
      });
    }
    return practicesByState;
  };

  const practicesByState = mapPracticesByState(practicesData?.nodes ?? []);

  return { practicesByState, rawPractices: practicesData };
}
