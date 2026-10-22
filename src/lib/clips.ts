import 'server-only';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CLIP_REGISTRY, type ClipId, type ClipMeta } from '@/schemas';
import { repoRoot } from './repo-root';

const galleryPreviews = (root: string): string => join(root, 'public', 'previews');

export const clipPreviewVideo = (id: ClipId): string | null =>
  existsSync(join(galleryPreviews(repoRoot()), `${id}.mp4`)) ? `/previews/${id}.mp4` : null;

const readFirstFrame = async (root: string, meta: ClipMeta): Promise<string | null> => {
  try {
    const bytes = await readFile(join(galleryPreviews(root), `${meta.id}.first-frame.jpg`));
    return `data:image/jpeg;base64,${bytes.toString('base64')}`;
  } catch {
    return null;
  }
};

export interface ClipListItem {
  meta: ClipMeta;
  video: string | null;
  firstFrame: string | null;
}

export const listClips = (): Promise<ClipListItem[]> => {
  const root = repoRoot();
  return Promise.all(
    CLIP_REGISTRY.map(async (meta) => ({
      meta,
      video: clipPreviewVideo(meta.id),
      firstFrame: await readFirstFrame(root, meta),
    })),
  );
};
