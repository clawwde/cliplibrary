import { describe, expect, it } from 'bun:test';
import { buildRenderArgs } from '../src/lib/export-run';

describe('buildRenderArgs', () => {
  it('runs the render-one file directly so clip flags reach the script', () => {
    const argv = buildRenderArgs({
      renderCwd: '/repo/apps/render',
      clipId: 'phone-spin-in',
      outDir: '/repo/apps/web/public/exports/abc',
      optionsPath: '/tmp/options.json',
      propsPath: '/tmp/props.json',
    });
    expect(argv).toEqual([
      'run',
      'src/render-one.ts',
      '--clip',
      'phone-spin-in',
      '--out',
      '/repo/apps/web/public/exports/abc',
      '--options',
      '/tmp/options.json',
      '--props',
      '/tmp/props.json',
    ]);
  });
});
