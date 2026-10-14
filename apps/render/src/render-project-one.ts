import { readFile } from 'node:fs/promises';
import { parseProject } from '@cliplibrary/project';
import { type RenderOptions, resolveRenderOptions } from './render-options';
import { renderProject } from './render-project';

const readFlag = (name: string): string | null => {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) {
    return null;
  }
  return process.argv[index + 1] ?? null;
};

const readJson = async <T>(path: string): Promise<T> => {
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw) as T;
};

const main = async (): Promise<void> => {
  const projectPath = readFlag('project');
  const outDir = readFlag('out');
  const optionsPath = readFlag('options');

  if (projectPath === null) {
    throw new Error('Missing --project');
  }
  if (outDir === null) {
    throw new Error('Missing --out');
  }

  const project = parseProject(await readJson<unknown>(projectPath));
  const options: RenderOptions = resolveRenderOptions(
    optionsPath === null ? null : await readJson<Partial<RenderOptions>>(optionsPath),
  );

  const result = await renderProject({
    project,
    outDir,
    options,
    onProgress: (progress) => {
      process.stdout.write(`${JSON.stringify({ progress })}\n`);
    },
  });

  process.stdout.write(`${JSON.stringify({ done: true, ...result })}\n`);
};

await main();
