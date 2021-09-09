import React, { ReactNode, useEffect, useState } from 'react';
import { SideNav, SummaryBox } from '@trussworks/react-uswds';
import { AnchorLink, AnchorLinkProps } from 'gatsby-plugin-anchor-links';

import './SideAnchorNav.scss';

export type CustomAnchorLinkProps = (AnchorLinkProps & {
  toRef?: React.RefObject<HTMLElement> | null;
})[];

export type SideAnchorNavProps = {
  items: CustomAnchorLinkProps;
};

export default function SideAnchorNav({ items }: SideAnchorNavProps) {
  const [anchors, setAnchors] = useState<ReactNode[]>([]);

  useEffect(() => {
    setAnchors(items.map(item => <AnchorLink {...item} />));
  }, [items]);

  return (
    <SummaryBox className="side-nav-summary" heading="On this page">
      <SideNav items={anchors} />
    </SummaryBox>
  );
}
