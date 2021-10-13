import React from 'react';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
} from '@trussworks/react-uswds';

import './Breadcrumbs.scss';

type BreadcrumbProps = {
  crumbLabel: 'topic' | 'recommendation' | string | undefined;
  page?: string | undefined;
};

export default function Breadcrumbs({ crumbLabel, page }: BreadcrumbProps) {
  return (
    <div className="breadcrumb">
      <BreadcrumbBar>
        <Breadcrumb>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </Breadcrumb>
        {page ? (
          <Breadcrumb>
            <BreadcrumbLink href={`/${page}`}>{page}</BreadcrumbLink>
          </Breadcrumb>
        ) : (
          <></>
        )}
        <Breadcrumb current>{crumbLabel}</Breadcrumb>
      </BreadcrumbBar>
    </div>
  );
}
