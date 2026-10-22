'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from '@/components/gallery/use-in-view';
import { Input } from '@/components/ui/input';
import type { PosterPack } from '@/posters/pack';

const previewPath = (packId: string, index: number): string =>
  `/poster-previews/${packId}/${String(index + 1).padStart(2, '0')}.jpg`;

const PackRow = ({
  pack,
  onInsert,
}: {
  pack: PosterPack;
  onInsert: (pack: PosterPack, index: number) => void;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [shown, setShown] = useState(false);
  if (inView && !shown) {
    setShown(true);
  }
  const ratio = pack.meta.height / pack.meta.width;
  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate font-medium text-xs">{pack.meta.title}</span>
        <span className="shrink-0 text-[11px] text-muted-foreground">
          {pack.meta.pageCount} pages
        </span>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {Array.from({ length: pack.meta.pageCount }, (_, index) => (
          <button
            type="button"
            key={previewPath(pack.meta.id, index)}
            aria-label={`Insert ${pack.meta.title} page ${index + 1}`}
            onClick={() => onInsert(pack, index)}
            className="h-20 shrink-0 rounded-md bg-muted bg-center bg-cover ring-violet-500 transition hover:ring-2"
            style={{
              width: 80 / ratio,
              backgroundImage: shown ? `url("${previewPath(pack.meta.id, index)}")` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const TemplatesPanel = ({
  onInsert,
}: {
  onInsert: (pack: PosterPack, index: number) => void;
}) => {
  const [packs, setPacks] = useState<readonly PosterPack[] | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let active = true;
    import('@/posters')
      .then((module) => {
        if (active) {
          setPacks(module.POSTER_PACKS);
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (packs ?? []).filter(
      (pack) =>
        needle === '' ||
        `${pack.meta.title} ${pack.meta.description} ${pack.meta.tags.join(' ')} ${pack.meta.category}`
          .toLowerCase()
          .includes(needle),
    );
  }, [packs, query]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        aria-label="Search templates"
        placeholder="Search templates: hiring, deck, resume"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="h-8"
      />
      <p className="text-[11px] text-muted-foreground">
        Click a page to add it after the current page, resized to this design.
      </p>
      {packs === null ? (
        <Loader2 className="mx-auto size-5 animate-spin text-muted-foreground" />
      ) : (
        visible.map((pack) => <PackRow key={pack.meta.id} pack={pack} onInsert={onInsert} />)
      )}
    </div>
  );
};
