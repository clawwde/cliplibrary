import {
  type ControlDescriptor,
  describeSchema,
  readProject,
  readProjectHistory,
} from '@cliplibrary/core';
import { CLIP_IDS, CLIP_SCHEMAS, getClipMeta, isClipId } from '@cliplibrary/schemas';
import { notFound } from 'next/navigation';
import { ClipTimelineEditor } from '@/components/clip-timeline/clip-timeline-editor';
import { repoRoot } from '@/lib/repo-root';

export const dynamic = 'force-dynamic';

const descriptorsByClip = (): Record<string, ControlDescriptor[]> =>
  Object.fromEntries(CLIP_IDS.map((id) => [id, describeSchema(CLIP_SCHEMAS[id])]));

const ClipEditorPage = async ({ params }: { params: Promise<{ clipId: string }> }) => {
  const { clipId } = await params;
  if (!isClipId(clipId)) {
    notFound();
  }
  const root = repoRoot();
  const meta = getClipMeta(clipId);
  const [initialProject, initialHistory] = await Promise.all([
    readProject(root, clipId),
    readProjectHistory(root, clipId),
  ]);

  return (
    <ClipTimelineEditor
      clipId={clipId}
      title={meta.title}
      descriptorsByClip={descriptorsByClip()}
      initialProject={initialProject}
      initialHistory={initialHistory}
    />
  );
};

export default ClipEditorPage;
