import { describeSchema } from '@cliplibrary/core';
import { CLIP_SCHEMAS, isClipId } from '@cliplibrary/schemas';
import { notFound } from 'next/navigation';
import { ClipEditor } from '@/components/editor/clip-editor';
import { getClip } from '@/lib/clips';

const ClipEditorPage = async ({ params }: { params: Promise<{ clipId: string }> }) => {
  const { clipId } = await params;
  if (!isClipId(clipId)) {
    notFound();
  }
  const clip = await getClip(clipId);
  const descriptors = describeSchema(CLIP_SCHEMAS[clipId]);

  return (
    <ClipEditor
      clipId={clipId}
      meta={clip.meta}
      descriptors={descriptors}
      initialValues={clip.props.values as Record<string, unknown>}
    />
  );
};

export default ClipEditorPage;
