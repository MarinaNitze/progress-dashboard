import React from 'react';
import { ImageSharp } from '../../graphql-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { CardProps } from '../components/card/Card';

type useGatsbyImageProps = {
  images: any;
  path: string;
  layout?: CardProps['layout'];
  alt?: string | undefined;
};

export default function useGatsbyImage({
  images,
  path,
  layout,
  alt,
}: useGatsbyImageProps): React.FC {
  const imageNode: any = images?.edges.find(
    (edge: any) => edge?.node?.relativePath === path,
  )?.node;
  if (imageNode.extension === 'svg') {
    const svgImage = imageNode.publicURL;
    return svgImage && <img src={svgImage} alt={alt ?? path} />;
  } else {
    const gatsbyImage: ImageSharp['gatsbyImageData'] | undefined =
      imageNode && getImage(imageNode);
    return (
      gatsbyImage && (
        <GatsbyImage
          className={layout !== 'sm' ? 'image' : ''}
          image={gatsbyImage}
          alt={alt ?? path}
        />
      )
    );
  }
}
