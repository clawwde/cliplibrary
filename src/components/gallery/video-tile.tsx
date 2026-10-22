'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '@/lib/gallery-filters';
import { categoryLabel } from '@/schemas/taxonomy';
import type { VideoGalleryItem } from './clip-gallery';
import { useInView } from './use-in-view';

const ClipVideo = ({ src, inView }: { src: string; inView: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (inView) {
      setRequested(true);
    }
  }, [inView]);

  useEffect(() => {
    const video = videoRef.current;
    if (video === null || !requested) {
      return;
    }
    if (inView) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, requested]);

  return (
    <video
      ref={videoRef}
      src={requested ? src : undefined}
      muted
      loop
      playsInline
      preload="none"
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${playing ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

export const VideoTile = ({ meta, video, firstFrame }: VideoGalleryItem) => {
  const { ref, inView } = useInView<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/clips/${meta.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/25"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {firstFrame === null ? null : (
          <Image
            src={firstFrame}
            alt=""
            fill
            unoptimized
            className="scale-110 object-cover blur-sm"
          />
        )}
        {video === null ? (
          <span className="absolute inset-0 grid place-items-center px-4 text-center text-muted-foreground text-xs">
            No preview yet. Run bun run render.
          </span>
        ) : (
          <ClipVideo src={video} inView={inView} />
        )}
        <span className="absolute top-2 right-2 rounded-md bg-black/55 px-1.5 py-0.5 font-medium text-[11px] text-white tabular-nums backdrop-blur">
          {formatDuration(meta)}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-3.5 py-3">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-semibold text-sm tracking-tight">{meta.title}</span>
          <span
            className={`size-2.5 shrink-0 rounded-full border ${meta.theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-100'}`}
            role="img"
            aria-label={`${meta.theme} theme`}
          />
        </div>
        <span className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">
          {meta.description}
        </span>
        <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="rounded-full bg-muted px-2 py-0.5 font-medium">
            {categoryLabel(meta.category)}
          </span>
          {meta.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
