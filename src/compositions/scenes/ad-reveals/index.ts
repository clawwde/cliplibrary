import type { SceneModule } from '../../scene-module';
import { batteryChargeSuccessScene } from './battery-charge-success';
import { crumpledPaperRevealScene } from './crumpled-paper-reveal';
import { helicopterUnveilScene } from './helicopter-unveil';
import { problemStrikeoutScene } from './problem-strikeout';
import { spillRevealScene } from './spill-reveal';

export const adRevealsScenes: SceneModule[] = [
  helicopterUnveilScene,
  problemStrikeoutScene,
  spillRevealScene,
  crumpledPaperRevealScene,
  batteryChargeSuccessScene,
];
