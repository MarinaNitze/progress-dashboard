import React, { useState } from 'react';
import { PageProps } from 'gatsby';
import { Grid, GridContainer } from '@trussworks/react-uswds';

import Layout from '../../../../components/layout/Layout';
import Hero from '../../../../components/hero/Hero';
import Breadcrumbs from '../../../../components/breadcrumbs/Breadcrumbs';
import CompareLegend from '../../../../components/compare/CompareLegend';
import CompareHideCardToggles from '../../../../components/compare/CompareHideCardToggles';

import '../../compare.scss';

export default function CompareCountiesPracticeArea({
  params: { state, practiceArea },
}: PageProps) {
  // Default state: undefined.
  // When bool = true, force hide all
  // when bool = false, force show all
  const [hideAll, setHideAll] = useState<boolean | undefined>(undefined);

  return (
    <Layout>
      <section id="hero-section">
        <Hero
          className="cwp-topic-hero"
          backgroundColor="dark"
          title={practiceArea}
        />
      </section>
      <Breadcrumbs crumbLabel="Compare" />
      <main className="cwp-main home compare">
        <GridContainer>
          <section>
            <Grid>
              <p>MAIN CONTENT HERE! (Same as other content?)</p>
              <h2 className="features-title">Comparison of {state} Counties</h2>
            </Grid>
          </section>
          <section className="compare-section">
            <Grid>
              <Grid className="row">
                <CompareLegend />
                <CompareHideCardToggles
                  hideAll={hideAll}
                  setHideAll={setHideAll}
                />
              </Grid>
            </Grid>
          </section>
        </GridContainer>
      </main>
    </Layout>
  );
}
