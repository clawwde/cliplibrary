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
  it('builds a multi-track, multi-element project from the library', () => {
    const project = seedProjectForClip('revenue-stat');
    expect(project.tracks.length).toBeGreaterThan(1);
    const elements = project.tracks.flatMap((track) => track.elements);
    expect(elements.length).toBeGreaterThan(1);
    expect(elements.every((element) => element.durationInFrames >= 1)).toBe(true);
  });
});

describe('project store', () => {
  it('seeds from the library when no file exists', async () => {
    const root = await makeRoot();
    const file = await readProject(root, 'title-card');
    expect(file.currentVersionId).toBe('seed');
    expect(file.updatedAt).toBe(new Date(0).toISOString());
    expect(file.project.tracks.length).toBeGreaterThan(1);
  });

  it('persists and reloads an edited project with history', async () => {
    const root = await makeRoot();
    const seeded = await readProject(root, 'title-card');
    const edited = { ...seeded.project, background: '#111111' };
    const first = await writeProject(root, 'title-card', edited, 'first');
    const second = await writeProject(root, 'title-card', first.project, 'second');
    expect(first.currentVersionId).not.toBe(second.currentVersionId);

    const reloaded = await readProject(root, 'title-card');
    expect(reloaded.project.background).toBe('#111111');
    const history = await readProjectHistory(root, 'title-card');
    expect(history.map((entry) => entry.label)).toEqual(['second', 'first']);
  });

  it('reverts to an earlier version and appends a revert snapshot', async () => {
    const root = await makeRoot();
    const seeded = await readProject(root, 'title-card');
    const firstWrite = await writeProject(root, 'title-card', seeded.project, 'original');
    await writeProject(root, 'title-card', { ...seeded.project, background: '#222222' }, 'edited');

    const reverted = await revertProjectToVersion(root, 'title-card', firstWrite.currentVersionId);
    expect(reverted?.project.background).toBe(seeded.project.background);
    const history = await readProjectHistory(root, 'title-card');
    expect(history[0]?.label).toBe(`revert of ${firstWrite.currentVersionId}`);
    expect(await revertProjectToVersion(root, 'title-card', 'missing')).toBeNull();
  });

  it('rejects a malformed project', async () => {
    const root = await makeRoot();
    await expect(writeProject(root, 'title-card', { fps: 0 })).rejects.toThrow();
  });
});
