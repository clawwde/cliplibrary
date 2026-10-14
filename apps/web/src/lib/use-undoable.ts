'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface History<T> {
  past: T[];
  present: T;
  future: T[];
}

export interface Undoable<T> {
  value: T;
  set: (next: T) => void;
  setLive: (next: T) => void;
  seal: () => void;
  undo: () => void;
  redo: () => void;
  reset: (value: T) => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const useUndoable = <T>(initial: T): Undoable<T> => {
  const [history, setHistory] = useState<History<T>>({ past: [], present: initial, future: [] });
  const live = useRef(false);

  const set = useCallback((next: T) => {
    live.current = false;
    setHistory((current) =>
      Object.is(current.present, next)
        ? current
        : { past: [...current.past, current.present], present: next, future: [] },
    );
  }, []);

  const setLive = useCallback((next: T) => {
    const first = !live.current;
    live.current = true;
    setHistory((current) => {
      if (Object.is(current.present, next)) {
        return current;
      }
      return first
        ? { past: [...current.past, current.present], present: next, future: [] }
        : { past: current.past, present: next, future: current.future };
    });
  }, []);

  const seal = useCallback(() => {
    live.current = false;
  }, []);

  const undo = useCallback(() => {
    live.current = false;
    setHistory((current) => {
      const previous = current.past.at(-1);
      if (previous === undefined) {
        return current;
      }
      return {
        past: current.past.slice(0, -1),
        present: previous,
        future: [current.present, ...current.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    live.current = false;
    setHistory((current) => {
      const next = current.future.at(0);
      if (next === undefined) {
        return current;
      }
      return {
        past: [...current.past, current.present],
        present: next,
        future: current.future.slice(1),
      };
    });
  }, []);

  const reset = useCallback((value: T) => {
    live.current = false;
    setHistory({ past: [], present: value, future: [] });
  }, []);

  return {
    value: history.present,
    set,
    setLive,
    seal,
    undo,
    redo,
    reset,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
};

export const useUndoRedoKeys = (undo: () => void, redo: () => void): void => {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) {
        return;
      }
      const key = event.key.toLowerCase();
      if (key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if ((key === 'z' && event.shiftKey) || key === 'y') {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);
};
