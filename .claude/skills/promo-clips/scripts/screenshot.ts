const [url, output, waitMs = '9000'] = process.argv.slice(2);
if (url === undefined || output === undefined) {
  console.error('usage: bun screenshot.ts <url> <out.png> [wait-ms]');
  process.exit(1);
}
const { chromium } = await import(Bun.resolveSync('@playwright/test', `${process.cwd()}/apps/web`));
const browser = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const messages: string[] = [];
page.on('pageerror', (error: Error) => messages.push(`pageerror: ${error.message}`));
page.on('console', (message: { type(): string; text(): string }) => {
  if (message.type() === 'error' || message.type() === 'warning') {
    messages.push(`${message.type()}: ${message.text().slice(0, 200)}`);
  }
});
await page.goto(url, { waitUntil: 'networkidle', timeout: 240_000 });
await page.waitForTimeout(Number(waitMs));
await page.screenshot({ path: output, fullPage: true });
console.log('saved', output);
console.log('messages', JSON.stringify([...new Set(messages)].slice(0, 20), null, 2));
await browser.close();
