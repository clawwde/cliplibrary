'use client';

import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { PosterGalleryItem } from './clip-gallery';
import { TILE_FRAME, TileBadge, TileCaption } from './tile-caption';
import { useInView } from './use-in-view';

const STEP_BUTTON =
  'absolute top-1/2 grid size-7 -translate-y-1/2 sm:size-8 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-md transition-opacity hover:bg-black/70 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100';

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
      aria-label={meta.title}
      className={TILE_FRAME}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Link
        href={href}
        aria-label={`Edit ${meta.title}, poster ${index + 1} of ${previews.length}`}
        className="absolute inset-0"
      >
        {visible ? (
          <Image
            src={current}
            alt={`${meta.title} poster ${index + 1}`}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </Link>
      <TileBadge>
        <Images className="size-3" />
        {previews.length}
      </TileBadge>
      {previews.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous poster"
            onClick={() => step(-1)}
            className={`${STEP_BUTTON} left-2`}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next poster"
            onClick={() => step(1)}
            className={`${STEP_BUTTON} right-2`}
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      ) : null}
      <TileCaption title={meta.title} category={meta.category}>
        {previews.length > 1 ? (
          <span className="hidden shrink-0 gap-1 pb-1 [@media(hover:hover)]:flex">
            {previews.map((preview, position) => (
              <span
                key={preview}
                className={`size-1.5 rounded-full ${position === index ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </span>
        ) : null}
      </TileCaption>
    </article>
  );
};
