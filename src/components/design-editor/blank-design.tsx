'use client';

import { useMemo } from 'react';
import { createDesign, DESIGN_FORMATS, findDesignFormat } from '@/design';
import { DesignEditorClient } from './design-editor-client';

export const BlankDesign = ({ formatId }: { formatId: string }) => {
  const format = findDesignFormat(formatId) ?? DESIGN_FORMATS[0];
  const design = useMemo(
    () =>
      createDesign({
        title: `Untitled ${format.label.toLowerCase()}`,
        width: format.width,
        height: format.height,
      }),
    [format],
  );
  return <DesignEditorClient initialDesign={design} backHref="/" initialPanel="elements" />;
};
