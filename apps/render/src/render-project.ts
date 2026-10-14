import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { Project } from '@cliplibrary/project';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { buildRenderMediaOptions, outputExtension, type RenderOptions } from './render-options';
import { getServeUrl } from './serve-url';

const PROJECT_COMPOSITION_ID = 'project';

export interface RenderProjectArgs {
  project: Project;
  outDir: string;
  options: RenderOptions;
  onProgress?: (progress: number) => void;
}

export interface RenderProjectResult {
  video: string;
  poster: string;
}

export const renderProject = async ({
  project,
  outDir,
  options,
  onProgress,
}: RenderProjectArgs): Promise<RenderProjectResult> => {
  const serveUrl = await getServeUrl();
  const inputProps = project as unknown as Record<string, unknown>;
  const composition = await selectComposition({
    serveUrl,
    id: PROJECT_COMPOSITION_ID,
    inputProps,
  });

  await mkdir(outDir, { recursive: true });
  const video = join(outDir, `${PROJECT_COMPOSITION_ID}.${outputExtension(options.codec)}`);
  const poster = join(outDir, `${PROJECT_COMPOSITION_ID}.jpg`);
  const media = buildRenderMediaOptions(options);

  await renderMedia({
    serveUrl,
    composition,
    inputProps,
    outputLocation: video,
    onProgress: ({ progress }) => onProgress?.(progress),
    ...media,
  });

  await renderStill({
    serveUrl,
    composition,
    inputProps,
    output: poster,
    frame: Math.min(Math.floor(composition.durationInFrames / 3), composition.durationInFrames - 1),
    imageFormat: 'jpeg',
    jpegQuality: options.jpegQuality,
    scale: options.scale,
  });

  return { video, poster };
};
