import React from 'react';
import { SideNav, SummaryBox } from '@trussworks/react-uswds';
import { AnchorLink, AnchorLinkProps } from 'gatsby-plugin-anchor-links';

import './SideAnchorNav.scss';

export type SideAnchorNavProps = {
  items: AnchorLinkProps[];
};

export default function SideAnchorNav({ items }: SideAnchorNavProps) {
  return (
    <SummaryBox className="side-nav-summary" heading="On this page">
      <SideNav
        items={items.map(item => (
          <AnchorLink {...item} />
        ))}
      />
    </SummaryBox>
  );
}
