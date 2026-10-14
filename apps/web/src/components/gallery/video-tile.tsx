'use client';

import { ProjectComposition } from '@cliplibrary/compositions';
import type { Project } from '@cliplibrary/project';
import { type ClipMeta, categoryLabel } from '@cliplibrary/schemas';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { type ComponentType, useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDuration } from '@/lib/gallery-filters';

const Thumbnail = dynamic(() => import('@remotion/player').then((mod) => mod.Thumbnail), {
  ssr: false,
});

const Composition = ProjectComposition as ComponentType<Record<string, unknown>>;

const useNearViewport = <Node extends HTMLElement>() => {
  const ref = useRef<Node>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (node === null || typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry?.isIntersecting ?? false),
      { rootMargin: '240px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, near };
};

export const VideoTile = ({
  meta,
  project,
  hasVideo,
}: {
  meta: ClipMeta;
  project: Project;
  hasVideo: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);
  const { ref, near } = useNearViewport<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/clips/${meta.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-card transition-transform duration-150 hover:-translate-y-0.5"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {!near || (hasVideo && !loaded) ? (
          <Skeleton className="absolute inset-0 rounded-none" />
        ) : null}
        {near && hasVideo ? (
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
        ) : null}
        {near && !hasVideo ? (
          <Thumbnail
            component={Composition}
            inputProps={project as unknown as Record<string, unknown>}
            durationInFrames={project.durationInFrames}
            fps={project.fps}
            compositionWidth={project.width}
            compositionHeight={project.height}
            frameToDisplay={Math.min(meta.posterFrame, project.durationInFrames - 1)}
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
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
