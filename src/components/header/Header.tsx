import React, { useState, useCallback, useRef } from 'react';
import {
  Header as HeaderCmp,
  NavMenuButton,
  PrimaryNav,
} from '@trussworks/react-uswds';
import useGatsbyImages from '../../hooks/useGatsbyImages';
import useHeaderLinks, { HeaderLinks } from './useHeaderLinks';
import useScrollDirection from '../../hooks/useScrollDirection';

import './Header.scss';
import { navigate } from 'gatsby-link';

type HeaderProps = {
  headerLinks: HeaderLinks;
};

export default function Header({ headerLinks }: HeaderProps) {
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef(0);
  const direction = useScrollDirection(scrollRef);
  const svgLogo = useGatsbyImages()['images/header/cwp-logo.svg'];
  const { renderHeaderLinks } = useHeaderLinks(headerLinks);

  const onClickExpand = useCallback(() => {
    setExpanded(prvExpanded => !prvExpanded);
  }, [setExpanded]);

  const onClickNavigateHome = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <>
      <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`}></div>
      <HeaderCmp
        className={`cwp-header ${direction === 'up' ? 'sticky-nav z-top' : ''}`}
        basic
      >
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <img
              onClick={onClickNavigateHome}
              className="cwp-logo"
              src={svgLogo.publicURL}
              alt="cwp-logo"
            />
            <NavMenuButton onClick={onClickExpand} label="Menu" />
          </div>
          <PrimaryNav
            className="cwp-nav"
            items={renderHeaderLinks()}
            mobileExpanded={expanded}
            onToggleMobileNav={onClickExpand}
          ></PrimaryNav>
        </div>
      </HeaderCmp>
    </>
  );
}
