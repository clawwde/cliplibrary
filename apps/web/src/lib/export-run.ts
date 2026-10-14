import type { ClipId } from '@cliplibrary/schemas';
import type { RenderOptions } from './render-options';

export interface ExportRequest {
  clipId: ClipId;
  values: Record<string, unknown>;
  options: Partial<RenderOptions>;
}

export interface RenderArgs {
  renderCwd: string;
  clipId: ClipId;
  outDir: string;
  optionsPath: string;
  propsPath: string;
}

export const buildRenderArgs = (args: RenderArgs): string[] => [
  'run',
  'src/render-one.ts',
  '--clip',
  args.clipId,
  '--out',
  args.outDir,
  '--options',
  args.optionsPath,
  '--props',
  args.propsPath,
];
