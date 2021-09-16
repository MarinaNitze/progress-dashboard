import React from 'react';
import { GatsbyLinkProps } from 'gatsby-link';
import { useCallback } from 'react';
import { Link } from 'gatsby';
import useGatsbyImages from '../../hooks/useGatsbyImages';

export type HeaderLinks = (GatsbyLinkProps<unknown> & {
  iconPath?: string;
  iconClassname?: string;
  iconAlt?: string;
  text: string;
})[];

export default function useHeaderLinks(headerLinks: HeaderLinks) {
  const renderHeaderLinks = useCallback(() => {
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
  }, []);

  return {
    renderHeaderLinks,
  };
}
