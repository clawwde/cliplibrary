import type { Project } from '../project';
import { dataClips } from './data-clips';
import { showcaseClips } from './showcase-clips';
import { textClips } from './text-clips';
import type { LibraryClip, LibraryClipId, LibraryClipMeta } from './types';

export type { LibraryClip, LibraryClipId, LibraryClipMeta } from './types';
export { LIBRARY_CLIP_IDS } from './types';

export const LIBRARY_CLIPS: readonly LibraryClip[] = [...textClips, ...dataClips, ...showcaseClips];

const LIBRARY_BY_ID = Object.fromEntries(
  LIBRARY_CLIPS.map((clip) => [clip.meta.id, clip]),
) as Record<LibraryClipId, LibraryClip>;

export const LIBRARY_CLIP_META: readonly LibraryClipMeta[] = LIBRARY_CLIPS.map((clip) => clip.meta);

export const isLibraryClipId = (value: string): value is LibraryClipId =>
  Object.hasOwn(LIBRARY_BY_ID, value);

export const getLibraryClip = (id: LibraryClipId): LibraryClip => LIBRARY_BY_ID[id];

export const getLibraryClipMeta = (id: LibraryClipId): LibraryClipMeta => LIBRARY_BY_ID[id].meta;

export const buildLibraryProject = (id: LibraryClipId): Project => LIBRARY_BY_ID[id].build();
