import { CameraMotionBlur } from '@remotion/motion-blur';
import { useMemo } from 'react';
import { AbsoluteFill, getRemotionEnvironment, useCurrentFrame } from 'remotion';
import type { ProblemStrikeoutProps } from '@/schemas';
import { DeskStage } from '../promo/desk/desk-stage';
import { LensOverlay } from '../promo/desk/lens';
import { handFonts } from '../promo/fonts';
import { cameraShot, canvasToWorld, pencilState, strikeSchedule } from './choreography';
import { DeskMat } from './desk-mat';
import { Notebook } from './notebook';
import { layoutProblems, strikePath } from './page-art';
import { Pencil, pencilAxis } from './pencil';
import { WritingHand } from './writing-hand';

const useStrikePaths = (page: ProblemStrikeoutProps['page']) =>
  useMemo(() => {
    const context = document.createElement('canvas').getContext('2d');
    if (context === null) {
      return [];
    }
    return layoutProblems(context, page, handFonts[page.font]).map((problem, index) =>
      strikePath(problem, page, index),
    );
  }, [page]);

const Desk = ({ blurred, ...props }: ProblemStrikeoutProps & { blurred: boolean }) => {
  const { page, notebook, pencil, timing, desk, camera, light, lens } = props;
  const frame = useCurrentFrame() * props.motion.speed;
  const paths = useStrikePaths(page);
  const schedule = useMemo(() => strikeSchedule(paths, timing), [paths, timing]);
  const shot = cameraShot(paths, schedule, props, frame);
  const state = pencilState(paths, schedule, timing, pencil.lift, frame);
  const tip = canvasToWorld(notebook, state.tip, state.height);
  const axis = pencilAxis(pencil, state.sweep);
  return (
    <DeskStage
      camera={{
        x: shot.eye.x,
        y: shot.eye.y,
        z: shot.eye.z,
        targetX: shot.target.x,
        targetY: shot.target.y,
        targetZ: shot.target.z,
        fieldOfView: camera.fieldOfView,
        handheld: camera.handheld,
      }}
      light={light}
      frame={frame}
      lens={lens}
      blurred={blurred}
      focus={[shot.focus.x, shot.focus.y, shot.focus.z]}
    >
      <DeskMat color={desk.surface} roughness={desk.roughness} />
      <Notebook page={page} notebook={notebook} schedule={schedule} paths={paths} frame={frame} />
      {pencil.show ? <Pencil pencil={pencil} tip={tip} axis={axis} /> : null}
      {pencil.show && props.hand.show ? (
        <WritingHand hand={props.hand} tip={tip} axis={axis} frame={frame} />
      ) : null}
    </DeskStage>
  );
};

export const NotebookScene = (props: ProblemStrikeoutProps) => {
  const { lens, camera } = props;
  const blurred = getRemotionEnvironment().isRendering && lens.motionBlur > 1;
  return (
    <AbsoluteFill style={{ background: props.desk.surface }}>
      {blurred ? (
        <CameraMotionBlur samples={lens.motionBlur} shutterAngle={lens.shutterAngle}>
          <Desk {...props} blurred />
        </CameraMotionBlur>
      ) : (
        <Desk {...props} blurred={false} />
      )}
      <LensOverlay grain={camera.grain} vignette={camera.vignette} />
    </AbsoluteFill>
  );
};
