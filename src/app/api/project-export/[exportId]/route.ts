import { NextResponse } from 'next/server';
import { getProjectJob } from '@/lib/project-jobs';

export const runtime = 'nodejs';

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ exportId: string }> },
): Promise<Response> => {
  const { exportId } = await params;
  const job = getProjectJob(exportId);
  if (job === null) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(job);
};
