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
import useGatsbyImages from '../../hooks/useGatsbyImages';
import { ImageSharp } from '../../../graphql-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export type CardProps = {
  heading: string;
  layout?: 'topic' | 'sm' | 'md' | 'lg';
  imgPath?: string;
  imgAlt?: string;
  linkDestination?: string;
  linkText?: string;
  children?: React.ReactNode;
};

const gridLayouts = { topic: true, sm: 4, md: 8, lg: 12 };

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
  linkDestination,
  linkText,
  children,
  layout = 'lg',
}: CardProps) {

  let image;
  const imageNode = imgPath && useGatsbyImages({path: imgPath})
   if (imageNode && imageNode.image.extension === 'svg') {
    const svgImage = imageNode.image.publicURL;
    image = svgImage && <img src={svgImage} alt={imgAlt ?? heading + " image"} />;
  } else {
    const gatsbyImage: ImageSharp['gatsbyImageData'] =
      imageNode && getImage(imageNode.image);
  image = gatsbyImage && (
        <GatsbyImage
          className="image"
          image={gatsbyImage}
          alt={imgAlt ?? heading + " image"}
        />
      );
  }

  return (
    <CardCmp
      className="card"
      containerProps={{ className: layout }}
      layout={mediaLayout(layout)}
      gridLayout={{ tablet: { col: gridLayouts[layout] } } as GridProps}
      onClick={() => {
        if (linkDestination && layout === 'topic') navigate(linkDestination);
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
          <Button
            type="button"
            onClick={() => {
              navigate(linkDestination);
            }}
          >
            {linkText}
          </Button>
        </CardFooter>
      ) : layout === 'sm' ? (
        <CardFooter className="smallFooter">{image}</CardFooter>
      ) : null}
    </CardCmp>
  );
}
