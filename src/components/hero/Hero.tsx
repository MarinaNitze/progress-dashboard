import React from 'react';
import './hero.scss';
import { ImageSharp } from '../../../graphql-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import useGatsbyImages from '../../hooks/useGatsbyImages';

type HeroProps = {
  title: string;
  description?: string;
  path?: string;
  alt?: string;
  backgroundColor?: 'primary' | 'secondary' | 'info' | 'light';
  children?: React.ReactNode;
};

export default function Hero({
  title,
  description,
  path,
  alt,
  backgroundColor,
  children,
}: HeroProps) {
  const imageNode = path && useGatsbyImages({ path });
  const gatsbyImage: ImageSharp['gatsbyImageData'] =
    imageNode && getImage(imageNode.image);
  const imageComponent = gatsbyImage && (
    <GatsbyImage className="image" image={gatsbyImage} alt={alt ?? title} />
  );

  return (
    <section className={'usa-hero ' + backgroundColor}>
      <div className="usa-grid">
        <div className="bgImage">{imageComponent}</div>
        <div className="usa-hero-callout usa-section-dark">
          <h2>{title}</h2>
          <p>{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
