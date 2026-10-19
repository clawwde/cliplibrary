import type { ClipId } from '@/schemas';
import type { RenderOptions } from './render-options';

export interface ExportRequest {
  clipId: ClipId;
  values: Record<string, unknown>;
  options: Partial<RenderOptions>;
}

export interface RenderArgs {
  clipId: ClipId;
  outDir: string;
  optionsPath: string;
  propsPath: string;
}

export const buildRenderArgs = (args: RenderArgs): string[] => [
  'run',
  'src/render/render-one.ts',
  '--clip',
  args.clipId,
  '--out',
  args.outDir,
  '--options',
  args.optionsPath,
  '--props',
  args.propsPath,
];
