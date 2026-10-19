'use client';

import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { ExportRecord } from '@/core';
import { getClipMeta } from '@/schemas';

const formatCreatedAt = (iso: string): string =>
  new Date(iso).toISOString().replace('T', ' ').slice(0, 16);

export const ExportTile = ({ record }: { record: ExportRecord }) => {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);
  const title = getClipMeta(record.clipId).title;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-card">
      <div className="relative aspect-video overflow-hidden bg-black">
        {loaded || broken ? null : <Skeleton className="absolute inset-0 rounded-none" />}
        {broken ? null : (
          <video
            src={record.mp4}
            poster={record.poster}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            onLoadedData={() => setLoaded(true)}
            onError={() => setBroken(true)}
            className="size-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-1 px-3.5 py-3">
        <span className="font-semibold text-sm tracking-tight">{title}</span>
        <span className="text-muted-foreground text-xs">{formatCreatedAt(record.createdAt)}</span>
      </div>
    </div>
  );
};
