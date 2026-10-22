import {
  checklist,
  circle,
  group,
  icon,
  type Nodes,
  POST_SIZE,
  rect,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import { BODY, DISPLAY, darkBackdrop, VOLT } from './posts';

const { width: W, height: H } = POST_SIZE;

export const talkTalk = template(W, H, () => [
  rect(0, 0, W, H, VOLT.paper, { name: 'Background' }),
  [0, 1, 2, 3].map((index) =>
    text('Talk', 60, 70 + index * 300, 960, {
      fontFamily: DISPLAY,
      fontSize: 300,
      fontWeight: 400,
      fill: index % 2 === 0 ? VOLT.black : VOLT.lime,
      lineHeight: 1,
      letterSpacing: -8,
    }),
  ),
  group(
    rect(300, 540, 600, 300, VOLT.white, {
      cornerRadius: 24,
      name: 'Note card',
      ...shadow(40, 16, 'rgba(0,0,0,0.25)'),
    }),
    text(
      'A clear message turns scrollers into buyers. Say less, mean more and speak to one person.',
      340,
      580,
      520,
      {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 600,
        fill: VOLT.black,
        align: 'center',
        lineHeight: 1.4,
      },
    ),
  ),
]);

const letterTile = (letter: string, x: number, y: number) =>
  group(
    rect(x, y, 96, 110, VOLT.white, {
      cornerRadius: 10,
      stroke: VOLT.lime,
      strokeWidth: 6,
      name: 'Letter tile',
    }),
    text(letter, x, y + 22, 96, {
      fontFamily: DISPLAY,
      fontSize: 56,
      fontWeight: 400,
      fill: VOLT.black,
      align: 'center',
    }),
  );

const tileRow = (letters: string, y: number) => {
  const start = (W - (letters.length * 108 - 12)) / 2;
  return [...letters].map((letter, index) =>
    letterTile(letter === '_' ? '' : letter, start + index * 108, y),
  );
};

export const guessWord = template(W, H, () => [
  darkBackdrop(),
  rect(290, 180, 420, 120, VOLT.lime, { cornerRadius: 10, rotation: -4, name: 'Label' }),
  text('Can you', 290, 196, 420, {
    fontFamily: DISPLAY,
    fontSize: 72,
    fontWeight: 400,
    fill: VOLT.black,
    align: 'center',
    rotation: -4,
  }),
  text('Guess?', 0, 320, W, {
    fontFamily: DISPLAY,
    fontSize: 170,
    fontWeight: 400,
    fill: VOLT.white,
    align: 'center',
  }),
  tileRow('N_C_E', 620),
  tileRow('MA_KET', 770),
  text('Hint: a focused slice of a bigger\nmarket that you can own.', 0, 1000, W, {
    fontFamily: BODY,
    fontSize: 38,
    fontWeight: 600,
    fill: VOLT.white,
    align: 'center',
    lineHeight: 1.35,
  }),
]);

const EVENTS = [
  { day: '08', title: 'Founder Spotlight', body: 'Meet the people behind the brand' },
  { day: '14', title: 'Live Audience Poll', body: 'Vote on our next feature drop' },
  { day: '21', title: 'Growth Webinar', body: 'A 45 minute session on content' },
  { day: '27', title: 'Early Access Day', body: 'Members try the new tools first' },
] as const;

export const eventsList = template(W, H, () => [
  darkBackdrop(),
  text('This Month at Volt', 90, 90, 900, {
    fontFamily: DISPLAY,
    fontSize: 64,
    fontWeight: 400,
    fill: VOLT.lime,
  }),
  EVENTS.map((event, index) => {
    const y = 250 + index * 260;
    return [
      rect(90, y, 170, 190, VOLT.white, { cornerRadius: 20, name: 'Date tile' }),
      rect(90, y, 170, 50, VOLT.lime, { cornerRadius: 20, name: 'Date tile top' }),
      rect(90, y + 30, 170, 20, VOLT.lime, { name: 'Date tile edge' }),
      text(event.day, 90, y + 62, 170, {
        fontFamily: DISPLAY,
        fontSize: 72,
        fontWeight: 400,
        fill: VOLT.black,
        align: 'center',
      }),
      text('JUN', 90, y + 146, 170, {
        fontFamily: BODY,
        fontSize: 26,
        fontWeight: 700,
        fill: VOLT.grey,
        align: 'center',
        letterSpacing: 4,
      }),
      text(event.title, 310, y + 40, 700, {
        fontFamily: BODY,
        fontSize: 48,
        fontWeight: 800,
        fill: VOLT.white,
      }),
      text(event.body, 310, y + 110, 700, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 500,
        fill: VOLT.grey,
      }),
    ];
  }),
]);

interface LockerPalette {
  metal: string;
  shade: string;
  ink: string;
  tag: string;
}

const LIME_LOCKER: LockerPalette = {
  metal: VOLT.lime,
  shade: VOLT.limeDeep,
  ink: VOLT.black,
  tag: VOLT.white,
};

export const VIOLET_LOCKER: LockerPalette = {
  metal: '#a78bfa',
  shade: '#7c5ce6',
  ink: '#1b1033',
  tag: '#ffffff',
};

