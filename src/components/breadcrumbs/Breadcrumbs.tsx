import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import './Breadcrumbs.scss';

type BreadcrumbProps = {
  crumbLabel?: string;
};

export default function Breadcrumbs({ crumbLabel }: BreadcrumbProps) {
  return (
    <div className="breadcrumb">
      {crumbLabel ? (
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{crumbLabel}</Breadcrumb.Item>
        </Breadcrumb>
      ) : null}
    </div>
  );
}
