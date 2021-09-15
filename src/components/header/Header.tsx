import React, { useState, useCallback, useRef } from 'react';
import {
  Header as HeaderCmp,
  Title,
  NavMenuButton,
  PrimaryNav,
} from '@trussworks/react-uswds';
import { Link } from 'gatsby';

import useScrollDirection from '../../hooks/useScrollDirection';
import './Header.scss';

const itemsMenu = [
  <Link to="/topic">Topics</Link>,
  <Link to="/recommendations">Recommendations</Link>,
  <Link to="/compare">Compare</Link>,
  <Link to="/stories">Stories</Link>,
  <Link to="/search">Search</Link>,
];

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef(0);
  const direction = useScrollDirection(scrollRef);

  const onClickExpand = useCallback(() => {
    setExpanded(prvExpanded => !prvExpanded);
  }, [setExpanded]);

  return (
    <>
      <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`}></div>
      <HeaderCmp
        className={`pd-header ${direction === 'up' ? 'sticky-nav z-top' : ''}`}
        basic
      >
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>Logo</Title>
            <NavMenuButton onClick={onClickExpand} label="Menu" />
          </div>
          <PrimaryNav
            className="pd-nav"
            items={itemsMenu}
            mobileExpanded={expanded}
            onToggleMobileNav={onClickExpand}
          ></PrimaryNav>
        </div>
      </HeaderCmp>
    </>
  );
}
