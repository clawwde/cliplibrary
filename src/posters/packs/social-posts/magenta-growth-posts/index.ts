import { definePack, LANDSCAPE } from '../../../pack';
import { coverMosaic, customizePage, ideasGrid } from './listing';
import { brandPage, howItWorksPage, readyPage } from './listing-more';
import { brandTrust, closeTo, EMERALD, gotMail, MAGENTA, moreEyes, tearOffNote } from './posts';
import { dontCheck, reviewWall, stopCreating, toggleBoost, unscramble } from './posts-more';

const EYES = moreEyes(MAGENTA);
const TRUST = brandTrust(MAGENTA);
const NOTE = tearOffNote(MAGENTA);
const MAIL = gotMail(MAGENTA);
const CLOSE = closeTo(MAGENTA);
const SCRAMBLE = unscramble(MAGENTA);
const TOGGLES = toggleBoost(MAGENTA);
const COMMENTS = dontCheck(MAGENTA);
const REVIEW = reviewWall(MAGENTA);
const STOP = stopCreating(MAGENTA);

export const magentaGrowthPostsPack = definePack({
  id: 'magenta-growth-posts',
  title: 'Magenta Growth Posts',
  description:
    'Engagement-driving small business posts in magenta, ink and cream, from quizzes and reviews to newsletter calls.',
  category: 'social-posts',
  tags: ['small-business', 'instagram', 'linkedin', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverMosaic([
      MAIL,
      TRUST,
      EYES,
      NOTE,
      COMMENTS,
      STOP,
      SCRAMBLE,
      TOGGLES,
      CLOSE,
      REVIEW,
      EYES,
      REVIEW,
      TRUST,
      MAIL,
      NOTE,
    ]),
    ideasGrid(
      {
        title: '10 Engaging Social Media\nContent Post Ideas',
        subtitle: 'Made for feed posts on every major network',
      },
      [NOTE, MAIL, CLOSE, SCRAMBLE, TOGGLES, EYES, COMMENTS, REVIEW, STOP, TRUST],
    ),
    customizePage([TOGGLES, toggleBoost(EMERALD)], [REVIEW, reviewWall(EMERALD)]),
    readyPage(COMMENTS, NOTE),
    howItWorksPage(
      [
        'Instant access right after checkout',
        'Edit text, colours and branding in your browser',
        'Download and post on every channel',
      ],
      'No design skills needed: works in the free built-in editor.',
    ),
    brandPage({ folder: 'Growth Kit', size: '24.6 MB', brandA: 'Brightwave', brandB: 'Studio' }, [
      TOGGLES,
      STOP,
      NOTE,
      REVIEW,
      EYES,
      MAIL,
      TRUST,
      COMMENTS,
      SCRAMBLE,
      CLOSE,
    ]),
  ],
});
