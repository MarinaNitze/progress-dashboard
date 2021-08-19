import React, { useCallback } from 'react';
import {
  Card as CardCmp,
  CardBody,
  CardHeader,
  CardMedia,
} from '@trussworks/react-uswds';
import { GridProps } from '@trussworks/react-uswds/lib/components/grid/Grid/Grid';

import * as styles from './Card.module.css';

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
  size,
}: CardProps) {
  const isSize = useCallback(
    (size: CardProps['size']) => {
      switch (size) {
        case 'sm':
          return styles.sm;
        case 'md':
          return styles.md;
        case 'lg':
          return styles.lg;
        default:
          return '';
      }
    },
    [size],
  );

  return (
    <>
      <CardCmp
        className={styles.card}
        containerProps={{
          className: `${styles.cardContainer} ${isSize(size)}`,
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
    </>
  );
}
