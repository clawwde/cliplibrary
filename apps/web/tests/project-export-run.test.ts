import { describe, expect, it } from 'bun:test';
import { buildProjectRenderArgs } from '../src/lib/project-export-run';

describe('project render args', () => {
  it('builds the render-project cli arguments', () => {
    const args = buildProjectRenderArgs({
      projectPath: '/tmp/project.json',
      outDir: '/out/abc',
      optionsPath: '/tmp/options.json',
    });
    expect(args).toEqual([
      'run',
      'src/render-project-one.ts',
      '--project',
      '/tmp/project.json',
      '--out',
      '/out/abc',
      '--options',
      '/tmp/options.json',
    ]);
  });
});
