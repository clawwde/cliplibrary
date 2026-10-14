import { join } from 'node:path';
import type { ClipId } from '@cliplibrary/schemas';

export interface RepoPaths {
  root: string;
  clipsDir: string;
  exportsDir: string;
  exportsManifest: string;
  publicExportsDir: string;
}

export const repoPaths = (root: string): RepoPaths => ({
  root,
  clipsDir: join(root, 'clips'),
  exportsDir: join(root, 'exports'),
  exportsManifest: join(root, 'exports', 'manifest.json'),
  publicExportsDir: join(root, 'apps', 'web', 'public', 'exports'),
});

export const propsPath = (root: string, id: ClipId): string =>
  join(root, 'clips', `${id}.props.json`);

export const historyPath = (root: string, id: ClipId): string =>
  join(root, 'clips', `${id}.history.json`);
