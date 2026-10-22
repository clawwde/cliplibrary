import type { PosterPack, PosterPackMeta } from './pack';
import { POSTER_PACKS } from './packs';

export * from './pack';
export * from './photos';
export { POSTER_PACKS };

export const POSTER_PACK_META: readonly PosterPackMeta[] = POSTER_PACKS.map((pack) => pack.meta);

export const findPosterPack = (id: string): PosterPack | undefined =>
  POSTER_PACKS.find((pack) => pack.meta.id === id);

export const posterPreviewPath = (packId: string, pageIndex: number): string =>
  `/poster-previews/${packId}/${String(pageIndex + 1).padStart(2, '0')}.jpg`;
