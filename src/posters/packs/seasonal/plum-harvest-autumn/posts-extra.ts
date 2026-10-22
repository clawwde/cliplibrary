import {
  icon,
  POST_SIZE,
  photo,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  type Template,
  template,
  text,
} from '../../../kit';
import { AUT, HAND, SERIF } from './palette';

const { width: W, height: H } = POST_SIZE;

const LETTERS = [
  ['N', 0, 0],
  ['O', 1, 0],
  ['V', 2, 0],
  ['E', 0, 1],
  ['M', 1, 1],
  ['B', 2, 1],
  ['E', 0, 2],
  ['R', 1, 2],
] as const;

const TILE_FILLS = [AUT.oat, AUT.berry, AUT.rose, AUT.butter];

const november = (height: number): Template =>
  template(W, height, () => {
    const half = height / 2;
    const top = half - 300;
    return [
      rect(0, 0, W, height, AUT.espresso, { name: 'Background' }),
      photo('woman-portrait-4', 0, 0, W / 2 - 4, half - 4),
      photo('autumn-leaves', W / 2 + 4, 0, W / 2 - 4, half - 4),
      photo('autumn-mug', 0, half + 4, W / 2 - 4, half - 4),
      photo('woman-portrait-6', W / 2 + 4, half + 4, W / 2 - 4, half - 4),
      rect(0, 0, W, height, 'rgba(74,35,56,0.28)', { name: 'Tint' }),
      text('Photo  Shoot', 0, top - 120, W, {
        fontFamily: HAND,
        fontSize: 96,
        fontWeight: 700,
        fill: AUT.oat,
        align: 'center',
        rotation: -4,
      }),
      LETTERS.map(([letter, column, row], index) => {
        const x = 300 + column * 165;
        const y = top + row * 200;
        const fill = TILE_FILLS[index % TILE_FILLS.length] ?? AUT.oat;
        const dark = fill === AUT.berry;
        return rotateNodes(index % 2 === 0 ? -5 : 4, x + 75, y + 85, [
          rect(x, y, 150, 180, fill, {
            name: `${letter} tile`,
            ...shadow(16, 8, 'rgba(0,0,0,0.3)'),
          }),
          text(letter, x, y + 4, 150, {
            fontFamily: SERIF,
            fontSize: 140,
            fontWeight: 800,
            fill: dark ? AUT.oat : AUT.berry,
            align: 'center',
            lineHeight: 1.1,
          }),
        ]);
      }),
      rotateNodes(6, 705, top + 485, [
        rect(630, top + 400, 150, 170, AUT.white, { name: 'Camera tile' }),
        icon('camera', 655, top + 435, 100, AUT.espresso, { strokeWidth: 1.8 }),
      ]),
    ];
  });

export const novemberPost = november(H);
export const novemberStory = november(STORY_SIZE.height);
