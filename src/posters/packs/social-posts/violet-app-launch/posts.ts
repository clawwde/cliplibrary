import { linear, radial } from '@/design';
import {
  card,
  circle,
  icon,
  POST_SIZE,
  photo,
  pill,
  rating,
  rect,
  template,
  text,
} from '../../../kit';
import { type AppPalette, badges, device, HEAD, VIOLET } from './device';

const { width: W, height: H } = POST_SIZE;

const site = (p: AppPalette, x: number, y: number, color: string = p.muted) =>
  text('nimbly.app', x, y, 400, { fontSize: 28, fontWeight: 600, fill: color });

const headline = (content: string, x: number, y: number, fill: string, size = 96, weight = 800) =>
  text(content, x, y, W - x - 60, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: weight,
    fill,
    lineHeight: 1.05,
  });

const centered = (content: string, y: number, fill: string, size: number, weight = 800) =>
  text(content, 0, y, W, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: weight,
    fill,
    align: 'center',
    lineHeight: 1.05,
  });

export const addsUp = template(W, H, () => [
  rect(0, 0, W, H, VIOLET.paper, { name: 'Background' }),
  site(VIOLET, 80, 90),
  headline('It adds up', 80, 200, VIOLET.ink, 118),
  headline('quickly,', 80, 330, VIOLET.brand, 118),
  device(640, 470, 320, VIOLET, 12),
  text('Automate every flow', 80, 640, 520, { fontSize: 40, fontWeight: 500, fill: VIOLET.ink }),
  text('with Nimbly', 80, 694, 520, { fontSize: 40, fontWeight: 800, fill: VIOLET.brand }),
  icon('corner-down-right', 300, 790, 110, VIOLET.ink, { strokeWidth: 1.6 }),
  rect(0, 1150, W, 200, linear(90, VIOLET.brand, VIOLET.deep), { name: 'Download band' }),
  text('DOWNLOAD TODAY!', 80, 1172, 500, {
    fontSize: 24,
    fontWeight: 800,
    fill: '#ffffff',
    letterSpacing: 2,
  }),
  badges(80, 1222),
  text('nimbly.app', 640, 1246, 360, {
    fontSize: 30,
    fontWeight: 700,
    fill: '#ffffff',
    align: 'right',
  }),
]);

export const downloadApp = template(W, H, () => [
  rect(0, 0, W, H, linear(160, VIOLET.brand, VIOLET.deep), { name: 'Background' }),
  centered('Download our', 110, '#ffffff', 96),
  centered('mobile app', 215, '#ffffff', 96),
  pill('today!', 380, 340, {
    fill: VIOLET.ink,
    color: '#ffffff',
    fontSize: 60,
    fontFamily: HEAD,
    fontWeight: 800,
    width: 320,
  }),
  device(150, 560, 330, VIOLET, -14),
  card(600, 720, 400, 250, { radius: 32, shadowBlur: 40 }),
  text('4.9', 640, 750, 200, { fontFamily: HEAD, fontSize: 80, fontWeight: 800, fill: VIOLET.ink }),
  rating(780, 778, 34, 5, VIOLET.accent, 0.15),
  text('120K happy installs', 640, 875, 340, {
    fontSize: 30,
    fontWeight: 600,
    fill: VIOLET.muted,
  }),
  icon('sparkles', 880, 1100, 110, '#ffffff', { strokeWidth: 1.6 }),
]);

export const ideasHappen = template(W, H, () => [
  rect(0, 0, W, H, linear(160, VIOLET.night, VIOLET.ink), { name: 'Background' }),
  [150, 220, 290].map((radius) =>
    circle(770, 650, radius, 'rgba(0,0,0,0)', {
      stroke: 'rgba(255,255,255,0.12)',
      strokeWidth: 2,
      name: 'Ring',
    }),
  ),
  site(VIOLET, 80, 90, VIOLET.soft),
  headline('Where', 80, 290, '#ffffff', 96, 600),
  headline('Your', 80, 395, '#ffffff', 96, 600),
  headline('Ideas', 80, 500, VIOLET.soft, 96),
  headline('Take Off', 80, 605, '#ffffff', 96),
  pill('Learn more', 80, 780, { fill: VIOLET.brand, color: '#ffffff', fontSize: 30 }),
  device(620, 330, 300, VIOLET, 10),
  text('DOWNLOAD TODAY!', 80, 1100, 500, {
    fontSize: 24,
    fontWeight: 800,
    fill: '#ffffff',
    letterSpacing: 2,
  }),
  badges(80, 1150),
]);

export const workspace = template(W, H, () => [
  photo('desk-imac', 0, 0, W, H, { name: 'Office photo' }),
  rect(0, 0, W, H, linear(180, 'rgba(20,15,46,0.55)', 'rgba(20,15,46,0.9)'), { name: 'Shade' }),
  centered('Your all-in-one,', 110, '#ffffff', 64, 500),
  centered('Digital HQ.', 190, '#ffffff', 92),
  circle(540, 700, 260, radial('rgba(109,74,255,0.6)', 'rgba(109,74,255,0)'), { name: 'Glow' }),
  device(380, 360, 320, VIOLET),
  rect(0, 1180, W, 170, VIOLET.brand, { name: 'Download band' }),
  badges(80, 1229),
  text('Start free today', 600, 1246, 400, {
    fontFamily: HEAD,
    fontSize: 36,
    fontWeight: 700,
    fill: '#ffffff',
    align: 'right',
    italic: true,
  }),
]);

