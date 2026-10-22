import { definePack, LANDSCAPE } from '../../../pack';
import {
  coverPage,
  deliverablesPage,
  editablePage,
  type ListingStyle,
  showcasePage,
} from '../plum-proof-reviews/listing';
import { bonusPage, brandPage, howItWorksPage } from '../plum-proof-reviews/listing-more';
import { AZURE, closeTo, dontSkip, FUCHSIA, wordBoxes } from './posts';
import { expertsFolder, gotMail, pollStory } from './posts-more';

const STYLE: ListingStyle = {
  background: '#070b18',
  text: '#ffffff',
  muted: '#aab6d6',
  ink: AZURE.ink,
  brand: AZURE.brand,
  brandText: '#ffffff',
  highlight: AZURE.accent,
  strip: '#eef2fb',
  folderFrom: '#93c5fd',
  folderTo: '#2f6bff',
  badgeFrom: '#22d3ee',
  badgeTo: '#7c3aed',
  head: 'Outfit',
  body: 'DM Sans',
};

const WORDS = wordBoxes(AZURE);
const CLOSE = closeTo(AZURE);
const MAIL = gotMail(AZURE);
const SKIP = dontSkip(AZURE);
const FOLDER = expertsFolder(AZURE);

export const azureCommentMagnetsPack = definePack({
  id: 'azure-comment-magnets',
  title: 'Azure Comment Magnets',
  description:
    'Comment-driving engagement posts for tiny businesses in electric blue, ink and white, with a poll story.',
  category: 'social-posts',
  tags: ['small-business', 'instagram', 'quiz', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverPage(
      STYLE,
      {
        title: 'Get Comments',
        lead: 'Tiny Business',
        accent: 'Growth',
        count: '5 premium social posts + a story layout',
        bonus: 'A FREE BONUS IS INSIDE  →  KEEP SWIPING',
      },
      [WORDS, CLOSE, FOLDER, SKIP, MAIL, MAIL, WORDS, SKIP, CLOSE, WORDS],
      WORDS,
    ),
    showcasePage(
      STYLE,
      {
        glowWord: 'Posts',
        title: 'That Spark Replies',
        subtitle: 'Finished layouts, tuned to start conversations',
      },
      [FOLDER, SKIP, WORDS, CLOSE, MAIL],
    ),
    deliverablesPage(
      STYLE,
      { title: 'Ready-to-post content.', posts: '5', stories: '1', storyLabel: 'Poll story' },
      CLOSE,
      pollStory(AZURE),
    ),
    editablePage(STYLE, [
      [FOLDER, expertsFolder(FUCHSIA)],
      [SKIP, dontSkip(FUCHSIA)],
    ]),
    howItWorksPage(STYLE, {
      title: 'How it works?',
      steps: [
        'Instant access right after checkout',
        'Swap the prompts, photos and colours',
        'Download, post and watch the replies',
      ],
      note: 'No design skills needed: everything runs in the built-in editor.',
    }),
    bonusPage(STYLE, {
      offers: [
        'Buy one pack, pick a second one free.*',
        'Just send us a note after checkout.',
        'LIMITED TIME: the offer closes soon',
      ],
      brandA: 'Brightdock',
      brandB: 'Studio',
      note: '*The second pack must be the same price or lower.',
      face: 'man-portrait-3',
    }),
    brandPage(
      STYLE,
      {
        folder: 'Reply Kit',
        size: '14.9 MB',
        brandA: 'Brightdock',
        brandB: 'Studio',
        tagline: 'More than a template',
      },
      [FOLDER, CLOSE, MAIL, SKIP, WORDS],
    ),
  ],
});
