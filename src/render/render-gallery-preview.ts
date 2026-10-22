import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { renderStill, selectComposition } from '@remotion/renderer';
import type { Project } from '@/project';
import {
  BROWSER_RENDER_OPTIONS,
  DEFAULT_RENDER_OPTIONS,
  outputExtension,
  type RenderOptions,
} from './render-options';
import { renderProject } from './render-project';
import { getServeUrl } from './serve-url';

const GALLERY_PREVIEW_OPTIONS: RenderOptions = {
  ...DEFAULT_RENDER_OPTIONS,
  scale: 0.5,
  crf: 26,
};

const FIRST_FRAME_WIDTH = 48;

const firstFrameFileName = (name: string): string => `${name}.first-frame.jpg`;

export const galleryPreviewFileNames = (name: string): string[] => [
  `${name}.${outputExtension(GALLERY_PREVIEW_OPTIONS.codec)}`,
  firstFrameFileName(name),
];

const renderFirstFrame = async (project: Project, output: string): Promise<void> => {
  const serveUrl = await getServeUrl();
  const inputProps = project as unknown as Record<string, unknown>;
  const composition = await selectComposition({
    ...BROWSER_RENDER_OPTIONS,
    serveUrl,
    id: 'project',
    inputProps,
  });
  await renderStill({
    ...BROWSER_RENDER_OPTIONS,
    serveUrl,
    composition,
    inputProps,
    output,
    frame: 0,
    imageFormat: 'jpeg',
    jpegQuality: 70,
    scale: FIRST_FRAME_WIDTH / composition.width,
  });
};

export const renderGalleryPreview = async (
  project: Project,
  outDir: string,
  name: string,
): Promise<void> => {
  const { poster } = await renderProject({
    project,
    outDir,
    options: GALLERY_PREVIEW_OPTIONS,
    name,
  });
  await rm(poster, { force: true });
  await renderFirstFrame(project, join(outDir, firstFrameFileName(name)));
};
