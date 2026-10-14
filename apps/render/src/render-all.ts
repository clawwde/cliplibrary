import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { readProps } from '@cliplibrary/core';
import { CLIP_REGISTRY } from '@cliplibrary/schemas';
import { bundle } from '@remotion/bundler';
import { ensureBrowser, renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { compositionsEntry, publicExportsDir, repoRoot } from './paths';

const main = async (): Promise<void> => {
  await ensureBrowser();
  await mkdir(publicExportsDir, { recursive: true });
  console.info('Bundling compositions...');
  const serveUrl = await bundle({ entryPoint: compositionsEntry });

  for (const meta of CLIP_REGISTRY) {
    const props = await readProps(repoRoot, meta.id);
    const inputProps = props.values as Record<string, unknown>;
    console.info(`Rendering ${meta.id}...`);
    const composition = await selectComposition({ serveUrl, id: meta.id, inputProps });
    await renderMedia({
      serveUrl,
      composition,
      codec: 'h264',
      crf: 23,
      outputLocation: join(publicExportsDir, `${meta.id}.mp4`),
      inputProps,
    });
    await renderStill({
      serveUrl,
      composition,
      frame: Math.min(meta.posterFrame, composition.durationInFrames - 1),
      output: join(publicExportsDir, `${meta.id}.jpg`),
      imageFormat: 'jpeg',
      jpegQuality: 82,
      inputProps,
    });
    console.info(`  done ${meta.id}`);
  }

  console.info('All clips rendered to apps/web/public/exports.');
};

await main();
