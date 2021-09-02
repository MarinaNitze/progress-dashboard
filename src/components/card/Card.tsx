import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  Card as CardCmp,
  CardBody,
  CardHeader,
  CardMedia,
  CardFooter,
} from '@trussworks/react-uswds';
import { GridProps } from '@trussworks/react-uswds/lib/components/grid/Grid/Grid';

import * as styles from './Card.module.css';
import './Card.scss';

export type CardProps = {
  heading: string;
  layout?: 'topic' | 'sm' | 'md' | 'lg';
  imgPath?: string;
  imgAlt?: string;
  images?: any;
  linkDestination?: string;
  linkText?: string;
  children?: React.ReactNode;
};

const gridLayouts = {
  topic: { tablet: { col: true } } as GridProps,
  sm: { tablet: { col: 4 } } as GridProps,
  md: { tablet: { col: 8 } } as GridProps,
  lg: { tablet: { col: 12 } } as GridProps,
};

function mediaLayout(
  layout: string,
): 'flagMediaRight' | 'flagDefault' | 'standardDefault' {
  if (layout === 'lg') return 'flagMediaRight';
  if (layout === 'md') return 'flagDefault';
  return 'standardDefault';
}

export default function Card({
  heading,
  imgPath,
  imgAlt,
  images,
  linkDestination,
  linkText,
  children,
  layout = 'lg',
}: CardProps) {
  const imageNode: any =
    images &&
    images.edges.find((img: any) => img.node.relativePath === imgPath)?.node;
  const image: any =
    imageNode?.extension === 'svg' ? imageNode.publicURL : getImage(imageNode);

  return (
    <CardCmp
      className={styles.card}
      containerProps={{className: styles[layout]}}
      layout={mediaLayout(layout)}
      gridLayout={gridLayouts[layout]}
    >
      <CardHeader className={styles.content}>
        <h3 className="usa-card__heading">{heading}</h3>
      </CardHeader>
      {imgPath && (
        <CardMedia exdent className={styles.media}>
          {imageNode?.extension === 'svg' ? (
            <img className={styles.icon} src={image} alt={imgAlt} />
          ) : (
            <GatsbyImage className={styles.image} image={image} alt={imgAlt ?? ''} />
          )}
        </CardMedia>
      )}
      {children && <CardBody className={styles.content}>
        {children}
      </CardBody>}
    </CardCmp>
  );
}
