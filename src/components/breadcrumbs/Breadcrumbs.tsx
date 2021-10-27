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
        <Breadcrumb className="crumb">
          <BreadcrumbLink className="crumb" href="/">
            Home
          </BreadcrumbLink>
        </Breadcrumb>
        {page ? (
          <Breadcrumb className="crumb">
            <BreadcrumbLink className="crumb" href={`/${page}`}>
              {page}
            </BreadcrumbLink>
          </Breadcrumb>
        ) : (
          <></>
        )}
        <Breadcrumb className="crumb" current>
          {crumbLabel}
        </Breadcrumb>
      </BreadcrumbBar>
    </div>
  );
}
