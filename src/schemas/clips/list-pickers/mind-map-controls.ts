import { defineControls } from '../../control-layout';
import { LOOK, MOTION } from '../../control-presets';
import type { MindMapProps } from './mind-map';

export const mindMapControls = defineControls<MindMapProps>({
  sections: [
    {
      title: 'Text',
      fields: [
        { path: 'root.title', label: 'Main topic' },
        { path: 'root.subtitle', label: 'Main topic subtitle' },
        {
          path: 'nodes',
          label: 'Branches',
          hint: 'The topics that scroll along the arc, looping when they run out',
          items: { title: 'Title', subtitle: 'Subtitle' },
        },
        { path: 'font', label: 'Font' },
        {
          link: ['type.ink', 'type.subtitleInk', 'style.iconColor'],
          label: 'Text color',
          hint: 'Titles, subtitles and sparkle icons together',
        },
      ],
      more: [
        { path: 'weight', label: 'Font weight', hint: 'Subtitles use one step lighter' },
        { path: 'type.rootTitle', label: 'Main topic title size' },
        { path: 'type.rootSubtitle', label: 'Main topic subtitle size' },
        { path: 'type.title', label: 'Branch title size' },
        { path: 'type.subtitle', label: 'Branch subtitle size' },
        { path: 'type.ink', label: 'Title color' },
        { path: 'type.subtitleInk', label: 'Subtitle color' },
      ],
    },
    {
      title: 'Scroll',
      fields: [
        {
          path: 'timing.interval',
          label: 'Time per branch',
          hint: 'Frames from one scroll step to the next',
        },
        {
          path: 'timing.moveFrames',
          label: 'Scroll step length',
          hint: 'In frames, capped at the time per branch',
        },
        { path: 'timing.delay', label: 'Start delay', hint: 'Frames before the first scroll' },
        {
          path: 'style.activeScale',
          label: 'Lit branch zoom',
          hint: 'How much the branch in the middle grows',
        },
      ],
      more: [
        {
          path: 'timing.start',
          label: 'First lit branch',
          hint: 'Which branch starts in the middle, 0 is the first in the list',
        },
        {
          path: 'style.sideFade',
          label: 'Dim other branches',
          hint: 'Higher fades the branches away from the middle more',
        },
        {
          path: 'style.reach',
          label: 'Visible branches',
          hint: 'How many branches on each side of the lit one stay visible before fading out',
        },
        {
          path: 'entrance.frames',
          label: 'Intro length',
          hint: 'Frames for the topics to rise in and the lines to draw',
        },
        {
          path: 'entrance.stagger',
          label: 'Intro stagger',
          hint: 'Frames between each branch rising in, outward from the middle',
        },
      ],
    },
    {
      title: 'Pills',
      fields: [
        {
          link: ['style.rootFill', 'style.activeFill'],
          label: 'Highlight fill',
          hint: 'Main topic and the lit branch',
        },
        { path: 'style.nodeFill', label: 'Branch fill' },
        { path: 'style.border', label: 'Border color' },
        { path: 'style.showIcon', label: 'Show sparkle icons' },
      ],
      more: [
        { path: 'style.rootFill', label: 'Main topic fill' },
        { path: 'style.activeFill', label: 'Lit branch fill' },
        { path: 'style.nodeOpacity', label: 'Branch fill opacity' },
        { path: 'style.activeOpacity', label: 'Lit branch fill opacity' },
        { path: 'style.shadow', label: 'Shadow strength' },
        { path: 'style.shadowColor', label: 'Shadow color' },
        { path: 'style.iconColor', label: 'Sparkle icon color' },
        {
          path: 'layout.padding',
          label: 'Pill padding',
          hint: 'The main topic gets a little more',
        },
      ],
    },
    {
      title: 'Arc',
      fields: [
        {
          path: 'lines.color',
          label: 'Line color',
          hint: 'The dashed arc and the line from the main topic',
        },
        {
          path: 'layout.pitch',
          label: 'Branch spacing',
          hint: 'Distance between branches along the arc, in pixels',
        },
        { path: 'layout.radius', label: 'Arc radius', hint: 'Higher flattens the arc' },
      ],
      more: [
        { path: 'lines.width', label: 'Line width', hint: 'In pixels' },
        { path: 'lines.opacity', label: 'Line opacity' },
        { path: 'lines.dash', label: 'Dash length', hint: 'Arc only, in pixels' },
        { path: 'lines.gap', label: 'Dash gap', hint: 'Arc only, in pixels' },
        {
          path: 'layout.anchor',
          label: 'Arc attach point',
          hint: 'How far into each branch the arc passes, as a share of its width',
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        {
          path: 'layout.rootX',
          label: 'Main topic position',
          hint: 'Pixels from the left edge',
        },
        {
          path: 'layout.arcX',
          label: 'Arc position',
          hint: 'Pixels from the left edge to where the lit branch sits',
        },
        { path: 'layout.centerY', label: 'Vertical center', hint: 'Pixels from the top' },
      ],
    },
    {
      title: 'Background',
      fields: [
        LOOK.showBackdrop,
        LOOK.background,
        {
          path: 'aura.blobs',
          label: 'Color glows',
          hint: 'Soft blobs of color over the background, positions in percent of the frame',
          items: {
            color: 'Color',
            x: 'Horizontal position',
            y: 'Vertical position',
            size: 'Size',
            strength: 'Strength',
          },
        },
      ],
      more: [
        LOOK.backgroundEdge,
        { path: 'aura.drift', label: 'Glow drift', hint: 'How much the glows wander' },
        LOOK.spotlight,
        LOOK.grain,
        LOOK.liveGrain,
        LOOK.paper,
        LOOK.paperLine,
        LOOK.paperSpacing,
        LOOK.paperMargin,
        { path: 'look.accent', label: 'Margin line color' },
      ],
    },
    {
      title: 'Motion',
      fields: [MOTION.enter, MOTION.exit, MOTION.speed],
      more: [MOTION.enterFrames, MOTION.exitFrames],
    },
  ],
  hidden: ['look.ink', 'look.muted', 'motion.float'],
});
