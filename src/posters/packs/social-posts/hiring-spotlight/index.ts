import { template } from '../../../kit';
import { definePack } from '../../../pack';
import { COBALT, MINI_POSTS, PLUM, POST, spotlightBadge, verticalHiring } from './posts';

export const hiringSpotlightPack = definePack({
  id: 'hiring-spotlight',
  title: 'Hiring Spotlight',
  description:
    'Recruitment, welcome and team spotlight posts in cobalt and sunflower, with matching stories.',
  category: 'social-posts',
  tags: ['hiring', 'instagram', 'small-business', 'photo'],
  theme: 'dark',

  designs: [
    ...MINI_POSTS.map((build) => template(POST.width, POST.height, () => build(COBALT))),
    template(POST.width, POST.height, () => verticalHiring(PLUM)),
    template(POST.width, POST.height, () => spotlightBadge(PLUM)),
  ],
});
