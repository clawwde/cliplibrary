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
  it('seeds a real clip as a single composition element on one track', () => {
    const project = seedProjectForClip('orbit-cards');
    expect(project.tracks).toHaveLength(1);
    const elements = project.tracks.flatMap((track) => track.elements);
    expect(elements).toHaveLength(1);
    expect(elements[0]?.type).toBe('composition');
    expect(elements.every((element) => element.durationInFrames >= 1)).toBe(true);
  });
});

describe('sequence seed', () => {
  it('lays the app promo scenes out on two alternating lanes', () => {
    const project = seedProjectForClip('app-promo');
    expect(project.tracks.map((track) => track.name)).toEqual(['Scenes A', 'Scenes B']);
    const elements = project.tracks.flatMap((track) => track.elements);
    expect(elements).toHaveLength(9);
    expect(elements.every((element) => element.type === 'composition')).toBe(true);
    const ends = elements.map((element) => element.from + element.durationInFrames);
    expect(Math.max(...ends)).toBe(project.durationInFrames);
  });

  it('overlaps neighbouring scenes so transitions have room', () => {
    const ordered = seedProjectForClip('app-promo')
      .tracks.flatMap((track) => track.elements)
      .sort((left, right) => left.from - right.from);
    for (let index = 1; index < ordered.length; index++) {
      const previous = ordered[index - 1];
      const current = ordered[index];
      if (previous !== undefined && current !== undefined) {
        expect(current.from).toBeLessThanOrEqual(previous.from + previous.durationInFrames);
        expect(current.from).toBeGreaterThan(previous.from);
      }
    }
  });

  it('gives every seeded scene its own copy of the defaults', () => {
    const first = seedProjectForClip('app-promo').tracks[0]?.elements[0];
    const second = seedProjectForClip('app-promo').tracks[0]?.elements[0];
    expect(first?.type === 'composition' && second?.type === 'composition').toBe(true);
    if (first?.type === 'composition' && second?.type === 'composition') {
      expect(first.props).toEqual(second.props);
      expect(first.props).not.toBe(second.props);
    }
  });
});

describe('project store', () => {
  it('seeds from the clip registry when no file exists', async () => {
    const root = await makeRoot();
    const file = await readProject(root, 'orbit-cards');
    expect(file.currentVersionId).toBe('seed');
    expect(file.updatedAt).toBe(new Date(0).toISOString());
    expect(file.project.tracks.length).toBeGreaterThanOrEqual(1);
  });

  it('persists and reloads an edited project with history', async () => {
    const root = await makeRoot();
    const seeded = await readProject(root, 'orbit-cards');
    const edited = { ...seeded.project, background: '#111111' };
    const first = await writeProject(root, 'orbit-cards', edited, 'first');
    const second = await writeProject(root, 'orbit-cards', first.project, 'second');
    expect(first.currentVersionId).not.toBe(second.currentVersionId);

    const reloaded = await readProject(root, 'orbit-cards');
    expect(reloaded.project.background).toBe('#111111');
    const history = await readProjectHistory(root, 'orbit-cards');
    expect(history.map((entry) => entry.label)).toEqual(['second', 'first']);
  });

  it('reverts to an earlier version and appends a revert snapshot', async () => {
    const root = await makeRoot();
    const seeded = await readProject(root, 'orbit-cards');
    const firstWrite = await writeProject(root, 'orbit-cards', seeded.project, 'original');
    await writeProject(root, 'orbit-cards', { ...seeded.project, background: '#222222' }, 'edited');

    const reverted = await revertProjectToVersion(root, 'orbit-cards', firstWrite.currentVersionId);
    expect(reverted?.project.background).toBe(seeded.project.background);
    const history = await readProjectHistory(root, 'orbit-cards');
    expect(history[0]?.label).toBe(`revert of ${firstWrite.currentVersionId}`);
    expect(await revertProjectToVersion(root, 'orbit-cards', 'missing')).toBeNull();
  });

  it('rejects a malformed project', async () => {
    const root = await makeRoot();
    await expect(writeProject(root, 'orbit-cards', { fps: 0 })).rejects.toThrow();
  });
});
