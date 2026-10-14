'use client';

import type { ClipMeta } from '@cliplibrary/schemas';
import Link from 'next/link';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const VideoTile = ({ meta }: { meta: ClipMeta }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      href={`/clips/${meta.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-card transition-transform duration-150 hover:-translate-y-0.5"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {loaded ? null : <Skeleton className="absolute inset-0 rounded-none" />}
        <video
          src={`/exports/${meta.id}.mp4`}
          poster={`/exports/${meta.id}.jpg`}
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
        <span className="font-semibold text-sm tracking-tight">{meta.title}</span>
        <span className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">
          {meta.description}
        </span>
      </div>
    </Link>
  );
};
