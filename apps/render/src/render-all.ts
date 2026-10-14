import { readProps } from '@cliplibrary/core';
import { CLIP_REGISTRY } from '@cliplibrary/schemas';
import { publicExportsDir, repoRoot } from './paths';
import { renderClip } from './render-clip';
import { DEFAULT_RENDER_OPTIONS } from './render-options';

const main = async (): Promise<void> => {
  for (const meta of CLIP_REGISTRY) {
    const props = await readProps(repoRoot, meta.id);
    console.info(`Rendering ${meta.id}...`);
    await renderClip({
      clipId: meta.id,
      inputProps: props.values as Record<string, unknown>,
      outDir: publicExportsDir,
      options: DEFAULT_RENDER_OPTIONS,
    });
    console.info(`  done ${meta.id}`);
  }

  console.info('All clips rendered to apps/web/public/exports.');
};

await main();
