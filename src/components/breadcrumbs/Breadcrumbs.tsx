import React from 'react';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
} from '@trussworks/react-uswds';

import './Breadcrumbs.scss';

type BreadcrumbProps = {
  crumbLabel?: string;
  pages?: string;
};

export default function Breadcrumbs({ crumbLabel, pages }: BreadcrumbProps) {
  return (
    <div className="breadcrumb">
      {crumbLabel ? (
        <BreadcrumbBar>
          <Breadcrumb>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </Breadcrumb>
          <Breadcrumb>
            <BreadcrumbLink href={`/${pages}`}>All {pages}</BreadcrumbLink>
          </Breadcrumb>
          <Breadcrumb>
            <Breadcrumb current>{crumbLabel}</Breadcrumb>
          </Breadcrumb>
        </BreadcrumbBar>
      ) : null}
    </div>
  );
}
