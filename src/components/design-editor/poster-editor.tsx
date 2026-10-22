'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import type { Design } from '@/design';
import { DesignEditorClient } from './design-editor-client';

const pageIndexFrom = (value: string | null, pageCount: number): number => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= pageCount ? parsed - 1 : 0;
};

const PosterEditorWithPage = ({ packId, design }: { packId: string; design: Design }) => {
  const params = useSearchParams();
  return (
    <DesignEditorClient
      initialDesign={design}
      initialPageIndex={pageIndexFrom(params.get('page'), design.pages.length)}
      storageKey={`cliplibrary-poster:${packId}`}
      backHref="/?type=poster"
      initialPanel="elements"
    />
  );
};

export const PosterEditor = ({ packId, design }: { packId: string; design: Design }) => (
  <Suspense fallback={null}>
    <PosterEditorWithPage packId={packId} design={design} />
  </Suspense>
);
