'use client';

import { useEffect, useState } from 'react';
import type { Design, Page } from '@/design';
import { renderPageDataUrl } from './render-page';

let queue: Promise<unknown> = Promise.resolve();

const enqueueRender = <T>(task: () => Promise<T>): Promise<T> => {
  const next = queue.then(task, task);
  queue = next.catch(() => undefined);
  return next;
};

export const usePageThumbnail = (
  design: Pick<Design, 'width' | 'height'>,
  page: Page | undefined,
  width: number,
  delay = 400,
): string | null => {
  const [url, setUrl] = useState<string | null>(null);
  const { width: designWidth, height: designHeight } = design;

  useEffect(() => {
    if (page === undefined) {
      return;
    }
    let active = true;
    const timer = setTimeout(() => {
      enqueueRender(() =>
        active
          ? renderPageDataUrl({ width: designWidth, height: designHeight }, page, {
              pixelRatio: (width * 2) / designWidth,
              mimeType: 'image/jpeg',
              quality: 0.85,
            })
          : Promise.resolve(null),
      )
        .then((result) => {
          if (active && result !== null) {
            setUrl(result);
          }
        })
        .catch(() => undefined);
    }, delay);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [page, designWidth, designHeight, width, delay]);

  return url;
};
