import React, { ReactElement } from 'react';
import { navigate } from 'gatsby';
import {
  Card as CardCmp,
  CardBody,
  CardHeader,
  CardMedia,
  CardFooter,
  Button,
} from '@trussworks/react-uswds';
import ReactMarkdown from 'react-markdown';
import { GridProps } from '@trussworks/react-uswds/lib/components/grid/Grid/Grid';

import './Card.scss';
import useGatsbyImages from '../../hooks/useGatsbyImages';
import { ImageSharp } from '../../../graphql-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export type CardProps = {
  title: string;
  layout?: 'topic' | 'sm' | 'md' | 'lg' | 'compare';
  image?: string;
  imgAlt?: string;
  link?: string;
  linkText?: string;
  content?: string | ReactElement;
  dataCy?: string;
  className?: string;
};

const gridLayouts = {
  tablet: { topic: true, sm: 6, md: 12, lg: 12, compare: 3 },
  desktop: { topic: true, sm: 4, md: 8, lg: 12, compare: 2 },
};

function mediaLayout(
  layout: string,
): 'flagMediaRight' | 'flagDefault' | 'standardDefault' {
  if (layout === 'lg') return 'flagMediaRight';
  if (layout === 'md') return 'flagDefault';
  return 'standardDefault';
}

export default function Card({
  className,
  title,
  image,
  imgAlt,
  link,
  linkText,
  content,
  dataCy,
  layout = 'lg',
}: CardProps) {
  let imageComponent;
  const imageNode =
    image && useGatsbyImages()[image.slice(image[0] === '.' ? 3 : 5)];
  if (imageNode && imageNode.extension === 'svg') {
    const svgImage = imageNode.publicURL;
    imageComponent = svgImage && (
      <img src={svgImage} alt={imgAlt ?? title + ' image'} />
    );
  } else {
    const gatsbyImage: ImageSharp['gatsbyImageData'] =
      imageNode && getImage(imageNode);
    imageComponent = gatsbyImage && (
      <GatsbyImage
        className="image"
        image={gatsbyImage}
        alt={imgAlt ?? title + ' image'}
      />
    );
  }

  return (
    <CardCmp
      data-cy={dataCy ?? ''}
      className={`card ${className ?? ''} `}
      containerProps={{ className: layout }}
      layout={mediaLayout(layout)}
      headerFirst={layout === "compare" ? true : false}
      gridLayout={
        {
          tablet: { col: gridLayouts.tablet[layout] },
          desktop: { col: gridLayouts.desktop[layout] },
        } as GridProps
      }
      onClick={() => {
        if (link && layout === 'topic') navigate(link);
      }}
    >
      <CardHeader className="content">
        <h3 className="usa-card__heading">{title}</h3>
      </CardHeader>
      {image && layout !== 'sm' && (
        <CardMedia exdent className="media">
          {imageComponent}
        </CardMedia>
      )}
      {content && (
        <CardBody className="content">
          {typeof content === "string" ? <ReactMarkdown>{content}</ReactMarkdown> : content}
        </CardBody>
      )}
      {layout === 'lg' && link ? (
        <CardFooter>
          <Button
            type="button"
            onClick={() => {
              navigate(link);
            }}
          >
            {linkText}
          </Button>
        </CardFooter>
      ) : layout === 'sm' ? (
        <CardFooter className="smallFooter">{imageComponent}</CardFooter>
      ) : null}
    </CardCmp>
  );
}
