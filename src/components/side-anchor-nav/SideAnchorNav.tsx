import React from 'react';
import { AnchorLink, AnchorLinkProps } from 'gatsby-plugin-anchor-links';
import './SideAnchorNav.scss';
import {
  SideNav,
  SummaryBox,
  SummaryBoxContent,
  SummaryBoxHeading,
} from '@trussworks/react-uswds';

export type SideAnchorNavProps = {
  items: AnchorLinkProps[];
};

export default function SideAnchorNav({ items }: SideAnchorNavProps) {
  return (
    <SummaryBox className="side-nav-summary">
      <SummaryBoxHeading headingLevel="h3">On this page</SummaryBoxHeading>
      <SummaryBoxContent>
        <SideNav
          items={items.map(item => (
            <AnchorLink {...item} />
          ))}
        />
      </SummaryBoxContent>
    </SummaryBox>
  );
}
