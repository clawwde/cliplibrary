'use client';

import type Konva from 'konva';
import { createRoot } from 'react-dom/client';
import { type Design, iconDataUrl, type Page } from '@/design';
import { loadFontFamilies } from './font-loader';
import { loadImage } from './image-cache';
import { PageStage } from './page-content';

const PLACEHOLDER_ICON = iconDataUrl('image', '#94a3b8', 1.5, 256);

const pageImageSources = (page: Page): string[] =>
  page.elements.flatMap((element) => {
    if (element.type === 'image') {
      return [element.src === '' ? PLACEHOLDER_ICON : element.src];
    }
    if (element.type === 'icon') {
      return [iconDataUrl(element.icon, element.color, element.strokeWidth)];
    }
    return [];
  });

const pageFontFamilies = (page: Page): string[] =>
  page.elements.flatMap((element) => (element.type === 'text' ? [element.fontFamily] : []));

const preloadPage = async (page: Page): Promise<void> => {
  await Promise.all([
    loadFontFamilies(pageFontFamilies(page)),
    ...pageImageSources(page).map(loadImage),
  ]);
};

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

const waitForStage = async (
  mounted: { stage: Konva.Stage | null },
  attempts: number,
): Promise<Konva.Stage | null> => {
  if (mounted.stage !== null || attempts <= 0) {
    return mounted.stage;
  }
  await nextFrame();
  return waitForStage(mounted, attempts - 1);
};

export interface RenderPageOptions {
  pixelRatio: number;
  mimeType?: 'image/png' | 'image/jpeg';
  quality?: number;
}

const renderPageCanvas = async (
  design: Pick<Design, 'width' | 'height'>,
  page: Page,
  { pixelRatio }: Pick<RenderPageOptions, 'pixelRatio'>,
): Promise<HTMLCanvasElement> => {
  await preloadPage(page);
  const host = document.createElement('div');
  host.style.position = 'fixed';
  host.style.left = '-100000px';
  host.style.top = '0';
  document.body.appendChild(host);
  const root = createRoot(host);
  const mounted: { stage: Konva.Stage | null } = { stage: null };
  try {
    root.render(
      <PageStage
        page={page}
        width={design.width}
        height={design.height}
        scale={1}
        fontsVersion={1}
        stageRef={(node) => {
          mounted.stage = node;
        }}
      />,
    );
    const stage = await waitForStage(mounted, 30);
    if (stage === null) {
      throw new Error('Page stage did not mount');
    }
    await nextFrame();
    await nextFrame();
    return stage.toCanvas({ pixelRatio });
  } finally {
    root.unmount();
    host.remove();
  }
};

export const renderPageDataUrl = async (
  design: Pick<Design, 'width' | 'height'>,
  page: Page,
  { pixelRatio, mimeType = 'image/png', quality = 0.92 }: RenderPageOptions,
): Promise<string> => {
  const canvas = await renderPageCanvas(design, page, { pixelRatio });
  return canvas.toDataURL(mimeType, quality);
};

export const renderPageBlob = async (
  design: Pick<Design, 'width' | 'height'>,
  page: Page,
  { pixelRatio, mimeType = 'image/png', quality = 0.92 }: RenderPageOptions,
): Promise<Blob> => {
  const canvas = await renderPageCanvas(design, page, { pixelRatio });
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob === null ? reject(new Error('Export failed')) : resolve(blob)),
      mimeType,
      quality,
    );
  });
};
