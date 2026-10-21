import { AbsoluteFill } from 'remotion';
import type { WebsiteFoundSpotlightProps } from '@/schemas';
import { roundedFont } from '../promo/fonts';
import { CodeTile } from './code-tile';
import { DotMark } from './dot-mark';

type EndCardLook = WebsiteFoundSpotlightProps['endCard'];

const blob = (color: string, x: number, y: number, w: number, h: number, alpha = 1) =>
  `radial-gradient(ellipse ${w}% ${h}% at ${x}% ${y}%, color-mix(in oklab, ${color} ${alpha * 100}%, transparent) 0%, color-mix(in oklab, ${color} ${alpha * 55}%, transparent) 40%, color-mix(in oklab, ${color} ${alpha * 18}%, transparent) 70%, transparent 100%)`;

const backdrop = (card: EndCardLook): string =>
  [
    blob('#ffffff', 48, 46, 60, 34, 0.95),
    blob(card.violet, 52, 80, 95, 12, 0.95),
    blob(card.violet, 18, 84, 50, 9, 0.6),
    blob(card.peach, 95, 10, 70, 40),
    blob(card.peach, 0, 64, 45, 18, 0.7),
    blob(card.lavender, 0, 8, 60, 50),
    `linear-gradient(180deg, ${card.lavender} 0%, #fff6f0 45%, #fbefe9 70%, ${card.lavender} 100%)`,
  ].join(', ');

export const EndCard = ({
  card,
  markLetter,
  highlight,
}: {
  card: EndCardLook;
  markLetter: string;
  highlight: string;
}) => (
  <AbsoluteFill style={{ background: backdrop(card), fontFamily: roundedFont }}>
    <div
      style={{
        position: 'absolute',
        left: 177,
        right: 158,
        top: -40,
        height: 1412,
        borderRadius: 30,
        background: `rgba(255, 252, 250, ${card.cardOpacity})`,
        boxShadow: '0 30px 60px rgba(120, 70, 160, 0.08)',
      }}
    />
    <AbsoluteFill style={{ alignItems: 'center' }}>
      <div style={{ marginTop: 236 }}>
        <DotMark letter={markLetter} size={214} dots={card.brandInk} frame={highlight} />
      </div>
      <div
        style={{
          marginTop: 170,
          textAlign: 'center',
          fontSize: 56,
          fontWeight: 700,
          lineHeight: 1.26,
          letterSpacing: '-0.01em',
        }}
      >
        <div style={{ color: card.ink }}>{card.headline}</div>
        <div style={{ color: card.accent }}>{card.subline}</div>
      </div>
      <div style={{ marginTop: 74 }}>
        <CodeTile
          size={278}
          seed={card.codeSeed}
          frameFrom={`color-mix(in oklab, ${card.accent} 70%, #ffffff)`}
          frameTo={card.accent}
          ink="#111014"
        />
      </div>
      <div style={{ marginTop: 92, fontSize: 40, fontWeight: 700 }}>
        <span style={{ color: card.brandInk }}>{card.brand}</span>{' '}
        <span style={{ color: highlight }}>{card.brandAccent}</span>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 1500,
          width: '100%',
          textAlign: 'center',
          color: card.contactInk,
        }}
      >
        <div style={{ fontSize: 42, fontWeight: 600, letterSpacing: '0.01em' }}>{card.phone}</div>
        <div style={{ marginTop: 34, fontSize: 29, fontWeight: 500, lineHeight: 1.36 }}>
          <div>{card.email}</div>
          <div>{card.website}</div>
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
