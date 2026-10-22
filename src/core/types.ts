import type { ClipId } from '@/schemas';

export type ControlDescriptor =
  | { kind: 'text'; path: string[]; label: string; multiline: boolean; maxLength: number | null }
  | { kind: 'color'; path: string[]; label: string }
  | {
      kind: 'number';
      path: string[];
      label: string;
      min: number | null;
      max: number | null;
      step: number;
    }
  | { kind: 'boolean'; path: string[]; label: string }
  | { kind: 'enum'; path: string[]; label: string; options: string[] }
  | { kind: 'image'; path: string[]; label: string }
  | { kind: 'video'; path: string[]; label: string }
  | {
      kind: 'array';
      path: string[];
      label: string;
      min: number | null;
      max: number | null;
      item: ControlDescriptor[];
    }
  | { kind: 'object'; path: string[]; label: string; fields: ControlDescriptor[] };

export type ExportStatus = 'rendering' | 'done' | 'error';

export interface ExportRecord {
  exportId: string;
  clipId: ClipId;
  mp4: string;
  poster: string;
  createdAt: string;
  status: ExportStatus;
  progress: number;
  propsVersionId: string;
  error: string | null;
}
