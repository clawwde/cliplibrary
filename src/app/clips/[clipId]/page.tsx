import { notFound } from 'next/navigation';
import { ClipTimelineEditor } from '@/components/clip-timeline/clip-timeline-editor';
import { type ControlDescriptor, describeSchema, seedProjectForClip } from '@/core';
import { CLIP_IDS, CLIP_SCHEMAS, getClipMeta, isClipId } from '@/schemas';

const descriptorsByClip = (): Record<string, ControlDescriptor[]> =>
  Object.fromEntries(CLIP_IDS.map((id) => [id, describeSchema(CLIP_SCHEMAS[id])]));

const ClipEditorPage = async ({ params }: { params: Promise<{ clipId: string }> }) => {
  const { clipId } = await params;
  if (!isClipId(clipId)) {
    notFound();
  }

  return (
    <ClipTimelineEditor
      title={getClipMeta(clipId).title}
      descriptorsByClip={descriptorsByClip()}
      initialProject={seedProjectForClip(clipId)}
    />
  );
};

export default ClipEditorPage;
