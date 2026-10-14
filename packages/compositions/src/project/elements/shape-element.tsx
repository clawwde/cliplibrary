import type { ShapeElement } from '@cliplibrary/project';

export const ShapeElementView = ({ element }: { element: ShapeElement }) => (
  <div
    style={{
      width: 480,
      height: 480,
      backgroundColor: element.color,
      borderRadius: element.kind === 'ellipse' ? '50%' : 32,
    }}
  />
);
