import { circle, icon, photo, rect, rotateNodes, template } from '../../../kit';
import {
  buildPills,
  copy,
  H,
  handle,
  opportunities,
  PW,
  tag,
  unlockInsights,
  verbList,
  W,
} from './posts';
import { badHabits, expertsBuilt, feedbackQuote } from './posts-more';

const nowWhat = template(W, H, () => [
  rect(0, 0, W, H, PW.violet, { name: 'Background' }),
  copy("You've integrated\nthe framework...", 90, 130, 900, 68, PW.white, {
    fontWeight: 500,
    lineHeight: 1.2,
  }),
  tag('now what?', 90, 330, PW.ink, PW.white, 56),
  circle(118, 528, 28, PW.white),
  icon('arrow-right', 100, 510, 36, PW.ink, { strokeWidth: 2.6 }),
  copy('Learn to scale search traffic today', 165, 507, 800, 34, PW.white),
  photo('workspace-1', 0, 660, W, 690, { crop: { zoom: 1, focusX: 0.5, focusY: 0.5 } }),
  rect(0, 660, W, 10, PW.ink, { name: 'Rule' }),
]);

const teamPills = (height: number) =>
  template(W, height, () => {
    const middle = height / 2;
    return [
      rect(0, 0, W, height, PW.ink, { name: 'Background' }),
      photo('team-1', 0, 0, W, height, { crop: { zoom: 1, focusX: 0.5, focusY: 0.5 } }),
      rect(0, 0, W, height, 'rgba(20,17,43,0.5)', { name: 'Shade' }),
      rotateNodes(-6, 480, middle - 170, [
        tag('Insights', 280, middle - 250, PW.violet, PW.white, 64),
      ]),
      rotateNodes(4, 600, middle, [tag('Strategy', 400, middle - 76, PW.white, PW.ink, 64)]),
      rotateNodes(-3, 500, middle + 180, [
        tag('Results', 320, middle + 100, 'rgba(0,0,0,0)', PW.white, 64, PW.violet),
      ]),
      handle(height - 110, PW.white),
    ];
  });

export const teamPost = teamPills(H);
export const teamStory = teamPills(1920);

export const POSTS = [
  buildPills,
  opportunities,
  unlockInsights,
  verbList,
  expertsBuilt,
  badHabits,
  feedbackQuote,
  nowWhat,
  teamPost,
];
