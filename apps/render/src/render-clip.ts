import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { type ClipId, getClipMeta } from '@cliplibrary/schemas';
import { bundle } from '@remotion/bundler';
import { ensureBrowser, renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { compositionsEntry } from './paths';
import { buildRenderMediaOptions, outputExtension, type RenderOptions } from './render-options';

let serveUrlPromise: Promise<string> | null = null;

const getServeUrl = (): Promise<string> => {
  if (serveUrlPromise === null) {
    serveUrlPromise = (async (): Promise<string> => {
      await ensureBrowser();
      return bundle({ entryPoint: compositionsEntry });
    })();
  }
  return serveUrlPromise;
};

export interface RenderClipArgs {
  clipId: ClipId;
  inputProps: Record<string, unknown>;
  outDir: string;
  options: RenderOptions;
  onProgress?: (progress: number) => void;
}

export interface RenderClipResult {
  video: string;
  poster: string;
}

export const renderClip = async ({
  clipId,
  inputProps,
  outDir,
  options,
  onProgress,
}: RenderClipArgs): Promise<RenderClipResult> => {
  const serveUrl = await getServeUrl();
  const composition = await selectComposition({ serveUrl, id: clipId, inputProps });
  const resolved = { ...composition, fps: options.fps ?? composition.fps };

  await mkdir(outDir, { recursive: true });
  const video = join(outDir, `${clipId}.${outputExtension(options.codec)}`);
  const poster = join(outDir, `${clipId}.jpg`);
  const media = buildRenderMediaOptions(options);

  await renderMedia({
    serveUrl,
    composition: resolved,
    inputProps,
    outputLocation: video,
    onProgress: ({ progress }) => onProgress?.(progress),
    ...media,
  });

  await renderStill({
    serveUrl,
    composition: resolved,
    inputProps,
    output: poster,
    frame: Math.min(getClipMeta(clipId).posterFrame, resolved.durationInFrames - 1),
    imageFormat: 'jpeg',
    jpegQuality: options.jpegQuality,
    scale: options.scale,
  });

  return { video, poster };
};
