import {
  KINETIC_PROMO_SEQUENCE,
  type KineticPromoProps,
  kineticPromoDefaults,
  kineticPromoMeta,
  kineticPromoSchema,
} from '@cliplibrary/schemas';
import { Composition } from 'remotion';
import { type AnyScene, type SceneMap, SequencePlayer } from '../../promo/sequence-player';
import type { SceneModule } from '../../scene-module';
import { StudioBackdrop } from '../backgrounds/studio-backdrop';
import { FilmDust } from '../overlays/film-dust';
import { EchoStack } from '../typography/echo-stack';
import { GlowReveal } from '../typography/glow-reveal';
import { HeadlineReveal } from '../typography/headline-reveal';
import { LetterFlip } from '../typography/letter-flip';
import { NumberCounter } from '../typography/number-counter';
import { OutlineMarquee } from '../typography/outline-marquee';
import { ScribbleCaption } from '../typography/scribble-caption';
import { Typewriter } from '../typography/typewriter';
import { WordBuild } from '../typography/word-build';
import { WordPunch } from '../typography/word-punch';

const SCENE_COMPONENTS: SceneMap = {
  'studio-backdrop': StudioBackdrop as unknown as AnyScene,
  'film-dust': FilmDust as unknown as AnyScene,
  'echo-stack': EchoStack as unknown as AnyScene,
  'glow-reveal': GlowReveal as unknown as AnyScene,
  'headline-reveal': HeadlineReveal as unknown as AnyScene,
  'letter-flip': LetterFlip as unknown as AnyScene,
  'number-counter': NumberCounter as unknown as AnyScene,
  'outline-marquee': OutlineMarquee as unknown as AnyScene,
  'scribble-caption': ScribbleCaption as unknown as AnyScene,
  typewriter: Typewriter as unknown as AnyScene,
  'word-build': WordBuild as unknown as AnyScene,
  'word-punch': WordPunch as unknown as AnyScene,
};

export const KineticPromo = ({ accent }: KineticPromoProps) => (
  <SequencePlayer
    sequence={KINETIC_PROMO_SEQUENCE}
    scenes={SCENE_COMPONENTS}
    brand={{ accent, finish: '', useFinishEverywhere: false }}
  />
);

export const kineticPromoScene: SceneModule = {
  id: 'kinetic-promo',
  component: KineticPromo,
  render: (key) => (
    <Composition
      key={key}
      id="kinetic-promo"
      component={KineticPromo}
      schema={kineticPromoSchema}
      defaultProps={kineticPromoDefaults}
      durationInFrames={kineticPromoMeta.durationInFrames}
      fps={kineticPromoMeta.fps}
      width={kineticPromoMeta.width}
      height={kineticPromoMeta.height}
    />
  ),
};
