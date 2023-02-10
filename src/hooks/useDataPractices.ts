import { useStaticQuery, graphql } from 'gatsby';
import { PracticesDataQuery } from '../../graphql-types';
import useDataStates from './useDataStates';
import { stateCode } from '../types/stateCode';
import { PracticeName, PracticeArea } from '../types/compare';
import useDataCACounties from './useDataCACounties';
import { caCountyCode } from '../types/caCountyCode';

export type PracticeAreaData = {
  code: string;
  name: string;
  population: number;
  admin: string;
  practices: {
    practiceName: PracticeName;
    topic: PracticeArea;
    value: string;
  }[];
};

export default function useDataPractices() {
  const { practicesData } = useStaticQuery<PracticesDataQuery>(graphql`
    query PracticesData {
      practicesData: allAirtable(filter: { table: { regex: "/^Practices/" } }) {
        nodes {
          table
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
            Alameda
            Alpine
            Amador
            Butte
            Calaveras
            Colusa
            Contra_Costa
            Del_Norte
            El_Dorado
            Fresno
            Glenn
            Humboldt
            Imperial
            Inyo
            Kern
            Kings
            Lake
            Lassen
            Los_Angeles
            Madera
            Marin
            Mariposa
            Mendocino
            Merced
            Modoc
            Mono
            Monterey
            Napa
            Nevada
            Orange
            Placer
            Plumas
            Riverside
            Sacramento
            San_Benito
            San_Bernardino
            San_Diego
            San_Francisco
            San_Joaquin
            San_Luis_Obispo
            San_Mateo
            Santa_Barbara
            Santa_Clara
            Santa_Cruz
            Shasta
            Sierra
            Siskiyou
            Solano
            Sonoma
            Stanislaus
            Sutter
            Tehama
            Trinity
            Tulare
            Tuolumne
            Ventura
            Yolo
            Yuba
          }
        }
      }
    }
  `);

  const states = useDataStates();
  const caCounties = useDataCACounties();

  const mapPracticesByRegion = (
    practices: PracticesDataQuery['practicesData']['nodes'],
  ) => {
    let practicesByState: PracticeAreaData[] = [];
    for (const key in states.statesData) {
      practicesByState.push({
        code: key,
        name: states.statesData[key].name,
        population:
          parseInt(states.statesData[key].population as string) ??
          states.statesData[key].population,
        admin: states.statesData[key].admin,
        practices: practices
          .filter(p => p.table === 'Practices')
          .map(p => ({
            practiceName: p.data?.Name as PracticeName,
            topic: p.data?.Topic as PracticeArea,
            value: p.data?.[key as stateCode] ?? '',
          })),
      });
    }

    let practicesByCACounty: PracticeAreaData[] = [];
    for (const key in caCounties.caCountiesData) {
      practicesByCACounty.push({
        code: key,
        name: caCounties.caCountiesData[key].name,
        population:
          parseInt(caCounties.caCountiesData[key].population as string) ??
          caCounties.caCountiesData[key].population,
        admin: '', // for inferred type consistency
        practices: practices
          .filter(p => p.table === 'Practices - CA Counties')
          .map(p => ({
            practiceName: p.data?.Name as PracticeName,
            topic: p.data?.Topic as PracticeArea,
            value: p.data?.[key as caCountyCode] ?? '',
          })),
      });
    }

    return { state: practicesByState, county: { CA: practicesByCACounty } };
  };

  const practicesByRegion = mapPracticesByRegion(practicesData?.nodes ?? []);
  return { practicesByRegion };
}
