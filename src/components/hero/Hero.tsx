import React from 'react';
import './hero.scss';

type HeroProps = {
  title: string;
  description?: string;
  backgroundImg?: React.FC;
  backgroundColor?: 'primary' | 'secondary' | 'info' | 'light';
  children?: React.ReactNode;
};

export default function Hero({
  title,
  description,
  backgroundImg,
  backgroundColor,
  children,
}: HeroProps) {
  return (
    <section className={'usa-hero ' + backgroundColor}>
      <div className="usa-grid">
        <div className="bgimage">{backgroundImg}</div>
        <div className="usa-hero-callout usa-section-dark">
          <h2>{title}</h2>
          <p>{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
