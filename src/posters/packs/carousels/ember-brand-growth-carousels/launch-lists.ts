import { arrow, checklist, POST_SIZE, rect, template, text } from '../../../kit';

const { width: W, height: H } = POST_SIZE;
const FONT = 'Manrope';
const EMBER = '#ff5a1f';
const NIGHT = '#0c0c0e';
const PAPER = '#ffffff';

const outlineWord = (word: string, y: number) =>
  text(word, 0, y, W, {
    fontFamily: FONT,
    fontSize: 250,
    fontWeight: 800,
    fill: 'rgba(0,0,0,0)',
    stroke: EMBER,
    strokeWidth: 4,
    align: 'center',
    letterSpacing: 8,
    lineHeight: 1,
  });

export const launchCover = template(W, H, () => [
  rect(0, 0, W, H, PAPER, { name: 'Background' }),
  outlineWord('KEEP', 50),
  outlineWord('GOING', 1050),
  text('emberline.studio', 0, 420, W, {
    fontFamily: FONT,
    fontSize: 34,
    fontWeight: 600,
    fill: '#52525b',
    align: 'center',
  }),
  text('Thinking about', 0, 490, W, {
    fontFamily: FONT,
    fontSize: 58,
    fontWeight: 400,
    fill: NIGHT,
    align: 'center',
  }),
  text('launching your', 0, 570, W, {
    fontFamily: FONT,
    fontSize: 80,
    fontWeight: 800,
    fill: NIGHT,
    align: 'center',
  }),
  rect(210, 690, 660, 124, EMBER, { name: 'Pill', cornerRadius: 62 }),
  text('side hustle?', 210, 708, 660, {
    fontFamily: FONT,
    fontSize: 74,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
  }),
  arrow(460, 910, 160, NIGHT, 8),
]);

const topBar = () => rect(90, 150, 170, 22, EMBER, { name: 'Accent bar', cornerRadius: 11 });

export const dosAndDonts = template(W, H, () => [
  rect(0, 0, W, H, NIGHT, { name: 'Background' }),
  topBar(),
  text("Do's &\nDon'ts", 0, 230, W, {
    fontFamily: FONT,
    fontSize: 124,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
    lineHeight: 1,
  }),
  text('Early traction beats a perfect logo.', 60, 520, 960, {
    fontFamily: FONT,
    fontSize: 40,
    fontWeight: 700,
    fill: '#ffffff',
    align: 'center',
  }),
  rect(195, 650, 150, 72, EMBER, { name: 'Do tag', cornerRadius: 8 }),
  text('DO:', 195, 664, 150, {
    fontFamily: FONT,
    fontSize: 40,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
  }),
  rect(630, 650, 200, 72, EMBER, { name: 'Dont tag', cornerRadius: 8 }),
  text("DON'T:", 630, 664, 200, {
    fontFamily: FONT,
    fontSize: 40,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
  }),
  ['Talk to customers', 'Pre-sell early', 'Solve one problem'].map((item, index) =>
    text(item, 60, 770 + index * 76, 420, {
      fontFamily: FONT,
      fontSize: 36,
      fontWeight: 500,
      fill: '#e4e4e7',
      align: 'center',
    }),
  ),
  ['Polish for months', 'Assume demand', 'Build extra features'].map((item, index) =>
    text(item, 520, 770 + index * 76, 420, {
      fontFamily: FONT,
      fontSize: 36,
      fontWeight: 500,
      fill: '#e4e4e7',
      align: 'center',
    }),
  ),
  arrow(840, 1190, 150, '#ffffff', 8),
]);

const checklistSlide = (dark: boolean, title: string, note: string, items: readonly string[]) =>
  template(W, H, () => [
    rect(0, 0, W, H, dark ? NIGHT : PAPER, { name: 'Background' }),
    topBar(),
    text(title, 0, 230, W, {
      fontFamily: FONT,
      fontSize: 112,
      fontWeight: 800,
      fill: dark ? '#ffffff' : NIGHT,
      align: 'center',
      lineHeight: 1,
    }),
    text(note, 90, 490, 900, {
      fontFamily: FONT,
      fontSize: 40,
      fontWeight: 700,
      fill: dark ? '#ffb08f' : '#c2410c',
      align: 'center',
      lineHeight: 1.3,
    }),
    checklist(items, 200, 660, 760, {
      color: dark ? '#ffffff' : NIGHT,
      iconColor: EMBER,
      fontSize: 42,
      gap: 96,
      fontFamily: FONT,
    }),
    arrow(840, 1190, 150, dark ? '#ffffff' : NIGHT, 8),
  ]);

export const LAUNCH_STEPS = [
  dosAndDonts,
  checklistSlide(
    false,
    'Before You\nLaunch',
    'Tick most of these and you are\ncloser than you think.',
    [
      'A painful problem solved',
      'A clear first customer',
      'One simple offer',
      'Pricing that feels fair',
    ],
  ),
  checklistSlide(
    true,
    'Weekly\nWorkflow',
    'The best founders run a simple\nloop and repeat it every week.',
    ['Batch ideas on Monday', 'Film in one session', 'Edit with templates', 'Post and reply daily'],
  ),
] as const;
