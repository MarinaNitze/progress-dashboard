import React from 'react';

type HeroProps = {
  title: string;
  description?: string;
  backgroundImgPath?: string;
  children?: React.ReactNode;
};

export default function Hero({
  title,
  description,
  backgroundImgPath,
  children,
}: HeroProps) {
  return (
    <section
      className="usa-hero"
      style={{
        backgroundImage: `url(${backgroundImgPath && backgroundImgPath})`,
      }}
    >
      <div className="usa-grid">
        <div className="usa-hero-callout usa-section-dark">
          <h2>{title && title}</h2>
          <p>{description && description}</p>
          {children && children}
        </div>
      </div>
    </section>
  );
}
