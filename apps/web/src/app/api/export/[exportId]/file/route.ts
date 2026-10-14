import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextResponse } from 'next/server';
import { repoRoot } from '@/lib/repo-root';

export const runtime = 'nodejs';

const CONTENT_TYPES: Record<string, string> = {
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  webm: 'video/webm',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
};

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ exportId: string }> },
): Promise<Response> => {
  const { exportId } = await params;
  const query = new URL(request.url).searchParams;
  const wantPoster = query.has('poster');
  const wantDownload = query.has('download');

  const dir = join(repoRoot(), 'apps', 'web', 'public', 'exports', exportId);
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const target = wantPoster
    ? entries.find((name) => name.endsWith('.jpg'))
    : entries.find((name) => !name.endsWith('.jpg'));
  if (target === undefined) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const data = await readFile(join(dir, target));
  const extension = target.split('.').pop() ?? 'mp4';
  const headers = new Headers({
    'content-type': CONTENT_TYPES[extension] ?? 'application/octet-stream',
    'content-length': String(data.byteLength),
    'cache-control': 'no-store',
  });
  if (wantDownload) {
    headers.set('content-disposition', `attachment; filename="${target}"`);
  }
  return new Response(new Uint8Array(data), { headers });
};
