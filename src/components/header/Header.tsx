import React, { useState, useRef } from 'react';
import { Link } from 'gatsby';
import {
  Header as HeaderCmp,
  NavMenuButton,
  PrimaryNav,
} from '@trussworks/react-uswds';
import { GatsbyLinkProps } from 'gatsby-link';
import useGatsbyImages from '../../hooks/useGatsbyImages';
import useScrollDirection from '../../hooks/useScrollDirection';

import './Header.scss';

type HeaderProps = {
  headerLinks: HeaderLinks;
};

type HeaderLinks = (GatsbyLinkProps<unknown> & {
  iconPath?: string;
  text: string;
  dataCy?: string;
})[];

export default function Header({ headerLinks }: HeaderProps) {
  const scrollRef = useRef(0);
  const direction = useScrollDirection(scrollRef);
  const [showMenu, setShowMenu] = useState(false);
  const imageMap = useGatsbyImages();

  const onClickShowMenu = () => {
    setShowMenu(prevShowMenu => !prevShowMenu);
  };

  const closeMenuAll = () => {
    setShowMenu(false);
  };

  return (
    <>
      <HeaderCmp
        className={`cwp-header ${direction === 'up' ? 'sticky-nav z-top' : ''}`}
        basic
        data-cy="cwp-header"
      >
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <NavMenuButton
              onClick={onClickShowMenu}
              data-cy="cwp-header-menu-button"
              label={
                <div
                  data-cy="cwp-header-menu-button-image-wrapper"
                  className={`menu-button ${showMenu ? 'close' : ''}`}
                >
                  <img
                    src={
                      showMenu
                        ? imageMap['images/header/close.svg'].publicURL
                        : imageMap['images/header/menu-mobile.svg'].publicURL
                    }
                  />
                  Menu
                </div>
              }
            />
            <Link
              className="mobile-header-home-link"
              onClick={closeMenuAll}
              to="/"
            >
              <img
                className="cwp-logo"
                alt="cwp-logo"
                // instead of src property, content set in CSS to easily swap for mobile
              />
            </Link>
          </div>
          <PrimaryNav
            className={`cwp-nav`}
            items={headerLinks.map((link, i) => (
              <Link
                className="font-family-body text-bold"
                to={link.to}
                data-cy={link?.dataCy ?? `nav-link-${i}`}
              >
                {link.text}
              </Link>
            ))}
            mobileExpanded={showMenu && direction === 'up'}
            onToggleMobileNav={() => {
              setShowMenu(false);
            }}
          >
            {
              // Add a menu title to the mobile menu nav overlay
              showMenu && (
                <div className="menu-title" data-cy="cwp-menu-title">
                  <Link className="menu-link" to="/">
                    child welfare playbook
                  </Link>
                </div>
              )
            }
          </PrimaryNav>
        </div>
      </HeaderCmp>
    </>
  );
}
