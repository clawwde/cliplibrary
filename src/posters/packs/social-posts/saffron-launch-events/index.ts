import { definePack } from '../../../pack';
import {
  contentCalendar,
  eventDay,
  monthEvents,
  ROSE,
  SAFFRON,
  SKY,
  saveTheDate,
  scheduleList,
  scheduleStory,
} from './posts';

const calendar = contentCalendar(SAFFRON);
const launch = eventDay(SAFFRON);
const month = monthEvents(SAFFRON);
const save = saveTheDate(SAFFRON);
const plan = scheduleList(SAFFRON);

export const saffronLaunchEventsPack = definePack({
  id: 'saffron-launch-events',
  title: 'Saffron Launch Events',
  description:
    'Event day, monthly calendar, save the date and content plan posts in saffron and black, with a story.',
  category: 'social-posts',
  tags: ['event', 'linkedin', 'instagram', 'story'],
  theme: 'dark',

  designs: [
    save,
    launch,
    plan,
    calendar,
    month,
    scheduleStory(SAFFRON),
    eventDay(ROSE),
    monthEvents(SKY),
  ],
});
