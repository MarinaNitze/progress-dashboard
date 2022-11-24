import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
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
  image?: string | ReactNode;
  imgAlt?: string;
  link?: string;
  linkText?: string;
  content?: string | ReactElement;
  placeholderHiddenContent?: string | ReactElement;
  showText?: string | ReactElement;
  hideText?: string | ReactElement;
  forceHide?: boolean | undefined;
  defaultHidden?: boolean;
  dataCy?: string;
  className?: string;
};

const gridLayouts = {
  tablet: { topic: true, sm: 6, md: 12, lg: 12, compare: 4 },
  desktop: { topic: true, sm: 4, md: 8, lg: 12, compare: 3 },
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
  placeholderHiddenContent,
  showText,
  hideText,
  forceHide,
  defaultHidden = false,
  dataCy,
  layout = 'lg',
}: CardProps) {
  let imageComponent;
  if (typeof image !== 'string') {
    imageComponent = image;
  } else {
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
  }

  const [isHidden, setIsHidden] = useState(forceHide ?? defaultHidden);
  useEffect(() => {
    if (typeof forceHide === 'boolean') {
      setIsHidden(forceHide);
    }
  }, [forceHide]);

  return (
    <CardCmp
      data-cy={dataCy ?? ''}
      className={`card ${className ?? ''} `}
      containerProps={{ className: layout }}
      layout={mediaLayout(layout)}
      headerFirst={layout === 'compare' ? true : false}
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
          {isHidden ? (
            placeholderHiddenContent ?? ''
          ) : typeof content === 'string' ? (
            <ReactMarkdown>{content}</ReactMarkdown>
          ) : (
            content
          )}

          {
            // Only include show/hide button if text is provided
            showText && hideText ? (
              <button onClick={() => setIsHidden(h => !h)}>
                {isHidden ? showText : hideText}
              </button>
            ) : (
              ''
            )
          }
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
