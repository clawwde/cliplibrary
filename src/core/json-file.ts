import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export const readJsonFile = async <T>(path: string): Promise<T | null> => {
  try {
    const raw = await readFile(path, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const writeJsonFile = async (path: string, data: unknown): Promise<void> => {
  await mkdir(dirname(path), { recursive: true });
  const serialized = `${JSON.stringify(data, null, 2)}\n`;
  const temp = `${path}.tmp-${crypto.randomUUID()}`;
  await writeFile(temp, serialized, 'utf8');
  await rename(temp, path);
};
