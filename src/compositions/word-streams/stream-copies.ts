import type { WordStreamsProps } from '@/schemas';
import { pixelTween, settle } from '../promo/timing';
import {
  pathLength,
  pointAt,
  type SwellProfile,
  streamPath,
  swellIntegral,
  swellShape,
  TAU,
} from './stream-geometry';

const MAX_COPIES = 600;

export type StreamCopy = {
  key: number;
  x: number;
  y: number;
  angle: number;
  size: number;
  swell: number;
};

export type StreamInput = {
  props: WordStreamsProps;
  profile: SwellProfile;
  index: number;
  rawFrame: number;
  frame: number;
  width: number;
  height: number;
};

const flowSign = ({ flow }: WordStreamsProps, index: number): number => {
  const sign = flow.direction === 'up' ? -1 : 1;
  return flow.alternate && index % 2 === 1 ? -sign : sign;
};

export const streamCopies = ({
  props,
  profile,
  index,
  rawFrame,
  frame,
  width,
  height,
}: StreamInput): StreamCopy[] => {
  const { word, streams, wave, swell, flow } = props;
  const largest = Math.max(word.size, swell.peak);
  const margin = largest * Math.max(1, word.text.length * 0.4) + 40;
  const waveNumber = TAU / wave.length;
  const path = streamPath(
    {
      centerX: width / 2 + streams.offsetX + (index - (streams.count - 1) / 2) * streams.gap,
      amplitude: wave.amplitude,
      waveNumber,
      phase: (index * streams.phaseStep * Math.PI) / 180 - waveNumber * wave.sway * frame,
    },
    -margin,
    height + margin,
  );
  const length = pathLength(path);
  const sign = flowSign(props, index);
  const swing = swell.peak - word.size;
  const meanSize = word.size + swing * profile.mean;
  const lead = (-sign * swell.drift * frame) / (word.spacing * meanSize);
  const offset = index * swell.offset;
  const phaseOf = (copy: number) => (copy + lead) / swell.length + offset;
  const integral = (copy: number) =>
    word.size * (copy + lead) +
    swing * swell.length * (swellIntegral(profile, phaseOf(copy)) - swellIntegral(profile, offset));
  const rise =
    flow.riseFrames > 0
      ? pixelTween(
          frame,
          [0, flow.riseFrames + index * flow.riseStagger],
          [flow.riseDistance, 0],
          settle,
        )
      : 0;
  const shift = sign * (flow.speed * rawFrame + swell.drift * frame - rise);
  const arcOf = (copy: number) => word.spacing * integral(copy) + shift;
  let first = 0;
  while (first > -MAX_COPIES && arcOf(first - 1) >= 0) {
    first--;
  }
  while (first < MAX_COPIES && arcOf(first) < 0) {
    first++;
  }
  const copies: StreamCopy[] = [];
  for (let copy = first; copy < first + MAX_COPIES; copy++) {
    const arc = arcOf(copy);
    if (arc > length) {
      break;
    }
    const share = swellShape(phaseOf(copy), swell.sharpness);
    copies.push({
      key: copy,
      ...pointAt(path, arc),
      size: word.size + swing * share,
      swell: share,
    });
  }
  return copies;
};
