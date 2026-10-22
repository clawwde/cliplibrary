export type ShortcutAction =
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'delete' }
  | { type: 'duplicate' }
  | { type: 'copy' }
  | { type: 'cut' }
  | { type: 'select-all' }
  | { type: 'group' }
  | { type: 'ungroup' }
  | { type: 'escape' }
  | { type: 'edit-text' }
  | { type: 'layer'; move: 'forward' | 'backward' | 'front' | 'back' }
  | { type: 'nudge'; dx: number; dy: number }
  | { type: 'zoom'; direction: 'in' | 'out' | 'fit' }
  | { type: 'add'; element: 'text' | 'rect' | 'ellipse' | 'line' }
  | { type: 'export' };

export interface KeyInput {
  key: string;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}

const NUDGES: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};

const ADD_KEYS: Record<string, 'text' | 'rect' | 'ellipse' | 'line'> = {
  t: 'text',
  r: 'rect',
  c: 'ellipse',
  l: 'line',
};

const modifiedShortcut = (key: string, input: KeyInput): ShortcutAction | null => {
  switch (key) {
    case 'z':
      return input.shiftKey ? { type: 'redo' } : { type: 'undo' };
    case 'y':
      return { type: 'redo' };
    case 'd':
      return { type: 'duplicate' };
    case 'c':
      return { type: 'copy' };
    case 'x':
      return { type: 'cut' };
    case 'a':
      return { type: 'select-all' };
    case 'g':
      return input.shiftKey ? { type: 'ungroup' } : { type: 'group' };
    case ']':
      return { type: 'layer', move: input.altKey || input.shiftKey ? 'front' : 'forward' };
    case '[':
      return { type: 'layer', move: input.altKey || input.shiftKey ? 'back' : 'backward' };
    case '=':
    case '+':
      return { type: 'zoom', direction: 'in' };
    case '-':
      return { type: 'zoom', direction: 'out' };
    case '0':
      return { type: 'zoom', direction: 'fit' };
    case 'e':
      return { type: 'export' };
    default:
      return null;
  }
};

export const shortcutFor = (input: KeyInput): ShortcutAction | null => {
  const key = input.key.length === 1 ? input.key.toLowerCase() : input.key;
  if (input.metaKey || input.ctrlKey) {
    return modifiedShortcut(key, input);
  }
  const nudge = NUDGES[key];
  if (nudge !== undefined) {
    const step = input.shiftKey ? 10 : 1;
    return { type: 'nudge', dx: nudge[0] * step, dy: nudge[1] * step };
  }
  if (key === 'Delete' || key === 'Backspace') {
    return { type: 'delete' };
  }
  if (key === 'Escape') {
    return { type: 'escape' };
  }
  if (key === 'Enter') {
    return { type: 'edit-text' };
  }
  const add = input.altKey || input.shiftKey ? undefined : ADD_KEYS[key];
  return add === undefined ? null : { type: 'add', element: add };
};

export const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
};
