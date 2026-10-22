import { join } from 'node:path';

export interface RepoPaths {
  root: string;
  exportsDir: string;
  exportsManifest: string;
  publicExportsDir: string;
}

export const repoPaths = (root: string): RepoPaths => ({
  root,
  exportsDir: join(root, 'exports'),
  exportsManifest: join(root, 'exports', 'manifest.json'),
  publicExportsDir: join(root, 'public', 'exports'),
});
