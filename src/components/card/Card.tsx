import React from 'react';
import {
  Card as CardCmp,
  CardBody,
  CardHeader,
  CardMedia,
} from '@trussworks/react-uswds';
import { GridProps } from '@trussworks/react-uswds/lib/components/grid/Grid/Grid';

import * as styles from './Card.module.css';
import './Card.scss';

export type CardProps = {
  heading: string;
  layout?: 'topic' | 'sm' | 'md' | 'lg';
  imgPath?: string;
  linkDestination?: string;
  linkText?: string;
  children: React.ReactNode;
  gridLayout?: GridProps;
};

export default function Card({
  heading,
  imgPath,
  children,
  gridLayout = { tablet: { col: 12 } },
  layout = 'lg',
}: CardProps) {
  return (
    <CardCmp
      className={styles.card}
      containerProps={{
        className: `${styles.cardContainer} ${styles[layout]}`,
      }}
      layout="flagMediaRight"
      gridLayout={gridLayout}
    >
      <CardHeader className={layout !== 'lg' ? styles.noImage : ''}>
        <h3 className="usa-card__heading">{heading}</h3>
      </CardHeader>
      {imgPath && (
        <CardMedia
          className="flex-align-center"
          imageClass="circle-card margin-x-auto"
        >
          <img src={imgPath} alt="" />
        </CardMedia>
      )}
      <CardBody className={layout !== 'lg' ? styles.noImage : ''}>
        {children}
      </CardBody>
    </CardCmp>
  );
}
