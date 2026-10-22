'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { type GalleryFilters, parseFilters, serializeFilters } from '@/lib/gallery-filters';
import { ClipGallery, type GalleryItem } from './clip-gallery';
import { GalleryTile } from './gallery-tile';

const QUERY_DEBOUNCE_MS = 200;

export const ClipGalleryRoute = ({ items }: { items: GalleryItem[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = useMemo(() => parseFilters(new URLSearchParams(params.toString())), [params]);
  const [query, setQuery] = useState(filters.query);

  const navigate = useCallback(
    (next: GalleryFilters) =>
      router.replace(`${pathname}${serializeFilters(next)}`, { scroll: false }),
    [router, pathname],
  );

  useEffect(() => {
    if (query === filters.query) {
      return;
    }
    const timer = window.setTimeout(() => navigate({ ...filters, query }), QUERY_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query, filters, navigate]);

  return (
    <ClipGallery
      items={items}
      Tile={GalleryTile}
      filters={filters}
      query={query}
      onQueryChange={setQuery}
      onChange={(next) => navigate({ ...next, query })}
    />
  );
};
