'use client';

import { CLIP_COMPONENTS } from '@cliplibrary/compositions';
import type { ClipMeta } from '@cliplibrary/schemas';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { type FC, useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Player = dynamic(() => import('@remotion/player').then((mod) => mod.Player), { ssr: false });

export const VideoTile = ({
  meta,
  values,
}: {
  meta: ClipMeta;
  values: Record<string, unknown>;
}) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (element === null) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const Component = CLIP_COMPONENTS[meta.id] as FC<Record<string, unknown>>;

  return (
    <Link
      ref={ref}
      href={`/clips/${meta.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-card transition-transform duration-150 hover:-translate-y-0.5"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <Skeleton className="absolute inset-0 rounded-none" />
        {inView ? (
          <div className="absolute inset-0 [&_*]:pointer-events-none">
            <Player
              component={Component}
              inputProps={values}
              durationInFrames={meta.durationInFrames}
              fps={meta.fps}
              compositionWidth={meta.width}
              compositionHeight={meta.height}
              autoPlay
              loop
              controls={false}
              acknowledgeRemotionLicense
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : null}
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
