import Card from '../card/Card';
import ProgressChart from '../progress-chart/progressChart';
import React from 'react';
import { Link } from 'gatsby';
import { PRACTICE_AREA_PRACTICE_LINKS_MAP } from '../../utils/compare';
import { PracticeArea, Value } from '../../types/compare';
import { PracticeAreaData } from '../../hooks/useDataPractices';

type CompareCardProps = {
  data: PracticeAreaData;
  practiceArea: PracticeArea;
  forceHide: boolean | undefined;
};

const createCardContent = (
  data: PracticeAreaData,
  practiceArea: PracticeArea,
) => {
  const PRACTICE_LINK_MAP = PRACTICE_AREA_PRACTICE_LINKS_MAP[practiceArea];
  return (
    <div>
      <ul>
        {data.practices.map(p => (
          <li key={p.practiceName}>
            <div
              className={`icon 
              ${p.value === Value.full ? 'implemented' : ''} 
              ${p.value === Value.not ? 'not-implemented' : ''}
              ${p.value === Value.partial ? 'in-progress' : ''} 
              ${p.value === Value.na ? 'dont-know' : ''}
              `}
              title={
                p.value === Value.na
                  ? 'No data'
                  : p.value === Value.partial
                  ? 'In progress'
                  : p.value
              }
            ></div>
            {PRACTICE_LINK_MAP[p.practiceName] ? (
              <Link
                to={PRACTICE_LINK_MAP[p.practiceName] as string}
                key={p.practiceName}
              >
                {p.practiceName}
              </Link>
            ) : (
              <span>{p.practiceName}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function CompareCard({
  data,
  practiceArea,
  forceHide,
}: CompareCardProps) {
  const practicesCountTotal = data.practices.length;
  const practicesCounts = data.practices.reduce(
    (counts, practice) => {
      if (practice.value === Value.full) counts[Value.full] += 1;
      if (practice.value === Value.na) counts[Value.na] += 1;
      if (practice.value === Value.partial) counts[Value.partial] += 1;

      return counts;
    },
    { [Value.full]: 0, [Value.na]: 0, [Value.partial]: 0 },
  );

  return (
    <Card
      key={data.code}
      title={data.name}
      content={createCardContent(data, practiceArea)}
      placeholderHiddenContent={<></>}
      layout="compare"
      className="compare-width"
      image={
        <ProgressChart
          numberOfSegments={practicesCountTotal}
          implementedCount={practicesCounts[Value.full]}
          inProgressCount={practicesCounts[Value.partial]}
          dontKnowCount={practicesCounts[Value.na]}
        />
      }
      imgAlt={`${practicesCounts[Value.full]} out of ${practicesCountTotal}`}
      forceHide={forceHide}
      defaultHidden={true}
      showText="Show recommendations"
      hideText="Hide recommendations"
    />
  );
}
