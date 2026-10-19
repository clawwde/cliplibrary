import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
export const srcDir = resolve(fileURLToPath(new URL('../', import.meta.url)));
export const compositionsEntry = fileURLToPath(
  new URL('../compositions/entry.ts', import.meta.url),
);
export const publicExportsDir = fileURLToPath(new URL('../../public/exports/', import.meta.url));
