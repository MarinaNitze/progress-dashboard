import { PracticeAreaData } from '../hooks/useDataPractices';
import { PracticeArea } from '../types/compare';

export const getSortedFilteredPracticeData = (
  regionData: PracticeAreaData[],
  practiceArea: PracticeArea,
) =>
  regionData
    .reduce<PracticeAreaData[]>((acc, data) => {
      const filteredPractices = data.practices.filter(
        practice => practice.topic === practiceArea,
      );
      return [...acc, { ...data, practices: filteredPractices }];
    }, [])
    .sort((a, b) => {
      const textA = a.name;
      const textB = b.name;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
