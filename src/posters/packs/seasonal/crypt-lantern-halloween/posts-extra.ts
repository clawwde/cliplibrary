import { linear } from '@/design';
import {
  icon,
  POST_SIZE,
  poly,
  rect,
  STORY_SIZE,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import { BODY, bat, COND, CRYPT, SPOOKY } from './palette';

const { width: W, height: H } = POST_SIZE;

const computer = (height: number): Template =>
  template(W, height, () => {
    const top = height / 2 - 420;
    return [
      rect(0, 0, W, height, linear(180, CRYPT.mustard, CRYPT.amber), { name: 'Background' }),
      bat(120, top + 10, 150, CRYPT.ink),
      bat(820, top + 60, 120, CRYPT.ink),
      icon('ghost', 450, top - 10, 180, CRYPT.bone, { strokeWidth: 1.6 }),
      rect(170, top + 150, 740, 560, '#ded6c4', { cornerRadius: 44, name: 'Monitor' }),
      rect(220, top + 200, 640, 400, CRYPT.night, { cornerRadius: 56, name: 'Screen' }),
      rect(250, top + 230, 580, 340, linear(150, '#16454a', CRYPT.deep), {
        cornerRadius: 46,
        name: 'Screen glow',
      }),
      text('3', 270, top + 240, 220, {
        fontFamily: COND,
        fontSize: 300,
        fontWeight: 400,
        fill: CRYPT.mustard,
        align: 'center',
      }),
      text('Ways to\nRevive Cold\nLeads', 480, top + 290, 340, {
        fontFamily: BODY,
        fontSize: 54,
        fontWeight: 700,
        fill: CRYPT.bone,
        lineHeight: 1.1,
      }),
      rect(560, top + 630, 260, 24, '#b9b09c', { cornerRadius: 12, name: 'Disk slot' }),
      rect(250, top + 628, 60, 30, '#b9b09c', { cornerRadius: 8, name: 'Badge' }),
      rect(430, top + 710, 220, 60, '#c9c0ac', { name: 'Stand' }),
      rect(130, top + 770, 820, 110, '#2a2a2a', { cornerRadius: 22, name: 'Keyboard' }),
      Array.from({ length: 36 }, (_, index) =>
        rect(160 + (index % 18) * 43, top + 792 + Math.floor(index / 18) * 34, 34, 26, '#4a4a4a', {
          cornerRadius: 6,
          name: 'Key',
        }),
      ),
      text('nightshade.studio', 0, height - 120, W, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 600,
        fill: CRYPT.ink,
        align: 'center',
      }),
    ];
  });

export const computerPost = computer(H);
export const computerStory = computer(STORY_SIZE.height);

const torn = (x: number, y: number, width: number, height: number, fill: string) => {
  const step = 40;
  const jag = [0, 12, 4, 16, 6];
  const across = Math.floor(width / step);
  const down = Math.floor(height / step);
  const pick = (index: number) => jag[index % jag.length] ?? 0;
  const topEdge = Array.from(
    { length: across + 1 },
    (_, index) => [x + index * (width / across), y + pick(index)] as const,
  );
  const rightEdge = Array.from(
    { length: down + 1 },
    (_, index) => [x + width - pick(index + 2), y + index * (height / down)] as const,
  );
  const bottomEdge = Array.from(
    { length: across + 1 },
    (_, index) => [x + width - index * (width / across), y + height - pick(index + 1)] as const,
  );
  const leftEdge = Array.from(
    { length: down + 1 },
    (_, index) => [x + pick(index + 3), y + height - index * (height / down)] as const,
  );
  return poly([...topEdge, ...rightEdge, ...bottomEdge, ...leftEdge], fill, {
    name: 'Torn paper',
  });
};

interface ComicCopy {
  backdrop: string;
  panel: string;
  burst: string;
  burstText: string;
  claw: string;
  presenter: string;
  subtitle: string;
}

const comic = (copy: ComicCopy): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, copy.backdrop, { name: 'Background' }),
    torn(40, 40, 1000, 1270, copy.panel),
    rect(80, 90, 170, 160, CRYPT.bone, { name: 'Price box' }),
    text('HALLO\nWEEN', 80, 100, 170, {
      fontFamily: COND,
      fontSize: 34,
      fontWeight: 400,
      fill: CRYPT.ink,
      align: 'center',
      lineHeight: 0.95,
    }),
    text('25¢  ·  No 1', 80, 184, 170, {
      fontFamily: COND,
      fontSize: 40,
      fontWeight: 400,
      fill: CRYPT.ink,
      align: 'center',
    }),
    rect(250, 90, 750, 72, CRYPT.blood, { name: 'Presenter strip' }),
    text(copy.presenter, 250, 100, 750, {
      fontFamily: COND,
      fontSize: 56,
      fontWeight: 400,
      fill: CRYPT.bone,
      align: 'center',
      letterSpacing: 6,
    }),
    star(18, 790, 190, 190, copy.burst, { innerRatio: 0.78 }),
    text('OCT\n31', 790, 235, 190, {
      fontFamily: COND,
      fontSize: 52,
      fontWeight: 400,
      fill: copy.burstText,
      align: 'center',
      lineHeight: 0.95,
    }),
    text('HALLO\nWEEN', 0, 330, W, {
      fontFamily: SPOOKY,
      fontSize: 300,
      fontWeight: 400,
      fill: CRYPT.bone,
      align: 'center',
      lineHeight: 0.92,
    }),
    [380, 500, 620].map((x) =>
      poly(
        [
          [x, 520],
          [x + 46, 520],
          [x + 116, 980],
          [x + 92, 1000],
        ],
        copy.claw,
        { name: 'Claw mark' },
      ),
    ),
    text(copy.subtitle, 0, 1080, W, {
      fontFamily: 'Permanent Marker',
      fontSize: 92,
      fontWeight: 400,
      fill: CRYPT.bone,
      align: 'center',
    }),
  ]);

export const comicCover = comic({
  backdrop: CRYPT.deep,
  panel: CRYPT.teal,
  burst: CRYPT.blood,
  burstText: CRYPT.bone,
  claw: CRYPT.ink,
  presenter: 'YOUR BRAND PRESENTS',
  subtitle: 'LATE NIGHT Q&A',
});

export const comicRemix = comic({
  backdrop: CRYPT.ink,
  panel: CRYPT.amber,
  burst: CRYPT.ink,
  burstText: CRYPT.mustard,
  claw: CRYPT.wine,
  presenter: 'NIGHTSHADE PRESENTS',
  subtitle: 'GAME NIGHT',
});
