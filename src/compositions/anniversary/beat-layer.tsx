import type { FC } from 'react';
import { AbsoluteFill } from 'remotion';
import type { AnniversaryBeat, AnniversaryEffect, AnniversaryLook } from '@/schemas';
import { BeatBackdrop } from './backdrop';
import { BeatDecor } from './decor';
import {
  DropWord,
  type EffectProps,
  FillSweepWord,
  FlashCutWord,
  GradientWord,
  HoldWord,
  TypeOnWord,
} from './effects';
import {
  OutlineFlickerWord,
  SlantRepeatWord,
  TrackedOutlineWord,
  TrackInWord,
  TripleSlideWord,
  TripleStackWord,
  WaveStackWord,
} from './effects-more';
import { Glitched, glitchStrength } from './glitch';

const EFFECTS: Record<AnniversaryEffect, FC<EffectProps>> = {
  hold: HoldWord,
  'wave-stack': WaveStackWord,
  gradient: GradientWord,
  'fill-sweep': FillSweepWord,
  'flash-cut': FlashCutWord,
  drop: DropWord,
  'slant-repeat': SlantRepeatWord,
  'outline-flicker': OutlineFlickerWord,
  'type-on': TypeOnWord,
  'triple-slide': TripleSlideWord,
  'triple-stack': TripleStackWord,
  'track-in': TrackInWord,
  'tracked-outline': TrackedOutlineWord,
};

const PULSE = [0.45, 1, 0.6, 0.2];

const pulseBlur = (beat: AnniversaryBeat, local: number): number => {
  if (beat.pulseBlur <= 0 || beat.pulseAt <= 0) {
    return 0;
  }
  const step = Math.floor(local - beat.pulseAt);
  return (PULSE[step] ?? 0) * beat.pulseBlur;
};

export const BeatLayer = ({
  beat,
  index,
  look,
  local,
  length,
  width,
  height,
}: {
  beat: AnniversaryBeat;
  index: number;
  look: AnniversaryLook;
  local: number;
  length: number;
  width: number;
  height: number;
}) => {
  const Effect = EFFECTS[beat.effect];
  const blur = pulseBlur(beat, local);
  const decorLook = beat.backdrop === 'paper' ? { ...look, stroke: beat.color } : look;
  const id = `anniversary-${index}`;
  return (
    <AbsoluteFill>
      {look.showBackdrop ? (
        <BeatBackdrop
          kind={beat.backdrop}
          look={look}
          local={local}
          index={index}
          width={width}
          height={height}
        />
      ) : null}
      <Glitched
        id={`${id}-glitch-${Math.floor(local)}`}
        strength={glitchStrength(beat, local)}
        seed={look.glitchSeed + Math.floor(local) * 5 + index * 17}
        size={beat.size}
        look={look}
      >
        <BeatDecor beat={beat} look={decorLook} local={local} width={width} height={height} />
        <AbsoluteFill style={{ filter: blur > 0 ? `blur(${blur.toFixed(2)}px)` : undefined }}>
          <Effect
            beat={beat}
            look={look}
            local={local}
            length={length}
            width={width}
            height={height}
            id={id}
            backdrop={look.showBackdrop}
          />
        </AbsoluteFill>
      </Glitched>
    </AbsoluteFill>
  );
};
