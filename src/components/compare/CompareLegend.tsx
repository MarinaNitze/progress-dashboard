import React from 'react';
import useGatsbyImages from '../../hooks/useGatsbyImages';

export default function CompareLegend() {
  const implementedSvg =
    useGatsbyImages()['images/compare/implementedMedium.svg'].publicURL;
  const partialSvg = useGatsbyImages()['images/compare/partial.svg'].publicURL;
  const implementedIcon = (
    <img className="implemented-icon" src={implementedSvg} alt="implemented" />
  );
  const partialIcon = (
    <img
      className="partial-icon"
      src={partialSvg}
      alt="partially implemented"
    />
  );
  return (
    <div className="implementation-legend">
      <div className="legend-area">
        {partialIcon}
        <p>In progress</p>
      </div>
      <div className="legend-area">
        {implementedIcon}
        <p>Fully implemented</p>
      </div>
    </div>
  );
}
