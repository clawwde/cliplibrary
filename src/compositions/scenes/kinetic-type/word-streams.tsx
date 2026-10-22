import { useMemo } from 'react';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  type PromoLook,
  type WordStreamsProps,
  wordStreamsDefaults,
  wordStreamsMeta,
  wordStreamsSchema,
} from '@/schemas';
import { Backdrop } from '../../promo/backdrop';
import { displayFont } from '../../promo/fonts';
import { smooth, tween } from '../../promo/timing';
import { TransitionFrame } from '../../promo/transition-frame';
import type { SceneModule } from '../../scene-module';
import { type StreamCopy, streamCopies } from '../../word-streams/stream-copies';
import { swellProfile } from '../../word-streams/stream-geometry';

const OUTLINE_BLEND = 0.12;

const toneLook = ({ look, tone }: WordStreamsProps): PromoLook =>
  tone.dark
    ? { ...look, background: look.ink, backgroundEdge: look.ink, ink: look.background }
    : look;

const withAlpha = (hex: string, alpha: number): string => {
  const channel = (start: number) => Number.parseInt(hex.slice(start, start + 2), 16);
  const base = hex.length === 9 ? channel(7) / 255 : 1;
  return `rgba(${channel(1)}, ${channel(3)}, ${channel(5)}, ${(base * alpha).toFixed(3)})`;
};

const outlineShare = ({ swell }: WordStreamsProps, copy: StreamCopy): number =>
  swell.outline
    ? tween(
        copy.swell,
        [swell.outlineFrom - OUTLINE_BLEND, swell.outlineFrom + OUTLINE_BLEND],
        [0, 1],
        smooth,
      )
    : 0;

const streamOpacity = ({ flow }: WordStreamsProps, index: number, frame: number): number => {
  if (flow.fadeFrames <= 0) {
    return 1;
  }
  const start = index * flow.riseStagger;
  return tween(frame, [start, start + flow.fadeFrames], [0, 1], smooth);
};

const WordStreams = (props: WordStreamsProps) => {
  const { word, streams, swell, motion } = props;
  const look = toneLook(props);
  const rawFrame = useCurrentFrame();
  const frame = rawFrame * motion.speed;
  const { width, height } = useVideoConfig();
  const profile = useMemo(() => swellProfile(swell.sharpness), [swell.sharpness]);
  return (
    <TransitionFrame motion={motion}>
      {look.showBackdrop ? <Backdrop look={look} /> : null}
      <AbsoluteFill>
        {Array.from({ length: streams.count }, (_, index) => (
          <AbsoluteFill key={index} style={{ opacity: streamOpacity(props, index, frame) }}>
            {streamCopies({ props, profile, index, rawFrame, frame, width, height }).map((copy) => {
              const outline = outlineShare(props, copy);
              return (
                <div
                  key={`${index}-${copy.key}`}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transformOrigin: '0 0',
                    transform: `translate(${copy.x.toFixed(2)}px, ${copy.y.toFixed(2)}px) rotate(${copy.angle.toFixed(5)}rad) translate(-50%, -50%)`,
                    fontFamily: displayFont,
                    fontSize: copy.size,
                    fontWeight: word.weight,
                    letterSpacing: `${word.tracking}em`,
                    lineHeight: 1,
                    whiteSpace: 'pre',
                    color: outline > 0 ? withAlpha(look.ink, 1 - outline) : look.ink,
                    WebkitTextStroke:
                      outline > 0
                        ? `${(swell.outlineWidth * outline).toFixed(2)}px ${look.ink}`
                        : undefined,
                  }}
                >
                  {word.text}
                </div>
              );
            })}
          </AbsoluteFill>
        ))}
      </AbsoluteFill>
    </TransitionFrame>
  );
};

export const wordStreamsScene: SceneModule = {
  id: 'word-streams',
  component: WordStreams,
  render: (key) => (
    <Composition
      key={key}
      id="word-streams"
      component={WordStreams}
      schema={wordStreamsSchema}
      defaultProps={wordStreamsDefaults}
      durationInFrames={wordStreamsMeta.durationInFrames}
      fps={wordStreamsMeta.fps}
      width={wordStreamsMeta.width}
      height={wordStreamsMeta.height}
    />
  ),
};
