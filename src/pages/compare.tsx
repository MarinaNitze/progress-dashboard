import React, { useState, useEffect } from 'react';
import {
  Grid,
  GridContainer,
  Form,
  Fieldset,
  Label,
  CardGroup,
} from '@trussworks/react-uswds';
import useGatsbyImages from '../hooks/useGatsbyImages';
import Select from '../components/select/Select'
import { Option } from 'react-select'

import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import Card from '../components/card/Card';

import useDataPractices from '../hooks/useDataPractices';

import './home.scss';

export default function Compare() {
  const implementedSvg =
    useGatsbyImages()['images/compare/implementedMedium.svg'].publicURL;
  const implementedIcon = (
    <img className="implemented-icon" src={implementedSvg} alt="implemented" />
  );
  const practiceDataByState = useDataPractices().practicesData.sort((a, b) => {
    const textA = a.name;
    const textB = b.name;
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  const [adminFilter, setAdminFilter] = useState<typeof Option>({value: '', label: 'Either'});
  const [popFilter, setPopFilter] = useState<typeof Option>({value: '', label: 'Any'});
  const [recFilter, setRecFilter] = useState<readonly any[]>(['']);
  const [filteredPractices, setFilteredPractices] =
    useState(practiceDataByState);

  useEffect(() => {
    const filterByPop = (practice: typeof practiceDataByState[0]) => {
      const pop =
        typeof practice.population === 'string'
          ? parseInt(practice.population)
          : practice.population;
      if (popFilter.value === '0') {
        return pop < 2500000;
      } else if (popFilter.value === '2500000') {
        return pop >= 2500000 && pop < 7500000;
      } else {
        return pop >= 7500000;
      }
    };

    const filterByRec = (practice: typeof practiceDataByState[0]) => {
      const practiceArr = practice.practices
        .filter(p => p.bool)
        .map(p => p.practiceName);
      return recFilter?.every(
        filter =>
          practiceArr.includes(filter.value) ||
          filter.value === '' ||
          filter === '',
      );
    };
    const filteredPracticesWithUpdatedFilters = practiceDataByState
      .sort((a, b) => {
        const textA = a.name;
        const textB = b.name;
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      })
      .filter(practice => {
        const aFilter =
          adminFilter === undefined ||
          adminFilter.value === '' ||
          adminFilter.value.includes(practice.admin);
        const pFilter =
          popFilter === undefined || popFilter.value === '' || filterByPop(practice);
        const rFilter =
          recFilter === undefined ||
          recFilter?.length === 0 ||
          filterByRec(practice);

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
  const adminOptions =[
        { value: '', label: 'Either' },
    { value: 'County', label: 'County' },
    { value: 'State', label: 'State' },
  ];
  const popOptions =[
            { value: "", label: 'Any' },
    { value: "0", label: 'Less than 2.5 Million' },
    { value: '2500000', label: '2.5 Million - 7.5 Million' },
    { value: '7500000', label: 'Greater than 7.5 Million' },
  ];

  const recOptions = [
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

  const createContent = (stateData: typeof practiceDataByState[0]) => (
    <ul>
      {stateData.practices.map(p => (
        <li
          key={p.practiceName}
          className={p.bool ? 'implemented' : 'not-implemented'}
        >
          {p.bool ? implementedIcon : ''} {p.practiceName}
        </li>
      ))}
    </ul>
  );

  return (
    <Layout>
      <section id="hero-section">
        <Hero
          className="cwp-topic-hero"
          backgroundColor="dark"
          title="Compare"
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
                <strong>
                  no witnesses, no fee, no notary, general inboxes for receiving
                  requests, and accept electronic requests
                </strong>
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
            <hr className="thin-hr" />
          </section>
          <section className="compare-section">
            <Grid>
              <p className="total">{filteredPractices.length} total results</p>
              <CardGroup>
                {filteredPractices.map(fp => (
                  <Card
                    key={fp.code}
                    title={fp.name}
                    content={createContent(fp)}
                    layout="compare"
                    className="compare-width"
                    image={`/src/images/compare/${
                      fp.practices.filter(p => p.bool).length
                    }Of5.svg`}
                    imgAlt={`${
                      fp.practices.filter(p => p.bool).length
                    } out of 5`}
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
