import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextResponse } from 'next/server';
import { repoRoot } from '@/lib/repo-root';

export const runtime = 'nodejs';

const MAX_BYTES = 20 * 1024 * 1024;

const EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/ogg': 'ogv',
  'video/quicktime': 'mov',
};

const extensionFor = (type: string): string => EXTENSIONS[type] ?? type.split('/')[1] ?? 'bin';

interface Upload {
  bytes: Uint8Array;
  type: string;
}

const readMultipart = async (request: Request): Promise<Upload | null> => {
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return null;
  }
  return { bytes: new Uint8Array(await file.arrayBuffer()), type: file.type };
};

const readJson = async (request: Request): Promise<Upload | null> => {
  const body = (await request.json()) as { data?: string; type?: string };
  if (typeof body.data !== 'string' || typeof body.type !== 'string') {
    return null;
  }
  return { bytes: new Uint8Array(Buffer.from(body.data, 'base64')), type: body.type };
};

export const POST = async (request: Request): Promise<Response> => {
  const contentType = request.headers.get('content-type') ?? '';
  const upload = contentType.includes('multipart/form-data')
    ? await readMultipart(request)
    : await readJson(request);
  if (upload === null) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!(upload.type.startsWith('image/') || upload.type.startsWith('video/'))) {
    return NextResponse.json({ error: 'Unsupported media type' }, { status: 415 });
  }
  if (upload.bytes.byteLength > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large' }, { status: 413 });
  }

  const name = `${crypto.randomUUID()}.${extensionFor(upload.type)}`;
  const dir = join(repoRoot(), 'apps', 'web', 'public', 'uploads');
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, name), upload.bytes);

  return NextResponse.json({ url: `/uploads/${name}` });
};
