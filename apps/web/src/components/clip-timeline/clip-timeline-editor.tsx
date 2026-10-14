'use client';

import type { ControlDescriptor, ProjectFile, VersionSnapshot } from '@cliplibrary/core';
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
  removeElement,
  removeTrack,
  replaceElement,
  resizeElement,
} from '@cliplibrary/project';
import type { ClipId } from '@cliplibrary/schemas';
import type { PlayerRef } from '@remotion/player';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CommitBar } from '@/components/editor/commit-bar';
import { Timeline } from '@/components/timeline/timeline';
import { TimelineToolbar } from '@/components/timeline/timeline-toolbar';
import { Skeleton } from '@/components/ui/skeleton';
import { clampPxPerFrame, DEFAULT_PX_PER_FRAME } from '@/lib/timeline-geometry';
import { useClipProject } from '@/lib/use-clip-project';
import { useProjectExport } from '@/lib/use-project-export';
import { useUndoRedoKeys } from '@/lib/use-undoable';
import { ClipPropertySidebar } from './clip-property-sidebar';
import { ClipTimelineHeader } from './clip-timeline-header';

const ClipPreview = dynamic(() => import('./clip-preview').then((mod) => mod.ClipPreview), {
  ssr: false,
  loading: () => <Skeleton className="m-6 aspect-video flex-1 rounded-xl" />,
});

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

interface Shortcuts {
  save: () => void;
  exportProject: () => void;
}

const runModifierShortcut = (event: KeyboardEvent, shortcuts: Shortcuts): boolean => {
  if (!(event.metaKey || event.ctrlKey)) {
    return false;
  }
  const key = event.key.toLowerCase();
  if (key === 's') {
    event.preventDefault();
    shortcuts.save();
  } else if (key === 'e') {
    event.preventDefault();
    shortcuts.exportProject();
  }
  return true;
};

interface ClipTimelineEditorProps {
  clipId: ClipId;
  title: string;
  descriptors: ControlDescriptor[];
  initialProject: ProjectFile;
  initialHistory: VersionSnapshot[];
}

export const ClipTimelineEditor = ({
  clipId,
  title,
  descriptors,
  initialProject,
  initialHistory,
}: ClipTimelineEditorProps) => {
  const editor = useClipProject(clipId, initialProject, initialHistory);
  const { project, setProject, undo, redo } = editor;
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

  const shortcuts = useRef<Shortcuts>({
    save: () => undefined,
    exportProject: () => undefined,
  });
  shortcuts.current = {
    save: () => {
      if (editor.dirty && !editor.saving) {
        editor.save();
      }
    },
    exportProject: () => exporter.run(project),
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (runModifierShortcut(event, shortcuts.current)) {
        return;
      }
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
          <ClipPreview
            project={project}
            playerRef={playerRef}
            onFrameChange={setCurrentFrame}
            onPlayingChange={setPlaying}
          />
        </section>
        <aside className="flex w-[360px] shrink-0 flex-col overflow-y-auto border-border border-l bg-sidebar">
          <ClipTimelineHeader
            title={title}
            status={editor.status}
            dirty={editor.dirty}
            saving={editor.saving}
            saveFailed={editor.saveFailed}
            snapshots={editor.snapshots}
            currentVersionId={editor.currentVersionId}
            onSave={editor.save}
            onRevert={editor.revert}
          />
          <ClipPropertySidebar
            element={selectedElement}
            clipTitle={title}
            descriptors={descriptors}
            onChange={(next) => setProject(replaceElement(project, next))}
            onDelete={handleDelete}
          />
          <CommitBar />
        </aside>
      </div>
      <div className="flex h-72 shrink-0 flex-col border-border border-t bg-sidebar">
        <TimelineToolbar
          pxPerFrame={pxPerFrame}
          playing={playing}
          canUndo={editor.canUndo}
          canRedo={editor.canRedo}
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
