import * as React from 'react';
import { Link } from 'gatsby';

type HeaderProps = {
  siteTitle: string;
};

export default function Header({ siteTitle }: HeaderProps) {
  return (
    <header>
      <div>
        <h1>
          <Link
            to="/"
            style={{
              color: 'blue',
              textDecoration: 'none',
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  );
}
