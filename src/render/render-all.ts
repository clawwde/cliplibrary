import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { seedProjectForClip } from '@/core';
import { CLIP_REGISTRY, isClipId } from '@/schemas';
import { galleryPreviewsDir } from './paths';
import { galleryPreviewFileNames, renderGalleryPreview } from './render-gallery-preview';

const NEW_ONLY_FLAGS = new Set(['--new', '-new']);

const isRendered = (name: string): boolean =>
  galleryPreviewFileNames(name).every((file) => existsSync(join(galleryPreviewsDir, file)));

const main = async (): Promise<void> => {
  const args = process.argv.slice(2);
  const newOnly = args.some((arg) => NEW_ONLY_FLAGS.has(arg));
  const only = args.filter(isClipId);
  const selected =
    only.length > 0 ? CLIP_REGISTRY.filter((meta) => only.includes(meta.id)) : CLIP_REGISTRY;
  const clips = newOnly ? selected.filter((meta) => !isRendered(meta.id)) : selected;
  if (clips.length === 0) {
    console.info('No new clips to render.');
    return;
  }

  for (const meta of clips) {
    console.info(`Rendering ${meta.id}...`);
    await renderGalleryPreview(seedProjectForClip(meta.id), galleryPreviewsDir, meta.id);
    console.info(`  done ${meta.id}`);
  }

  console.info('Gallery previews rendered to public/previews.');
};

await main();
