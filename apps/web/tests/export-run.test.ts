import { describe, expect, it } from 'bun:test';
import { buildRenderArgs } from '../src/lib/export-run';

describe('buildRenderArgs', () => {
  it('builds the render-one argv for a bun --cwd spawn', () => {
    const argv = buildRenderArgs({
      renderCwd: '/repo/apps/render',
      clipId: 'orbit-cards',
      outDir: '/repo/apps/web/public/exports/abc',
      optionsPath: '/tmp/options.json',
      propsPath: '/tmp/props.json',
    });
    expect(argv).toEqual([
      '--cwd',
      '/repo/apps/render',
      'run',
      'render-one',
      '--clip',
      'orbit-cards',
      '--out',
      '/repo/apps/web/public/exports/abc',
      '--options',
      '/tmp/options.json',
      '--props',
      '/tmp/props.json',
    ]);
  });
});
