import {
  type StudioBackdropProps,
  studioBackdropDefaults,
  studioBackdropMeta,
  studioBackdropSchema,
} from '@cliplibrary/schemas';
import { Composition, useCurrentFrame } from 'remotion';
import { Backdrop } from '../../promo/backdrop';
import { TransitionFrame } from '../../promo/transition-frame';
import type { SceneModule } from '../../scene-module';

export const StudioBackdrop = ({ focusX, focusY, sweep, look, motion }: StudioBackdropProps) => {
  const frame = useCurrentFrame() * motion.speed;
  return (
    <TransitionFrame motion={motion}>
      <Backdrop
        look={look}
        focusX={focusX + Math.sin(frame / 120) * sweep}
        focusY={focusY + Math.cos(frame / 150) * sweep * 0.4}
      />
    </TransitionFrame>
  );
};

export const studioBackdropScene: SceneModule = {
  id: 'studio-backdrop',
  component: StudioBackdrop,
  render: (key) => (
    <Composition
      key={key}
      id="studio-backdrop"
      component={StudioBackdrop}
      schema={studioBackdropSchema}
      defaultProps={studioBackdropDefaults}
      durationInFrames={studioBackdropMeta.durationInFrames}
      fps={studioBackdropMeta.fps}
      width={studioBackdropMeta.width}
      height={studioBackdropMeta.height}
    />
  ),
};
