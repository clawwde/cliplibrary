'use client';

import dynamic from 'next/dynamic';
import { DesignEditorSkeleton } from '@/components/skeletons';
import type { Design } from '@/design';

const pageIndexFrom = (value: string | null, pageCount: number): number => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= pageCount ? parsed - 1 : 0;
};

interface PosterEditorProps {
  packId: string;
  design: Design;
}

export const PosterEditor = dynamic(
  () =>
    import('./design-editor').then(({ DesignEditor }) => {
      const PosterDesignEditor = ({ packId, design }: PosterEditorProps) => (
        <DesignEditor
          initialDesign={design}
          initialPageIndex={pageIndexFrom(
            new URLSearchParams(window.location.search).get('page'),
            design.pages.length,
          )}
          storageKey={`cliplibrary-poster:${packId}`}
          backHref="/?type=poster"
          initialPanel="elements"
        />
      );
      return PosterDesignEditor;
    }),
  { ssr: false, loading: () => <DesignEditorSkeleton /> },
);
