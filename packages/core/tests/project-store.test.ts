import { afterAll, describe, expect, it } from 'bun:test';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  readProject,
  readProjectHistory,
  revertProjectToVersion,
  seedProjectForClip,
  writeProject,
} from '../src/index';

const roots: string[] = [];

const makeRoot = async (): Promise<string> => {
  const root = await mkdtemp(join(tmpdir(), 'cliplib-project-'));
  roots.push(root);
  return root;
};

afterAll(async () => {
  await Promise.all(roots.map((root) => rm(root, { recursive: true, force: true })));
});

describe('project seed', () => {
  it('builds a single-track project with one composition element at clip size', () => {
    const project = seedProjectForClip('typewriter');
    expect(project.tracks).toHaveLength(1);
    const element = project.tracks[0]?.elements[0];
    expect(element?.type).toBe('composition');
    expect(element?.type === 'composition' && element.clipId).toBe('typewriter');
    expect(element?.from).toBe(0);
    expect(element?.durationInFrames).toBe(project.durationInFrames);
  });
});

describe('project store', () => {
  it('seeds from the registry when no file exists', async () => {
    const root = await makeRoot();
    const file = await readProject(root, 'split-flap');
    expect(file.currentVersionId).toBe('seed');
    expect(file.updatedAt).toBe(new Date(0).toISOString());
    expect(file.project.tracks[0]?.elements[0]?.type).toBe('composition');
  });

  it('persists and reloads an edited project with history', async () => {
    const root = await makeRoot();
    const seeded = await readProject(root, 'split-flap');
    const edited = { ...seeded.project, background: '#111111' };
    const first = await writeProject(root, 'split-flap', edited, 'first');
    const second = await writeProject(root, 'split-flap', first.project, 'second');
    expect(first.currentVersionId).not.toBe(second.currentVersionId);

    const reloaded = await readProject(root, 'split-flap');
    expect(reloaded.project.background).toBe('#111111');
    const history = await readProjectHistory(root, 'split-flap');
    expect(history.map((entry) => entry.label)).toEqual(['second', 'first']);
  });

  it('reverts to an earlier version and appends a revert snapshot', async () => {
    const root = await makeRoot();
    const seeded = await readProject(root, 'split-flap');
    const firstWrite = await writeProject(root, 'split-flap', seeded.project, 'original');
    await writeProject(root, 'split-flap', { ...seeded.project, background: '#222222' }, 'edited');

    const reverted = await revertProjectToVersion(root, 'split-flap', firstWrite.currentVersionId);
    expect(reverted?.project.background).toBe(seeded.project.background);
    const history = await readProjectHistory(root, 'split-flap');
    expect(history[0]?.label).toBe(`revert of ${firstWrite.currentVersionId}`);
    expect(await revertProjectToVersion(root, 'split-flap', 'missing')).toBeNull();
  });

  it('rejects a malformed project', async () => {
    const root = await makeRoot();
    await expect(writeProject(root, 'split-flap', { fps: 0 })).rejects.toThrow();
  });
});
