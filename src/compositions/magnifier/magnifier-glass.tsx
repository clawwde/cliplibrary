import type { MagnifierCaptionProps } from '@/schemas';
import type { LensPose } from './field';

export const MagnifierGlass = ({
  pose,
  lens,
}: {
  pose: LensPose;
  lens: MagnifierCaptionProps['lens'];
}) => {
  const half = lens.handleWidth / 2;
  return (
    <svg
      width={1080}
      height={1920}
      viewBox="0 0 1080 1920"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
    >
      <g transform={`translate(${pose.x} ${pose.y}) rotate(${pose.angle})`}>
        {lens.handleLength > 0 ? (
          <rect
            x={-half}
            y={lens.radius + lens.rimWidth / 2 + lens.handleGap}
            width={lens.handleWidth}
            height={lens.handleLength}
            rx={half}
            fill={lens.inside}
            stroke={lens.rim}
            strokeWidth={lens.rimWidth}
          />
        ) : null}
        <circle r={lens.radius} fill="none" stroke={lens.rim} strokeWidth={lens.rimWidth} />
      </g>
    </svg>
  );
};
