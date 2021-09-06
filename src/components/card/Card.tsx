import React from 'react';
import { navigate } from 'gatsby';
import {
  Card as CardCmp,
  CardBody,
  CardHeader,
  CardMedia,
  CardFooter,
  Button,
} from '@trussworks/react-uswds';
import { GridProps } from '@trussworks/react-uswds/lib/components/grid/Grid/Grid';

import './Card.scss';

export type CardProps = {
  heading: string;
  layout?: 'topic' | 'sm' | 'md' | 'lg';
  imgPath?: string;
  imgAlt?: string;
  image?: React.ReactNode;
  linkDestination?: string;
  linkText?: string;
  children?: React.ReactNode;
};

const gridEntries = [
  ['topic', true],
  ['sm', 4],
  ['md', 8],
  ['lg', 12],
].map(ge => [ge[0], { tablet: { col: ge[1] } } as GridProps]);
const gridLayouts = Object.fromEntries(gridEntries);

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
  image,
  linkDestination,
  linkText,
  children,
  layout = 'lg',
}: CardProps) {
  return (
    <CardCmp
      className="card"
      containerProps={{ className: layout }}
      layout={mediaLayout(layout)}
      gridLayout={gridLayouts[layout] as GridProps}
      onClick={() => {
        if (linkDestination && layout === "topic") navigate(linkDestination);
      }}
    >
      <CardHeader className="content">
        <h3 className="usa-card__heading">{heading}</h3>
      </CardHeader>
      {imgPath && layout !== 'sm' && (
        <CardMedia exdent className="media">
          {image}
        </CardMedia>
      )}
      {children && <CardBody className="content">{children}</CardBody>}
      {layout === 'lg' && linkDestination ? (
        <CardFooter>
          <Button type="button" onClick={() => {navigate(linkDestination)}}>{linkText}</Button>
        </CardFooter>
      ) : layout === 'sm' ? (
        <CardFooter className="smallFooter">{image}</CardFooter>
      ) : null}
    </CardCmp>
  );
}
