import type { ShapeElement } from '@cliplibrary/project';

export const ShapeElementView = ({ element }: { element: ShapeElement }) => (
  <div
    style={{
      width: element.width,
      height: element.height,
      backgroundColor: element.color,
      borderRadius: element.kind === 'ellipse' ? '50%' : element.radius,
    }}
  />
);