const trackTasks = template(W, H, () => [
  rect(0, 0, W, H, VIOLET.paper, { name: 'Background' }),
  text('nimbly.app', 600, 90, 400, {
    fontSize: 28,
    fontWeight: 600,
    fill: VIOLET.muted,
    align: 'right',
  }),
  headline('Plan, Track', 80, 210, VIOLET.ink, 76),
  headline('& Finish', 80, 300, VIOLET.ink, 76),
  headline('Your Tasks', 80, 390, VIOLET.brand, 76),
  rect(60, 600, 600, 340, linear(135, VIOLET.brand, VIOLET.deep), {
    cornerRadius: 32,
    name: 'List card',
  }),
  ['Fast and focused', 'Always in sync', 'Help around the clock'].map((label, index) => [
    rect(90, 630 + index * 98, 440, 74, '#ffffff', { cornerRadius: 37, name: 'Row' }),
    icon('circle-check', 108, 645 + index * 98, 44, VIOLET.brand),
    text(label, 166, 650 + index * 98, 360, { fontSize: 28, fontWeight: 600, fill: VIOLET.ink }),
  ]),
  device(620, 220, 330, VIOLET),
  centered('Download it free today', 1060, VIOLET.ink, 46, 700),
  badges(300, 1160),
]);

const freshUpdate = template(W, H, () => [
  rect(0, 0, W, H, linear(180, VIOLET.night, VIOLET.ink), { name: 'Background' }),
  text('nimbly.app', 0, 80, W, {
    fontSize: 28,
    fontWeight: 600,
    fill: VIOLET.soft,
    align: 'center',
  }),
  centered('Fresh Update', 160, '#ffffff', 96),
  centered('is now live', 270, VIOLET.soft, 96),
  circle(540, 860, 300, radial('rgba(109,74,255,0.55)', 'rgba(109,74,255,0)'), { name: 'Glow' }),
  device(380, 450, 320, VIOLET),
  pill('See what changed', 365, 1170, { fill: VIOLET.accent, color: VIOLET.ink, fontSize: 30 }),
]);

export const growth = template(W, H, () => [
  rect(0, 0, W, H, '#ffffff', { name: 'Background' }),
  rect(0, 560, W, 790, linear(160, VIOLET.soft, VIOLET.brand), { name: 'Lower panel' }),
  circle(540, 560, 380, '#ffffff', { name: 'Arc' }),
  centered('Fuel Faster', 110, VIOLET.ink, 70, 500),
  centered('Business Growth', 195, VIOLET.brand, 84),
  text('Let smart automations make\nthe busywork disappear.', 0, 320, W, {
    fontSize: 34,
    fontWeight: 400,
    fill: VIOLET.muted,
    align: 'center',
    lineHeight: 1.4,
  }),
  device(250, 600, 280, VIOLET, -12),
  device(520, 650, 280, VIOLET, -12),
]);

export const growthStory = template(1080, 1920, () => [
  rect(0, 0, 1080, 1920, '#ffffff', { name: 'Background' }),
  rect(0, 820, 1080, 1100, linear(160, VIOLET.soft, VIOLET.brand), { name: 'Lower panel' }),
  circle(540, 820, 420, '#ffffff', { name: 'Arc' }),
  centered('Fuel Faster', 230, VIOLET.ink, 80, 500),
  centered('Business Growth', 330, VIOLET.brand, 92),
  text('Let smart automations make\nthe busywork disappear.', 0, 470, 1080, {
    fontSize: 38,
    fontWeight: 400,
    fill: VIOLET.muted,
    align: 'center',
    lineHeight: 1.4,
  }),
  device(210, 820, 340, VIOLET, -12),
  device(530, 880, 340, VIOLET, -12),
  pill('Try it free', 400, 1720, { fill: VIOLET.ink, color: '#ffffff', fontSize: 34 }),
]);

export const textAlerts = (p: AppPalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    Array.from({ length: 15 }, (_, index) =>
      rect(0, index * 90, W, 2, 'rgba(255,255,255,0.06)', { name: 'Grid line' }),
    ),
    Array.from({ length: 12 }, (_, index) =>
      rect(index * 90, 0, 2, H, 'rgba(255,255,255,0.06)', { name: 'Grid line' }),
    ),
    centered('Get Alerts', 120, '#ffffff', 100, 600),
    centered('by Text Message', 235, p.soft, 88),
    rect(140, 760, 800, 590, linear(160, p.brand, p.deep), { cornerRadius: 60, name: 'Stage' }),
    device(340, 440, 400, p),
    card(600, 620, 420, 130, { radius: 28, shadowBlur: 30 }),
    circle(660, 685, 36, p.brand),
    icon('message-circle', 640, 665, 40, '#ffffff'),
    text('Order shipped', 716, 645, 290, { fontSize: 28, fontWeight: 700, fill: p.ink }),
    text('Arrives Friday', 716, 685, 290, { fontSize: 24, fontWeight: 500, fill: p.muted }),
  ]);

const futureHand = template(W, H, () => [
  rect(0, 0, W, H, VIOLET.paper, { name: 'Background' }),
  headline('The Future of', 80, 130, VIOLET.ink, 78, 500),
  headline('Work is Automated', 80, 222, VIOLET.brand, 78),
  text('Your AI teammate handles the\nrepetitive work for you.', 80, 350, 800, {
    fontSize: 34,
    fontWeight: 400,
    fill: VIOLET.muted,
    lineHeight: 1.4,
  }),
  pill('Learn more', 80, 480, { fill: VIOLET.brand, color: '#ffffff', fontSize: 30 }),
  photo('phone-hand-1', 80, 640, 920, 630, { cornerRadius: 40 }),
]);

export const ALERTS = textAlerts(VIOLET);

export const POSTS = [
  addsUp,
  downloadApp,
  ideasHappen,
  workspace,
  trackTasks,
  freshUpdate,
  growth,
  ALERTS,
  futureHand,
];
