import * as React from 'react';
import { render } from '@testing-library/react';

import Card from './Card';

describe('Card', () => {
  it('renders card', () => {
    const contentBody = 'Content body';
    const { getByText } = render(
      <Card title="Content Header" content={contentBody} />,
    );

    const content = getByText(contentBody);

    expect(content).toBeInTheDocument();
  });
});
