import { notFound } from 'next/navigation';
import { ClipTimelineEditor } from '@/components/clip-timeline/clip-timeline-editor';
import { type ControlSectionView, resolveClipControls, seedProjectForClip } from '@/core';
import { clipPreviewVideo } from '@/lib/clips';
import { CLIP_MODULES, getClipMeta, isClipId } from '@/schemas';

const controlsByClip = (): Record<string, ControlSectionView[]> =>
  Object.fromEntries(
    CLIP_MODULES.map((module) => [module.id, resolveClipControls(module.schema, module.controls)]),
  );

const ClipEditorPage = async ({ params }: { params: Promise<{ clipId: string }> }) => {
  const { clipId } = await params;
  if (!isClipId(clipId)) {
    notFound();
  }

  return (
    <ClipTimelineEditor
      title={getClipMeta(clipId).title}
      controlsByClip={controlsByClip()}
      initialProject={seedProjectForClip(clipId)}
      demoSrc={clipPreviewVideo(clipId)}
    />
  );
};

export default ClipEditorPage;
