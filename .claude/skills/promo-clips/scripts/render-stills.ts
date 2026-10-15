const [outDir, ...jobs] = process.argv.slice(2);
if (outDir === undefined || jobs.length === 0) {
  console.error('usage: bun render-stills.ts <out-dir> <clip-id>@<frame> [...]');
  process.exit(1);
}
const repo = process.cwd();
const from = `${repo}/apps/render`;
const { bundle } = await import(Bun.resolveSync('@remotion/bundler', from));
const { renderStill, selectComposition, ensureBrowser } = await import(
  Bun.resolveSync('@remotion/renderer', from)
);
const browserOptions = { chromiumOptions: { gl: 'angle' }, timeoutInMilliseconds: 120_000 };
await ensureBrowser();
const serveUrl = await bundle({ entryPoint: `${repo}/packages/compositions/src/entry.ts` });
for (const job of jobs) {
  const [id, frame] = job.split('@');
  const composition = await selectComposition({ serveUrl, id, ...browserOptions });
  const output = `${outDir}/${id}-${frame}.png`;
  await renderStill({ serveUrl, composition, frame: Number(frame), output, ...browserOptions });
  console.log('still', output);
}
