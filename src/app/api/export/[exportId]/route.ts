import { NextResponse } from 'next/server';
import { readExports } from '@/core';
import { getJob } from '@/lib/export-jobs';
import { repoRoot } from '@/lib/repo-root';

export const runtime = 'nodejs';

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ exportId: string }> },
): Promise<Response> => {
  const { exportId } = await params;
  const job = getJob(exportId);
  if (job !== null) {
    return NextResponse.json(job);
  }
  const records = await readExports(repoRoot());
  const record = records.find((entry) => entry.exportId === exportId);
  if (record === undefined) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(record);
};
