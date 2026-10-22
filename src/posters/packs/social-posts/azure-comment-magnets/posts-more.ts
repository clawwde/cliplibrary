import {
  ellipse,
  group,
  POST_SIZE,
  pill,
  poly,
  rect,
  STORY_SIZE,
  shadow,
  star,
  template,
  text,
} from '../../../kit';
import { BODY, type CommentTheme, DISPLAY, HEAD } from './posts';

const { width: W, height: H } = POST_SIZE;

export const gotMail = (theme: CommentTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.paper, { name: 'Background' }),
    text('NEW MAIL', 0, 80, W, {
      fontFamily: DISPLAY,
      fontSize: 116,
      fontWeight: 400,
      fill: theme.brand,
      align: 'center',
    }),
    text('FOR YOU!', 0, 220, W, {
      fontFamily: DISPLAY,
      fontSize: 116,
      fontWeight: 400,
      fill: theme.brand,
      align: 'center',
    }),
    rect(400, 760, 64, 480, theme.ink, { name: 'Post' }),
    rect(300, 1236, 264, 22, theme.ink, { name: 'Ground', cornerRadius: 11 }),
    ellipse(200, 450, 460, 200, theme.ink, { name: 'Mailbox dome' }),
    rect(200, 550, 460, 220, theme.ink, { name: 'Mailbox body' }),
    rect(250, 600, 360, 12, 'rgba(255,255,255,0.18)', { name: 'Shine', cornerRadius: 6 }),
    ellipse(160, 470, 110, 300, '#2a3350', { name: 'Mailbox door' }),
    group(
      rect(110, 560, 200, 130, theme.paper, {
        name: 'Letter',
        stroke: theme.ink,
        strokeWidth: 6,
        rotation: -10,
      }),
      poly(
        [
          [118, 572],
          [216, 612],
          [295, 538],
        ],
        'rgba(0,0,0,0)',
        { name: 'Letter flap', stroke: theme.ink, strokeWidth: 6 },
      ),
    ),
    rect(660, 420, 22, 230, theme.brand, { name: 'Flag pole' }),
    rect(682, 420, 110, 70, theme.brand, { name: 'Flag' }),
    rect(600, 960, 420, 90, theme.brand, { name: 'Button' }),
    text('Get member-only deals', 600, 986, 420, {
      fontFamily: HEAD,
      fontSize: 32,
      fontWeight: 700,
      fill: theme.paper,
      align: 'center',
    }),
    rect(600, 1070, 420, 130, theme.brand, { name: 'Button' }),
    text('Comment “mail” to\njoin the newsletter', 600, 1092, 420, {
      fontFamily: HEAD,
      fontSize: 32,
      fontWeight: 700,
      fill: theme.paper,
      align: 'center',
      lineHeight: 1.25,
    }),
    star(5, 40, 1180, 120, theme.ink, { innerRatio: 0.42 }),
    star(5, 890, 700, 80, theme.ink, { innerRatio: 0.42 }),
  ]);

const folder = (x: number, y: number, width: number, height: number, fill: string) =>
  group(
    rect(x, y, width * 0.42, height * 0.24, fill, { name: 'Folder tab', cornerRadius: 14 }),
    rect(x, y + height * 0.12, width, height * 0.88, fill, {
      name: 'Folder body',
      cornerRadius: 18,
    }),
  );

export const expertsFolder = (theme: CommentTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.ink, { name: 'Background' }),
    folder(70, 80, 220, 170, theme.brand),
    folder(800, 130, 180, 140, theme.deep),
    folder(60, 1090, 240, 180, theme.deep),
    folder(860, 1000, 150, 300, theme.brand),
    star(5, 560, 120, 90, theme.paper, { innerRatio: 0.42 }),
    star(5, 470, 1190, 70, theme.paper, { innerRatio: 0.42 }),
    group(
      rect(160, 400, 300, 90, theme.brand, { name: 'Folder tab', cornerRadius: 22 }),
      rect(160, 450, 760, 520, theme.brand, {
        name: 'Folder body',
        cornerRadius: 28,
        ...shadow(40, 16, 'rgba(0,0,0,0.45)'),
      }),
      text('ONLY PROS\nKNOW THIS', 220, 520, 660, {
        fontFamily: DISPLAY,
        fontSize: 92,
        fontWeight: 400,
        fill: theme.paper,
        lineHeight: 1.08,
      }),
      text(
        'Most founders learn this the hard way.\nHere is the shortcut nobody shares.',
        220,
        760,
        660,
        {
          fontFamily: BODY,
          fontSize: 32,
          fontWeight: 500,
          fill: theme.paper,
          lineHeight: 1.4,
        },
      ),
    ),
    rect(480, 1010, 400, 80, theme.paper, { name: 'Prompt label' }),
    text('Comment: “pro”', 480, 1030, 400, {
      fontFamily: HEAD,
      fontSize: 36,
      fontWeight: 800,
      fill: theme.ink,
      align: 'center',
    }),
  ]);

export const pollStory = (theme: CommentTheme) =>
  template(STORY_SIZE.width, STORY_SIZE.height, () => [
    rect(0, 0, STORY_SIZE.width, STORY_SIZE.height, theme.brand, { name: 'Background' }),
    star(5, 860, 120, 140, theme.ink, { innerRatio: 0.42 }),
    text('QUICK\nQUESTION', 90, 240, 900, {
      fontFamily: DISPLAY,
      fontSize: 150,
      fontWeight: 400,
      fill: theme.paper,
      lineHeight: 1.05,
    }),
    text('Which one is holding your\nsocial growth back?', 90, 610, 900, {
      fontFamily: HEAD,
      fontSize: 54,
      fontWeight: 600,
      fill: theme.paper,
      lineHeight: 1.25,
    }),
    rect(90, 840, 900, 220, theme.ink, { name: 'Option A', cornerRadius: 24 }),
    text('A  ·  No time to post', 140, 910, 820, {
      fontFamily: HEAD,
      fontSize: 60,
      fontWeight: 700,
      fill: theme.paper,
    }),
    rect(90, 1100, 900, 220, theme.paper, { name: 'Option B', cornerRadius: 24 }),
    text('B  ·  No idea what to say', 140, 1170, 820, {
      fontFamily: HEAD,
      fontSize: 60,
      fontWeight: 700,
      fill: theme.ink,
    }),
    pill('Reply with A or B', 240, 1520, {
      fill: theme.ink,
      color: theme.paper,
      fontSize: 52,
      fontFamily: HEAD,
      fontWeight: 800,
      width: 600,
    }),
    star(5, 80, 1720, 110, theme.ink, { innerRatio: 0.42 }),
  ]);
