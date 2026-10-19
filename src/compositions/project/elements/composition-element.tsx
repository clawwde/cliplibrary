import type { FC } from 'react';
import { AbsoluteFill } from 'remotion';
import type { CompositionElement } from '@/project';
import { isClipId } from '@/schemas';
import { CLIP_COMPONENTS } from '../../clip-components';

export const CompositionElementView = ({ element }: { element: CompositionElement }) => {
  if (!isClipId(element.clipId)) {
    return null;
  }
  const Component = CLIP_COMPONENTS[element.clipId] as FC<Record<string, unknown>>;
  return (
    <AbsoluteFill>
      <Component {...element.props} />
    </AbsoluteFill>
  );
};
