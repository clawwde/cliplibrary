import { path } from '../../../kit';

export const trail = (
  data: string,
  x: number,
  y: number,
  width: number,
  height: number,
  stroke: string,
  strokeWidth: number,
  dashed = false,
) =>
  path(
    data,
    x,
    y,
    width,
    height,
    'rgba(0,0,0,0)',
    { width, height },
    {
      stroke,
      strokeWidth,
      dashed,
      name: 'Line',
    },
  );
