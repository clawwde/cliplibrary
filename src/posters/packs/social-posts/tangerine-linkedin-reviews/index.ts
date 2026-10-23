import { definePack } from '../../../pack';
import {
  clientEnvelope,
  clientStory,
  LAGOON,
  newspaper,
  ORCHID,
  photoQuote,
  reviewWord,
  TANGERINE,
  typewriter,
} from './posts';

const word = reviewWord(TANGERINE);
const paper = newspaper(TANGERINE);
const quote = photoQuote(TANGERINE);
const keys = typewriter(TANGERINE);
const envelope = clientEnvelope(TANGERINE);

export const tangerineLinkedinReviewsPack = definePack({
  id: 'tangerine-linkedin-reviews',
  title: 'Tangerine Client Reviews',
  description:
    'Testimonial, press clipping, photo quote and envelope review posts in tangerine and navy, with a story.',
  category: 'social-posts',
  tags: ['review', 'linkedin', 'photo', 'small-business'],
  theme: 'dark',

  designs: [
    word,
    envelope,
    quote,
    paper,
    keys,
    clientStory(TANGERINE),
    reviewWord(LAGOON),
    clientEnvelope(ORCHID),
  ],
});
