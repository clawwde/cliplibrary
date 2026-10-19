import { OffthreadVideo } from 'remotion';
import type { VideoElement } from '@/project';
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
