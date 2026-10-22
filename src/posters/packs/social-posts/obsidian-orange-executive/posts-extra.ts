import { linear } from '@/design';
import { circle, icon, path, rect, template } from '../../../kit';
import { answerCall, copy, H, head, leadershipTips, powerFull, trackRecord, VG, W } from './posts';
import { aiStat, bigStat, funnel, marketPost, standOut } from './posts-more';

interface DayStyle {
  from: string;
  to: string;
  accent: string;
  day: string;
  time: string;
  date: string;
  message: string;
}

const frame = (width: number, height: number, radius: number) =>
  `M0 ${radius} Q0 0 ${radius} 0 L${width - radius} 0 Q${width} 0 ${width} ${radius} L${width} ${height} L0 ${height} Z`;

const helloDay = (style: DayStyle) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(165, style.from, style.to), { name: 'Background' }),
    path(
      'M0 220 Q540 -40 1080 220 L1080 420 L0 420 Z',
      0,
      930,
      W,
      420,
      'rgba(255,255,255,0.14)',
      { width: 1080, height: 420 },
      { name: 'Glow arc' },
    ),
    head('Hello!', 90, 100, 800, 110, VG.white, 800),
    head(style.day, 90, 220, 900, 110, style.accent, 800),
    path(frame(700, 900, 100), 190, 450, 700, 900, VG.black, { width: 700, height: 900 }),
    path(frame(660, 880, 82), 210, 470, 660, 880, linear(180, style.from, style.to), {
      width: 660,
      height: 880,
    }),
    rect(445, 495, 190, 54, VG.black, { cornerRadius: 27, name: 'Dynamic island' }),
    head(style.time, 190, 590, 700, 170, VG.white, 700, { align: 'center', lineHeight: 1 }),
    copy(style.date, 190, 780, 700, 34, VG.white, { align: 'center', fontWeight: 500 }),
    rect(240, 870, 600, 250, VG.white, { cornerRadius: 32, name: 'Notification' }),
    rect(272, 900, 44, 44, style.to, { cornerRadius: 12, name: 'App icon' }),
    icon('message-circle', 280, 908, 28, VG.white, { strokeWidth: 2.4 }),
    copy('MESSAGES', 332, 904, 300, 24, VG.grey, { letterSpacing: 2 }),
    copy(style.message, 272, 965, 540, 32, VG.black, { lineHeight: 1.35 }),
    circle(150, 600, 80, '#ffd23f', { name: 'Bell badge' }),
    icon('bell', 108, 558, 84, VG.black, { strokeWidth: 2.2 }),
    circle(212, 530, 28, VG.white, { name: 'Count' }),
    head('1', 184, 510, 56, 30, VG.black, 800, { align: 'center' }),
  ]);

export const helloMonday = helloDay({
  from: VG.orangeLight,
  to: VG.orangeDeep,
  accent: '#ffe2cc',
  day: 'Monday',
  time: '10:30',
  date: 'Monday, March 2027',
  message: 'New week, fresh start. Set the\nagenda and drive real results.',
});

export const helloTuesday = helloDay({
  from: '#2fb3a8',
  to: '#0f5d63',
  accent: '#c8fff7',
  day: 'Tuesday',
  time: '12:00',
  date: 'Tuesday, March 2027',
  message: 'Small steps today add up to\nbig wins for your team.',
});

export const POSTS = [
  trackRecord,
  leadershipTips,
  funnel,
  powerFull,
  standOut,
  answerCall,
  bigStat,
  aiStat,
  marketPost,
];
