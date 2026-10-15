import {
  type OutlineMarqueeProps,
  outlineMarqueeDefaults,
  outlineMarqueeMeta,
  outlineMarqueeSchema,
} from '@cliplibrary/schemas';
import { useId } from 'react';
import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import { displayType, KineticLayer } from '../../promo/kinetic';
import { land, settle, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const REPEATS = 8;

export const OutlineMarquee = ({
  text,
  label,
  rows,
  size,
  weight,
  stroke,
  outlineOpacity,
  speed,
  labelSize,
  labelTracking,
  labelWeight,
  delay,
  placement,
  look,
  motion,
}: OutlineMarqueeProps) => {
  const rawFrame = useCurrentFrame();
  const frame = rawFrame * motion.speed;
  const pitch = size * 1.3;
  const filterId = `outline-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  const travel = Math.round(rawFrame * speed);
  const band = (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <svg width={0} height={0} style={{ position: 'absolute' }} aria-hidden="true">
        <filter id={filterId} x="-2%" y="-10%" width="104%" height="120%">
          <feMorphology in="SourceAlpha" operator="dilate" radius={stroke} result="grown" />
          <feComposite in="grown" in2="SourceAlpha" operator="out" result="ring" />
          <feFlood floodColor={look.ink} floodOpacity={outlineOpacity} />
          <feComposite in2="ring" operator="in" />
        </filter>
      </svg>
      {Array.from({ length: rows }, (_, row) => {
        const direction = row % 2 === 0 ? -1 : 1;
        const start = delay + row * 4;
        return (
          <div
            key={row}
            style={{
              ...displayType(size, weight, -0.02),
              height: pitch,
              lineHeight: `${pitch}px`,
              color: look.ink,
              wordSpacing: '0.2em',
              opacity: tween(frame, [start, start + 18], [0, 1], settle),
              transform: `translateX(${direction * travel + (direction > 0 ? -size * 2 : 0)}px)`,
            }}
          >
            {[...new Array(REPEATS).keys()].map((copy) => (
              <span
                key={copy}
                style={{
                  filter: `url(#${filterId})`,
                  display: 'inline-block',
                  paddingRight: '0.5em',
                }}
              >
                {text}
              </span>
            ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
  const rise = land(frame, [delay + 8, delay + 30], [labelSize * 0.45, 0]);
  return (
    <KineticLayer look={look} motion={motion} placement={placement} stage={band}>
      <div
        style={{
          ...displayType(labelSize, labelWeight, labelTracking),
          color: look.ink,
          opacity: tween(frame, [delay + 8, delay + 22], [0, 1], settle),
          transform: `translateY(${rise.toFixed(2)}px)`,
          textShadow: `0 0 ${labelSize * 0.6}px ${look.background}`,
        }}
      >
        {label}
      </div>
    </KineticLayer>
  );
};

export const outlineMarqueeScene: SceneModule = {
  id: 'outline-marquee',
  component: OutlineMarquee,
  render: (key) => (
    <Composition
      key={key}
      id="outline-marquee"
      component={OutlineMarquee}
      schema={outlineMarqueeSchema}
      defaultProps={outlineMarqueeDefaults}
      durationInFrames={outlineMarqueeMeta.durationInFrames}
      fps={outlineMarqueeMeta.fps}
      width={outlineMarqueeMeta.width}
      height={outlineMarqueeMeta.height}
    />
  ),
};
