import React from 'react';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
} from '@trussworks/react-uswds';
import { Link } from 'gatsby';

import './Breadcrumbs.scss';

type BreadcrumbProps = {
  crumbLabel: 'topic' | 'recommendation' | string | undefined;
  page?: string | undefined;
};

type LinkProps = React.PropsWithChildren<{
  to: string;
  className: string;
}>;

const CustomLink: React.FunctionComponent<LinkProps> = ({
  to,
  className,
  children,
  ...linkProps
}: LinkProps): React.ReactElement => (
  <Link to={to} className={className} {...linkProps}>
    {children}
  </Link>
);

export default function Breadcrumbs({ crumbLabel, page }: BreadcrumbProps) {
  return (
    <div className="breadcrumb">
      <BreadcrumbBar>
        <Breadcrumb className="crumb">
          <BreadcrumbLink<LinkProps>
            className="crumb"
            asCustom={CustomLink}
            to="/"
          >
            Home
          </BreadcrumbLink>
        </Breadcrumb>
        {page ? (
          <Breadcrumb className="crumb">
            <BreadcrumbLink<LinkProps>
              className="crumb"
              asCustom={CustomLink}
              to={`/${page}`}
            >
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
