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
import useGatsbyImages from '../../hooks/useGatsbyImages';
import Select from '../../components/select/Select';
import { Option } from 'react-select';

import Layout from '../../components/layout/Layout';
import Hero from '../../components/hero/Hero';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import Card from '../../components/card/Card';

import useDataPractices, { Practice } from '../../hooks/useDataPractices';

import '../home.scss';

const PRACTICE_LINK_MAP: Record<Practice, string> = {
  'No witnesses': '/topic/out-of-state-background-checks#what-we-can-do',
  'No fee': '/topic/out-of-state-background-checks#what-we-can-do',
  'No notary': '/topic/out-of-state-background-checks#what-we-can-do',
  'General inbox for receiving requests':
    '/topic/out-of-state-background-checks#what-we-can-do',
  'Accepts electronic requests': '/recommendation/electronic-background-check',
};

export default function Compare({ params: { compare } }: PageProps) {
  const implementedSvg =
    useGatsbyImages()['images/compare/implementedMedium.svg'].publicURL;
  const implementedIcon = (
    <img className="implemented-icon" src={implementedSvg} alt="implemented" />
  );

  const arrowSvg = useGatsbyImages()['images/compare/up-arrow.svg'].publicURL;
  const arrowDownIcon = (
    <img className="arrow-icon" src={arrowSvg} alt="arrow" />
  );
  const arrowUpIcon = (
    <img className="arrow-icon rotate-180" src={arrowSvg} alt="arrow" />
  );

  const practicesByState = useDataPractices().practicesByState;
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
        .filter(p => p.bool)
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

  const recOptions: { value: Practice; label: string }[] = [
    { value: 'No witnesses', label: 'No witnesses' },
    { value: 'No fee', label: 'No fee' },
    { value: 'No notary', label: 'No notary' },
    {
      value: 'General inbox for receiving requests',
      label: 'General inbox for receiving requests',
    },
    {
      value: 'Accepts electronic requests',
      label: 'Accepts electronic requests',
    },
  ];

  const createCardContent = (stateData: typeof practiceDataByState[0]) => {
    return (
      <div>
        <ul>
          {stateData.practices.map(p => (
            <li
              key={p.practiceName}
              className={p.bool ? 'implemented' : 'not-implemented'}
            >
              {p.bool ? implementedIcon : ''}{' '}
              <Link to={PRACTICE_LINK_MAP[p.practiceName]}>
                {p.practiceName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const createCardPlaceholderContent = (
    stateData: typeof practiceDataByState[0],
  ) => {
    const implementedPracticesCount = stateData.practices.filter(
      p => p.bool,
    ).length;
    return (
      <div className="centered">
        {!!implementedPracticesCount ? implementedIcon : ''}
        {` ${implementedPracticesCount} of 5 implemented`}
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
          title={compare}
        />
      </section>
      <Breadcrumbs crumbLabel="Compare" />
      <main className="cwp-main home">
        <GridContainer>
          <section className="intro-section">
            <Grid>
              <p>
                View and compare which states and territories in the U.S. have
                implemented our recommendations for Out of State Background
                (Adam Walsh) Checks:{' '}
                <Link to={PRACTICE_LINK_MAP['No witnesses']}>no witnesses</Link>
                , <Link to={PRACTICE_LINK_MAP['No fee']}>no fee</Link>,{' '}
                <Link to={PRACTICE_LINK_MAP['No notary']}>no notary</Link>,{' '}
                <Link
                  to={PRACTICE_LINK_MAP['General inbox for receiving requests']}
                >
                  general inboxes for receiving requests
                </Link>
                ,{' '}
                <Link to={PRACTICE_LINK_MAP['Accepts electronic requests']}>
                  and accept electronic requests
                </Link>
                .
              </p>
              <h2 className="features-title">State by State Compare</h2>
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
              <div className="row">
                <p className="total">
                  {filteredPractices.length} total results
                </p>
                <div className="column">
                  <button onClick={() => setHideAll(true)}>
                    Hide all recommendations {arrowUpIcon}
                  </button>
                  <button onClick={() => setHideAll(false)}>
                    Show all recommendations {arrowDownIcon}
                  </button>
                </div>
              </div>
              <CardGroup>
                {filteredPractices.map(fp => (
                  <Card
                    key={fp.code}
                    title={fp.name}
                    content={createCardContent(fp)}
                    placeholderHiddenContent={createCardPlaceholderContent(fp)}
                    layout="compare"
                    className="compare-width"
                    image={`/src/images/compare/${
                      fp.practices.filter(p => p.bool).length
                    }Of5.svg`}
                    imgAlt={`${
                      fp.practices.filter(p => p.bool).length
                    } out of 5`}
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
