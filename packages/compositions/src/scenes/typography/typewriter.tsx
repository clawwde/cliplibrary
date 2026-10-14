import {
  type TypewriterProps,
  typewriterDefaults,
  typewriterMeta,
  typewriterSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/JetBrainsMono';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', { weights: ['500'], subsets: ['latin'] });

export const Typewriter = ({
  body,
  background,
  color,
  cursor,
  charsPerSecond,
}: TypewriterProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const revealed = Math.min(body.length, Math.floor((frame / fps) * charsPerSecond));
  const typing = revealed < body.length;
  const blinkOn = Math.floor(frame / 15) % 2 === 0;
  const cursorVisible = typing || blinkOn;
  return (
    <AbsoluteFill
      style={{
        background,
        fontFamily,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 160,
      }}
    >
      <div
        style={{
          color,
          fontSize: 92,
          lineHeight: 1.3,
          fontWeight: 500,
          whiteSpace: 'pre-wrap',
          textAlign: 'center',
        }}
      >
        {body.slice(0, revealed)}
        <span
          style={{
            display: 'inline-block',
            width: '0.5em',
            height: '1em',
            marginLeft: 6,
            verticalAlign: 'text-bottom',
            borderBottom: `0.12em solid ${cursor}`,
            opacity: cursorVisible ? 1 : 0,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const typewriterScene: SceneModule = {
  id: 'typewriter',
  component: Typewriter,
  render: (key) => (
    <Composition
      key={key}
      id="typewriter"
      component={Typewriter}
      schema={typewriterSchema}
      defaultProps={typewriterDefaults}
      durationInFrames={typewriterMeta.durationInFrames}
      fps={typewriterMeta.fps}
      width={typewriterMeta.width}
      height={typewriterMeta.height}
    />
  ),
};
