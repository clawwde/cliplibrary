'use client';

import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { type ComponentType, useLayoutEffect, useRef, useState } from 'react';

const MIN_TILE_WIDTH = 288;
const GAP = 20;
const ESTIMATED_ROW_HEIGHT = 330;
const OVERSCAN_ROWS = 3;
const SERVER_RENDERED_ITEMS = 12;

interface GridLayout {
  columns: number;
  offset: number;
}

const columnsFor = (width: number): number =>
  Math.max(1, Math.floor((width + GAP) / (MIN_TILE_WIDTH + GAP)));

const sameLayout = (left: GridLayout | null, right: GridLayout): boolean =>
  left !== null && left.columns === right.columns && left.offset === right.offset;

interface VirtualGridProps<Item> {
  items: readonly Item[];
  itemKey: (item: Item) => string;
  Tile: ComponentType<Item>;
}

export const VirtualGrid = <Item extends object>({
  items,
  itemKey,
  Tile,
}: VirtualGridProps<Item>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<GridLayout | null>(null);
  const columns = layout?.columns ?? 1;

  const virtualizer = useWindowVirtualizer({
    count: layout === null ? 0 : Math.ceil(items.length / columns),
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: OVERSCAN_ROWS,
    gap: GAP,
    scrollMargin: layout?.offset ?? 0,
  });

  useLayoutEffect(() => {
    const container = containerRef.current;
    const frame = container?.parentElement;
    if (container === null || frame === null || frame === undefined) {
      return;
    }
    const measure = () => {
      const next = {
        columns: columnsFor(container.clientWidth),
        offset: Math.round(container.getBoundingClientRect().top + window.scrollY),
      };
      setLayout((current) => (sameLayout(current, next) ? current : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  if (layout === null) {
    return (
      <div
        ref={containerRef}
        className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,18rem),1fr))] gap-5"
      >
        {items.slice(0, SERVER_RENDERED_ITEMS).map((item) => (
          <Tile key={itemKey(item)} {...item} />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: virtualizer.getTotalSize() }}>
      {virtualizer.getVirtualItems().map((row) => (
        <div
          key={row.key}
          data-index={row.index}
          ref={virtualizer.measureElement}
          className="absolute inset-x-0 top-0 grid gap-5"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            transform: `translateY(${row.start - virtualizer.options.scrollMargin}px)`,
          }}
        >
          {items.slice(row.index * columns, (row.index + 1) * columns).map((item) => (
            <Tile key={itemKey(item)} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
};
