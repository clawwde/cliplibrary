'use client';

import {
  addElement,
  addTrack,
  createImageElement,
  createShapeElement,
  createTextElement,
  createTrack,
  createVideoElement,
  type Element,
  type ElementType,
  findElement,
  moveElement,
  type Project,
  removeElement,
  removeTrack,
  replaceElement,
  resizeElement,
} from '@cliplibrary/project';
import type { PlayerRef } from '@remotion/player';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { clampPxPerFrame, DEFAULT_PX_PER_FRAME } from '@/lib/timeline-geometry';
import { useProjectEditor } from '@/lib/use-project-editor';
import { useProjectExport } from '@/lib/use-project-export';
import { useUndoRedoKeys } from '@/lib/use-undoable';
import { PropertyPanel } from './property-panel/property-panel';
import { Timeline } from './timeline';
import { TimelineToolbar } from './timeline-toolbar';

const ProjectPreview = dynamic(
  () => import('./project-preview').then((mod) => mod.ProjectPreview),
  { ssr: false, loading: () => <Skeleton className="m-6 aspect-video flex-1 rounded-xl" /> },
);

const makeElement = (type: ElementType, from: number): Element => {
  if (type === 'text') {
    return createTextElement({ from });
  }
  if (type === 'image') {
    return createImageElement({ from });
  }
  if (type === 'video') {
    return createVideoElement({ from });
  }
  return createShapeElement('rect', { from });
};

const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
};

export const TimelineEditor = ({ initialProject }: { initialProject: Project }) => {
  const { project, setProject, undo, redo, canUndo, canRedo } = useProjectEditor(initialProject);
  useUndoRedoKeys(undo, redo);
  const exporter = useProjectExport();

  const playerRef = useRef<PlayerRef | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [pxPerFrame, setPxPerFrame] = useState(DEFAULT_PX_PER_FRAME);

  const activeTrack = activeTrackId ?? project.tracks[0]?.id ?? null;
  const selectedElement =
    selectedId === null ? null : (findElement(project, selectedId)?.element ?? null);

  const seek = useCallback((frame: number) => {
    playerRef.current?.seekTo(frame);
    setCurrentFrame(frame);
  }, []);

  const handleAddElement = (type: ElementType): void => {
    if (activeTrack === null) {
      return;
    }
    const element = makeElement(type, currentFrame);
    setProject(addElement(project, activeTrack, element));
    setSelectedId(element.id);
  };

  const handleDelete = useCallback(
    (id: string) => {
      setProject(removeElement(project, id));
      setSelectedId((current) => (current === id ? null : current));
    },
    [project, setProject],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }
      if (event.key === ' ') {
        event.preventDefault();
        playerRef.current?.toggle();
      } else if ((event.key === 'Delete' || event.key === 'Backspace') && selectedId !== null) {
        event.preventDefault();
        handleDelete(selectedId);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, handleDelete]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1">
        <section className="flex min-h-0 flex-1 flex-col bg-muted/30">
          <ProjectPreview
            project={project}
            playerRef={playerRef}
            onFrameChange={setCurrentFrame}
            onPlayingChange={setPlaying}
          />
        </section>
        <aside className="w-[340px] shrink-0 overflow-y-auto border-border border-l bg-sidebar">
          <PropertyPanel
            element={selectedElement}
            onChange={(next) => setProject(replaceElement(project, next))}
            onDelete={handleDelete}
          />
        </aside>
      </div>
      <div className="flex h-72 shrink-0 flex-col border-border border-t bg-sidebar">
        <TimelineToolbar
          pxPerFrame={pxPerFrame}
          playing={playing}
          canUndo={canUndo}
          canRedo={canRedo}
          exportState={exporter.state}
          downloadUrl={exporter.downloadUrl}
          onAddElement={handleAddElement}
          onAddTrack={() =>
            setProject(addTrack(project, createTrack(`Track ${project.tracks.length + 1}`)))
          }
          onZoom={(next) => setPxPerFrame(clampPxPerFrame(next))}
          onTogglePlay={() => playerRef.current?.toggle()}
          onUndo={undo}
          onRedo={redo}
          onExport={() => exporter.run(project)}
        />
        <div className="min-h-0 flex-1">
          <Timeline
            project={project}
            pxPerFrame={pxPerFrame}
            currentFrame={currentFrame}
            selectedId={selectedId}
            activeTrackId={activeTrack}
            onSeek={seek}
            onActivateTrack={setActiveTrackId}
            onSelectElement={setSelectedId}
            onMoveElement={(id, from) => setProject(moveElement(project, id, from))}
            onResizeElement={(id, duration) => setProject(resizeElement(project, id, duration))}
            onRemoveTrack={(id) => setProject(removeTrack(project, id))}
          />
        </div>
      </div>
    </div>
  );
};
