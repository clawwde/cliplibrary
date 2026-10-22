import { existsSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from '@playwright/test';
import { POSTER_PACKS } from '@/posters';
import { posterPreviewEntry, posterPreviewsDir, publicDir } from './paths';
import { posterPreviewFileName } from './posters/preview-file-names';

const PREVIEW_WIDTH = 480;

interface Options {
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
  const flagValues = new Set([value('--out'), value('--width')]);
  return {
    ids: args.filter((arg) => !(arg.startsWith('-') || flagValues.has(arg))),
    newOnly: args.includes('--new') || args.includes('-new'),
    outDir: value('--out') ?? posterPreviewsDir,
    width: Number(value('--width') ?? PREVIEW_WIDTH),
  };
};

const bundle = async (): Promise<string> => {
  const result = await Bun.build({
    entrypoints: [posterPreviewEntry],
    target: 'browser',
    format: 'esm',
    define: { 'process.env.NODE_ENV': '"production"' },
  });
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

const pendingPages = (options: Options) =>
  POSTER_PACKS.filter(
    (pack) => options.ids.length === 0 || options.ids.includes(pack.meta.id),
  ).flatMap((pack) =>
    Array.from({ length: pack.meta.pageCount }, (_, pageIndex) => ({
      packId: pack.meta.id,
      pageIndex,
      file: join(options.outDir, pack.meta.id, posterPreviewFileName(pageIndex)),
    })).filter((job) => !(options.newOnly && existsSync(job.file))),
  );

const main = async (): Promise<void> => {
  const options = parseOptions(process.argv.slice(2));
  const jobs = pendingPages(options);
  if (jobs.length === 0) {
    console.info('No poster previews to render.');
    return;
  }
  const server = serve(await bundle());
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
  console.info(`Rendered ${jobs.length} poster previews to ${options.outDir}`);
};

await main();
