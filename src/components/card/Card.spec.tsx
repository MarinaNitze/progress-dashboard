import * as React from 'react';
import Card from './Card';
import { render } from '@testing-library/react';

describe('Card', () => {
  it('renders card with content showing by default', () => {
    const content = 'Content';
    const { queryByText } = render(
      <Card title="Content Header" content={content} />,
    );

    const contentEl = queryByText(content);

    expect(contentEl).toBeInTheDocument();
  });

  it('renders card with content hidden when defaultHidden = true', () => {
    const content = 'Content';
    const { queryByText } = render(
      <Card title="Content Header" content={content} defaultHidden={true} />,
    );

    const contentEl = queryByText(content);

    expect(contentEl).not.toBeInTheDocument();
  });

  it('renders card with placeholder showing when provided and defaultHidden= true', () => {
    const content = 'Content';
    const placeholder = 'Content when hidden';
    const { queryByText } = render(
      <Card
        title="Content Header"
        content={content}
        placeholderHiddenContent={placeholder}
        defaultHidden={true}
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

  it('renders card with content hidden when forceHide = true', () => {
    const content = 'Content';
    const placeholder = 'Content when hidden';
    const { queryByText } = render(
      <Card
        title="Content Header"
        content={content}
        placeholderHiddenContent={placeholder}
        forceHide={true}
      />,
    );

    const contentEl = queryByText(content);
    const placeholderEl = queryByText(placeholder);

    expect(placeholderEl).toBeInTheDocument();
    expect(contentEl).not.toBeInTheDocument();
  });
});
