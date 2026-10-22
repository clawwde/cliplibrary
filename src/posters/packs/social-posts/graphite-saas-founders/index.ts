import { definePack, LANDSCAPE } from '../../../pack';
import { PAGES } from './pages';

export const graphiteSaasFoundersPack = definePack({
  id: 'graphite-saas-founders',
  title: 'Graphite SaaS Founders',
  description:
    'Product demo, analytics, testimonial, event and lead posts for SaaS and AI startups in graphite and electric lime.',
  category: 'social-posts',
  tags: ['saas', 'ai', 'instagram', 'linkedin', 'review'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: PAGES,
});
