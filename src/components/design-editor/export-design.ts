'use client';

import { type Design, designSchema } from '@/design';
import { renderPageBlob, renderPageDataUrl } from './render-page';

export const designFileName = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'design';

const downloadBlob = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const exportPages = async (
  design: Design,
  pageIds: readonly string[],
  format: 'png' | 'jpg',
  scale: number,
  transparent = false,
): Promise<void> => {
  const base = designFileName(design.title);
  const pages = design.pages
    .filter((page) => pageIds.includes(page.id))
    .map((page) =>
      transparent && format === 'png' ? { ...page, background: 'rgba(0,0,0,0)' } : page,
    );
  await pages.reduce<Promise<void>>(
    (previous, page, index) =>
      previous.then(async () => {
        const blob = await renderPageBlob(design, page, {
          pixelRatio: scale,
          mimeType: format === 'png' ? 'image/png' : 'image/jpeg',
          quality: 0.95,
        });
        const suffix = pages.length > 1 ? `-${index + 1}` : '';
        downloadBlob(blob, `${base}${suffix}.${format}`);
      }),
    Promise.resolve(),
  );
};

export const exportPdf = async (design: Design, scale: number): Promise<void> => {
  const { jsPDF } = await import('jspdf');
  const orientation = design.width >= design.height ? 'landscape' : 'portrait';
  const pdf = new jsPDF({
    orientation,
    unit: 'px',
    format: [design.width, design.height],
    hotfixes: ['px_scaling'],
    compress: true,
  });
  await design.pages.reduce<Promise<void>>(
    (previous, page, index) =>
      previous.then(async () => {
        const dataUrl = await renderPageDataUrl(design, page, {
          pixelRatio: scale,
          mimeType: 'image/jpeg',
          quality: 0.92,
        });
        if (index > 0) {
          pdf.addPage([design.width, design.height], orientation);
        }
        pdf.addImage(dataUrl, 'JPEG', 0, 0, design.width, design.height);
      }),
    Promise.resolve(),
  );
  pdf.save(`${designFileName(design.title)}.pdf`);
};

export const exportJson = (design: Design): void => {
  downloadBlob(
    new Blob([JSON.stringify(design, null, 2)], { type: 'application/json' }),
    `${designFileName(design.title)}.json`,
  );
};

export const parseDesignJson = (text: string): Design | null => {
  try {
    const parsed = designSchema.safeParse(JSON.parse(text));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
};
