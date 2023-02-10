import React from 'react';
import useGatsbyImages from '../../hooks/useGatsbyImages';

const ImplementedIcon = () => {
  const implementedSvg =
    useGatsbyImages()['images/compare/implementedMedium.svg'].publicURL;
  return (
    <img className="implemented-icon" src={implementedSvg} alt="implemented" />
  );
};
const PartialIcon = () => {
  const partialSvg = useGatsbyImages()['images/compare/partial.svg'].publicURL;
  return (
    <img
      className="partial-icon"
      src={partialSvg}
      alt="partially implemented"
    />
  );
};

export default function CompareLegend() {
  return (
    <div className="implementation-legend">
      <div className="legend-area">
        <PartialIcon />
        <p>In progress</p>
      </div>
      <div className="legend-area">
        <ImplementedIcon />
        <p>Fully implemented</p>
      </div>
    </div>
  );
}

export { PartialIcon, ImplementedIcon };
