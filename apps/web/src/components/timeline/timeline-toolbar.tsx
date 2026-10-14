'use client';

import type { ElementType } from '@cliplibrary/project';
import { Layers, Maximize2, Pause, Play, Redo2, Undo2, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MAX_PX_PER_FRAME, MIN_PX_PER_FRAME, ZOOM_STEP } from '@/lib/timeline-geometry';
import type { ExportSettings, ExportState } from '@/lib/use-project-export';
import { ExportControls } from './export-controls';

interface AnimationOption {
  id: string;
  title: string;
}

interface TimelineToolbarProps {
  pxPerFrame: number;
  playing: boolean;
  canUndo: boolean;
  canRedo: boolean;
  exportState: ExportState;
  exportProgress: number;
  downloadUrl: string | null;
  animations: readonly AnimationOption[];
  onAddElement: (type: ElementType) => void;
  onAddAnimation: (clipId: string) => void;
  onAddTrack: () => void;
  onZoom: (pxPerFrame: number) => void;
  onFit: () => void;
  onTogglePlay: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: (settings: ExportSettings) => void;
}

const ADD_TYPES: ElementType[] = ['text', 'image', 'video', 'shape'];

export const TimelineToolbar = ({
  pxPerFrame,
  playing,
  canUndo,
  canRedo,
  exportState,
  exportProgress,
  downloadUrl,
  animations,
  onAddElement,
  onAddAnimation,
  onAddTrack,
  onZoom,
  onFit,
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
    <select
      aria-label="Add animation"
      value=""
      onChange={(event) => {
        if (event.target.value !== '') {
          onAddAnimation(event.target.value);
        }
      }}
      className="h-8 rounded-md bg-muted px-2 text-sm"
    >
      <option value="">Animation</option>
      {animations.map((animation) => (
        <option key={animation.id} value={animation.id}>
          {animation.title}
        </option>
      ))}
    </select>
    <span className="mx-1 h-5 w-px bg-border" />
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Zoom out"
      onClick={() => onZoom(pxPerFrame / ZOOM_STEP)}
      disabled={pxPerFrame <= MIN_PX_PER_FRAME}
    >
      <ZoomOut className="size-4" />
    </Button>
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Zoom in"
      onClick={() => onZoom(pxPerFrame * ZOOM_STEP)}
      disabled={pxPerFrame >= MAX_PX_PER_FRAME}
    >
      <ZoomIn className="size-4" />
    </Button>
    <Button type="button" variant="ghost" size="icon" aria-label="Fit timeline" onClick={onFit}>
      <Maximize2 className="size-4" />
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
      <ExportControls
        state={exportState}
        progress={exportProgress}
        downloadUrl={downloadUrl}
        onExport={onExport}
      />
    </div>
  </div>
);
