import { buildLibraryProject, LIBRARY_CLIP_META } from '@cliplibrary/project';
import { publicExportsDir } from './paths';
import { DEFAULT_RENDER_OPTIONS } from './render-options';
import { renderProject } from './render-project';

const main = async (): Promise<void> => {
  for (const meta of LIBRARY_CLIP_META) {
    console.info(`Rendering ${meta.id}...`);
    await renderProject({
      project: buildLibraryProject(meta.id),
      outDir: publicExportsDir,
      options: DEFAULT_RENDER_OPTIONS,
      name: meta.id,
    });
    console.info(`  done ${meta.id}`);
  }

  console.info('All clips rendered to apps/web/public/exports.');
};

await main();
