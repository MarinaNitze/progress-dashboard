import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { ImageSharp } from '../../../graphql-types';
import useGatsbyImages from '../../hooks/useGatsbyImages';

import './hero.scss';

type BackgroundColorOptions =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'light'
  | 'white'
  | 'dark';

type HeroProps = {
  title?: string;
  path?: string;
  alt?: string;
  className?: string;
  backgroundColor?: BackgroundColorOptions;
  imageBackgroundColor?: BackgroundColorOptions;
  imageAlign?: 'left' | 'right';
  dataCy?: string;
  children?: React.ReactNode;
};

export default function Hero({
  title,
  path,
  alt,
  className,
  backgroundColor = 'primary',
  imageBackgroundColor = backgroundColor,
  imageAlign = 'right',
  dataCy,
  children,
}: HeroProps) {
  const imageNode = path && useGatsbyImages()[path];
  const gatsbyImage: ImageSharp['gatsbyImageData'] =
    imageNode && getImage(imageNode);
  const imageComponent = gatsbyImage && (
    <GatsbyImage image={gatsbyImage} alt={alt ?? `${title}-icon`} />
  );

  return (
    <section
      data-cy={dataCy ?? ''}
      className={`usa-hero ${
        className ? `${className} ` : ''
      } ${backgroundColor}`}
    >
      <div className={`usa-grid ${imageAlign === 'left' ? '' : 'right'}`}>
        <div className={`bgImage ${imageBackgroundColor}`}>
          {imageComponent}
        </div>
        <div
          className={`usa-hero-callout usa-section-dark${
            backgroundColor === 'dark' && ' white-text'
          }`}
        >
          {title && imageAlign === 'left' ? (
            <h2 data-cy={`${dataCy}-title`}>{title}</h2>
          ) : (
            <h1 data-cy={`${dataCy}-title`}>{title}</h1>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
