import type { ClipId } from '@cliplibrary/schemas';
import type { FC, ReactElement } from 'react';

export type SceneModule = {
  id: ClipId;
  component: FC<never>;
  render: (key: string) => ReactElement;
};
