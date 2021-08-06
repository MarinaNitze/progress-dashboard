import { PageProps } from 'gatsby';
import React from 'react';
import useDataStates from '../../hooks/useDataStates';
import { findGeoState } from '../../utils/util';

import Layout from '../../components/layout/Layout';

export default function State({ params }: PageProps) {
  const { statesData } = useDataStates();

  return (
    <Layout>
      <p data-cy="state-text">
        {findGeoState(statesData, params.state.toUpperCase())?.state}
      </p>
    </Layout>
  );
}
