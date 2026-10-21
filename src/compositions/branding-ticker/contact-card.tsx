import { ArrowRight, Globe, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import type { BrandingIsTickerProps } from '@/schemas';
import { pixelTween, settle, smooth, tween } from '../promo/timing';
import { BrandLabel, BrandMark } from './brand-mark';
import { tickerFont } from './fonts';

type Card = BrandingIsTickerProps['card'];

const ICON_STROKE = 1.25;

const LABEL_FEATHER = 30;

const ROW_RISE = 28;

const ROW_FRAMES = 18;

const IconBadge = ({ card, children }: { card: Card; children: ReactNode }) => (
  <div
    style={{
      width: card.iconSize,
      height: card.iconSize,
      borderRadius: card.iconSize * 0.3,
      background: `color-mix(in oklab, ${card.accent} 14%, transparent)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

const ContactRow = ({
  card,
  frame,
  start,
  icon,
  children,
}: {
  card: Card;
  frame: number;
  start: number;
  icon: ReactNode;
  children: string;
}) => {
  const range: [number, number] = [start, start + ROW_FRAMES];
  return (
    <div
      style={{
        height: card.iconSize,
        display: 'flex',
        alignItems: 'center',
        gap: card.iconSize * 0.36,
        opacity: tween(frame, range, [0, 1], settle),
        transform: `translateY(${pixelTween(frame, range, [ROW_RISE, 0], settle)}px)`,
      }}
    >
      <IconBadge card={card}>{icon}</IconBadge>
      <span
        style={{
          fontFamily: tickerFont,
          fontWeight: 600,
          fontSize: card.rowSize,
          color: card.text,
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
    </div>
  );
};

const CenteredColumn = ({ x, top, children }: { x: number; top: number; children: ReactNode }) => (
  <div
    style={{
      position: 'absolute',
      left: x - 1080,
      width: 2160,
      top,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {children}
  </div>
);

export const ContactCard = ({
  card,
  kicker,
  name,
  frame,
}: {
  card: Card;
  kicker: string;
  name: string;
  frame: number;
}) => {
  const logoIn = tween(frame, [card.logoStart, card.logoStart + card.logoFrames], [0, 1], smooth);
  const glyphIn = tween(
    frame,
    [card.logoStart + card.logoFrames * 0.2, card.logoStart + card.logoFrames],
    [0, 1],
    smooth,
  );
  const labelEdge = tween(
    frame,
    [card.logoStart + card.logoFrames * 0.3, card.logoStart + card.logoFrames * 1.2],
    [-LABEL_FEATHER, 100],
    (t) => t,
  );
  const labelReveal = `linear-gradient(90deg, #000 ${labelEdge.toFixed(3)}%, transparent ${(labelEdge + LABEL_FEATHER).toFixed(3)}%)`;
  const wipe = tween(
    frame,
    [card.buttonStart, card.buttonStart + card.buttonFrames],
    [-card.buttonFeather, 100],
    (t) => t,
  );
  const reveal = `linear-gradient(90deg, #000 ${wipe.toFixed(3)}%, transparent ${(wipe + card.buttonFeather).toFixed(3)}%)`;
  const iconSize = card.iconSize * 0.5;
  return (
    <AbsoluteFill style={{ background: card.background }}>
      <CenteredColumn x={card.logoX} top={card.logoY - card.logoSize / 2}>
        <BrandMark
          size={card.logoSize}
          disc={card.accent}
          discDeep={card.accentDeep}
          wave={card.background}
          draw={glyphIn}
          discOpacity={logoIn}
        />
        <div
          style={{
            maskImage: labelReveal,
            WebkitMaskImage: labelReveal,
            marginTop: card.nameSize * 0.6,
          }}
        >
          <BrandLabel
            kicker={kicker}
            name={name}
            size={card.nameSize}
            color={card.text}
            font={tickerFont}
            align="center"
          />
        </div>
      </CenteredColumn>
      <div
        style={{
          position: 'absolute',
          left: card.buttonX - card.buttonWidth / 2,
          top: card.buttonY - card.buttonHeight / 2,
          width: card.buttonWidth,
          height: card.buttonHeight,
          borderRadius: card.buttonRadius,
          background: `linear-gradient(120deg, ${card.accent}, ${card.accentDeep})`,
          color: card.buttonText,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: card.buttonSize * 0.4,
          fontFamily: tickerFont,
          fontWeight: 700,
          fontSize: card.buttonSize,
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap',
          maskImage: reveal,
          WebkitMaskImage: reveal,
        }}
      >
        {card.button}
        <ArrowRight size={card.buttonSize * 0.95} color={card.buttonText} strokeWidth={2.5} />
      </div>
      <CenteredColumn x={card.rowsX} top={card.rowsY - card.iconSize / 2}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: Math.max(0, card.rowGap - card.iconSize),
          }}
        >
          <ContactRow
            card={card}
            frame={frame}
            start={card.rowsStart}
            icon={<Globe size={iconSize} color={card.accent} strokeWidth={ICON_STROKE * 1.6} />}
          >
            {card.website}
          </ContactRow>
          <ContactRow
            card={card}
            frame={frame}
            start={card.rowsStart + card.rowsStagger}
            icon={<Phone size={iconSize} color={card.accent} strokeWidth={ICON_STROKE * 1.6} />}
          >
            {card.phone}
          </ContactRow>
        </div>
      </CenteredColumn>
    </AbsoluteFill>
  );
};
