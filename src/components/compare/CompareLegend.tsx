import React from 'react';

export default function CompareLegend() {
  return (
    <div className="implementation-legend">
      <div className="legend-area">
        <div className="icon implemented"></div>
        <p>Fully implemented</p>
      </div>
      <div className="legend-area">
        <div className="icon in-progress"></div>
        <p>In progress</p>
      </div>
      <div className="legend-area">
        <div className="icon not-implemented"></div>
        <p>Not implemented</p>
      </div>
      <div className="legend-area">
        <div className="icon dont-know"></div>
        <p>No data</p>
      </div>
    </div>
  );
}
