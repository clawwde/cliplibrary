import { describe, expect, it } from 'bun:test';
import { buildRenderArgs } from '@/lib/export-run';

describe('buildRenderArgs', () => {
  it('runs the render-one file directly so clip flags reach the script', () => {
    const argv = buildRenderArgs({
      clipId: 'phone-spin-in',
      outDir: '/repo/public/exports/abc',
      optionsPath: '/tmp/options.json',
      propsPath: '/tmp/props.json',
    });
    expect(argv).toEqual([
      'run',
      'src/render/render-one.ts',
      '--clip',
      'phone-spin-in',
      '--out',
      '/repo/public/exports/abc',
      '--options',
      '/tmp/options.json',
      '--props',
      '/tmp/props.json',
    ]);
  });
});
