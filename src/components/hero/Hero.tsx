import React from 'react';
import './hero.scss';
import '../../images/heros/hero-1.png'

type HeroProps = {
  title: string;
  description?: string;
  backgroundImgPath?: string;
  backgroundColor?: 'primary' | 'secondary' | 'info' | 'light';
  children?: React.ReactNode;
};

export default function Hero({
  title,
  description,
  backgroundImgPath,
  children,
}: HeroProps) {
  console.log(backgroundImgPath);

  return (
    <section
      className="usa-hero"
      style={{
        backgroundImage: "../../images/heros/hero-1.png",
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
