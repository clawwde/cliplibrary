'use client';

import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { categoryLabel } from '@/schemas/taxonomy';
import type { PosterGalleryItem } from './clip-gallery';
import { useInView } from './use-in-view';

export const PosterTile = ({ meta, previews, width, height }: PosterGalleryItem) => {
  const { ref, inView } = useInView<HTMLElement>();
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(false);
  const visible = inView || seen;
  if (inView && !seen) {
    setSeen(true);
  }
  const current = previews[index] ?? previews[0] ?? '';
  const step = (delta: number) =>
    setIndex((value) => (value + delta + previews.length) % previews.length);
  const href = `/posters/${meta.id}?page=${index + 1}`;

  return (
    <article
      ref={ref}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/25"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {visible ? (
          <div
            aria-hidden
            className="absolute inset-0 scale-110 bg-center bg-cover opacity-60 blur-xl"
            style={{ backgroundImage: `url(${current})` }}
          />
        ) : null}
        <Link
          href={href}
          aria-label={`Edit ${meta.title}, poster ${index + 1} of ${previews.length}`}
          className="absolute inset-0 flex items-center justify-center p-3"
        >
          {visible ? (
            <span
              role="img"
              aria-label={`${meta.title} poster ${index + 1}`}
              className="block h-full max-w-full rounded-md bg-center bg-cover shadow-lg"
              style={{ aspectRatio: `${width} / ${height}`, backgroundImage: `url(${current})` }}
            />
          ) : null}
        </Link>
        {previews.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous poster"
              onClick={() => step(-1)}
              className="absolute top-1/2 left-2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/75 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next poster"
              onClick={() => step(1)}
              className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/75 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <ChevronRight className="size-4" />
            </button>
            <div className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {previews.map((preview, position) => (
                <span
                  key={preview}
                  className={`size-1.5 rounded-full ${position === index ? 'bg-white' : 'bg-white/45'}`}
                />
              ))}
            </div>
          </>
        ) : null}
        <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/55 px-1.5 py-0.5 font-medium text-[11px] text-white tabular-nums backdrop-blur">
          <Images className="size-3" />
          {previews.length}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-3.5 py-3">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={href}
            className="truncate font-semibold text-sm tracking-tight hover:underline"
          >
            {meta.title}
          </Link>
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
    </article>
  );
};
