import {
  type GlowRevealProps,
  glowRevealDefaults,
  glowRevealMeta,
  glowRevealSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { easedGradient } from '../../promo/backdrop';
import { glowShadow, withAlpha } from '../../promo/glow';
import { displayType, KineticLayer } from '../../promo/kinetic';
import { settle, smooth, tween } from '../../promo/timing';
import { highlightSet, normalize, wordsOf } from '../../promo/words';
import type { SceneModule } from '../../scene-module';

export const GlowReveal = ({
  text,
  highlight,
  size,
  weight,
  tracking,
  glow,
  bloom,
  flash,
  blur,
  delay,
  bloomFrames,
  exitFlare,
  flareFrames,
  placement,
  look,
  motion,
}: GlowRevealProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { durationInFrames } = useVideoConfig();
  const accented = highlightSet(highlight);
  const arrive = tween(frame, [delay, delay + bloomFrames], [0, 1], settle);
  const flareStart = durationInFrames - motion.exitFrames - flareFrames;
  const flare = exitFlare
    ? tween(frame, [flareStart, flareStart + flareFrames], [0, 1], smooth)
    : 0;
  const fadeOut = exitFlare
    ? tween(frame, [flareStart + flareFrames * 0.45, flareStart + flareFrames], [0, 1], smooth)
    : 0;
  const heat = bloom * (1 - arrive) + flare;
  const opacity = tween(frame, [delay, delay + bloomFrames * 0.5], [0, 1], settle) * (1 - fadeOut);
  const light = flash * (0.2 + 0.8 * Math.min(1, heat)) * opacity;
  const halo = (
    <AbsoluteFill
      style={{
        opacity: light,
        background: `radial-gradient(42% 30% at 50% 50%, ${easedGradient(withAlpha(look.ink, 0.5), withAlpha(look.ink, 0))})`,
      }}
    />
  );
  return (
    <KineticLayer look={look} motion={motion} placement={placement} stage={halo}>
      <div
        style={{
          ...displayType(size, weight, tracking),
          color: look.ink,
          opacity,
          filter: `blur(${(blur * (1 - arrive) + blur * 0.5 * flare).toFixed(3)}px)`,
          textShadow: glowShadow(look.ink, glow + heat, size * 1.6),
        }}
      >
        {wordsOf(text).map((word, index, all) => (
          <span
            key={`${index}:${word}`}
            style={{ color: accented.has(normalize(word)) ? look.accent : undefined }}
          >
            {word}
            {index < all.length - 1 ? ' ' : ''}
          </span>
        ))}
      </div>
    </KineticLayer>
  );
};

export const glowRevealScene: SceneModule = {
  id: 'glow-reveal',
  component: GlowReveal,
  render: (key) => (
    <Composition
      key={key}
      id="glow-reveal"
      component={GlowReveal}
      schema={glowRevealSchema}
      defaultProps={glowRevealDefaults}
      durationInFrames={glowRevealMeta.durationInFrames}
      fps={glowRevealMeta.fps}
      width={glowRevealMeta.width}
      height={glowRevealMeta.height}
    />
  ),
};
