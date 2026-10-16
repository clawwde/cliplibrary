import type { ReliefBackdropProps } from './clips/backgrounds/relief-backdrop';
import type { AppIconRevealProps } from './clips/brand/app-icon-reveal';
import type { BrandRevealProps } from './clips/brand/brand-reveal';
import type { CtaEndCardProps } from './clips/brand/cta-end-card';
import type { PhoneFanProps } from './clips/devices/phone-fan';
import type { PhoneFlatLayProps } from './clips/devices/phone-flat-lay';
import type { PhonePairProps } from './clips/devices/phone-pair';
import type { PhonePedestalProps } from './clips/devices/phone-pedestal';
import type { PhoneScrollProps } from './clips/devices/phone-scroll';
import type { PhoneSpinInProps } from './clips/devices/phone-spin-in';
import type { PhoneSwapProps } from './clips/devices/phone-swap';
import type { PhoneTurnaroundProps } from './clips/devices/phone-turnaround';
import type { PhoneWallProps } from './clips/devices/phone-wall';
import type { DoodleArrowsProps } from './clips/overlays/doodle-arrows';
import type { FilmDustProps } from './clips/overlays/film-dust';
import type { FloatingCardsProps } from './clips/overlays/floating-cards';
import type { SceneTransitionProps } from './clips/transitions/scene-transition';
import type { EchoStackProps } from './clips/typography/echo-stack';
import type { HandwrittenNoteProps } from './clips/typography/handwritten-note';
import type { LetterFlipProps } from './clips/typography/letter-flip';
import type { NumberCounterProps } from './clips/typography/number-counter';
import type { OutlineMarqueeProps } from './clips/typography/outline-marquee';
import type { ScribbleCaptionProps } from './clips/typography/scribble-caption';
import type { TypewriterProps } from './clips/typography/typewriter';
import type { WordBuildProps } from './clips/typography/word-build';
import type { WordPunchProps } from './clips/typography/word-punch';

export interface ClipPropsMap {
  'phone-flat-lay': PhoneFlatLayProps;
  'phone-pedestal': PhonePedestalProps;
  'app-icon-reveal': AppIconRevealProps;
  'number-counter': NumberCounterProps;
  typewriter: TypewriterProps;
  'word-build': WordBuildProps;
  'word-punch': WordPunchProps;
  'scribble-caption': ScribbleCaptionProps;
  'echo-stack': EchoStackProps;
  'outline-marquee': OutlineMarqueeProps;
  'letter-flip': LetterFlipProps;
  'handwritten-note': HandwrittenNoteProps;
  'phone-fan': PhoneFanProps;
  'phone-pair': PhonePairProps;
  'phone-scroll': PhoneScrollProps;
  'phone-spin-in': PhoneSpinInProps;
  'phone-swap': PhoneSwapProps;
  'phone-turnaround': PhoneTurnaroundProps;
  'phone-wall': PhoneWallProps;
  'floating-cards': FloatingCardsProps;
  'doodle-arrows': DoodleArrowsProps;
  'film-dust': FilmDustProps;
  'brand-reveal': BrandRevealProps;
  'cta-end-card': CtaEndCardProps;
  'relief-backdrop': ReliefBackdropProps;
  'scene-transition': SceneTransitionProps;
}

export type ClipId = keyof ClipPropsMap;

export type ClipProps<Id extends ClipId = ClipId> = ClipPropsMap[Id];
