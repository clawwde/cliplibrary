import { circle, rect, star, type Template, template, text } from '../../../kit';
import { BODY, H, HEAD, type StatPalette, W } from './posts';

const SKYLINE = [520, 380, 600, 460, 640, 420];

export const wasteHours = (p: StatPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.deep, { name: 'Background' }),
    text('73%', 90, 110, 600, {
      fontFamily: HEAD,
      fontSize: 170,
      fontWeight: 700,
      fill: p.paper,
    }),
    star(5, 760, 90, 130, p.brand, { innerRatio: 0.45 }),
    text('of small firms lose 20+ hours\na week on tasks AI can handle', 90, 330, 920, {
      fontFamily: HEAD,
      fontSize: 46,
      fontWeight: 700,
      fill: p.paper,
      lineHeight: 1.25,
    }),
    text('Ops Pulse Report 2026. Stop losing time, start automating.', 90, 480, 920, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 500,
      fill: p.muted,
    }),
    SKYLINE.map((height, index) =>
      rect(60 + index * 160, H - height, 160, height, p.brand, {
        name: 'Bar',
      }),
    ),
    SKYLINE.map((height, index) =>
      index % 2 === 0
        ? rect(60 + index * 160, H - height, 160, 14, 'rgba(255,255,255,0.35)', {
            name: 'Bar cap',
          })
        : [],
    ),
    star(5, 20, 700, 100, p.brand, { innerRatio: 0.45 }),
  ]);

const bubble = (
  cx: number,
  cy: number,
  radius: number,
  value: string,
  label: string,
  fill: string,
  color: string,
) => [
  circle(cx, cy, radius, fill),
  text(value, cx - radius, cy - radius * 0.42, radius * 2, {
    fontFamily: HEAD,
    fontSize: radius * 0.5,
    fontWeight: 700,
    fill: color,
    align: 'center',
  }),
  text(label, cx - radius, cy + radius * 0.18, radius * 2, {
    fontFamily: BODY,
    fontSize: Math.max(22, radius * 0.16),
    fontWeight: 600,
    fill: color,
    align: 'center',
  }),
];

export const aiUseCases = (p: StatPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.deep, { name: 'Background' }),
    text('AI use cases that\nlift business results', 90, 110, 920, {
      fontFamily: HEAD,
      fontSize: 66,
      fontWeight: 700,
      fill: p.paper,
      lineHeight: 1.15,
    }),
    text('How teams use AI to grow. What about you?', 90, 290, 920, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 500,
      fill: p.muted,
    }),
    bubble(360, 760, 200, '68%', 'Support chat', p.brand, p.deep),
    star(5, 560, 470, 330, p.paper, { innerRatio: 0.5 }),
    text('52%', 610, 600, 230, {
      fontFamily: HEAD,
      fontSize: 64,
      fontWeight: 700,
      fill: p.deep,
      align: 'center',
    }),
    text('Lead scoring', 780, 800, 280, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 600,
      fill: p.muted,
      align: 'center',
    }),
    bubble(760, 1070, 160, '55%', 'Content drafts', p.brand, p.deep),
    star(5, 150, 990, 210, p.paper, { innerRatio: 0.5 }),
    text('24%', 165, 1080, 180, {
      fontFamily: HEAD,
      fontSize: 44,
      fontWeight: 700,
      fill: p.deep,
      align: 'center',
    }),
    text('Admin tasks', 120, 1220, 300, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 600,
      fill: p.muted,
      align: 'center',
    }),
  ]);
