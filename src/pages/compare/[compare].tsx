import React, { useState, useEffect } from 'react';
import { Link, PageProps } from 'gatsby';
import {
  Grid,
  GridContainer,
  Form,
  Fieldset,
  Label,
  CardGroup,
} from '@trussworks/react-uswds';
import { Option } from 'react-select';

import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import Card from '../../components/card/Card';
import Hero from '../../components/hero/Hero';
import Layout from '../../components/layout/Layout';
import Select from '../../components/select/Select';

import { PracticeName, Topic, Value } from '../../types/compare';
import useDataPractices from '../../hooks/useDataPractices';
import useGatsbyImages from '../../hooks/useGatsbyImages';
import {
  COMPARE_TOPIC_CONTENT_MAP,
  COMPARE_TOPIC_FULL_TITLE_MAP,
  COMPARE_TOPIC_PRACTICE_LINKS_MAP,
} from '../../utils/compare';

import './compare.scss';
import ProgressChart from '../../components/progress-chart/progressChart';

export default function Compare({ params: { compare } }: PageProps) {
  // Create a typed version of the url "compare" param
  // (because dealing with re-typing existing Gatsby PageProps is no,
  // but some amount of type-safety with all the stuff going on here is nice)
  const compareTopic = compare as Topic;
  const compareTopicTitle =
    COMPARE_TOPIC_FULL_TITLE_MAP[compareTopic] || compareTopic;
  const practiceLinkMap = COMPARE_TOPIC_PRACTICE_LINKS_MAP[compareTopic];
  const mainContent = COMPARE_TOPIC_CONTENT_MAP[compareTopic];

  const practicesByState = useDataPractices().practicesByState;
  // Create a list of which practices apply to the current compare topic
  const topicPractices = practicesByState[0].practices
    .filter(practice => practice.topic === compareTopic)
    .map(practice => practice.practiceName);

  // Create a processed list of practice data by state,
  // which only includes the practices for the current compare topic
  // and is sorted alphabetically by state name
  const practiceDataByState = practicesByState
    .reduce<typeof practicesByState>((acc, state) => {
      const filteredPractices = state.practices.filter(
        practice => practice.topic === compare,
      );
      return [...acc, Object.assign(state, { practices: filteredPractices })];
    }, [])
    .sort((a, b) => {
      const textA = a.name;
      const textB = b.name;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  const [adminFilter, setAdminFilter] = useState<typeof Option>({
    value: '',
    label: 'Either',
  });
  const [popFilter, setPopFilter] = useState<typeof Option>({
    value: '',
    label: 'Any',
  });
  const [recFilter, setRecFilter] = useState<readonly any[]>(['']);
  const [filteredPractices, setFilteredPractices] =
    useState(practiceDataByState);

  useEffect(() => {
    const filterByPop = (state: typeof practiceDataByState[0]) => {
      const pop =
        typeof state.population === 'string'
          ? parseInt(state.population)
          : state.population;
      if (popFilter.value === '0') {
        return pop < 2500000;
      } else if (popFilter.value === '2500000') {
        return pop >= 2500000 && pop < 7500000;
      } else {
        return pop >= 7500000;
      }
    };

    const filterByRec = (state: typeof practiceDataByState[0]) => {
      const practiceArr = state.practices
        .filter(p => p.value === Value.partial || p.value === Value.full)
        .map(p => p.practiceName);
      return recFilter?.every(
        filter =>
          filter.value === '' ||
          filter === '' ||
          practiceArr.includes(filter.value),
      );
    };

    const filteredPracticesWithUpdatedFilters = practiceDataByState
      .sort((a, b) => {
        const textA = a.name;
        const textB = b.name;
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
      .filter(state => {
        const aFilter =
          adminFilter === undefined ||
          adminFilter.value === '' ||
          adminFilter.value.includes(state.admin);
        const pFilter =
          popFilter === undefined ||
          popFilter.value === '' ||
          filterByPop(state);
        const rFilter =
          recFilter === undefined ||
          recFilter?.length === 0 ||
          filterByRec(state);

        return aFilter && pFilter && rFilter;
      });

    setFilteredPractices(filteredPracticesWithUpdatedFilters);
  }, [adminFilter, popFilter, recFilter]);

  const handleAdminFilter = (option: typeof Option) => {
    setAdminFilter(option);
  };
  const handlePopFilter = (option: typeof Option) => {
    setPopFilter(option);
  };
  const handleRecFilter = (option: readonly any[]) => {
    setRecFilter(option);
  };
  const adminOptions = [
    { value: '', label: 'Either' },
    { value: 'County', label: 'County' },
    { value: 'State', label: 'State' },
  ];
  const popOptions = [
    { value: '', label: 'Any' },
    { value: '0', label: 'Less than 2.5 Million' },
    { value: '2500000', label: '2.5 Million - 7.5 Million' },
    { value: '7500000', label: 'Greater than 7.5 Million' },
  ];

  const recOptions: {
    value: PracticeName;
    label: string;
  }[] = topicPractices.map(practice => ({ value: practice, label: practice }));

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
  const createCardContent = (stateData: typeof practiceDataByState[0]) => {
    return (
      <div>
        <ul>
          {stateData.practices.map((p, i) => (
            <li
              key={`${p.practiceName}-${i}`}
              className={
                p.value === Value.full || p.value === Value.partial
                  ? 'implemented'
                  : 'not-implemented'
              }
            >
              {p.value === Value.full
                ? implementedIcon
                : p.value === Value.partial
                ? partialIcon
                : ''}{' '}
              {practiceLinkMap[p.practiceName] ? (
                <Link
                  to={practiceLinkMap[p.practiceName] || ''}
                  key={`${p.practiceName}-${i}-link`}
                >
                  {p.practiceName}
                </Link>
              ) : (
                p.practiceName
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const createCardPlaceholderContent = (
    stateData: typeof practiceDataByState[0],
  ) => {
    const fullyImplementedCount = stateData.practices.filter(
      p => p.value === Value.full,
    ).length;
    const partiallyImplementedCount = stateData.practices.filter(
      p => p.value === Value.partial,
    ).length;

    return (
      <div className="centered">
        {!!fullyImplementedCount ? implementedIcon : partialIcon}
        {` ${fullyImplementedCount + partiallyImplementedCount} of ${
          topicPractices.length
        } implemented or in progress`}
      </div>
    );
  };

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
          title={compareTopicTitle}
        />
      </section>
      <Breadcrumbs crumbLabel="Compare" />
      <main className="cwp-main home compare">
        <GridContainer>
          <section className="intro-section">
            <Grid>
              {mainContent}
              <p>
                Our goal is for every child welfare system to adopt these{' '}
                {topicPractices.length} promising practices for{' '}
                {compareTopicTitle}:{' '}
                {topicPractices.map((practice, idx) => (
                  <React.Fragment key={practice}>
                    {idx === topicPractices.length - 1 ? 'and ' : ''}
                    {practiceLinkMap[practice] ? (
                      <Link to={practiceLinkMap[practice] || ''}>
                        {practice.toLowerCase()}
                      </Link>
                    ) : (
                      practice.toLowerCase()
                    )}
                    {idx < topicPractices.length - 1 ? ', ' : '.'}
                  </React.Fragment>
                ))}
              </p>
              <p>
                Want to report an update or error? Please email
                updates@childwelfareplaybook.com
              </p>
              <h2 className="features-title">State by State Comparison</h2>
            </Grid>
          </section>
          <section className="filter-section">
            <Form
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <Fieldset>
                <div className="select single">
                  <Label htmlFor="admin">Administration</Label>
                  <Select
                    isMulti={false}
                    id="admin"
                    name="admin"
                    selectOptions={adminOptions}
                    value={adminFilter}
                    handleChange={handleAdminFilter}
                  />
                </div>
              </Fieldset>
              <Fieldset>
                <div className="select single">
                  <Label htmlFor="pop">Population</Label>
                  <Select
                    isMulti={false}
                    id="pop"
                    name="pop"
                    selectOptions={popOptions}
                    value={popFilter}
                    handleChange={handlePopFilter}
                  />
                </div>
              </Fieldset>
              <Fieldset>
                <div className="select multi">
                  <Label htmlFor="rec">Recommendations</Label>
                  <Select
                    isMulti={true}
                    id="rec"
                    name="rec"
                    selectOptions={recOptions}
                    value={recFilter}
                    handleChange={handleRecFilter}
                  />
                </div>
              </Fieldset>
            </Form>
          </section>
          <section className="compare-section">
            <Grid>
              <section className="row">
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
                <div className="flex-start mobile-col">
                  <p className="show-hide-title">Implemented Recommendations</p>
                  <div className="flex-start">
                    <button
                      className={`${hideAll === false ? 'active' : ''}`}
                      onClick={() => setHideAll(false)}
                    >
                      Show all
                    </button>
                    <hr />
                    <button
                      className={`${hideAll === true ? 'active' : ''}`}
                      onClick={() => setHideAll(true)}
                    >
                      Hide all
                    </button>
                  </div>
                </div>
              </section>
              <CardGroup>
                {filteredPractices.map((fp, i) => (
                  <Card
                    key={`${fp.code}-${i}`}
                    title={fp.name}
                    content={createCardContent(fp)}
                    placeholderHiddenContent={createCardPlaceholderContent(fp)}
                    layout="compare"
                    className="compare-width"
                    image={
                      <ProgressChart
                        numberOfSegments={fp.practices.length}
                        implementedCount={
                          fp.practices.filter(
                            p => p.value === 'Fully Implemented',
                          ).length
                        }
                      />
                    }
                    imgAlt={`${
                      fp.practices.filter(p => p.value === 'Fully Implemented')
                        .length
                    } out of ${topicPractices.length}`}
                    forceHide={hideAll}
                    defaultHidden={true}
                    showText={<>Show recommendations</>}
                    hideText={<>Hide recommendations</>}
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
