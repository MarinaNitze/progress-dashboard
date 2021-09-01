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

type CardProps = {
  heading: string;
  size?: 'sm' | 'md' | 'lg';
  imgPath?: string;
  children: React.ReactNode;
  gridLayout?: GridProps;
};

export default function Card({
  heading,
  imgPath,
  children,
  gridLayout = { tablet: { col: 12 } },
  size = 'lg',
}: CardProps) {
  return (
    <CardCmp
      className={styles.card}
      containerProps={{
        className: `${styles.cardContainer} ${styles[size]}`,
      }}
      layout="flagMediaRight"
      gridLayout={gridLayout}
    >
      <CardHeader className={size !== 'lg' ? styles.noImage : ''}>
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
      <CardBody className={size !== 'lg' ? styles.noImage : ''}>
        {children}
      </CardBody>
    </CardCmp>
  );
}
