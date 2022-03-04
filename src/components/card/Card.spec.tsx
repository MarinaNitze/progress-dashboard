import * as React from 'react';
import { render } from '@testing-library/react';

import Card from './Card';

describe('Card', () => {
  it('renders card with content hidden by default', () => {
    const content = 'Content';
    const { queryByText } = render(
      <Card title="Content Header" content={content} />,
    );

    const contentEl = queryByText(content);

    expect(contentEl).not.toBeInTheDocument();
  });

  it('renders placeholder content when provided by default', () => {
    const content = 'Content';
    const placeholder = 'Content when hidden';
    const { queryByText } = render(
      <Card
        title="Content Header"
        content={content}
        placeholderHiddenContent={placeholder}
      />,
    );

    const contentEl = queryByText(content);
    const placeholderEl = queryByText(placeholder);

    expect(placeholderEl).toBeInTheDocument();
    expect(contentEl).not.toBeInTheDocument();
  });

  it('renders card with content displayed when forceHide = false', () => {
    const content = 'Content';
    const placeholder = 'Content when hidden';
    const { queryByText } = render(
      <Card
        title="Content Header"
        content={content}
        placeholderHiddenContent={placeholder}
        forceHide={false}
      />,
    );

    const contentEl = queryByText(content);
    const placeholderEl = queryByText(placeholder);

    expect(placeholderEl).not.toBeInTheDocument();
    expect(contentEl).toBeInTheDocument();
  });
});
