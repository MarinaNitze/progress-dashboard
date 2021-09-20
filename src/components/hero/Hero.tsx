import React from 'react';
import './hero.scss';
import { ImageSharp } from '../../../graphql-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import useGatsbyImages from '../../hooks/useGatsbyImages';

type HeroProps = {
  title: string;
  content?: string;
  path?: string;
  alt?: string;
  backgroundColor?: 'primary' | 'secondary' | 'info' | 'light';
  imageAlign?: 'left' | 'right';
  children?: React.ReactNode;
};

export default function Hero({
  title,
  content,
  path,
  alt,
  backgroundColor,
  imageAlign = 'right',
  children,
}: HeroProps) {
  const imageNode = path && useGatsbyImages()[path];
  const gatsbyImage: ImageSharp['gatsbyImageData'] =
    imageNode && getImage(imageNode);
  const imageComponent = gatsbyImage && (
    <GatsbyImage className="image" image={gatsbyImage} alt={alt ?? title} />
  );

  return (
    <section className={'usa-hero ' + backgroundColor}>
      <div className={`usa-grid ${imageAlign === 'left' ? 'left' : 'right'}`}>
        <div className="bgImage">{imageComponent}</div>
        <div className="usa-hero-callout usa-section-dark">
          <h2>{title}</h2>
          <p>{content}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
