import { PageProps, navigate } from 'gatsby';
import React from 'react';
import useDataStates from '../../hooks/useDataStates';

import Layout from '../../components/layout/Layout';

export default function State({ params: { state = 'dc' } }: PageProps) {
  const { statesData } = useDataStates();

  const stateData = statesData[state.toLocaleUpperCase()];
  if (!stateData) {
    navigate('/404');
    return null;
  }

  return (
    <Layout>
      <p data-cy="state-text">{stateData.name}</p>
    </Layout>
  );
}
