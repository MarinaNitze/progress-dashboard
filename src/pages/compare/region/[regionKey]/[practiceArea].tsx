import React, { useState } from 'react';
import { PageProps } from 'gatsby';
import { CardGroup, Form, Grid, GridContainer } from '@trussworks/react-uswds';

import Layout from '../../../../components/layout/Layout';
import Hero from '../../../../components/hero/Hero';
import Breadcrumbs from '../../../../components/breadcrumbs/Breadcrumbs';
import CompareLegend from '../../../../components/compare/CompareLegend';
import CompareHideCardToggles from '../../../../components/compare/CompareHideCardToggles';

import '../../compare.scss';
import { RegionType } from '../../../../types/regionType';
import useDataPractices from '../../../../hooks/useDataPractices';
import { getSortedFilteredPracticeData } from '../../../../utils/getSortedFilteredPracticeData';
import { PracticeArea } from '../../../../types/compare';
import AdministrationFilter from '../../../../components/compare/filters/Administration';
import PopulationSizeFilter from '../../../../components/compare/filters/PopulationSize';
import RecommendationFilter from '../../../../components/compare/filters/Recommendation';
import { getPracticeAreaPractices } from '../../../../utils/getPracticeAreaPractices';

export default function CompareCountiesPracticeArea({
  params: { regionKey, practiceArea },
}: PageProps) {
  let key = regionKey as RegionType;
  const data = useDataPractices().practicesByRegion;
  const regionData = key === 'states' ? data.state : data.county[key];

  const regionName = key === 'states' ? '' : regionData[0].name;

  const [filteredData, setFilteredData] = useState(
    getSortedFilteredPracticeData(regionData, practiceArea as PracticeArea),
  );

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
              <h2 className="features-title">
                {key === 'states'
                  ? 'State by State Comparison'
                  : `Comparison of Counties in ${regionName}`}
              </h2>
            </Grid>
          </section>
          <section>
            <Form onSubmit={e => e.preventDefault()}>
              {key === 'states' && (
                <AdministrationFilter setFilteredData={setFilteredData} />
              )}
              <PopulationSizeFilter
                regionType={key}
                setFilteredData={setFilteredData}
              />
              <RecommendationFilter
                topicPractices={getPracticeAreaPractices(
                  regionData,
                  practiceArea as PracticeArea,
                )}
                setFilteredData={setFilteredData}
              />
            </Form>
          </section>
          <section className="compare-section">
            <Grid>
              <div className="row">
                <CompareLegend />
                <CompareHideCardToggles
                  hideAll={hideAll}
                  setHideAll={setHideAll}
                />
              </div>
              <CardGroup>{filteredData.map(d => d.name)}</CardGroup>
            </Grid>
          </section>
        </GridContainer>
      </main>
    </Layout>
  );
}
