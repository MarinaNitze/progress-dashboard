import { PageProps } from 'gatsby';
import React from 'react';
import useDataStates from '../../hooks/useDataStates';
import { findGeoState } from '../../utils/util';

import Layout from '../../components/layout/Layout';

export default function State({ params: { state = '' } }: PageProps) {
  const { statesData } = useDataStates();

  return (
    <Layout>
      <p data-cy="state-text">
        {findGeoState(statesData, state.toUpperCase())?.name}
      </p>
    </Layout>
  );
}
