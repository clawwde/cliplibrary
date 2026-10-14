'use client';

import type { ElementType } from '@cliplibrary/project';
import { Download, Layers, Pause, Play, Redo2, Undo2, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MAX_PX_PER_FRAME, MIN_PX_PER_FRAME } from '@/lib/timeline-geometry';
import type { ExportState } from '@/lib/use-project-export';

interface TimelineToolbarProps {
  pxPerFrame: number;
  playing: boolean;
  canUndo: boolean;
  canRedo: boolean;
  exportState: ExportState;
  downloadUrl: string | null;
  onAddElement: (type: ElementType) => void;
  onAddTrack: () => void;
  onZoom: (pxPerFrame: number) => void;
  onTogglePlay: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
}

const ADD_TYPES: ElementType[] = ['text', 'image', 'video', 'shape'];

const EXPORT_LABEL: Record<ExportState, string> = {
  idle: 'Export',
  rendering: 'Rendering',
  done: 'Export',
  error: 'Retry export',
};

export const TimelineToolbar = ({
  pxPerFrame,
  playing,
  canUndo,
  canRedo,
  exportState,
  downloadUrl,
  onAddElement,
  onAddTrack,
  onZoom,
  onTogglePlay,
  onUndo,
  onRedo,
  onExport,
}: TimelineToolbarProps) => (
  <div className="flex flex-wrap items-center gap-2 px-3 py-2">
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Play or pause"
      onClick={onTogglePlay}
    >
      {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
    </Button>
    <span className="mx-1 h-5 w-px bg-border" />
    <span className="text-muted-foreground text-xs">Add</span>
    {ADD_TYPES.map((type) => (
      <Button
        key={type}
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onAddElement(type)}
      >
        {type}
      </Button>
    ))}
    <Button type="button" variant="outline" size="sm" onClick={onAddTrack}>
      <Layers className="size-4" />
      Track
    </Button>
    <span className="mx-1 h-5 w-px bg-border" />
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Zoom out"
      onClick={() => onZoom(pxPerFrame - 1)}
      disabled={pxPerFrame <= MIN_PX_PER_FRAME}
    >
      <ZoomOut className="size-4" />
    </Button>
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Zoom in"
      onClick={() => onZoom(pxPerFrame + 1)}
      disabled={pxPerFrame >= MAX_PX_PER_FRAME}
    >
      <ZoomIn className="size-4" />
    </Button>
    <div className="ml-auto flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Undo"
        disabled={!canUndo}
        onClick={onUndo}
      >
        <Undo2 className="size-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Redo"
        disabled={!canRedo}
        onClick={onRedo}
      >
        <Redo2 className="size-4" />
      </Button>
      {downloadUrl !== null && exportState === 'done' ? (
        <Button type="button" variant="outline" size="sm" asChild>
          <a href={downloadUrl}>Download</a>
        </Button>
      ) : null}
      <Button type="button" size="sm" onClick={onExport} disabled={exportState === 'rendering'}>
        <Download className="size-4" />
        {EXPORT_LABEL[exportState]}
      </Button>
    </div>
  </div>
);
