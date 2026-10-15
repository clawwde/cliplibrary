const [id, output, range] = process.argv.slice(2);
if (id === undefined || output === undefined) {
  console.error('usage: bun render-clip.ts <clip-id> <out.mp4> [from-to]');
  process.exit(1);
}
const repo = process.cwd();
const from = `${repo}/apps/render`;
const { bundle } = await import(Bun.resolveSync('@remotion/bundler', from));
const { renderMedia, selectComposition, ensureBrowser } = await import(
  Bun.resolveSync('@remotion/renderer', from)
);
const browserOptions = { chromiumOptions: { gl: 'angle' }, timeoutInMilliseconds: 120_000 };
await ensureBrowser();
const serveUrl = await bundle({ entryPoint: `${repo}/packages/compositions/src/entry.ts` });
const composition = await selectComposition({ serveUrl, id, ...browserOptions });
const frameRange = range === undefined ? {} : { frameRange: range.split('-').map(Number) };
let reported = -1;
await renderMedia({
  serveUrl,
  composition,
  codec: 'h264',
  crf: 16,
  muted: true,
  outputLocation: output,
  concurrency: 4,
  ...frameRange,
  ...browserOptions,
  onProgress: ({ progress }: { progress: number }) => {
    const percent = Math.floor(progress * 10) * 10;
    if (percent !== reported) {
      reported = percent;
      console.log(`progress ${percent}%`);
    }
  },
});
console.log('done', output);
