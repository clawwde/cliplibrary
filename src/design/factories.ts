import type { Design, Page } from './design';
import type {
  EllipseElement,
  IconElement,
  ImageElement,
  ImageFilters,
  LineElement,
  PolygonElement,
  RectElement,
  StarElement,
  TextElement,
} from './element';
import type { Fill } from './fill';

export const createDesignId = (prefix: string): string =>
  `${prefix}-${crypto.randomUUID().slice(0, 8)}`;

type Overrides<T> = Partial<Omit<T, 'type'>>;

const base = (prefix: string, name: string) => ({
  id: createDesignId(prefix),
  name,
  x: 0,
  y: 0,
  rotation: 0,
  opacity: 1,
  locked: false,
  hidden: false,
});

export const NO_FILTERS: ImageFilters = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  hue: 0,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  invert: 0,
};

export const createText = (overrides: Overrides<TextElement> = {}): TextElement => ({
  ...base('text', 'Text'),
  type: 'text',
  width: 600,
  text: 'Add a heading',
  fontFamily: 'Inter',
  fontSize: 64,
  fontWeight: 700,
  italic: false,
  underline: false,
  strikethrough: false,
  uppercase: false,
  align: 'left',
  lineHeight: 1.15,
  letterSpacing: 0,
  fill: '#111111',
  stroke: '#000000',
  strokeWidth: 0,
  ...overrides,
});

const stroke = { stroke: '#111111', strokeWidth: 0, dashed: false };

export const createRect = (overrides: Overrides<RectElement> = {}): RectElement => ({
  ...base('rect', 'Rectangle'),
  ...stroke,
  type: 'rect',
  width: 300,
  height: 300,
  fill: '#7c5cff',
  cornerRadius: 0,
  ...overrides,
});

export const createEllipse = (overrides: Overrides<EllipseElement> = {}): EllipseElement => ({
  ...base('ellipse', 'Circle'),
  ...stroke,
  type: 'ellipse',
  width: 300,
  height: 300,
  fill: '#ff8a3d',
  ...overrides,
});

export const createPolygon = (overrides: Overrides<PolygonElement> = {}): PolygonElement => ({
  ...base('polygon', 'Polygon'),
  ...stroke,
  type: 'polygon',
  width: 300,
  height: 300,
  fill: '#22c55e',
  sides: 3,
  ...overrides,
});

export const createStar = (overrides: Overrides<StarElement> = {}): StarElement => ({
  ...base('star', 'Star'),
  ...stroke,
  type: 'star',
  width: 300,
  height: 300,
  fill: '#facc15',
  points: 5,
  innerRatio: 0.45,
  ...overrides,
});

export const createLine = (overrides: Overrides<LineElement> = {}): LineElement => ({
  ...base('line', 'Line'),
  type: 'line',
  width: 400,
  stroke: '#111111',
  strokeWidth: 8,
  dashed: false,
  arrowStart: false,
  arrowEnd: false,
  ...overrides,
});

export const createImage = (overrides: Overrides<ImageElement> = {}): ImageElement => ({
  ...base('image', 'Image'),
  type: 'image',
  width: 500,
  height: 500,
  src: '',
  fit: 'cover',
  cornerRadius: 0,
  flipX: false,
  flipY: false,
  stroke: '#ffffff',
  strokeWidth: 0,
  filters: NO_FILTERS,
  ...overrides,
});

export const createIcon = (overrides: Overrides<IconElement> = {}): IconElement => ({
  ...base('icon', 'Icon'),
  type: 'icon',
  width: 160,
  height: 160,
  icon: 'star',
  color: '#111111',
  strokeWidth: 2,
  ...overrides,
});

export const createPage = (
  background: Fill = '#ffffff',
  elements: Page['elements'] = [],
): Page => ({
  id: createDesignId('page'),
  background,
  elements,
});

export const createDesign = (
  overrides: Partial<Omit<Design, 'pages'>> & { pages?: Page[] } = {},
): Design => ({
  id: createDesignId('design'),
  title: 'Untitled design',
  width: 1080,
  height: 1080,
  pages: [createPage()],
  ...overrides,
});
