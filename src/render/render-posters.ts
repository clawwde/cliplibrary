import { existsSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { POSTER_PACKS, POSTER_UPDATED_AT } from '@/posters';
import { posterPreviewEntry, posterPreviewsDir, publicDir } from './paths';
import { stampPosterUpdatedAt } from './posters/poster-updated-at';
import { posterPreviewFileName } from './posters/preview-file-names';

const PREVIEW_WIDTH = 480;

interface Options {
  packFile: string | undefined;
  ids: string[];
  newOnly: boolean;
  outDir: string;
  width: number;
}

const parseOptions = (args: readonly string[]): Options => {
  const value = (flag: string) => {
    const index = args.indexOf(flag);
    return index === -1 ? undefined : args[index + 1];
  };
  const packFile = value('--pack-file');
  const flagValues = new Set([value('--out'), value('--width'), packFile]);
  return {
    packFile: packFile === undefined ? undefined : resolve(packFile),
    ids: args.filter((arg) => !(arg.startsWith('-') || flagValues.has(arg))),
    newOnly: args.includes('--new') || args.includes('-new'),
    outDir: value('--out') ?? posterPreviewsDir,
    width: Number(value('--width') ?? PREVIEW_WIDTH),
  };
};

const qaEntry = async (packFile: string): Promise<string> => {
  const entry = join(dirname(posterPreviewEntry), `qa-${process.pid}.tsx`);
  const source = (await Bun.file(posterPreviewEntry).text()).replace(
    "import { POSTER_PACKS } from '@/posters';",
    `import * as candidates from './${relative(dirname(posterPreviewEntry), packFile).replace(/\.ts$/, '')}';\nconst POSTER_PACKS = Object.values(candidates).filter((value) => typeof value === 'object' && value !== null && 'meta' in value && 'build' in value) as import('@/posters').PosterPack[];`,
  );
  await writeFile(entry, source);
  return entry;
};

const bundle = async (packFile: string | undefined): Promise<string> => {
  const entry = packFile === undefined ? posterPreviewEntry : await qaEntry(packFile);
  const result = await Bun.build({
    entrypoints: [entry],
    target: 'browser',
    format: 'esm',
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  if (entry !== posterPreviewEntry) {
    await rm(entry, { force: true });
  }
  const [output] = result.outputs;
  if (!result.success || output === undefined) {
    throw new Error(result.logs.map(String).join('\n'));
  }
  return output.text();
};

const serve = (script: string) =>
  Bun.serve({
    port: 0,
    fetch: (request) => {
      const { pathname } = new URL(request.url);
      if (pathname === '/') {
        return new Response(
          '<!doctype html><html><body style="margin:0"><script type="module" src="/entry.js"></script></body></html>',
          { headers: { 'content-type': 'text/html' } },
        );
      }
      if (pathname === '/entry.js') {
        return new Response(script, { headers: { 'content-type': 'text/javascript' } });
      }
      return new Response(Bun.file(join(publicDir, decodeURIComponent(pathname))));
    },
  });

const pendingPages = (
  options: Options,
  packs: readonly { meta: { id: string; pageCount: number } }[],
) =>
  packs
    .filter((pack) => options.ids.length === 0 || options.ids.includes(pack.meta.id))
    .flatMap((pack) =>
      Array.from({ length: pack.meta.pageCount }, (_, pageIndex) => ({
        packId: pack.meta.id,
        pageIndex,
        file: join(options.outDir, pack.meta.id, posterPreviewFileName(pageIndex)),
      })).filter((job) => !(options.newOnly && existsSync(job.file))),
    );

const main = async (): Promise<void> => {
  const options = parseOptions(process.argv.slice(2));
  const packs =
    options.packFile === undefined
      ? POSTER_PACKS
      : Object.values(await import(options.packFile)).filter(
          (value): value is (typeof POSTER_PACKS)[number] =>
            typeof value === 'object' && value !== null && 'meta' in value && 'build' in value,
        );
  const jobs = pendingPages(options, packs);
  if (jobs.length === 0) {
    console.info('No poster previews to render.');
    return;
  }
  const server = serve(await bundle(options.packFile));
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    page.on('pageerror', (error) => console.error(error.message));
    await page.goto(`http://localhost:${server.port}/`);
    await page.waitForFunction(() => 'posterPreview' in window);
    const packIds = new Set(jobs.map((job) => job.packId));
    if (options.outDir === posterPreviewsDir && !options.newOnly) {
      await Promise.all(
        [...packIds].map((id) => rm(join(options.outDir, id), { recursive: true, force: true })),
      );
    }
    for (const job of jobs) {
      const dataUrl = await page.evaluate(
        ({ packId, pageIndex, width }) =>
          (
            window as unknown as {
              posterPreview: {
                render: (id: string, index: number, width: number) => Promise<string>;
              };
            }
          ).posterPreview.render(packId, pageIndex, width),
        { packId: job.packId, pageIndex: job.pageIndex, width: options.width },
      );
      await mkdir(join(options.outDir, job.packId), { recursive: true });
      await writeFile(job.file, Buffer.from(dataUrl.split(',')[1] ?? '', 'base64'));
      console.info(`  ${job.packId} ${job.pageIndex + 1}`);
    }
  } finally {
    await browser.close();
    await server.stop(true);
  }
  if (options.outDir === posterPreviewsDir && options.packFile === undefined) {
    const rendered = [...new Set(jobs.map((job) => job.packId))];
    await stampPosterUpdatedAt(
      rendered.filter((id) => options.ids.includes(id) || POSTER_UPDATED_AT[id] === undefined),
      new Date(),
    );
  }
  console.info(`Rendered ${jobs.length} poster previews to ${options.outDir}`);
};

await main();
