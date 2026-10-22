import type { TextRingsProps } from '@/schemas';
import { smooth, TAU, tween } from '../promo/timing';

const NARROW = new Set([...'·iljI!|.,:;\'"`']);
const SLIM = new Set([...'frt()[]{}-/']);
const WIDE = new Set([...'mwMW@']);
const SPACE_EM = 0.26;
const MAX_STRETCH = 0.12;
const SEPARATOR_CLEARANCE = 0.35;

const charEm = (character: string): number => {
  if (character === ' ') {
    return SPACE_EM;
  }
  if (NARROW.has(character)) {
    return 0.26;
  }
  if (SLIM.has(character)) {
    return 0.36;
  }
  if (WIDE.has(character)) {
    return 0.86;
  }
  if (character >= 'A' && character <= 'Z') {
    return 0.68;
  }
  return 0.56;
};

const textEm = (text: string, tracking: number, weight: number): number => {
  const characters = [...text];
  const boldness = 1 + (weight - 500) / 8000;
  return (
    characters.reduce((sum, character) => sum + charEm(character), 0) * boldness +
    Math.max(0, characters.length - 1) * tracking
  );
};

type RingWord = { slot: number; offset: number; length: number };

export type Ring = {
  index: number;
  radius: number;
  size: number;
  angle: number;
  opacity: number;
  weight: number;
  words: RingWord[];
  separators: { slot: number; offset: number }[];
};

export const ringField = (
  { words, rings, spin }: TextRingsProps,
  frame: number,
  edgeRadius: number,
): Ring[] => {
  const text = words.text.trim();
  if (text.length === 0) {
    return [];
  }
  const growth = Math.log(rings.spacing) / rings.interval;
  const reach = Math.max(edgeRadius, rings.spawnRadius * 1.01);
  const power = Math.log(words.outerSize / words.innerSize) / Math.log(reach / rings.spawnRadius);
  const sizeAt = (radius: number) => words.innerSize * (radius / rings.spawnRadius) ** power;
  const wordEm = textEm(text, words.tracking, words.weight);
  const separator = words.separator.trim();
  const separatorEm = separator.length > 0 ? textEm(separator, words.tracking, words.weight) : 0;
  const unitEm = wordEm + separatorEm + 2 * words.gap;
  const middle = Math.sqrt(rings.spawnRadius * reach);
  const count = Math.max(1, Math.round((TAU * middle) / (unitEm * sizeAt(middle))));
  const glide = spin.speed / (rings.spawnRadius * growth);
  return Array.from({ length: rings.count }, (_, index) => {
    const age = frame - (rings.firstAt + index * rings.interval);
    const radius = rings.spawnRadius * Math.exp(growth * Math.max(0, age));
    const size = sizeAt(radius);
    const circumference = TAU * radius;
    const slot = circumference / count;
    const stretch = Math.min(1 + MAX_STRETCH, Math.max(1 - MAX_STRETCH, slot / (unitEm * size)));
    const room = slot - (separatorEm + SEPARATOR_CLEARANCE) * size;
    const turning = spin.clockwise ? 1 : -1;
    const direction = spin.alternate && index % 2 === 1 ? -turning : turning;
    const spun = glide * (1 - Math.exp(-growth * Math.max(0, age)));
    return {
      index,
      radius,
      size,
      angle: index * spin.offset + (direction * spun * 360) / TAU,
      opacity:
        (age < 0 ? 0 : tween(age, [0, rings.fadeFrames], [0, 1], smooth)) *
        (index % 2 === 1 ? rings.oddOpacity : 1),
      weight: index % 2 === 1 ? words.oddWeight : words.weight,
      words: Array.from({ length: count }, (_place, word) => ({
        slot: word,
        offset: circumference * 0.5 + word * slot,
        length: Math.max(size, Math.min(room, wordEm * size * stretch)),
      })),
      separators:
        separator.length > 0
          ? Array.from({ length: count }, (_place, word) => ({
              slot: word,
              offset: circumference * 0.5 + (word + 0.5) * slot,
            }))
          : [],
    };
  }).filter((ring) => ring.opacity > 0 && ring.radius - ring.size < edgeRadius);
};

export const ringPath = (radius: number): string => {
  const lap = `A ${radius} ${radius} 0 1 1 ${-radius} 0 A ${radius} ${radius} 0 1 1 ${radius} 0`;
  return `M ${radius} 0 ${lap} ${lap}`;
};
