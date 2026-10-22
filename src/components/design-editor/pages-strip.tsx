'use client';

import { ChevronLeft, ChevronRight, Copy, Plus, Trash2 } from 'lucide-react';
import type { Design, Page } from '@/design';
import { cn } from '@/lib/utils';
import { fillToCss } from './konva-fill';
import type { DesignEditorState } from './use-design-editor';
import { usePageThumbnail } from './use-page-thumbnail';

const THUMB_HEIGHT = 64;

const PageThumb = ({
  design,
  page,
  index,
  active,
  onSelect,
}: {
  design: Design;
  page: Page;
  index: number;
  active: boolean;
  onSelect: () => void;
}) => {
  const width = Math.round((THUMB_HEIGHT * design.width) / design.height);
  const url = usePageThumbnail(design, page, width);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Page ${index + 1}`}
      aria-current={active}
      className={cn(
        'relative shrink-0 overflow-hidden rounded-md ring-2 transition-shadow',
        active ? 'ring-violet-500' : 'ring-transparent hover:ring-border',
      )}
      style={{ width, height: THUMB_HEIGHT, background: fillToCss(page.background) }}
    >
      {url === null ? null : (
        <span
          className="block size-full bg-cover bg-center"
          style={{ backgroundImage: `url("${url}")` }}
        />
      )}
      <span className="absolute bottom-0.5 left-1 rounded bg-black/55 px-1 text-[10px] text-white">
        {index + 1}
      </span>
    </button>
  );
};

interface PagesStripProps {
  editor: DesignEditorState;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export const PagesStrip = ({ editor, zoom, onZoomChange }: PagesStripProps) => {
  const { design, pageId } = editor;
  const index = design.pages.findIndex((page) => page.id === pageId);
  return (
    <div className="flex h-20 shrink-0 items-center gap-2 border-t bg-background px-2 sm:h-24 sm:gap-3 sm:px-3">
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-2">
        {design.pages.map((page, position) => (
          <PageThumb
            key={page.id}
            design={design}
            page={page}
            index={position}
            active={page.id === pageId}
            onSelect={() => editor.selectPage(page.id)}
          />
        ))}
        <button
          type="button"
          aria-label="Add page"
          onClick={() => editor.insertPage()}
          className="flex shrink-0 items-center justify-center rounded-md border-2 border-dashed text-muted-foreground hover:border-violet-400 hover:text-violet-500"
          style={{ width: 48, height: THUMB_HEIGHT }}
        >
          <Plus className="size-4" />
        </button>
      </div>
      <div className="flex items-center gap-0.5 text-muted-foreground">
        <label className="mr-3 hidden items-center gap-2 text-xs md:flex">
          <span className="sr-only">Zoom</span>
          <input
            type="range"
            aria-label="Zoom level"
            min={5}
            max={400}
            step={1}
            value={Math.round(zoom * 100)}
            onChange={(event) => onZoomChange(Number(event.target.value) / 100)}
            className="w-28 accent-violet-600"
          />
          <span className="w-10 tabular-nums">{Math.round(zoom * 100)}%</span>
        </label>
        <span className="mr-2 hidden text-xs tabular-nums sm:inline">
          Page {index + 1} / {design.pages.length}
        </span>
        <button
          type="button"
          aria-label="Move page left"
          className="rounded p-1.5 hover:bg-accent disabled:opacity-40"
          disabled={index <= 0}
          onClick={() => editor.movePageTo(pageId, index - 1)}
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Move page right"
          className="rounded p-1.5 hover:bg-accent disabled:opacity-40"
          disabled={index >= design.pages.length - 1}
          onClick={() => editor.movePageTo(pageId, index + 1)}
        >
          <ChevronRight className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Duplicate page"
          className="rounded p-1.5 hover:bg-accent"
          onClick={editor.duplicateCurrentPage}
        >
          <Copy className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Delete page"
          className="rounded p-1.5 hover:bg-accent disabled:opacity-40"
          disabled={design.pages.length <= 1}
          onClick={editor.removeCurrentPage}
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
};
