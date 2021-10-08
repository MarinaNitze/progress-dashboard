import React from 'react';
import { render } from '@testing-library/react';

import Table, { TableHeading } from './Table';
import { mockGatsbyImageData } from '../../../test/test-utils';

type TableKeys = 'summary' | 'about';

const columns: TableHeading<TableKeys>[] = [
  {
    dataKey: 'about',
    sortable: false,
    heading: `What's needed (Time/Cost)`,
  },
  {
    dataKey: 'summary',
    sortable: true,
    heading: 'Recommendations',
  },
];

const data = [
  {
    about: 'test-about-1',
    summary: 'test-summary-1',
  },
];

describe('Table', () => {
  beforeEach(() => {
    mockGatsbyImageData();
  });

  it('renders table component', () => {
    const expectedText = 'test-summary-1';
    const { getByText } = render(<Table columns={columns} data={data} />);

    const text = getByText(expectedText);

    expect(text).toBeInTheDocument();
  });
});
