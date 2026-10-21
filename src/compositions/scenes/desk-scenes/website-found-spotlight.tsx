import { AbsoluteFill, Composition, useCurrentFrame } from 'remotion';
import {
  type WebsiteFoundSpotlightProps,
  websiteFoundSpotlightDefaults,
  websiteFoundSpotlightMeta,
  websiteFoundSpotlightSchema,
} from '@/schemas';
import { LensOverlay } from '../../promo/desk/lens';
import { PromoLayer } from '../../promo/promo-layer';
import type { SceneModule } from '../../scene-module';
import { EndCard } from '../../website-found-spotlight/end-card';
import { lightCue } from '../../website-found-spotlight/light-cues';
import { PosterCopy } from '../../website-found-spotlight/poster-copy';
import { SpotlightStage } from '../../website-found-spotlight/spotlight-stage';

const WebsiteFoundSpotlight = (props: WebsiteFoundSpotlightProps) => {
  const { look, motion, palette, camera, endCard, timing, copy } = props;
  const frame = useCurrentFrame() * motion.speed;
  const ended = endCard.show && frame >= timing.endCardStart;
  return (
    <PromoLayer look={{ ...look, showBackdrop: false }} motion={motion}>
      {ended ? (
        <EndCard card={endCard} markLetter={copy.markLetter} highlight={palette.highlight} />
      ) : (
        <>
          {look.showBackdrop ? (
            <AbsoluteFill
              style={{
                background: `linear-gradient(180deg, ${palette.skyEdge} 0%, ${palette.sky} 45%, ${palette.sky} 100%)`,
              }}
            />
          ) : null}
          <SpotlightStage props={props} frame={frame} cue={lightCue(timing, frame)} />
          {look.showBackdrop ? (
            <LensOverlay grain={camera.grain} vignette={camera.vignette} />
          ) : null}
          <PosterCopy props={props} />
        </>
      )}
    </PromoLayer>
  );
};

export const websiteFoundSpotlightScene: SceneModule = {
  id: 'website-found-spotlight',
  component: WebsiteFoundSpotlight,
  render: (key) => (
    <Composition
      key={key}
      id="website-found-spotlight"
      component={WebsiteFoundSpotlight}
      schema={websiteFoundSpotlightSchema}
      defaultProps={websiteFoundSpotlightDefaults}
      durationInFrames={websiteFoundSpotlightMeta.durationInFrames}
      fps={websiteFoundSpotlightMeta.fps}
      width={websiteFoundSpotlightMeta.width}
      height={websiteFoundSpotlightMeta.height}
    />
  ),
};
