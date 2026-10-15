import type { Element } from '@cliplibrary/project';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { CompositionElementView } from './elements/composition-element';
import { ImageElementView } from './elements/image-element';
import { ShapeElementView } from './elements/shape-element';
import { TextElementView } from './elements/text-element';
import { VideoElementView } from './elements/video-element';
import { entranceStyle } from './entrance';

const renderInner = (element: Element) => {
  switch (element.type) {
    case 'text':
      return <TextElementView element={element} />;
    case 'image':
      return <ImageElementView element={element} />;
    case 'video':
      return <VideoElementView element={element} />;
    case 'shape':
      return <ShapeElementView element={element} />;
    default:
      return null;
  }
};

export const ElementView = ({ element }: { element: Element }) => {
  const frame = useCurrentFrame();
  const entrance = entranceStyle(element.animation, frame);
  const { transform } = element;
  const opacity = transform.opacity * entrance.opacity;
  const translateY = transform.y + entrance.translateY;
  const scale = transform.scale * entrance.scale;
  const transformCss = `translate(${transform.x}px, ${translateY}px) scale(${scale}) rotate(${transform.rotation}deg)`;

  if (element.type === 'composition') {
    return (
      <AbsoluteFill
        style={{
          opacity,
          transform: transformCss,
          transformOrigin: 'center center',
          overflow: 'hidden',
        }}
      >
        <CompositionElementView element={element} />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity,
          transform: transformCss,
        }}
      >
        {renderInner(element)}
      </div>
    </AbsoluteFill>
  );
};
