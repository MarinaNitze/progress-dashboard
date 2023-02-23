import Card from '../card/Card';
import ProgressChart from '../progress-chart/progressChart';
import React from 'react';
import { ImplementedIcon, PartialIcon } from './CompareLegend';
import { Link } from 'gatsby';
import { PRACTICE_AREA_PRACTICE_LINKS_MAP } from '../../utils/compare';
import { PracticeArea, Value } from '../../types/compare';
import { PracticeAreaData } from '../../hooks/useDataPractices';

type CompareCardProps = {
  data: PracticeAreaData;
  practiceArea: PracticeArea;
  forceHide: boolean | undefined;
};

const createCardSummaryContent = (data: PracticeAreaData) => {
  const fullyImplementedCount = data.practices.filter(
    p => p.value === Value.full,
  ).length;
  const partiallyImplementedCount = data.practices.filter(
    p => p.value === Value.partial,
  ).length;

  return (
    <div className="centered">
      {!!fullyImplementedCount ? <ImplementedIcon /> : <PartialIcon />}
      {` ${fullyImplementedCount + partiallyImplementedCount} of ${
        data.practices.length
      } implemented or in progress`}
    </div>
  );
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
          <li
            key={p.practiceName}
            className={
              p.value === Value.full || p.value === Value.partial
                ? 'implemented'
                : 'not-implemented'
            }
          >
            {p.value === Value.full ? (
              <ImplementedIcon />
            ) : p.value === Value.partial ? (
              <PartialIcon />
            ) : (
              ''
            )}
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
  const practicesCountImplemented = data.practices.filter(
    p => p.value === Value.full,
  ).length;

  return (
    <Card
      key={data.code}
      title={data.name}
      content={createCardContent(data, practiceArea)}
      placeholderHiddenContent={createCardSummaryContent(data)}
      layout="compare"
      className="compare-width"
      image={
        <ProgressChart
          numberOfSegments={practicesCountTotal}
          implementedCount={practicesCountImplemented}
        />
      }
      imgAlt={`${practicesCountImplemented} out of ${practicesCountTotal}`}
      forceHide={forceHide}
      defaultHidden={true}
      showText="Show recommendations"
      hideText="Hide recommendations"
    />
  );
}
