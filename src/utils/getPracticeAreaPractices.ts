import { PracticeAreaData } from '../hooks/useDataPractices';
import { PracticeArea } from '../types/compare';

export const getPracticeAreaPractices = (
  regionData: PracticeAreaData[],
  practiceArea: PracticeArea,
) =>
  // use the first data row as example to pull appropriate practice names
  // (e.g. practices that are relevant to the given practice area)
  regionData[0].practices
    .filter(practice => practice.topic === practiceArea)
    .map(practice => practice.practiceName);
