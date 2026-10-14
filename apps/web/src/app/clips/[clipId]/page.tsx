import { describeSchema, readHistory } from '@cliplibrary/core';
import { CLIP_SCHEMAS, isClipId } from '@cliplibrary/schemas';
import { notFound } from 'next/navigation';
import { ClipEditor } from '@/components/editor/clip-editor';
import { getClip } from '@/lib/clips';
import { repoRoot } from '@/lib/repo-root';

const ClipEditorPage = async ({ params }: { params: Promise<{ clipId: string }> }) => {
  const { clipId } = await params;
  if (!isClipId(clipId)) {
    notFound();
  }
  const clip = await getClip(clipId);
  const descriptors = describeSchema(CLIP_SCHEMAS[clipId]);
  const history = await readHistory(repoRoot(), clipId);

  return (
    <ClipEditor
      clipId={clipId}
      meta={clip.meta}
      descriptors={descriptors}
      initialValues={clip.props.values as Record<string, unknown>}
      initialHistory={history}
      initialVersionId={clip.props.currentVersionId}
    />
  );
};

export default ClipEditorPage;
