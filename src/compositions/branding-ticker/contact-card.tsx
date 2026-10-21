import { Globe, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import type { BrandingIsTickerProps } from '@/schemas';
import { roundedFont } from '../promo/fonts';
import { smooth, tween } from '../promo/timing';
import { BrandLabel, BrandMark } from './brand-mark';
import { buttonFont, tickerFont } from './fonts';

type Card = BrandingIsTickerProps['card'];

const ICON_STROKE = 1.25;

const ContactRow = ({
  card,
  top,
  icon,
  children,
}: {
  card: Card;
  top: number;
  icon: ReactNode;
  children: string;
}) => (
  <div
    style={{
      position: 'absolute',
      left: card.rowsX,
      top: top - card.iconSize / 2,
      height: card.iconSize,
      display: 'flex',
      alignItems: 'center',
      gap: card.iconSize * 0.47,
    }}
  >
    {icon}
    <span
      style={{
        fontFamily: roundedFont,
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

const PhoneBadge = ({ card }: { card: Card }) => (
  <div
    style={{
      width: card.iconSize,
      height: card.iconSize,
      borderRadius: '50%',
      border: `${(card.iconSize / 24) * ICON_STROKE}px solid ${card.accent}`,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Phone
      size={card.iconSize * 0.52}
      color={card.accent}
      strokeWidth={ICON_STROKE * 1.5}
      absoluteStrokeWidth={false}
    />
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
  const waveIn = tween(
    frame,
    [card.logoStart, card.logoStart + card.logoFrames * 0.7],
    [0, 1],
    smooth,
  );
  const labelIn = tween(
    frame,
    [card.logoStart + card.logoFrames * 0.3, card.logoStart + card.logoFrames],
    [0, 1],
    smooth,
  );
  const wipe = tween(
    frame,
    [card.buttonStart, card.buttonStart + card.buttonFrames],
    [-card.buttonFeather, 100],
    (t) => t,
  );
  const reveal = `linear-gradient(90deg, #000 ${wipe.toFixed(3)}%, transparent ${(wipe + card.buttonFeather).toFixed(3)}%)`;
  return (
    <AbsoluteFill style={{ background: card.background }}>
      <div
        style={{
          position: 'absolute',
          left: card.logoX - card.logoSize / 2,
          top: card.logoY - card.logoSize / 2,
          width: card.logoSize,
        }}
      >
        <BrandMark
          size={card.logoSize}
          disc={card.accent}
          discDeep={card.accentDeep}
          wave="#ffffff"
          draw={waveIn}
          discOpacity={logoIn}
        />
        <div
          style={{
            opacity: labelIn,
            marginLeft: card.logoSize * 0.02,
            marginTop: -card.nameSize * 0.12,
          }}
        >
          <BrandLabel
            kicker={kicker}
            name={name}
            size={card.nameSize}
            color={card.text}
            font={tickerFont}
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: card.buttonX - card.buttonWidth / 2,
          top: card.buttonY - card.buttonHeight / 2,
          width: card.buttonWidth,
          height: card.buttonHeight,
          borderRadius: card.buttonRadius,
          background: card.accent,
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: buttonFont,
          fontWeight: 600,
          fontSize: card.buttonSize,
          whiteSpace: 'nowrap',
          maskImage: reveal,
          WebkitMaskImage: reveal,
        }}
      >
        {card.button}
      </div>
      <ContactRow
        card={card}
        top={card.rowsY}
        icon={<Globe size={card.iconSize} color={card.accent} strokeWidth={ICON_STROKE} />}
      >
        {card.website}
      </ContactRow>
      <ContactRow card={card} top={card.rowsY + card.rowGap} icon={<PhoneBadge card={card} />}>
        {card.phone}
      </ContactRow>
    </AbsoluteFill>
  );
};
