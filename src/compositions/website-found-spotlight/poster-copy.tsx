import { AbsoluteFill } from 'remotion';
import type { WebsiteFoundSpotlightProps } from '@/schemas';
import { roundedFont } from '../promo/fonts';
import { DotMark } from './dot-mark';

const lines = (text: string): string[] => text.split('\n');

export const PosterCopy = ({ props }: { props: WebsiteFoundSpotlightProps }) => {
  const { copy, type, palette } = props;
  const contactLine = Math.round(type.contactSize * 1.3);
  return (
    <AbsoluteFill style={{ fontFamily: roundedFont, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: type.insetX - 10, top: type.markTop }}>
        <DotMark
          letter={copy.markLetter}
          size={type.markSize}
          dots={palette.mark}
          frame={palette.highlight}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          right: type.insetX + 18,
          top: type.markTop + 28,
          display: 'flex',
          alignItems: 'stretch',
          gap: 14,
        }}
      >
        <div style={{ width: 3, background: palette.contact }} />
        <div
          style={{
            color: palette.contact,
            fontSize: type.contactSize,
            lineHeight: `${contactLine}px`,
            fontWeight: 500,
          }}
        >
          <div>{copy.email}</div>
          <div>{copy.website}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: type.insetX, top: type.headlineTop }}>
        {lines(copy.headline).map((line) => (
          <div
            key={line}
            style={{
              color: palette.headline,
              fontSize: type.headlineSize,
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              whiteSpace: 'pre',
            }}
          >
            {line}
          </div>
        ))}
        <div
          style={{
            color: palette.highlight,
            fontSize: type.highlightSize,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            marginLeft: -4,
          }}
        >
          {copy.highlight}
        </div>
        <div style={{ marginTop: type.bodySize * 2.3, marginLeft: 8 }}>
          {lines(copy.body).map((line) => (
            <div
              key={line}
              style={{
                color: palette.body,
                fontSize: type.bodySize,
                fontWeight: 500,
                lineHeight: 1.45,
                whiteSpace: 'pre',
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
