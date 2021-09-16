import React, { useState, useCallback, useRef } from 'react';
import {
  Header as HeaderCmp,
  NavMenuButton,
  PrimaryNav,
} from '@trussworks/react-uswds';
import useGatsbyImages from '../../hooks/useGatsbyImages';
import useScrollDirection from '../../hooks/useScrollDirection';
import { GatsbyLinkProps, navigate } from 'gatsby-link';
import { Link } from 'gatsby';

import './Header.scss';

type HeaderProps = {
  headerLinks: HeaderLinks;
};

type HeaderLinks = (GatsbyLinkProps<unknown> & {
  iconPath?: string;
  iconClassname?: string;
  iconAlt?: string;
  text: string;
})[];

export default function Header({ headerLinks }: HeaderProps) {
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef(0);
  const direction = useScrollDirection(scrollRef);
  const svgLogo = useGatsbyImages()['images/header/cwp-logo.svg'];

  const onClickExpand = useCallback(() => {
    setExpanded(prvExpanded => !prvExpanded);
  }, [setExpanded]);

  const onClickNavigateHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const renderHeaderLinks = () => {
    return headerLinks.map(link => (
      <Link to={link.to}>
        {link.text}
        {link.iconPath && (
          <img
            className={link.iconClassname}
            src={useGatsbyImages()[link.iconPath].publicURL}
            alt={link.iconAlt}
          />
        )}
      </Link>
    ));
  };

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
