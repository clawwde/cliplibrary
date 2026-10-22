import { linear } from '@/design';
import { icon, photo, poly, rect, template } from '../../../kit';
import { button, copy, DISPLAY, display, H, head, VG, W } from './posts';

const STAGES = [
  { label: 'Show Value Fast', fill: VG.orangeLight },
  { label: 'Capture Attention', fill: VG.orange },
  { label: 'Spark Real Desire', fill: VG.orangeDeep },
  { label: 'Close the Deal', fill: '#a83a08' },
] as const;

export const funnel = template(W, H, () => [
  rect(0, 0, W, H, VG.black, { name: 'Background' }),
  head('Winning Funnel', 0, 100, W, 82, VG.white, 800, { align: 'center' }),
  STAGES.map((stage, index) => {
    const top = 900 - index * 180;
    const bottom = top - 180;
    const y = 270 + index * 214;
    return [
      poly(
        [
          [540 - top / 2, y],
          [540 + top / 2, y],
          [540 + bottom / 2, y + 190],
          [540 - bottom / 2, y + 190],
        ],
        stage.fill,
        { name: 'Funnel stage' },
      ),
      head(stage.label, 0, y + 70, W, 36, VG.white, 600, { align: 'center' }),
    ];
  }),
  copy('Four stages. One clear path to revenue.', 0, 1200, W, 32, VG.grey, {
    align: 'center',
  }),
]);

export const bigStat = template(W, H, () => [
  rect(0, 0, W, H, linear(165, VG.orangeLight, VG.orangeDeep), { name: 'Background' }),
  copy('#GainInsights', 580, 100, 410, 30, VG.white, { align: 'right', fontWeight: 600 }),
  copy('The training and software\nmarket is projected to reach', 90, 380, 900, 42, VG.white, {
    fontWeight: 500,
    lineHeight: 1.3,
  }),
  display('$24B', 76, 540, 1000, 480, VG.white),
  rect(90, 1130, 900, 3, 'rgba(255,255,255,0.6)', { name: 'Rule' }),
  copy('Industry outlook 2027', 90, 1170, 500, 28, VG.white),
  copy('vantor.group', 590, 1170, 400, 28, VG.white, { align: 'right', fontWeight: 600 }),
]);

export const standOut = template(W, H, () => [
  rect(0, 0, W, H, VG.paper, { name: 'Background' }),
  display('STAND OUT', 0, 90, W, 200, VG.black, { align: 'center' }),
  scriptLine('from the crowd', 300),
  copy('BE THE NAME THEY REMEMBER', 0, 450, W, 34, VG.black, {
    align: 'center',
    fontWeight: 700,
    letterSpacing: 4,
  }),
  rect(0, 560, W, 14, VG.orange, { name: 'Stripe' }),
  photo('team-3', 0, 574, W, 776, { crop: { zoom: 1, focusX: 0.5, focusY: 0.4 } }),
  rect(0, 1150, W, 200, linear(180, 'rgba(12,12,12,0)', 'rgba(12,12,12,0.75)'), {
    name: 'Shade',
  }),
  copy('vantor.group', 0, 1260, W, 28, VG.white, { align: 'center', fontWeight: 600 }),
]);

function scriptLine(content: string, y: number) {
  return head(content, 0, y, W, 120, VG.orange, 400, {
    fontFamily: 'Satisfy',
    align: 'center',
    lineHeight: 1,
  });
}

export const aiStat = template(W, H, () => [
  rect(0, 0, W, H, VG.black, { name: 'Background' }),
  head('Four out of 5', 90, 110, 900, 84, VG.white, 800),
  head('businesses use AI\nin their daily\nworkflows', 90, 210, 900, 84, '#6f6a66', 800, {
    lineHeight: 1.1,
  }),
  Array.from({ length: 10 }, (_, index) =>
    icon(
      'user-round',
      90 + (index % 5) * 190,
      640 + Math.floor(index / 5) * 220,
      140,
      index % 5 === 4 ? '#4a4643' : VG.orange,
      { strokeWidth: 2.2 },
    ),
  ),
  copy('Source: Vantor Workplace Study 2027', 90, 1110, 900, 28, VG.grey),
  button('Read the Report', 90, 1180, VG.orange, VG.black),
]);

const marketTrends = (height: number) =>
  template(W, height, () => {
    const tall = height > 1500;
    const top = tall ? 260 : 90;
    const photoTop = tall ? 820 : 560;
    return [
      rect(0, 0, W, height, VG.black, { name: 'Background' }),
      photo('man-portrait-2', 0, photoTop, W, height - photoTop, {
        crop: { zoom: 1, focusX: 0.5, focusY: 0.2 },
      }),
      rect(0, photoTop, W, 320, linear(180, VG.black, 'rgba(12,12,12,0)'), { name: 'Fade' }),
      head('Trends', 0, top, W, 100, VG.orange, 400, {
        fontFamily: 'Satisfy',
        align: 'center',
        lineHeight: 1,
      }),
      display('MAR', 0, top + 120, W, 330, VG.white, { align: 'center', lineHeight: 0.92 }),
      display('KET', 0, top + 420, W, 330, VG.white, { align: 'center', lineHeight: 0.92 }),
      sideTag(height),
    ];
  });

function sideTag(height: number) {
  return copy('#vantorgroup', 1000, height - 120, 420, 30, VG.orange, {
    rotation: -90,
    fontWeight: 600,
    fontFamily: DISPLAY,
    letterSpacing: 4,
  });
}

export const marketPost = marketTrends(H);
export const marketStory = marketTrends(1920);
