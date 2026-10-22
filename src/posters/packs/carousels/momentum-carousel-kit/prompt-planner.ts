import { linear } from '@/design';
import {
  arrow,
  circle,
  icon,
  POST_SIZE,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';

const { width: W, height: H } = POST_SIZE;
const FONT = 'Inter';
const INK = '#0f172a';
const GLOW = linear(135, '#a3e635', '#14b8a6', '#6366f1');

const glowFrame = (outer: string, inner: string) => [
  rect(0, 0, W, H, outer, { name: 'Background' }),
  rect(40, 40, W - 80, H - 80, GLOW, {
    name: 'Glow frame',
    cornerRadius: 64,
    ...shadow(36, 0, 'rgba(20,184,166,0.5)'),
  }),
  rect(54, 54, W - 108, H - 108, inner, { name: 'Panel', cornerRadius: 52 }),
];

export const promptCover = template(W, H, () => [
  glowFrame('#ffffff', '#ffffff'),
  text('SAVE HOURS EVERY WEEK', 120, 420, 840, {
    fontFamily: FONT,
    fontSize: 30,
    fontWeight: 700,
    fill: INK,
    letterSpacing: 2,
  }),
  text('3 Prompts\nthat Unlock\nDeep Work', 120, 480, 860, {
    fontFamily: FONT,
    fontSize: 108,
    fontWeight: 800,
    fill: INK,
    lineHeight: 1.04,
  }),
  rect(110, 1080, 860, 104, '#ffffff', {
    name: 'Swipe bar',
    cornerRadius: 52,
    stroke: '#14b8a6',
    strokeWidth: 4,
  }),
  icon('sparkles', 150, 1110, 46, INK, { strokeWidth: 2 }),
  text('Swipe to continue', 216, 1110, 500, {
    fontFamily: FONT,
    fontSize: 38,
    fontWeight: 500,
    fill: INK,
  }),
  circle(906, 1132, 36, INK),
  icon('arrow-right', 886, 1112, 40, '#ffffff', { strokeWidth: 2.5 }),
]);

const promptStep = (title: string, body: string, prompt: string) =>
  template(W, H, () => [
    glowFrame('#ffffff', '#0a1412'),
    text(title, 100, 290, 880, {
      fontFamily: FONT,
      fontSize: 70,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'center',
    }),
    text(body, 150, 400, 780, {
      fontFamily: FONT,
      fontSize: 46,
      fontWeight: 400,
      fill: '#d1d5db',
      align: 'center',
      lineHeight: 1.35,
    }),
    rect(150, 730, 780, 400, 'rgba(255,255,255,0.05)', {
      name: 'Prompt box',
      cornerRadius: 36,
      stroke: '#3b4a47',
      strokeWidth: 3,
    }),
    text(prompt, 195, 775, 690, {
      fontFamily: FONT,
      fontSize: 34,
      fontWeight: 400,
      fill: '#e5e7eb',
      lineHeight: 1.45,
    }),
    icon('mic', 770, 1050, 46, '#ffffff', { strokeWidth: 2 }),
    circle(880, 1073, 34, '#ffffff'),
    icon('play', 864, 1056, 34, INK, { strokeWidth: 2.5 }),
  ]);

export const PROMPT_STEPS = [
  promptStep(
    'Name the Goal',
    'Tell the AI what a great result looks like before you ask for anything.',
    'Draft a weekly update for our sales team that highlights three wins and one blocker.',
  ),
  promptStep(
    'Ask for a Format',
    'Request steps, tables or bullets so the answer arrives ready to use.',
    'Turn these meeting notes into a five step checklist with owners and due dates.',
  ),
  promptStep(
    'Give It Context',
    'Share the audience, tone and limits so the draft sounds like you.',
    'Write a friendly teaser for busy clinic owners in under eighty words, no jargon.',
  ),
] as const;

const TONES = [
  { fill: '#ccfbf1', edge: '#0d9488' },
  { fill: '#ffedd5', edge: '#f97316' },
  { fill: '#e0e7ff', edge: '#6366f1' },
  { fill: '#fef9c3', edge: '#ca8a04' },
] as const;

export const plannerCover = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#ffffff', '#eef2f1'), { name: 'Background' }),
  rect(370, 230, 340, 380, '#ffffff', {
    name: 'Calendar',
    cornerRadius: 40,
    ...shadow(40, 18, 'rgba(15,23,42,0.18)'),
  }),
  rect(370, 230, 340, 120, '#0d9488', { name: 'Calendar header', cornerRadius: 40 }),
  rect(370, 310, 340, 40, '#0d9488', { name: 'Calendar header edge' }),
  text('WEEK', 370, 256, 340, {
    fontFamily: FONT,
    fontSize: 56,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
    letterSpacing: 4,
  }),
  text('7', 370, 360, 340, {
    fontFamily: FONT,
    fontSize: 220,
    fontWeight: 700,
    fill: INK,
    align: 'center',
    lineHeight: 1,
  }),
  rotateNodes(-4, 540, 730, [
    rect(230, 670, 620, 120, '#f97316', {
      name: 'Tag',
      cornerRadius: 28,
      ...shadow(20, 8, 'rgba(249,115,22,0.35)'),
    }),
    text('Content Planner', 230, 690, 620, {
      fontFamily: FONT,
      fontSize: 66,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'center',
    }),
  ]),
  text('Weekly Template', 0, 840, W, {
    fontFamily: FONT,
    fontSize: 66,
    fontWeight: 800,
    fill: INK,
    align: 'center',
  }),
  arrow(450, 1010, 180, INK, 8),
]);

