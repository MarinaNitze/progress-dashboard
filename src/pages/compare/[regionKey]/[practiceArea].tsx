import AdministrationFilter from '../../../components/compare/filters/Administration';
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import CompareCard from '../../../components/compare/CompareCard';
import CompareHideCardToggles from '../../../components/compare/CompareHideCardToggles';
import CompareLegend from '../../../components/compare/CompareLegend';
import Hero from '../../../components/hero/Hero';
import Layout from '../../../components/layout/Layout';
import PopulationSizeFilter from '../../../components/compare/filters/PopulationSize';
import React, { useState } from 'react';
import RecommendationFilter from '../../../components/compare/filters/Recommendation';
import useDataPractices from '../../../hooks/useDataPractices';
import { CardGroup, Form, Grid, GridContainer } from '@trussworks/react-uswds';
import { getPractices } from '../../../utils/getPractices';
import { getSortedPracticeAreaData } from '../../../utils/getSortedPracticeAreaData';
import { Link } from 'gatsby';
import { PracticeArea } from '../../../types/compare';
import { RegionType } from '../../../types/regionType';
import '../compare.scss';

import {
  PRACTICE_AREA_CONTENT_MAP,
  COMPARE_DASHBOARD_FULL_TITLE_MAP,
  PRACTICE_AREA_PRACTICE_LINKS_MAP,
} from '../../../utils/compare';

export default function CompareCountiesPracticeArea({
  params: { regionKey, practiceArea },
}: {
  params: { regionKey: RegionType; practiceArea: PracticeArea };
}) {
  const data = useDataPractices().practicesByRegion;
  // Grab data for given region (states or CA counties) from path param
  const regionData = regionKey === 'states' ? data.state : data.county['CA'];

  // Sort data and filters practices to include only values for
  // practices linked to the given practice area from path param
  const PRACTICE_AREA_DATA = getSortedPracticeAreaData(
    regionData,
    practiceArea,
  );
  // List of practices for this practice area (derived from data)
  const PRACTICES = getPractices(PRACTICE_AREA_DATA);
  // Map of links to topic pages for each of the practices for given practice are
  const PRACTICE_LINKS = PRACTICE_AREA_PRACTICE_LINKS_MAP[practiceArea];

  // Filtered data (admin, population, recommendation filters)
  const [filteredData, setFilteredData] = useState(PRACTICE_AREA_DATA);

  // Flag to hide/show (expand/collapse) card content for all cards
  // ( Default state: undefined.
  //   When bool = true, force hide all
  //   When bool = false, force show all )
  const [hideAll, setHideAll] = useState<boolean | undefined>(undefined);

  return (
    <Layout>
      <section id="hero-section">
        <Hero
          className="cwp-topic-hero"
          backgroundColor="dark"
          title={COMPARE_DASHBOARD_FULL_TITLE_MAP[practiceArea] || practiceArea}
        />
      </section>
      <Breadcrumbs crumbLabel="Compare" />
      <main className="cwp-main home compare">
        <GridContainer>
          <section>
            <Grid>
              {PRACTICE_AREA_CONTENT_MAP[practiceArea]}
              <p>
                Our goal is for every child welfare system to adopt these{' '}
                {PRACTICES.length} promising practices for {practiceArea}:{' '}
                {PRACTICES.map((practice, idx) => (
                  <React.Fragment key={practice}>
                    {idx === PRACTICES.length - 1 ? 'and ' : ''}
                    {PRACTICE_LINKS[practice] ? (
                      <Link to={PRACTICE_LINKS[practice] || ''}>
                        {practice.toLowerCase()}
                      </Link>
                    ) : (
                      practice.toLowerCase()
                    )}
                    {idx < PRACTICES.length - 1 ? ', ' : '.'}
                  </React.Fragment>
                ))}
              </p>
              <p>
                Want to report an update or error? Please email
                updates@childwelfareplaybook.com
              </p>
              <h2 className="features-title">
                {regionKey === 'states'
                  ? 'State by State Comparison'
                  : `Comparison of California Counties`}
              </h2>
            </Grid>
          </section>
          <section className="filter-section">
            <Form onSubmit={e => e.preventDefault()}>
              {regionKey === 'states' && (
                <AdministrationFilter
                  applyFilter={filterFunc =>
                    setFilteredData(PRACTICE_AREA_DATA.filter(filterFunc))
                  }
                />
              )}
              <PopulationSizeFilter
                regionType={regionKey}
                applyFilter={filterFunc => {
                  setFilteredData(PRACTICE_AREA_DATA.filter(filterFunc));
                }}
              />
              <RecommendationFilter
                topicPractices={PRACTICES}
                applyFilter={filterFunc => {
                  setFilteredData(PRACTICE_AREA_DATA.filter(filterFunc));
                }}
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
              {regionKey === 'CA' && (
                <p className="coming-soon">Data coming soon!</p>
              )}
              <CardGroup>
                {filteredData.map(d => (
                  <CompareCard
                    data={d}
                    practiceArea={practiceArea}
                    forceHide={hideAll}
                  />
                ))}
              </CardGroup>
            </Grid>
          </section>
        </GridContainer>
      </main>
    </Layout>
  );
}
