'use client';

import type { ExportRecord } from '@cliplibrary/core';
import { getClipMeta } from '@cliplibrary/schemas';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ExportTile = ({ record }: { record: ExportRecord }) => {
  const [loaded, setLoaded] = useState(false);
  const title = getClipMeta(record.clipId).title;
  const createdAt = new Date(record.createdAt).toLocaleString();

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-card">
      <div className="relative aspect-video overflow-hidden bg-black">
        {loaded ? null : <Skeleton className="absolute inset-0 rounded-none" />}
        <video
          src={record.mp4}
          poster={record.poster}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
          className="size-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 px-3.5 py-3">
        <span className="font-semibold text-sm tracking-tight">{title}</span>
        <span className="text-muted-foreground text-xs">{createdAt}</span>
      </div>
    </div>
  );
};
