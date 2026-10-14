import { fileURLToPath } from 'node:url';

export const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
export const compositionsEntry = fileURLToPath(
  new URL('../../../packages/compositions/src/entry.ts', import.meta.url),
);
export const publicExportsDir = fileURLToPath(
  new URL('../../../apps/web/public/exports/', import.meta.url),
);
