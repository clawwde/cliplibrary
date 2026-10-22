import 'server-only';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { VideoGalleryItem } from '@/components/gallery/clip-gallery';
import { videoMeta } from '@/lib/gallery-filters';
import { CLIP_REGISTRY, type ClipMeta } from '@/schemas';
import { repoRoot } from './repo-root';

const galleryPreviews = (root: string): string => join(root, 'public', 'previews');

const readFirstFrame = async (root: string, meta: ClipMeta): Promise<string | null> => {
  try {
    const bytes = await readFile(join(galleryPreviews(root), `${meta.id}.first-frame.jpg`));
    return `data:image/jpeg;base64,${bytes.toString('base64')}`;
  } catch {
    return null;
  }
};

export const listClips = (): Promise<VideoGalleryItem[]> => {
  const root = repoRoot();
  return Promise.all(
    CLIP_REGISTRY.map(async (meta) => ({
      kind: 'video' as const,
      meta: videoMeta(meta),
      video: existsSync(join(galleryPreviews(root), `${meta.id}.mp4`))
        ? `/previews/${meta.id}.mp4`
        : null,
      firstFrame: await readFirstFrame(root, meta),
    })),
  );
};
