import {
  type NotificationStackProps,
  notificationStackDefaults,
  notificationStackMeta,
  notificationStackSchema,
} from '@cliplibrary/schemas';
import { loadFont } from '@remotion/google-fonts/DMSans';
import { AbsoluteFill, Composition, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { clamp01, lerp, ramp } from '../../kit/motion';
import type { SceneModule } from '../../scene-module';

const { fontFamily } = loadFont('normal', {
  weights: ['500', '700', '800'],
  subsets: ['latin'],
});

const CARD_WIDTH = 780;
const CARD_HEIGHT = 128;

export const NotificationStack = ({
  finale: finaleText,
  from,
  to,
  notes,
}: NotificationStackProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const starts = notes.map((_, index) => 8 + index * 14);
  const entries = starts.map((start) =>
    spring({ frame: frame - start, fps, config: { damping: 14, stiffness: 140 } }),
  );
  const spread = ramp(frame, 88, 112);
  const finale = spring({ frame: frame - 158, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        background: `linear-gradient(135deg, ${from}, ${to})`,
        translate: '0px 352.7px',
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${30 + Math.sin(frame / 40) * 10}% 30%, rgba(90,200,255,0.55), transparent 45%), radial-gradient(circle at ${75 - Math.cos(frame / 50) * 10}% 75%, rgba(255,180,80,0.5), transparent 45%)`,
        }}
      />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: CARD_WIDTH, height: 0 }}>
          {notes.map((note, index) => {
            const depth = entries.slice(index + 1).reduce((sum, value) => sum + clamp01(value), 0);
            const stackY = depth * 46 - 90;
            const listY =
              depth * (CARD_HEIGHT + 22) - ((notes.length - 1) * (CARD_HEIGHT + 22)) / 2;
            const y = lerp(stackY, listY, spread);
            const scale = lerp(1 - depth * 0.06, 1, spread);
            const opacity = lerp(Math.max(0, 1 - depth * 0.22), 1, spread);
            const exit = ramp(frame, 128 + index * 5, 152 + index * 5);
            const enter = entries[index] ?? 0;
            return (
              <div
                key={note.app}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  zIndex: index,
                  boxSizing: 'border-box',
                  padding: '0 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 26,
                  borderRadius: 38,
                  background: 'rgba(255,255,255,0.16)',
                  backdropFilter: 'blur(28px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 20px 60px rgba(20,10,60,0.35)',
                  color: '#fff',
                  opacity: opacity * clamp01(enter),
                  transform: `translate(${exit * 1300}px, ${y + (1 - enter) * -220}px) scale(${scale}) rotateX(${(1 - clamp01(enter)) * 25}deg)`,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 22,
                    background: note.color,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 800,
                    fontSize: 28,
                    flex: 'none',
                  }}
                >
                  {note.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 24,
                      opacity: 0.8,
                    }}
                  >
                    <span style={{ fontWeight: 700, letterSpacing: 1 }}>
                      {note.app.toUpperCase()}
                    </span>
                    <span>{note.time}</span>
                  </div>
                  <div style={{ fontSize: 33, fontWeight: 500, marginTop: 6 }}>{note.message}</div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          fontSize: 230,
          fontWeight: 800,
          letterSpacing: -6,
          opacity: clamp01(finale),
          transform: `scale(${0.8 + 0.2 * finale})`,
        }}
      >
        {finaleText}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const notificationStackScene: SceneModule = {
  id: 'notification-stack',
  component: NotificationStack,
  render: (key) => (
    <Composition
      key={key}
      id="notification-stack"
      component={NotificationStack}
      schema={notificationStackSchema}
      defaultProps={notificationStackDefaults}
      durationInFrames={notificationStackMeta.durationInFrames}
      fps={notificationStackMeta.fps}
      width={notificationStackMeta.width}
      height={notificationStackMeta.height}
    />
  ),
};
