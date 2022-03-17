import React, { useState, useRef } from 'react';
import {
  Header as HeaderCmp,
  NavMenuButton,
  PrimaryNav,
  Search,
} from '@trussworks/react-uswds';
import useGatsbyImages from '../../hooks/useGatsbyImages';
import { GatsbyLinkProps, navigate } from 'gatsby-link';
import { Link } from 'gatsby';
import useScrollDirection from '../../hooks/useScrollDirection';

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
  const scrollRef = useRef(0);
  const direction = useScrollDirection(scrollRef);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const imageMap = useGatsbyImages();

  const onClickShowMenu = () => {
    setShowSearch(false);
    setShowMenu(prevShowMenu => !prevShowMenu);
  };

  const onClickShowSearch = () => {
    setShowMenu(false);
    setShowSearch(prevShowSearch => !prevShowSearch);
  };

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = (e.target as any)[0].value;
    navigate('/search', { state: { searchTerm } });
  };

  // Change header links based on how menu is being displayed:
  // If !showMenu and !showSearch, then it's the normal full-width menu (b/c these vars can only be affected by buttons that are only accessible in mobile)
  // else, if showSearch, then set header links to empty array ()
  // else, filter out search link to get desired mobile menu items
  const filteredHeaderLinks =
    !showSearch && !showMenu
      ? headerLinks
      : showSearch
      ? []
      : headerLinks.filter(h => h.text !== 'Search');

  return (
    <>
      <HeaderCmp
        className={`cwp-header ${direction === 'up' ? 'sticky-nav z-top' : ''}`}
        basic
      >
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <NavMenuButton
              onClick={onClickShowMenu}
              label={
                <div className={`menu-button ${showMenu ? 'close' : ''}`}>
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
            <Link to="/">
              <img
                className="cwp-logo"
                alt="cwp-logo"
                // instead of src property, content set in CSS to easily swap for mobile
              />
            </Link>
            <NavMenuButton
              onClick={onClickShowSearch}
              label={
                <div
                  className={`menu-button search ${showSearch ? 'close' : ''}`}
                >
                  Search
                  <img
                    src={
                      showSearch
                        ? imageMap['images/header/close.svg'].publicURL
                        : imageMap['images/header/search.svg'].publicURL
                    }
                  />
                </div>
              }
            />
          </div>
          <PrimaryNav
            className={`cwp-nav ${showSearch ? 'search-nav' : ''}`}
            items={filteredHeaderLinks.map(link => (
              <Link className="font-family-body text-bold" to={link.to}>
                {link.text}
                {link.iconPath && (
                  <img
                    className={link.iconClassname}
                    src={imageMap[link.iconPath].publicURL}
                    alt={link.iconAlt}
                  />
                )}
              </Link>
            ))}
            mobileExpanded={showMenu || showSearch}
            onToggleMobileNav={() => {
              setShowMenu(false);
              setShowSearch(false);
            }}
          >
            {
              // Add a menu title to the mobile menu nav overlay
              showMenu ? (
                <div className="menu-title">child welfare playbook</div>
              ) : (
                ''
              )
            }
            {
              // Add search bar element to otherwise empty mobile search nav overlay
              showSearch ? (
                <Search
                  placeholder="Search the playbook"
                  onSubmit={submitSearch}
                />
              ) : (
                ''
              )
            }
          </PrimaryNav>
        </div>
      </HeaderCmp>
    </>
  );
}
