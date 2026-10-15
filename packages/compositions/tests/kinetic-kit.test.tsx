import { describe, expect, it } from 'bun:test';
import { SCRIBBLE_SHAPES } from '@cliplibrary/schemas';
import { renderToStaticMarkup } from 'react-dom/server';
import { easedGradient } from '../src/promo/backdrop';
import { FilmLayer, filmMarks } from '../src/promo/film';
import { glowShadow, withAlpha } from '../src/promo/glow';
import { SCRIBBLE_PATHS, Scribble } from '../src/promo/scribble';
import { land } from '../src/promo/timing';
import { highlightSet, linesOf, normalize, wordsOf } from '../src/promo/words';

const film = {
  color: '#ffffff',
  dust: 0.6,
  hairs: 0.5,
  scratches: 0.4,
  vignette: 0.5,
  gateFrames: 2,
  seed: 3,
};

describe('film marks', () => {
  it('is deterministic for a frame and holds across one gate', () => {
    expect(filmMarks(film, 10, 1920, 1080)).toEqual(filmMarks(film, 10, 1920, 1080));
    expect(filmMarks(film, 10, 1920, 1080)).toEqual(filmMarks(film, 11, 1920, 1080));
  });

  it('draws nothing when every density is zero', () => {
    const empty = filmMarks({ ...film, dust: 0, hairs: 0, scratches: 0 }, 40, 1920, 1080);
    expect(empty.specks).toHaveLength(0);
    expect(empty.strands).toHaveLength(0);
    expect(empty.lines).toHaveLength(0);
  });

  it('keeps dust inside the frame', () => {
    for (let frame = 0; frame < 60; frame++) {
      for (const speck of filmMarks(film, frame, 1920, 1080).specks) {
        expect(speck.x).toBeGreaterThanOrEqual(0);
        expect(speck.x).toBeLessThanOrEqual(1920);
        expect(speck.y).toBeGreaterThanOrEqual(0);
        expect(speck.y).toBeLessThanOrEqual(1080);
      }
    }
  });
});

describe('kinetic text helpers', () => {
  it('splits words and lines and ignores punctuation in highlights', () => {
    expect(wordsOf('  Save.  Plan. Grow. ')).toEqual(['Save.', 'Plan.', 'Grow.']);
    expect(linesOf('Your Money\n\nYour Rules')).toEqual([
      ['Your', 'Money'],
      ['Your', 'Rules'],
    ]);
    expect(highlightSet('Money!').has(normalize('money,'))).toBe(true);
  });

  it('builds a glow from the strength and drops it at zero', () => {
    expect(glowShadow('#ffffff', 0, 100)).toBe('none');
    expect(glowShadow('#ffffff', 1, 100).split('px').length).toBe(4);
    expect(withAlpha('#ff0000', 2)).toContain('100.0%');
  });

  it('lands without creeping under the minimum speed', () => {
    expect(land(0, [0, 30], [80, 0])).toBe(80);
    expect(land(40, [0, 30], [80, 0])).toBe(0);
    let previous = 80;
    for (let frame = 1; frame <= 30; frame++) {
      const value = land(frame, [0, 30], [80, 0]);
      expect(previous - value).toBeGreaterThanOrEqual(0.95);
      previous = value;
    }
  });

  it('has a path for every scribble shape and eases the vignette stops', () => {
    for (const shape of SCRIBBLE_SHAPES) {
      expect(SCRIBBLE_PATHS[shape].startsWith('M')).toBe(true);
    }
    expect(easedGradient('#000000', '#ffffff').split('color-mix').length).toBe(10);
  });
});

describe('kinetic kit markup', () => {
  it('renders film marks and the vignette as svg over the frame', () => {
    const markup = renderToStaticMarkup(
      <FilmLayer {...film} frame={12} width={1920} height={1080} />,
    );
    expect(markup).toContain('<svg');
    expect(markup).toContain('radial-gradient');
  });

  it('hides the scribble until its head passes its tail', () => {
    const hidden = renderToStaticMarkup(
      <Scribble shape="loop" head={0} tail={0} width={800} strokeWidth={3} color="#fff" />,
    );
    const drawn = renderToStaticMarkup(
      <Scribble shape="loop" head={0.6} tail={0.1} width={800} strokeWidth={3} color="#fff" />,
    );
    expect(hidden).toContain('opacity="0"');
    expect(drawn).toContain('stroke-dasharray="0.5 2"');
  });
});
