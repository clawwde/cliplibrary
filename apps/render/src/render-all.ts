import { readProject } from '@cliplibrary/core';
import { CLIP_REGISTRY, isClipId } from '@cliplibrary/schemas';
import { publicExportsDir, repoRoot } from './paths';
import { renderGalleryPreview } from './render-gallery-preview';

const main = async (): Promise<void> => {
  const only = process.argv.slice(2).filter(isClipId);
  const clips =
    only.length > 0 ? CLIP_REGISTRY.filter((meta) => only.includes(meta.id)) : CLIP_REGISTRY;
  for (const meta of clips) {
    console.info(`Rendering ${meta.id}...`);
    const { project } = await readProject(repoRoot, meta.id);
    await renderGalleryPreview(project, publicExportsDir, meta.id);
    console.info(`  done ${meta.id}`);
  }

  console.info('Gallery previews rendered to apps/web/public/exports.');
};

await main();
