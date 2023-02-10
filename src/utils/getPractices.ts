import { PracticeAreaData } from '../hooks/useDataPractices';

export const getPractices = (regionData: PracticeAreaData[]) =>
  // use the first data row as example to pull appropriate practice names
  // (e.g. practices that are relevant to the given practice area)
  regionData[0].practices.map(practice => practice.practiceName);
