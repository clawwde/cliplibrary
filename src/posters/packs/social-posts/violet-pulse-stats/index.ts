import { definePack } from '../../../pack';
import {
  aiUsage,
  bigStat,
  CORAL,
  growProfit,
  growStory,
  leadersChart,
  MIDNIGHT,
  resultsNotes,
  VIOLET,
} from './posts';

const notes = resultsNotes(VIOLET);
const stat = bigStat(VIOLET);
const cases = aiUsage(VIOLET);
const chart = leadersChart(VIOLET);
const grow = growProfit(VIOLET);

export const violetPulseStatsPack = definePack({
  id: 'violet-pulse-stats',
  title: 'Violet Pulse Stats',
  description:
    'Key statistic, bar chart, trend line and growth posts in violet and lime, with a matching story.',
  category: 'social-posts',
  tags: ['stats', 'linkedin', 'ai', 'story'],
  theme: 'dark',

  designs: [
    notes,
    stat,
    cases,
    chart,
    grow,
    growStory(VIOLET),
    leadersChart(CORAL),
    aiUsage(MIDNIGHT),
  ],
});
