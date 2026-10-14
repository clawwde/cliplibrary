import { readProps, writeProps } from '@cliplibrary/core';
import { isClipId } from '@cliplibrary/schemas';
import { NextResponse } from 'next/server';
import { repoRoot } from '@/lib/repo-root';

export const runtime = 'nodejs';

type RouteContext = { params: Promise<{ clipId: string }> };

const zodIssues = (error: unknown): unknown[] | null => {
  if (typeof error === 'object' && error !== null && 'issues' in error) {
    const { issues } = error as { issues: unknown };
    if (Array.isArray(issues)) {
      return issues;
    }
  }
  return null;
};

export const GET = async (_request: Request, context: RouteContext): Promise<Response> => {
  const { clipId } = await context.params;
  if (!isClipId(clipId)) {
    return NextResponse.json({ error: 'Unknown clip' }, { status: 404 });
  }
  return NextResponse.json(await readProps(repoRoot(), clipId));
};

export const PATCH = async (request: Request, context: RouteContext): Promise<Response> => {
  const { clipId } = await context.params;
  if (!isClipId(clipId)) {
    return NextResponse.json({ error: 'Unknown clip' }, { status: 404 });
  }
  const body = (await request.json()) as { values: unknown; label?: string | null };
  try {
    const file = await writeProps(repoRoot(), clipId, body.values, body.label ?? null);
    return NextResponse.json(file);
  } catch (error) {
    const issues = zodIssues(error);
    if (issues !== null) {
      return NextResponse.json({ error: 'Invalid props', issues }, { status: 400 });
    }
    throw error;
  }
};
