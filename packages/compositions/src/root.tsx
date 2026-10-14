import {
  getClipMeta,
  notificationStackDefaults,
  notificationStackSchema,
  odometerLedgerDefaults,
  odometerLedgerSchema,
  orbitCardsDefaults,
  orbitCardsSchema,
  productDemoDefaults,
  productDemoSchema,
  slicedHeadlineDefaults,
  slicedHeadlineSchema,
  splitFlapDefaults,
  splitFlapSchema,
} from '@cliplibrary/schemas';
import { Composition } from 'remotion';
import { NotificationStack } from './scenes/notification-stack';
import { OdometerLedger } from './scenes/odometer-ledger';
import { OrbitCards } from './scenes/orbit-cards';
import { ProductDemo } from './scenes/product-demo';
import { SlicedHeadline } from './scenes/sliced-headline';
import { SplitFlap } from './scenes/split-flap';

const frameFor = (id: Parameters<typeof getClipMeta>[0]) => {
  const meta = getClipMeta(id);
  return {
    durationInFrames: meta.durationInFrames,
    fps: meta.fps,
    width: meta.width,
    height: meta.height,
  };
};

export const RemotionRoot = () => (
  <>
    <Composition
      id="orbit-cards"
      component={OrbitCards}
      schema={orbitCardsSchema}
      defaultProps={orbitCardsDefaults}
      {...frameFor('orbit-cards')}
    />
    <Composition
      id="odometer-ledger"
      component={OdometerLedger}
      schema={odometerLedgerSchema}
      defaultProps={odometerLedgerDefaults}
      {...frameFor('odometer-ledger')}
    />
    <Composition
      id="sliced-headline"
      component={SlicedHeadline}
      schema={slicedHeadlineSchema}
      defaultProps={slicedHeadlineDefaults}
      {...frameFor('sliced-headline')}
    />
    <Composition
      id="notification-stack"
      component={NotificationStack}
      schema={notificationStackSchema}
      defaultProps={notificationStackDefaults}
      {...frameFor('notification-stack')}
    />
    <Composition
      id="split-flap"
      component={SplitFlap}
      schema={splitFlapSchema}
      defaultProps={splitFlapDefaults}
      {...frameFor('split-flap')}
    />
    <Composition
      id="product-demo"
      component={ProductDemo}
      schema={productDemoSchema}
      defaultProps={productDemoDefaults}
      {...frameFor('product-demo')}
    />
  </>
);
