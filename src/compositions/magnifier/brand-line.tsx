import type { MagnifierCaptionProps } from '@/schemas';

export const BrandLine = ({
  brand,
  font,
}: {
  brand: MagnifierCaptionProps['brand'];
  font: string;
}) => {
  const mark = brand.size * 0.9;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: brand.y - brand.size * 0.6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: brand.size * 0.32,
        fontFamily: font,
        fontSize: brand.size,
        fontWeight: 500,
        color: brand.color,
        lineHeight: 1.2,
      }}
    >
      <svg width={mark} height={mark} viewBox="0 0 40 40" aria-hidden="true">
        <circle cx={20} cy={20} r={17} fill="none" stroke={brand.mark} strokeWidth={3.2} />
        <circle cx={20} cy={20} r={7} fill={brand.mark} />
      </svg>
      <span>{brand.url}</span>
    </div>
  );
};
