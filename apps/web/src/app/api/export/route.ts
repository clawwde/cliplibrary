import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { appendExport, type ExportRecord, updateExport } from '@cliplibrary/core';
import { isClipId } from '@cliplibrary/schemas';
import { NextResponse } from 'next/server';
import { setJob, updateJob } from '@/lib/export-jobs';
import { buildRenderArgs, type ExportRequest } from '@/lib/export-run';
import { DEFAULT_RENDER_OPTIONS, outputExtension, type RenderOptions } from '@/lib/render-options';
import { repoRoot } from '@/lib/repo-root';

export const runtime = 'nodejs';

const parseProgress = (line: string): number | null => {
  try {
    const parsed = JSON.parse(line) as { progress?: number };
    return typeof parsed.progress === 'number' ? parsed.progress : null;
  } catch {
    return null;
  }
};

export const POST = async (request: Request): Promise<Response> => {
  const body = (await request.json()) as ExportRequest;
  if (!isClipId(body.clipId)) {
    return NextResponse.json({ error: 'Unknown clip' }, { status: 400 });
  }

  const options: RenderOptions = { ...DEFAULT_RENDER_OPTIONS, ...body.options };
  const root = repoRoot();
  const exportId = crypto.randomUUID();
  const publicBase = `/exports/${exportId}`;
  const record: ExportRecord = {
    exportId,
    clipId: body.clipId,
    mp4: `${publicBase}/${body.clipId}.${outputExtension(options.codec)}`,
    poster: `${publicBase}/${body.clipId}.jpg`,
    createdAt: new Date().toISOString(),
    status: 'rendering',
    progress: 0,
    propsVersionId: 'live',
    error: null,
  };

  setJob(record);
  await appendExport(root, record);

  const outDir = join(root, 'apps', 'web', 'public', 'exports', exportId);
  const tmp = join(tmpdir(), `cliplibrary-export-${exportId}`);
  await mkdir(tmp, { recursive: true });
  const optionsPath = join(tmp, 'options.json');
  const propsPath = join(tmp, 'props.json');
  await writeFile(optionsPath, JSON.stringify(options), 'utf8');
  await writeFile(propsPath, JSON.stringify(body.values), 'utf8');

  const child = spawn(
    'bun',
    buildRenderArgs({
      renderCwd: join(root, 'apps', 'render'),
      clipId: body.clipId,
      outDir,
      optionsPath,
      propsPath,
    }),
    { cwd: root },
  );

  let buffer = '';
  let stderr = '';
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk: string) => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      const progress = parseProgress(line.trim());
      if (progress !== null) {
        updateJob(exportId, { progress });
      }
    }
  });
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (chunk: string) => {
    stderr += chunk;
  });
  child.on('close', (code) => {
    const patch: Partial<ExportRecord> =
      code === 0
        ? { status: 'done', progress: 1 }
        : {
            status: 'error',
            error: stderr.trim().slice(-500) || `render exited with code ${String(code)}`,
          };
    updateJob(exportId, patch);
    updateExport(root, exportId, patch).catch(() => undefined);
  });

  return NextResponse.json({ exportId });
};
