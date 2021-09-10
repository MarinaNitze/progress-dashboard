// import { File, ImageSharp, ImagesQuery } from '../../graphql-types';
import { ImageSharp } from '../../graphql-types';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import { CardProps } from "../components/card/Card";

// type images = { edges: Array<{ node: (
//         Pick<File, 'relativePath' | 'extension' | 'publicURL'>
//         & ImageDataLike
//       ) }> }

type useGatsbyImageProps = {
  images: any,
  path: string,
  layout?: CardProps["layout"],
  alt?: string | undefined
}

export default function useGatsbyImage({images, path, layout, alt} : useGatsbyImageProps ): React.FC {
  const imageNode: any = images?.edges.find( (edge: any) => edge?.node?.relativePath === path)?.node
  if( imageNode.extension === "svg") {
    const svgImage = imageNode.publicURL;
    return svgImage && (
      <img src={svgImage} alt={alt ?? path} />
    );
  } else {
    const gatsbyImage: ImageSharp["gatsbyImageData"] | undefined = imageNode && getImage(imageNode);
      return gatsbyImage && (
      <GatsbyImage
        className={layout !== 'sm' ? 'image' : ''}
        image={gatsbyImage}
        alt={alt ?? path}
      />
    );
  }
}