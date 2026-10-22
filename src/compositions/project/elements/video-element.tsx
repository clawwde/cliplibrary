import { Video } from '@remotion/media';
import type { VideoElement } from '@/project';
import { MediaPlaceholder } from './media-placeholder';

export const VideoElementView = ({ element }: { element: VideoElement }) => {
  if (element.src === '') {
    return <MediaPlaceholder label="video" />;
  }
  return (
    <Video
      src={element.src}
      objectFit="contain"
      style={{ maxWidth: 1200, maxHeight: 900, borderRadius: 16 }}
    />
  );
};