const ransom = (word: string, y: number, palette: LockerPalette) => {
  const size = 120;
  const start = (W - word.length * size) / 2;
  return [...word].map((letter, index) => {
    const dark = index % 2 === 0;
    return group(
      rect(start + index * size + 6, y, size - 12, 150, dark ? palette.ink : palette.tag, {
        cornerRadius: 8,
        rotation: index % 3 === 0 ? -4 : index % 3 === 1 ? 3 : 0,
        name: 'Letter card',
      }),
      text(letter, start + index * size + 6, y + 22, size - 12, {
        fontFamily: index % 2 === 0 ? DISPLAY : 'Abril Fatface',
        fontSize: 92,
        fontWeight: 400,
        fill: dark ? palette.tag : palette.ink,
        align: 'center',
        rotation: index % 3 === 0 ? -4 : index % 3 === 1 ? 3 : 0,
      }),
    );
  });
};

export const lockers = (palette: LockerPalette, words: readonly [string, string, string, string]) =>
  template(W, H, () => [
    rect(0, 0, W, H, palette.metal, { name: 'Background' }),
    [0, 1, 2].map((index) => [
      rect(20 + index * 350, 20, 340, H - 40, palette.metal, {
        cornerRadius: 10,
        stroke: palette.shade,
        strokeWidth: 8,
        name: 'Locker door',
      }),
      Array.from({ length: 5 }, (_, vent) =>
        rect(110 + index * 350, 80 + vent * 34, 160, 14, palette.shade, {
          cornerRadius: 7,
          name: 'Vent',
        }),
      ),
      rect(310 + index * 350, 620, 22, 110, palette.shade, { cornerRadius: 11, name: 'Handle' }),
    ]),
    group(
      rect(420, 380, 240, 90, palette.ink, { cornerRadius: 45, name: 'Tag pill' }),
      text(words[0], 420, 398, 240, {
        fontFamily: DISPLAY,
        fontSize: 46,
        fontWeight: 400,
        fill: palette.tag,
        align: 'center',
      }),
    ),
    ransom(words[1], 520, palette),
    ransom(words[2], 700, palette),
    group(
      rect(340, 930, 400, 80, palette.ink, { cornerRadius: 40, name: 'Read button' }),
      text(words[3], 340, 952, 400, {
        fontFamily: BODY,
        fontSize: 30,
        fontWeight: 800,
        fill: palette.tag,
        align: 'center',
        letterSpacing: 2,
      }),
    ),
    icon('lightbulb', 80, 1110, 110, palette.ink, { strokeWidth: 2 }),
    icon('rocket', 890, 1110, 110, palette.ink, { strokeWidth: 2 }),
    icon('message-circle', 80, 230, 90, palette.ink, { strokeWidth: 2.2 }),
    icon('sparkles', 910, 230, 90, palette.ink, { strokeWidth: 2.2 }),
  ]);

export const LIME_LOCKERS = lockers(LIME_LOCKER, ['BLOG', 'BRAND', 'MOVES', 'READ THE LATEST']);

const guideArt = (height: number): Nodes[] => {
  const top = (height - H) / 2;
  return [
    darkBackdrop(height),
    text('Campaign', 0, top + 140, W, {
      fontFamily: 'Permanent Marker',
      fontSize: 120,
      fontWeight: 400,
      fill: VOLT.white,
      align: 'center',
    }),
    text('Guide', 0, top + 270, W, {
      fontFamily: DISPLAY,
      fontSize: 150,
      fontWeight: 400,
      fill: VOLT.lime,
      align: 'center',
    }),
    rect(170, top + 520, 740, 620, VOLT.white, {
      cornerRadius: 28,
      rotation: -3,
      name: 'Guide card',
      ...shadow(40, 16, 'rgba(0,0,0,0.5)'),
    }),
    checklist(
      ['Know your audience', 'Audit what you have', 'Pick three key metrics', 'Launch and review'],
      240,
      top + 620,
      620,
      {
        color: VOLT.black,
        iconColor: '#4d6b00',
        icon: 'circle-check',
        fontSize: 42,
        gap: 120,
        fontFamily: BODY,
        fontWeight: 700,
      },
    ),
    icon('pencil', 800, top + 1000, 190, VOLT.lime, { strokeWidth: 1.8 }),
  ];
};

export const guidePost = template(W, H, () => guideArt(H));

export const guideStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  guideArt(STORY_SIZE.height),
);

export const didYouKnow = template(W, H, () => [
  rect(0, 0, W, H, VOLT.white, { name: 'Background' }),
  text('DID', 0, 170, W, {
    fontFamily: DISPLAY,
    fontSize: 270,
    fontWeight: 400,
    fill: VOLT.black,
    align: 'center',
    lineHeight: 1,
  }),
  rect(400, 450, 280, 90, VOLT.lime, { cornerRadius: 10, rotation: -5, name: 'Know label' }),
  text('Know', 400, 460, 280, {
    fontFamily: 'Permanent Marker',
    fontSize: 60,
    fontWeight: 400,
    fill: VOLT.black,
    align: 'center',
    rotation: -5,
  }),
  text('YOU', 0, 520, W, {
    fontFamily: DISPLAY,
    fontSize: 270,
    fontWeight: 400,
    fill: VOLT.black,
    align: 'center',
    lineHeight: 1,
  }),
  circle(900, 220, 64, VOLT.lime),
  text('?', 860, 168, 80, {
    fontFamily: DISPLAY,
    fontSize: 84,
    fontWeight: 400,
    fill: VOLT.black,
    align: 'center',
  }),
  text('Brands that post with a plan are\nremembered 4x more often.', 0, 900, W, {
    fontFamily: BODY,
    fontSize: 42,
    fontWeight: 700,
    fill: VOLT.black,
    align: 'center',
    lineHeight: 1.35,
  }),
  text('Consistency beats volume, every time.', 0, 1060, W, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 700,
    fill: '#4d6b00',
    align: 'center',
  }),
]);
