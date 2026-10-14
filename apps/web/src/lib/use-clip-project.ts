'use client';

import type { ProjectFile, VersionSnapshot } from '@cliplibrary/core';
import type { Project } from '@cliplibrary/project';
import type { ClipId } from '@cliplibrary/schemas';
import { useCallback, useState } from 'react';
import { useUndoable } from '@/lib/use-undoable';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export interface ClipProjectEditor {
  project: Project;
  setProject: (next: Project) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  save: () => void;
  revert: (versionId: string) => void;
  saving: boolean;
  dirty: boolean;
  status: string;
  saveFailed: boolean;
  snapshots: VersionSnapshot[];
  currentVersionId: string;
}

const statusLabel = (saving: boolean, saveState: SaveState, dirty: boolean): string => {
  if (saving) {
    return 'Saving';
  }
  if (saveState === 'error') {
    return 'Save failed';
  }
  return dirty ? 'Unsaved changes' : 'Saved';
};

export const useClipProject = (
  clipId: ClipId,
  initial: ProjectFile,
  initialHistory: VersionSnapshot[],
): ClipProjectEditor => {
  const { value, set, reset, undo, redo, canUndo, canRedo } = useUndoable<Project>(initial.project);
  const [snapshots, setSnapshots] = useState<VersionSnapshot[]>(initialHistory);
  const [currentVersionId, setCurrentVersionId] = useState(initial.currentVersionId);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initial.project));
  const [saveState, setSaveState] = useState<SaveState>('idle');

  const dirty = JSON.stringify(value) !== savedJson;

  const adopt = useCallback((file: ProjectFile, label: string | null): void => {
    setSavedJson(JSON.stringify(file.project));
    setCurrentVersionId(file.currentVersionId);
    setSnapshots((prev) => [
      { versionId: file.currentVersionId, createdAt: file.updatedAt, label, values: file.project },
      ...prev,
    ]);
  }, []);

  const save = useCallback(() => {
    setSaveState('saving');
    fetch(`/api/clips/${clipId}/project`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ project: value }),
    })
      .then((response) => (response.ok ? (response.json() as Promise<ProjectFile>) : null))
      .then((file) => {
        if (file === null) {
          setSaveState('error');
          return;
        }
        adopt(file, null);
        setSaveState('saved');
      })
      .catch(() => setSaveState('error'));
  }, [clipId, value, adopt]);

  const revert = useCallback(
    (versionId: string) => {
      if (versionId === currentVersionId) {
        return;
      }
      fetch(`/api/clips/${clipId}/project/history`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ versionId }),
      })
        .then((response) => (response.ok ? (response.json() as Promise<ProjectFile>) : null))
        .then((file) => {
          if (file === null) {
            return;
          }
          reset(file.project);
          adopt(file, `revert of ${versionId}`);
          setSaveState('saved');
        })
        .catch(() => setSaveState('error'));
    },
    [clipId, currentVersionId, reset, adopt],
  );

  const saving = saveState === 'saving';

  return {
    project: value,
    setProject: set,
    undo,
    redo,
    canUndo,
    canRedo,
    save,
    revert,
    saving,
    dirty,
    status: statusLabel(saving, saveState, dirty),
    saveFailed: saveState === 'error',
    snapshots,
    currentVersionId,
  };
};
