import { definePack } from '../../../pack';
import { audiencePulse, inNumbers, lateNight, onAirNightly, thankYou } from './posts';
import {
  countdown,
  liveQa,
  meetTheHost,
  tuneIn,
  tuneInStory,
  weeklyAfter,
  weeklyBefore,
} from './posts-more';

const POSTS = [
  onAirNightly,
  thankYou,
  lateNight,
  audiencePulse,
  meetTheHost,
  countdown,
  inNumbers,
  tuneIn,
  liveQa,
];

const FEED = [...POSTS, weeklyBefore];

export const nightSignalPodcastPack = definePack({
  id: 'night-signal-podcast',
  title: 'Night Signal Podcast',
  description:
    'Episode drops, host intros, listener stats and live Q&A posts for a podcast or radio show in midnight indigo and amber.',
  category: 'social-posts',
  tags: ['podcast', 'instagram', 'story', 'stats'],
  theme: 'dark',

  designs: [
    ...POSTS,
    audiencePulse,
    onAirNightly,
    thankYou,
    lateNight,
    inNumbers,
    countdown,
    tuneIn,
    liveQa,
    meetTheHost,
    weeklyBefore,
    weeklyAfter,
    tuneInStory,
    ...FEED,
  ],
});
