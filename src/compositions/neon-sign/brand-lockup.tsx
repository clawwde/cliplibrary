import type { NeonSignFlickerProps } from '@/schemas';
import { didoneFont, roundedFont } from '../promo/fonts';
import { urlFont } from './fonts';

export const BrandLockup = ({
  name,
  line,
  brand,
}: {
  name: string;
  line: string;
  brand: NeonSignFlickerProps['brand'];
}) => (
  <div
    style={{
      position: 'absolute',
      right: brand.right,
      top: brand.top,
      display: 'flex',
      alignItems: 'stretch',
      gap: brand.size * 0.14,
      color: brand.color,
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <span
        style={{
          fontFamily: didoneFont,
          fontWeight: 500,
          fontSize: brand.size,
          lineHeight: 1,
          letterSpacing: '-0.01em',
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: didoneFont,
          fontSize: brand.size * 0.27,
          lineHeight: 1.1,
          marginTop: brand.size * 0.02,
        }}
      >
        {line}
      </span>
    </div>
    <div style={{ position: 'relative', width: Math.max(1.5, brand.size * 0.028) }}>
      <div
        style={{
          position: 'absolute',
          inset: `${-brand.size * 0.08}px 0 ${-brand.size * 0.04}px 0`,
          background: brand.color,
        }}
      />
      <span
        style={{
          position: 'absolute',
          left: brand.size * 0.08,
          top: -brand.size * 0.08,
          fontFamily: roundedFont,
          fontWeight: 600,
          fontSize: brand.size * 0.2,
          lineHeight: 1,
        }}
      >
        TM
      </span>
    </div>
  </div>
);

export const Website = ({
  url,
  website,
}: {
  url: string;
  website: NeonSignFlickerProps['website'];
}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: website.bottom,
      textAlign: 'center',
      fontFamily: urlFont,
      fontWeight: 500,
      fontSize: website.size,
      letterSpacing: `${website.tracking}em`,
      lineHeight: 1,
      color: website.color,
    }}
  >
    {url}
  </div>
);
