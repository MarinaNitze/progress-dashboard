import React from 'react';
import { render } from '@testing-library/react';
import { AnchorLinkProps } from 'gatsby-plugin-anchor-links';

import SideAnchorNav from './SideAnchorNav';

const anchorLinks: AnchorLinkProps[] = [
  {
    to: '#test-link',
    title: 'Test link',
  },
];

describe('SideAnchorNav', () => {
  it('renders side anchor nav', () => {
    const contentBody = anchorLinks[0].title!;
    const { getByText } = render(<SideAnchorNav items={anchorLinks} />);

    const content = getByText(contentBody);
    expect(content).toBeInTheDocument();
  });
});
