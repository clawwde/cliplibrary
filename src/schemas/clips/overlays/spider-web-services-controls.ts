import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { SpiderWebServicesProps } from './spider-web-services';

export const spiderWebServicesControls = defineControls<SpiderWebServicesProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        {
          path: 'services',
          label: 'Services',
          hint: 'One 3D title per camera stop, in order. Screen time is in frames, angles in degrees, spider positions in pixels from the title center. The first spider colors also paint the spider riding the thread',
          items: {
            lines: 'Title',
            holdFrames: 'Screen time',
            tilt: 'Rotation',
            turn: 'Turn sideways',
            lean: 'Lean back',
            swing: 'Swing on arrival',
            spiderBody: 'Spider color',
            spiderMarks: 'Spider markings',
            spiderStartX: 'Spider start X',
            spiderStartY: 'Spider start Y',
            spiderEndX: 'Spider end X',
            spiderEndY: 'Spider end Y',
            spiderTurn: 'Spider heading offset',
            sideWeb: 'Web from the right edge',
            bokeh: 'Bokeh lights',
            seed: 'Cobweb pattern',
          },
        },
        { path: 'intro.headline', label: 'Opening headline' },
        {
          path: 'brand.name',
          label: 'Brand name',
          hint: 'Shown above the opening headline and on the end card',
        },
        {
          path: 'card.statement',
          label: 'End card statement',
          hint: 'The last line is larger and uses the highlight color',
        },
        {
          path: 'card.punch',
          label: 'End card tagline',
          hint: 'Large italic lines under the divider',
        },
        { path: 'brand.url', label: 'Website', hint: 'Shown in the button at the end' },
      ],
      more: [
        { path: 'intro.headlineSize', label: 'Opening headline size' },
        { path: 'intro.x', label: 'Opening text left', hint: 'In pixels' },
        { path: 'intro.y', label: 'Opening text top', hint: 'In pixels' },
        {
          path: 'card.wordmarkSize',
          label: 'End card brand size',
          hint: 'Brand name size in pixels. The hexagon logo scales with it',
        },
        { path: 'card.statementSize', label: 'End card statement size' },
        { path: 'card.punchSize', label: 'End card tagline size' },
        { path: 'card.showSocials', label: 'Show social icons' },
        { path: 'card.showButton', label: 'Show website button' },
      ],
    },
    {
      title: 'Titles',
      fields: [
        { path: 'title.face', label: 'Title face' },
        { path: 'title.side', label: 'Title 3D sides' },
        { path: 'title.depth', label: '3D depth', hint: 'In pixels' },
      ],
      more: [
        {
          path: 'title.faceShade',
          label: 'Title face bottom',
          hint: 'The face fades to this color',
        },
        {
          path: 'title.sideShade',
          label: 'Title 3D sides back',
          hint: 'The sides darken to this color toward the back',
        },
        {
          path: 'title.glint',
          label: 'Glint color',
          hint: 'The light that sweeps across each title',
        },
        { path: 'title.width', label: 'Title width', hint: 'In pixels. Lines scale to fill it' },
        {
          path: 'title.y',
          label: 'Title vertical position',
          hint: 'Pixels from the top of the frame to each title center once the camera stops. Moves the cobwebs and spiders with it',
        },
      ],
    },
    {
      title: 'Spiders and webs',
      fields: [
        {
          path: 'spider.show',
          label: 'Show spiders',
          hint: 'The spider riding the thread and the ones crawling on each title',
        },
        { path: 'spider.size', label: 'Spider size' },
        { link: ['cocoon.color', 'card.web'], label: 'Web color' },
        { path: 'cocoon.opacity', label: 'Cobweb opacity' },
      ],
      more: [
        { path: 'cocoon.color', label: 'Cobweb color' },
        {
          path: 'cocoon.strands',
          label: 'Cobweb density',
          hint: 'Number of loose strands per title',
        },
        { path: 'cocoon.width', label: 'Cobweb width', hint: 'In pixels' },
        { path: 'cocoon.height', label: 'Cobweb height', hint: 'In pixels' },
        { path: 'card.web', label: 'End web color' },
        { path: 'card.dew', label: 'Dew drop color' },
        { path: 'card.webWidth', label: 'End web size', hint: 'In pixels' },
        { path: 'card.webTilt', label: 'End web tilt', hint: 'Degrees it leans back' },
      ],
    },
    {
      title: 'Brand colors',
      fields: [
        {
          link: ['intro.labelColor', 'brand.ink', 'card.ink'],
          label: 'Text color',
          hint: 'Opening brand name and logo, end card brand name, statement and tagline',
        },
        {
          link: ['intro.headlineColor', 'card.highlight', 'card.pill', 'backdrop.bokeh'],
          label: 'Highlight color',
          hint: 'Opening headline, statement highlight, website button and bokeh lights',
        },
        { path: 'brand.mark', label: 'Logo color', hint: 'The hexagon mark on the end card' },
      ],
      more: [
        {
          path: 'intro.labelColor',
          label: 'Opening brand label',
          hint: 'Brand name and hexagon logo above the opening headline',
        },
        { path: 'brand.ink', label: 'End card brand name' },
        { path: 'card.ink', label: 'End card text', hint: 'Statement and tagline' },
        { path: 'intro.headlineColor', label: 'Opening headline color' },
        { path: 'card.highlight', label: 'Statement highlight and divider' },
        { path: 'card.pill', label: 'Website button' },
        { path: 'card.pillShade', label: 'Website button fade', hint: 'Right end of the gradient' },
        { path: 'card.pillInk', label: 'Website button text' },
        {
          path: 'brand.markShade',
          label: 'Logo center',
          hint: 'Inner hexagon of the logo at the opening and on the end card',
        },
        { path: 'card.icons', label: 'Social icons' },
      ],
    },
    {
      title: 'Hand and thread',
      fields: [
        { path: 'intro.glove', label: 'Glove color' },
        { path: 'thread.color', label: 'Thread color' },
        { path: 'intro.handScale', label: 'Hand size' },
      ],
      more: [
        { path: 'intro.gloveShade', label: 'Glove shadow' },
        { path: 'intro.gloveSeam', label: 'Glove stitching' },
        { path: 'intro.cuff', label: 'Cuff color' },
        { path: 'thread.shade', label: 'Thread twist shade' },
        { path: 'thread.width', label: 'Thread thickness', hint: 'In pixels' },
        { path: 'thread.twist', label: 'Twist spacing', hint: 'Pixels between twists' },
        {
          path: 'thread.x',
          label: 'Center line',
          hint: 'Horizontal position in pixels of the hand, thread, titles and end web',
        },
      ],
    },
    {
      title: 'Background',
      fields: [
        { ...LOOK.showBackdrop, hint: 'Off leaves the frame transparent for use as an overlay' },
        { path: 'backdrop.base', label: 'Background' },
        { path: 'backdrop.glow', label: 'Side glows' },
      ],
      more: [
        { path: 'backdrop.glowStrength', label: 'Side glow strength' },
        { path: 'backdrop.top', label: 'Top glow', hint: 'Fades out as the camera moves down' },
        { path: 'backdrop.grid', label: 'Dot grid color' },
        { path: 'backdrop.gridOpacity', label: 'Dot grid strength' },
        { path: 'backdrop.gridSpacing', label: 'Dot grid spacing', hint: 'In pixels' },
        { path: 'backdrop.floor', label: 'End card floor' },
        { path: 'backdrop.floorEdge', label: 'End card floor fade' },
        { path: 'backdrop.bokeh', label: 'Bokeh light color' },
      ],
    },
    {
      title: 'Timing',
      fields: [
        { path: 'timing.panFrames', label: 'Pan length', hint: 'Frames per camera whip' },
        {
          path: 'timing.webDrawFrames',
          label: 'End web draw length',
          hint: 'In frames. It finishes as the camera settles',
        },
        {
          ...MOTION.speed,
          hint: 'Scales the whole animation. The clip length stays the same, so faster ends on a held end card and slower cuts the ending',
        },
      ],
      more: [
        { path: 'timing.handFrames', label: 'Hand drop length', hint: 'In frames' },
        { path: 'timing.threadStart', label: 'Thread drop starts at', hint: 'Frame number' },
        { path: 'timing.threadFrames', label: 'Thread drop length', hint: 'In frames' },
        {
          path: 'timing.panDistance',
          label: 'Pan distance',
          hint: 'Pixels the camera travels between titles',
        },
        {
          path: 'timing.cardDistance',
          label: 'Final pan distance',
          hint: 'Pixels from the last title down to the end card',
        },
        {
          path: 'timing.motionBlur',
          label: 'Motion blur',
          hint: 'Blur during camera whips. 0 turns it off',
        },
        {
          path: 'timing.socialsDelay',
          label: 'Icons and button delay',
          hint: 'Frames after the camera settles on the end card',
        },
        { path: 'timing.pillFrames', label: 'Button reveal length', hint: 'In frames' },
        MOTION.enter,
        MOTION.enterFrames,
        MOTION.exit,
        MOTION.exitFrames,
      ],
    },
  ],
  hidden: [
    'look.background',
    'look.backgroundEdge',
    'look.ink',
    'look.muted',
    'look.accent',
    'look.grain',
    'look.liveGrain',
    'look.spotlight',
    'look.paper',
    'look.paperLine',
    'look.paperSpacing',
    'look.paperMargin',
    'motion.float',
  ],
});
