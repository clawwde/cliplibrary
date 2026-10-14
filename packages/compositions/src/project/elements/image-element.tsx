import type { ImageElement } from '@cliplibrary/project';
import { Img } from 'remotion';
import { MediaPlaceholder } from './media-placeholder';

export const ImageElementView = ({ element }: { element: ImageElement }) => {
  if (element.src === '') {
    return <MediaPlaceholder label="image" />;
  }
  return (
    <Img
      src={element.src}
      style={{ maxWidth: 1200, maxHeight: 900, objectFit: 'contain', borderRadius: 16 }}
    />
  );
};
