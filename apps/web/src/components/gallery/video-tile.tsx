'use client';

import { CLIP_COMPONENTS } from '@cliplibrary/compositions';
import type { ClipMeta } from '@cliplibrary/schemas';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { type FC, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Thumbnail = dynamic(() => import('@remotion/player').then((mod) => mod.Thumbnail), {
  ssr: false,
});

export const VideoTile = ({
  meta,
  values,
  hasVideo,
}: {
  meta: ClipMeta;
  values: Record<string, unknown>;
  hasVideo: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);
  const Component = CLIP_COMPONENTS[meta.id] as FC<Record<string, unknown>>;

  return (
    <Link
      href={`/clips/${meta.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-card transition-transform duration-150 hover:-translate-y-0.5"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {hasVideo && !loaded ? <Skeleton className="absolute inset-0 rounded-none" /> : null}
        {hasVideo ? (
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
        ) : (
          <Thumbnail
            component={Component}
            inputProps={values}
            durationInFrames={meta.durationInFrames}
            fps={meta.fps}
            compositionWidth={meta.width}
            compositionHeight={meta.height}
            frameToDisplay={meta.posterFrame}
            style={{ width: '100%', height: '100%' }}
          />
        )}
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
