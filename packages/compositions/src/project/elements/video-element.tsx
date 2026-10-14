import type { VideoElement } from '@cliplibrary/project';
import { OffthreadVideo } from 'remotion';
import { MediaPlaceholder } from './media-placeholder';

export const VideoElementView = ({ element }: { element: VideoElement }) => {
  if (element.src === '') {
    return <MediaPlaceholder label="video" />;
  }
  return (
    <OffthreadVideo
      src={element.src}
      style={{ maxWidth: 1200, maxHeight: 900, objectFit: 'contain', borderRadius: 16 }}
    />
  );
};
