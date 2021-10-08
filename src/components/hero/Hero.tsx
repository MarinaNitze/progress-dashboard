import React from 'react';
import './hero.scss';
import { ImageSharp } from '../../../graphql-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import useGatsbyImages from '../../hooks/useGatsbyImages';

type BackgroundColorOptions =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'light'
  | 'white';

type HeroProps = {
  title?: string;
  content?: string;
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
  content,
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
    <GatsbyImage
      className="image"
      image={gatsbyImage}
      alt={alt ?? `${title}-icon`}
    />
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
        <div className="usa-hero-callout usa-section-dark">
          {title && <h2>{title}</h2>}
          <p>{content}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
