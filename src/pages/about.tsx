import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import ReactMarkdown from 'react-markdown';
import { AnchorLinkProps } from 'gatsby-plugin-anchor-links';

import Layout from '../components/layout/Layout';
import Hero from '../components/hero/Hero';
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs';
import SideAnchorNav from '../components/side-anchor-nav/SideAnchorNav';

import content from './about.content.yml';

import './home.scss';

export default function About() {
  const {
    hero,
    about,
    membership,
    howItWorks,
    benefitsOfMembership,
    currentMembers,
  } = content;

  const getAboutMarkdown = (key: string) => {
    switch (key) {
      case 'about':
        return about;
      case 'membership':
        return membership;
      case 'howItWorks':
        return howItWorks;
      case 'benefitsOfMembership':
        return benefitsOfMembership;
      default:
        return '';
    }
  };

  const addHash = (title: string, url: string) => {
    window.history.replaceState(null, title, url);
  };
  const itemFilterKey = [
    'about',
    'membership',
    'howItWorks',
    'benefitsOfMembership',
    'currentMembers',
  ];
  const allItems: AnchorLinkProps[] = [
    {
      to: `/about#about`,
      title: 'About the Progress Dashboard',
      onAnchorLinkClick: () => addHash('About', '#about'),
    },
    {
      to: `/about#membership`,
      title: 'Membership',
      onAnchorLinkClick: () => addHash('Membership', '#membership'),
    },
    {
      to: `/about#how-it-works`,
      title: 'How it Works',
      onAnchorLinkClick: () => addHash('How it Works', '#how-it-works'),
    },
    {
      to: `/about#benefits-of-membership`,
      title: 'Benefits of Membership',
      className: 'text-wrap-line',
      onAnchorLinkClick: () =>
        addHash('Benefits of Membership', '#benefits-of-membership'),
    },
    {
      to: `/about#current-members`,
      title: 'Current Members',
      onAnchorLinkClick: () => addHash('Current Members', '#current-members'),
    },
  ];

  const items: AnchorLinkProps[] = allItems.filter(
    (_it, index) => itemFilterKey[index],
  );

  return (
    <Layout>
      <section id="test-section-id">
        <Hero
          className="cwp-about-hero"
          path={hero.image && hero.image.slice(3)}
          alt={hero.imgAlt && hero.imgAlt}
          backgroundColor={hero.backgroundColor}
          title={hero.title}
        />
      </section>
      <Breadcrumbs crumbLabel={'About'} />
      <GridContainer className="cwp-about">
        <Grid desktop={{ col: 3 }}>
          <SideAnchorNav items={items} />
        </Grid>

        <Grid
          className="usa-layout-docs__main usa-prose usa-layout-docs"
          id="main-content"
          desktop={{ col: 12 }}
        >
          <main className="cwp-main about">
            {itemFilterKey.map((key, index) => (
              <Grid id={key as string} key={key as string}>
                <section>
                  <h2 className="section-title">{allItems[index].title}</h2>
                  {key !== 'currentMembers' ? (
                    <ReactMarkdown className="section-content">
                      {getAboutMarkdown(key)}
                    </ReactMarkdown>
                  ) : (
                    <ul>
                      {currentMembers.map((cm: string) => (
                        <li key={cm}>{cm}</li>
                      ))}
                    </ul>
                  )}
                </section>
              </Grid>
            ))}
          </main>
        </Grid>
      </GridContainer>
    </Layout>
  );
}
