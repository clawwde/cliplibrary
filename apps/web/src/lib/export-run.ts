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
  '--cwd',
  args.renderCwd,
  'run',
  'render-one',
  '--clip',
  args.clipId,
  '--out',
  args.outDir,
  '--options',
  args.optionsPath,
  '--props',
  args.propsPath,
];
