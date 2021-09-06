import React from 'react';
import { navigate } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
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
  images?: any;
  linkDestination?: string;
  linkText?: string;
  children?: React.ReactNode;
};

const gridEntries = [["topic", true], ["sm", 4], ["md", 8], ["lg", 12] ].map( ge => [ge[0], { tablet: { col: ge[1] }} as GridProps]);
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
      className="card"
      containerProps={{ className: layout }}
      layout={mediaLayout(layout)}
      gridLayout={gridLayouts[layout] as GridProps}
      onClick={() => { if (linkDestination) navigate(linkDestination) }}
    >
      <CardHeader className="content">
        <h3 className="usa-card__heading">{heading}</h3>
      </CardHeader>
      {imgPath && layout !== 'sm' && (
        <CardMedia exdent className="media">
          {imageNode?.extension === 'svg' ? (
            <img src={image} alt={imgAlt ?? heading} />
          ) : (
            <GatsbyImage
              className="image"
              image={image}
              alt={imgAlt ?? heading}
            />
          )}
        </CardMedia>
      )}
      {children && <CardBody className="content">{children}</CardBody>}
      {layout === 'lg' && linkDestination && (
        <CardFooter>
          <Button type="button">CTA</Button>
        </CardFooter>
      )}
      {layout === 'sm' && (
        <CardFooter className="smallFooter">
          <GatsbyImage image={image} alt={imgAlt ?? heading} />
        </CardFooter>
      )}
    </CardCmp>
  );
}
