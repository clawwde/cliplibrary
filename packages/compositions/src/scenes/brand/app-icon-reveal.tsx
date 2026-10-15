import {
  type AppIconRevealProps,
  appIconRevealDefaults,
  appIconRevealMeta,
  appIconRevealSchema,
} from '@cliplibrary/schemas';
import { AbsoluteFill, Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import { bodyFont, displayFont } from '../../promo/fonts';
import { projectToScreen } from '../../promo/projection';
import { isDarkLook, PromoLayer } from '../../promo/promo-layer';
import { glyphUrl } from '../../promo/screen-assets';
import { AppIconTile } from '../../promo/set-pieces';
import { Stage } from '../../promo/stage';
import { cameraPush, settle, turn, tween } from '../../promo/timing';
import type { SceneModule } from '../../scene-module';

const LETTER_FRAMES = 16;

export const AppIconReveal = ({
  brandName,
  tagline,
  icon,
  reveal,
  wordmark,
  camera,
  look,
  stage,
  motion,
}: AppIconRevealProps) => {
  const frame = useCurrentFrame() * motion.speed;
  const { width, height } = useVideoConfig();
  const push = cameraPush(frame, camera.pushIn, camera.pushFrames);
  const flip = tween(frame, [reveal.flipAt, reveal.flipAt + reveal.flipFrames], [0, 1], turn);
  const lift = Math.sin(Math.PI * flip) * reveal.lift;
  const settled = tween(frame, [reveal.flipAt, reveal.flipAt + reveal.flipFrames], [0, 1], settle);
  const bob = Math.sin(frame / 32) * motion.float * settled;
  const sway = Math.sin(frame / 40) * 0.14 * settled;
  const letters = brandName.split('');
  const typed = reveal.typeAt + letters.length * reveal.letterFrames;
  const anchor = projectToScreen(
    [0, icon.y - icon.size / 2, 0],
    stage,
    typed,
    { width, height },
    { distanceScale: cameraPush(typed, camera.pushIn, camera.pushFrames) },
  );
  const taglineIn = tween(frame, [typed + 4, typed + 28], [0, 1], settle);
  return (
    <PromoLayer
      look={look}
      motion={motion}
      focusX={50 + Math.sin((frame - 60) / 80) * camera.backdropSweep}
    >
      <Stage
        stage={stage}
        dark={isDarkLook(look)}
        distanceScale={push}
        backdropZ={-40}
        keyPosition={[camera.lightX, camera.lightY, camera.lightZ]}
      >
        <group
          position={[0, icon.y + bob, lift]}
          rotation={[0.1 * lift, Math.PI * (1 - flip) + sway, 0]}
        >
          <AppIconTile
            size={icon.size}
            depth={icon.depth}
            color={icon.color}
            backColor={icon.backColor}
            glyphColor={icon.glyphColor}
            glyph={glyphUrl(icon.glyph)}
            glyphScale={icon.glyphScale}
            roughness={icon.roughness}
            reflections={stage.reflections}
          />
        </group>
      </Stage>
      <AbsoluteFill>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: wordmark.gap,
            transform: `translate(${Math.round(anchor.x)}px, ${Math.round(anchor.y)}px) translate(-50%, 0)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              whiteSpace: 'pre',
              fontFamily: displayFont,
              fontSize: wordmark.size,
              fontWeight: Number(wordmark.weight),
              letterSpacing: `${wordmark.tracking}em`,
              lineHeight: 1.1,
              color: look.ink,
            }}
          >
            {letters.map((letter, index) => {
              const start = reveal.typeAt + index * reveal.letterFrames;
              const shown = tween(frame, [start, start + LETTER_FRAMES], [0, 1], settle);
              return (
                <span
                  key={`${index}:${letter}`}
                  style={{
                    display: 'inline-block',
                    opacity: shown,
                    transform: `translateY(${(1 - shown) * 0.3 * wordmark.size}px)`,
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
          {tagline.length > 0 ? (
            <div
              style={{
                marginTop: wordmark.size * 0.35,
                fontFamily: bodyFont,
                fontSize: wordmark.size * 0.42,
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: look.muted,
                opacity: taglineIn,
              }}
            >
              {tagline}
            </div>
          ) : null}
        </div>
      </AbsoluteFill>
    </PromoLayer>
  );
};

export const appIconRevealScene: SceneModule = {
  id: 'app-icon-reveal',
  component: AppIconReveal,
  render: (key) => (
    <Composition
      key={key}
      id="app-icon-reveal"
      component={AppIconReveal}
      schema={appIconRevealSchema}
      defaultProps={appIconRevealDefaults}
      durationInFrames={appIconRevealMeta.durationInFrames}
      fps={appIconRevealMeta.fps}
      width={appIconRevealMeta.width}
      height={appIconRevealMeta.height}
    />
  ),
};
