'use client';

import { type Project, safeParseProject } from '@cliplibrary/project';
import { useCallback, useEffect, useRef } from 'react';
import { useUndoable } from '@/lib/use-undoable';

const PROJECT_STORAGE_KEY = 'cliplibrary-project';

const loadProject = (): Project | null => {
  try {
    const raw = localStorage.getItem(PROJECT_STORAGE_KEY);
    return raw === null ? null : safeParseProject(JSON.parse(raw));
  } catch {
    return null;
  }
};

const saveProject = (project: Project): void => {
  try {
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(project));
  } catch {
    return;
  }
};

export interface ProjectEditor {
  project: Project;
  setProject: (next: Project) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const useProjectEditor = (initial: Project): ProjectEditor => {
  const { value, set, reset, undo, redo, canUndo, canRedo } = useUndoable<Project>(initial);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) {
      return;
    }
    hydrated.current = true;
    const stored = loadProject();
    if (stored !== null) {
      reset(stored);
    }
  }, [reset]);

  useEffect(() => {
    if (hydrated.current) {
      saveProject(value);
    }
  }, [value]);

  const setProject = useCallback((next: Project) => set(next), [set]);

  return { project: value, setProject, undo, redo, canUndo, canRedo };
};
