import type { PosterGalleryItem } from '@/components/gallery/clip-gallery';
import { POSTER_PACK_META, posterPreviewPath, posterUpdatedAt } from '@/posters';

export const listPosters = (): PosterGalleryItem[] =>
  POSTER_PACK_META.map((meta) => ({
    kind: 'poster',
    meta: {
      id: meta.id,
      kind: 'poster',
      title: meta.title,
      description: meta.description,
      category: meta.category,
      tags: meta.tags,
      theme: meta.theme,
      durationInFrames: 0,
      fps: 30,
      updatedAt: posterUpdatedAt(meta.id),
    },
    previews: Array.from({ length: meta.pageCount }, (_, index) =>
      posterPreviewPath(meta.id, index),
    ),
    width: meta.width,
    height: meta.height,
  }));
