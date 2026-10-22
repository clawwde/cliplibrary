'use client';

import type { GalleryItem } from './clip-gallery';
import { PosterTile } from './poster-tile';
import { VideoTile } from './video-tile';

export const GalleryTile = (item: GalleryItem) =>
  item.kind === 'video' ? <VideoTile {...item} /> : <PosterTile {...item} />;
