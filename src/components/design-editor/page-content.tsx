'use client';

import type Konva from 'konva';
import type { Ref } from 'react';
import { Group, Layer, Rect, Stage } from 'react-konva';
import type { DesignElement, Page } from '@/design';
import { type ElementInteraction, ElementNode } from './element-node';
import { konvaFill } from './konva-fill';

export const PAGE_BACKGROUND_NAME = 'page-background';

interface PageContentProps {
  page: Page;
  width: number;
  height: number;
  fontsVersion: number;
  editingId?: string | null;
  interactionFor?: (element: DesignElement) => ElementInteraction;
}

const elementKey = (element: DesignElement, fontsVersion: number): string =>
  element.type === 'text' ? `${element.id}-${fontsVersion}` : element.id;

export const PageContent = ({
  page,
  width,
  height,
  fontsVersion,
  editingId = null,
  interactionFor,
}: PageContentProps) => (
  <Group clipX={0} clipY={0} clipWidth={width} clipHeight={height}>
    <Rect
      name={PAGE_BACKGROUND_NAME}
      width={width}
      height={height}
      listening={interactionFor !== undefined}
      {...konvaFill(page.background, width, height)}
    />
    {page.elements.map((element) => (
      <ElementNode
        key={elementKey(element, fontsVersion)}
        element={element}
        editingText={element.id === editingId}
        {...(interactionFor === undefined ? {} : { interaction: interactionFor(element) })}
      />
    ))}
  </Group>
);

interface PageStageProps {
  page: Page;
  width: number;
  height: number;
  scale: number;
  fontsVersion: number;
  stageRef?: Ref<Konva.Stage>;
}

export const PageStage = ({
  page,
  width,
  height,
  scale,
  fontsVersion,
  stageRef,
}: PageStageProps) => (
  <Stage
    {...(stageRef === undefined ? {} : { ref: stageRef })}
    width={width * scale}
    height={height * scale}
    scaleX={scale}
    scaleY={scale}
    listening={false}
  >
    <Layer listening={false}>
      <PageContent page={page} width={width} height={height} fontsVersion={fontsVersion} />
    </Layer>
  </Stage>
);
