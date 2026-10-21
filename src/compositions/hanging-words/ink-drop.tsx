import { AbsoluteFill } from 'remotion';
import type { HangingWordsProps } from '@/schemas';
import { progress } from './physics';

const WIDTH = 1080;
const HEIGHT = 1920;
const CROWN = -600;

const coverage = (props: HangingWordsProps, frame: number): number => {
  const { drop } = props;
  if (frame < drop.liftStart) {
    return progress(frame, drop.fallStart, drop.fallFrames);
  }
  return 1 - progress(frame, drop.liftStart, drop.liftFrames);
};

const dropShape = (amount: number, width: number): string | undefined => {
  if (amount >= 1) {
    return undefined;
  }
  const bottom = amount * HEIGHT * 1.68;
  const radiusX = amount * WIDTH * 0.56 * width;
  const radiusY = (bottom - CROWN) / 2;
  const centerY = CROWN + radiusY;
  return `ellipse(${radiusX.toFixed(1)}px ${radiusY.toFixed(1)}px at 50% ${centerY.toFixed(1)}px)`;
};

export const inkCovers = (props: HangingWordsProps, frame: number): boolean =>
  coverage(props, frame) >= 1;

export const InkDrop = ({ props, frame }: { props: HangingWordsProps; frame: number }) => {
  const amount = coverage(props, frame);
  if (amount <= 0) {
    return null;
  }
  return (
    <AbsoluteFill
      style={{
        background: props.palette.night,
        clipPath: dropShape(amount, props.drop.width),
      }}
    />
  );
};