interface PlannerDay {
  day: string;
  tasks: readonly string[];
}

const plannerStep = (active: number, title: string, range: string, days: readonly PlannerDay[]) =>
  template(W, H, () => {
    let y = 440;
    const rows = days.map((group, groupIndex) => {
      const startY = y;
      const bars = group.tasks.map((task, taskIndex) => {
        const tone = TONES[(groupIndex * 2 + taskIndex + active) % TONES.length] ?? TONES[0];
        const barY = startY + taskIndex * 150;
        return [
          rect(210, barY, 810, 110, tone.fill, { name: 'Task', cornerRadius: 10 }),
          rect(210, barY, 12, 110, tone.edge, { name: 'Task edge', cornerRadius: 6 }),
          text(task, 250, barY + 30, 750, {
            fontFamily: FONT,
            fontSize: 40,
            fontWeight: 700,
            fill: INK,
          }),
        ];
      });
      y = startY + group.tasks.length * 150 + 60;
      return [
        text(group.day, 60, startY + 30, 140, {
          fontFamily: FONT,
          fontSize: 38,
          fontWeight: 700,
          fill: '#334155',
        }),
        bars,
      ];
    });
    return [
      rect(0, 0, W, H, '#ffffff', { name: 'Background' }),
      rect(0, 0, W, 170, '#f1f5f9', { name: 'Step bar' }),
      rect(0, 168, W, 3, '#e2e8f0', { name: 'Step rule' }),
      [0, 1, 2].map((index) => [
        index === active ? circle(400 + index * 140, 85, 44, '#f97316') : [],
        text(String(index + 1), 350 + index * 140, 58, 100, {
          fontFamily: FONT,
          fontSize: 50,
          fontWeight: 600,
          fill: index === active ? '#ffffff' : INK,
          align: 'center',
        }),
      ]),
      text(title, 0, 220, W, {
        fontFamily: FONT,
        fontSize: 78,
        fontWeight: 800,
        fill: INK,
        align: 'center',
      }),
      text(range, 0, 320, W, {
        fontFamily: FONT,
        fontSize: 42,
        fontWeight: 400,
        fill: '#475569',
        align: 'center',
      }),
      rows,
    ];
  });

export const PLANNER_STEPS = [
  plannerStep(0, 'Plan & Draft', 'Monday to Tuesday', [
    { day: 'Mon', tasks: ['Audit last week numbers', 'Pick three post topics'] },
    { day: 'Tue', tasks: ['Sketch the visuals', 'Write hooks and captions'] },
  ]),
  plannerStep(1, 'Publish & Share', 'Wednesday to Thursday', [
    { day: 'Wed', tasks: ['Schedule every post', 'Polish captions and tags'] },
    { day: 'Thu', tasks: ['Share in two groups', 'Check early results'] },
  ]),
  plannerStep(2, 'Reply & Review', 'Friday', [
    {
      day: 'Fri',
      tasks: [
        'Answer every comment',
        'Join two conversations',
        'Review the analytics',
        'Draft next week plan',
      ],
    },
  ]),
] as const;
