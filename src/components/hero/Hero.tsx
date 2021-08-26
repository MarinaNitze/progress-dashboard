import React from 'react';
import './hero.scss'

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
        backgroundImage: backgroundImgPath ? `url(${backgroundImgPath})` : "",
      }}
    >
      <div className="usa-grid">
        <div className="usa-hero-callout usa-section-dark">
          <h2>{title}</h2>
          <p>{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
