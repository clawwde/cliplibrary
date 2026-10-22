import { group, icon, POST_SIZE, rect, text } from '../../../kit';

export const KEY = {
  forest: '#2f3d33',
  sage: '#7d8f74',
  mist: '#e4e9de',
  cream: '#f7f5ef',
  brass: '#b88a4a',
  ink: '#1f2620',
  grey: '#6b7068',
  white: '#ffffff',
};

export const SERIF = 'Playfair Display';
export const SCRIPT = 'Satisfy';
export const SANS = 'Montserrat';

export const AGENT = {
  name: 'Dana Whitfield',
  role: 'Real Estate Agent',
  phone: '+1 555-018-2240',
  site: 'willowkey.homes',
  mail: 'dana@willowkey.homes',
};

export const { width: W, height: H } = POST_SIZE;

export const footerBar = (y: number, height: number, content: string) =>
  group(
    rect(0, y, W, height, KEY.forest, { name: 'Footer bar' }),
    text(content, 0, y + (height - 34) / 2, W, {
      fontFamily: SERIF,
      fontSize: 30,
      fontWeight: 500,
      fill: KEY.cream,
      align: 'center',
    }),
  );

export const contactRow = (y: number, color: string) =>
  group(
    [AGENT.name, AGENT.site, AGENT.phone].map((item, index) =>
      text(item, 40 + index * 340, y, 320, {
        fontFamily: SANS,
        fontSize: 26,
        fontWeight: 600,
        fill: color,
        align: 'center',
      }),
    ),
  );

export const contactLine = (
  name: 'phone' | 'mail' | 'globe',
  content: string,
  x: number,
  y: number,
  color: string,
) =>
  group(
    icon(name, x, y, 30, color, { strokeWidth: 2.2 }),
    text(content, x + 44, y + 1, 340, {
      fontFamily: SANS,
      fontSize: 26,
      fontWeight: 600,
      fill: color,
    }),
  );
