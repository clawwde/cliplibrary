import { readProjectHistory, revertProjectToVersion } from '@cliplibrary/core';
import { isClipId } from '@cliplibrary/schemas';
import { NextResponse } from 'next/server';
import { repoRoot } from '@/lib/repo-root';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ clipId: string }> };

export const GET = async (_request: Request, context: RouteContext): Promise<Response> => {
  const { clipId } = await context.params;
  if (!isClipId(clipId)) {
    return NextResponse.json({ error: 'Unknown clip' }, { status: 404 });
  }
  return NextResponse.json(await readProjectHistory(repoRoot(), clipId));
};

export const POST = async (request: Request, context: RouteContext): Promise<Response> => {
  const { clipId } = await context.params;
  if (!isClipId(clipId)) {
    return NextResponse.json({ error: 'Unknown clip' }, { status: 404 });
  }
  const body = (await request.json()) as { versionId: string };
  const file = await revertProjectToVersion(repoRoot(), clipId, body.versionId);
  if (file === null) {
    return NextResponse.json({ error: 'Unknown version' }, { status: 404 });
  }
  return NextResponse.json(file);
};
