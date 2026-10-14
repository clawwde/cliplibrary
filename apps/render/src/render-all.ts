import { readProject } from '@cliplibrary/core';
import { CLIP_REGISTRY } from '@cliplibrary/schemas';
import { publicExportsDir, repoRoot } from './paths';
import { DEFAULT_RENDER_OPTIONS } from './render-options';
import { renderProject } from './render-project';

const main = async (): Promise<void> => {
  for (const meta of CLIP_REGISTRY) {
    console.info(`Rendering ${meta.id}...`);
    const { project } = await readProject(repoRoot, meta.id);
    await renderProject({
      project,
      outDir: publicExportsDir,
      options: DEFAULT_RENDER_OPTIONS,
      name: meta.id,
    });
    console.info(`  done ${meta.id}`);
  }

  console.info('All clips rendered to apps/web/public/exports.');
};

await main();
