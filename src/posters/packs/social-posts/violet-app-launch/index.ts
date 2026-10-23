import { definePack } from '../../../pack';
import { SUNSET } from './device';
import {
  ALERTS,
  addsUp,
  downloadApp,
  growth,
  growthStory,
  ideasHappen,
  POSTS,
  textAlerts,
  workspace,
} from './posts';

export const violetAppLaunchPack = definePack({
  id: 'violet-app-launch',
  title: 'Violet App Launch',
  description:
    'Phone mockup posts and stories for a mobile app or tech startup launch in violet and coral.',
  category: 'social-posts',
  tags: ['saas', 'instagram', 'story', 'mockup', 'phone'],
  theme: 'light',

  designs: [
    ...POSTS,
    addsUp,
    downloadApp,
    ideasHappen,
    workspace,
    ALERTS,
    textAlerts(SUNSET),
    growth,
    growthStory,
  ],
});
