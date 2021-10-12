import React from 'react';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
} from '@trussworks/react-uswds';

import './Breadcrumbs.scss';

type BreadcrumbProps = {
  crumbLabel?: string;
  page?: string;
};

export default function Breadcrumbs({ crumbLabel, page }: BreadcrumbProps) {
  return (
    <div className="breadcrumb">
      {crumbLabel ? (
        <BreadcrumbBar>
          <Breadcrumb>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </Breadcrumb>
          <Breadcrumb>
            <BreadcrumbLink href={`/${page}`}>{page}</BreadcrumbLink>
          </Breadcrumb>
          <Breadcrumb>
            <Breadcrumb current>{crumbLabel}</Breadcrumb>
          </Breadcrumb>
        </BreadcrumbBar>
      ) : null}
    </div>
  );
}
