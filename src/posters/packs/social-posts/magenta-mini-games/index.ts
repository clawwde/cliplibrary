import { definePack } from '../../../pack';
import {
  hiddenWords,
  LILAC,
  MAGENTA,
  OCEAN,
  pickNumber,
  quizStory,
  quizTime,
  routeMaze,
  unscramble,
} from './posts';

const mazePost = routeMaze(MAGENTA);
const pick = pickNumber(MAGENTA);
const quiz = quizTime(MAGENTA);
const words = hiddenWords(MAGENTA);
const scramble = unscramble(MAGENTA);

export const magentaMiniGamesPack = definePack({
  id: 'magenta-mini-games',
  title: 'Magenta Mini Games',
  description:
    'Maze, pick-a-number, quiz, hidden word and unscramble engagement posts in magenta and black, with a story.',
  category: 'social-posts',
  tags: ['quiz', 'instagram', 'small-business', 'story'],
  theme: 'dark',

  designs: [
    scramble,
    mazePost,
    words,
    quiz,
    pick,
    quizStory(MAGENTA),
    routeMaze(OCEAN),
    unscramble(LILAC),
  ],
});
