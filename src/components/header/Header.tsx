import React from 'react';
import {
  Header as HeaderCmp,
  Title,
  NavMenuButton,
  PrimaryNav,
} from '@trussworks/react-uswds';
import { useState } from 'react';

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const onClick = (): void => setExpanded(prvExpanded => !prvExpanded);

  const itemsMenu = [
    <a href="#one" key="one" className="usa-nav__link">
      <span>Topics</span>
    </a>,
    <a href="#two" key="two" className="usa-nav__link">
      <span>Recommendations</span>
    </a>,
    <a href="#three" key="three" className="usa-nav__link">
      <span>Compare</span>
    </a>,
    <a href="#four" key="four" className="usa-nav__link">
      <span>Stories</span>
    </a>,
    <a href="#five" key="five" className="usa-nav__link">
      <span>Search</span>
    </a>,
  ];
  return (
    <>
      <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`}></div>
      <HeaderCmp basic={true}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>Logo</Title>
            <NavMenuButton onClick={onClick} label="Menu" />
          </div>
          <PrimaryNav
            items={itemsMenu}
            mobileExpanded={expanded}
            onToggleMobileNav={onClick}
          ></PrimaryNav>
        </div>
      </HeaderCmp>
    </>
  );
}
