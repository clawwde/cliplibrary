import { type Template, template, text } from '../../../kit';
import { trail } from '../coral-tide-carousels/showcase';
import {
  BODY,
  bodyText,
  brandMark,
  H,
  LEAF,
  leafBackground,
  SCRIPT,
  titleLine,
  W,
} from './palette';

const STROKE = 14;
const LOW = 1150;
const HIGH = 200;
const RISE = 190;

const chevron = (tipX: number, tipY: number) =>
  trail('M0 0 L36 30 L0 60', tipX - 36, tipY - 30, 36, 60, LEAF.white, STROKE);

const stagesCover = template(W, H, () => [
  leafBackground(),
  titleLine('Becoming a', 90, 250, 88, LEAF.white),
  titleLine('Trusted Voice:', 90, 355, 88, LEAF.mint),
  text('The 5-Stage\nCreator Path', 90, 490, 800, {
    fontFamily: BODY,
    fontSize: 64,
    fontWeight: 500,
    fill: LEAF.white,
    lineHeight: 1.25,
  }),
  text('Swipe', 690, 740, 300, {
    fontFamily: SCRIPT,
    fontSize: 96,
    fontWeight: 600,
    fill: LEAF.white,
    rotation: -10,
  }),
  trail('M40 0 C80 190 260 270 480 270', 600, LOW - 270, 480, 270, LEAF.white, STROKE),
  brandMark(90, 1170),
]);

const stage = (title: string, body: string, entry: 'low' | 'high') =>
  template(W, H, () => [
    leafBackground(),
    entry === 'low'
      ? [
          trail('M0 190 C170 190 280 0 460 0', 0, LOW - RISE, 460, RISE, LEAF.white, STROKE),
          chevron(476, LOW - RISE),
          trail('M0 190 C140 190 300 0 500 0', 580, HIGH, 500, RISE, LEAF.white, STROKE),
        ]
      : [
          trail('M0 0 C170 0 280 190 460 190', 0, HIGH, 460, RISE, LEAF.white, STROKE),
          chevron(476, HIGH + RISE),
          trail('M0 0 C140 0 300 190 500 190', 580, LOW - RISE, 500, RISE, LEAF.white, STROKE),
        ],
    titleLine(title, 90, 540, 86, LEAF.mint),
    bodyText(body, 90, 670, 860),
  ]);

export const STAGE_SERIES: readonly Template[] = [
  stagesCover,
  stage(
    'Spark Stage:',
    'You start sharing what you know and find the topics that make people stop scrolling.',
    'low',
  ),
  stage(
    'Growth Stage:',
    'Posting turns into a rhythm. Your audience starts to recognise your name and your ideas.',
    'high',
  ),
  stage(
    'Authority Stage:',
    'Peers quote your work and clients arrive already convinced you are the right fit.',
    'low',
  ),
  stage(
    'Legacy Stage:',
    'Your ideas travel without you. Others teach your frameworks and the brand runs on trust.',
    'high',
  ),
];
