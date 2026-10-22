import {
  circle,
  icon,
  type Nodes,
  poly,
  rect,
  shadow,
  type Template,
  template,
  text,
} from '../../../kit';
import { POST, STORY } from '../lagoon-saas-stats/theme';
import {
  bodyStyle,
  type EventDayCopy,
  type EventTheme,
  eventDay,
  headStyle,
  type MonthCopy,
  monthCalendar,
  type SaveCopy,
  saveTheDate,
  sparkle,
} from './posts';

interface PlannerCopy {
  title: string;
  subtitle: string;
  ideas: readonly string[];
}

export interface AgendaCopy {
  month: string;
  rows: readonly { day: string; title: string; body: string }[];
}

export interface EventsCopy {
  day: EventDayCopy;
  month: MonthCopy;
  save: SaveCopy;
  planner: PlannerCopy;
  agenda: AgendaCopy;
}

const W = POST.width;

const plannerNodes = (theme: EventTheme, copy: PlannerCopy, height: number): Nodes[] => {
  const extra = height - POST.height;
  const top = 120 + extra * 0.12;
  const gridTop = top + 380;
  const cellHeight = 210 + extra * 0.18;
  return [
    rect(0, 0, W, height, '#f6f6f8', { name: 'Background' }),
    poly(
      [
        [0, gridTop + 60],
        [110, gridTop + 140],
        [0, gridTop + 220],
      ],
      theme.main,
      { name: 'Accent triangle' },
    ),
    poly(
      [
        [W, gridTop + cellHeight * 2],
        [W - 120, gridTop + cellHeight * 2 + 80],
        [W, gridTop + cellHeight * 2 + 170],
      ],
      theme.main,
      { name: 'Accent triangle' },
    ),
    text(copy.title, 0, top, W, { ...headStyle(theme, 76, theme.main), align: 'center' }),
    text(copy.subtitle, 0, top + 190, W, {
      ...headStyle(theme, 38, theme.ink),
      align: 'center',
    }),
    rect(130, gridTop - 50, 820, cellHeight * 3 + 140, theme.paper, {
      name: 'Notebook',
      cornerRadius: 10,
      ...shadow(40, 16, 'rgba(0,0,0,0.18)'),
    }),
    Array.from({ length: 12 }, (_, index) =>
      rect(170 + index * 66, gridTop - 86, 18, 70, theme.ink, {
        name: 'Spiral ring',
        cornerRadius: 9,
      }),
    ),
    copy.ideas.slice(0, 9).map((idea, index) => {
      const x = 170 + (index % 3) * 252;
      const y = gridTop + Math.floor(index / 3) * (cellHeight + 18);
      return [
        rect(x, y, 236, cellHeight, '#ffffff', {
          name: 'Idea cell',
          cornerRadius: 6,
          stroke: theme.ink,
          strokeWidth: 3,
        }),
        text(idea, x + 18, y + 22, 200, bodyStyle(theme, 26, theme.ink, 700)),
        rect(x + 18, y + cellHeight - 50, 120, 8, '#d1d5db', {
          name: 'Note line',
          cornerRadius: 4,
        }),
        rect(x + 18, y + cellHeight - 30, 170, 8, '#d1d5db', {
          name: 'Note line',
          cornerRadius: 4,
        }),
      ];
    }),
    circle(990, height - 90, 48, theme.dark, { name: 'Swipe button' }),
    icon('arrow-up-right', 966, height - 114, 48, theme.paper, { strokeWidth: 2.6 }),
  ];
};

export const agenda = (theme: EventTheme, copy: AgendaCopy): Template =>
  template(W, POST.height, () => [
    rect(0, 0, W, POST.height, theme.main, { name: 'Background' }),
    sparkle(theme, 470, 12, 130),
    copy.rows.slice(0, 4).map((row, index) => {
      const y = 160 + index * 290;
      return [
        rect(100, y, 160, 160, theme.paper, {
          name: 'Date tile',
          cornerRadius: 6,
          ...shadow(20, 8, 'rgba(0,0,0,0.25)'),
        }),
        text(row.day, 100, y + 22, 160, {
          ...headStyle(theme, 76, theme.ink),
          align: 'center',
          lineHeight: 1,
        }),
        text(copy.month, 100, y + 110, 160, {
          ...bodyStyle(theme, 22, '#6b7280', 700),
          align: 'center',
        }),
        circle(250, y + 6, 18, theme.dark, { name: 'Pin' }),
        circle(250, y + 6, 7, theme.pop, { name: 'Pin head' }),
        text(row.title, 310, y + 6, 700, headStyle(theme, 54, theme.onMain)),
        text(row.body, 310, y + 76, 700, bodyStyle(theme, 30, theme.onMain)),
      ];
    }),
    sparkle(theme, 870, 1150, 160),
  ]);

interface EventSet {
  day: Template;
  month: Template;
  save: Template;
  planner: Template;
  agenda: Template;
  story: Template;
}

export const eventTemplates = (theme: EventTheme, copy: EventsCopy): EventSet => ({
  day: eventDay(theme, copy.day),
  month: monthCalendar(theme, copy.month),
  save: saveTheDate(theme, copy.save),
  planner: template(W, POST.height, () => plannerNodes(theme, copy.planner, POST.height)),
  agenda: agenda(theme, copy.agenda),
  story: template(W, STORY.height, () => plannerNodes(theme, copy.planner, STORY.height)),
});
