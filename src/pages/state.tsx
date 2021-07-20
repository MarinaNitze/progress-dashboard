import React from 'react';
import useDataAW from '../hooks/useDataAW';

// This is a placeholder component route that will leverage hook into Airtable.
export default function State() {
  const { awData } = useDataAW();

  console.log(awData.nodes);

  return <></>;
}
