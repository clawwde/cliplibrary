import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const findRepoRoot = (start: string = process.cwd()): string => {
  let dir = start;
  for (let depth = 0; depth < 8; depth += 1) {
    if (existsSync(join(dir, 'turbo.json'))) {
      return dir;
    }
    const parent = dirname(dir);
    if (parent === dir) {
      return start;
    }
    dir = parent;
  }
  return start;
};

export const repoRoot = (): string => findRepoRoot();
