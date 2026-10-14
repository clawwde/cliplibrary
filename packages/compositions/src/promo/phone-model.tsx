import type { PromoPhone } from '@cliplibrary/schemas';
import { useMemo } from 'react';
import * as THREE from 'three';
import { AntennaBands, BottomPorts, CameraPlateau, SideButtons } from './phone-details';
import {
  bodyGeometry,
  GLASS_SURFACE,
  glassFaceGeometry,
  glassSlabGeometry,
  PHONE,
  screenGeometry,
} from './phone-geometry';
import { phoneMaterials } from './phone-materials';
import { isTallScreen, screenUrl } from './screen-assets';
import { useTexture } from './use-texture';

const TALL_VISIBLE = 0.5;

const useScreenMap = (phone: PromoPhone, scroll: number): THREE.Texture => {
  const base = useTexture(screenUrl(phone));
  const tall = isTallScreen(phone);
  const map = useMemo(() => (tall ? base.clone() : base), [base, tall]);
  if (tall) {
    map.repeat.set(1, TALL_VISIBLE);
    map.offset.set(0, (1 - TALL_VISIBLE) * (1 - Math.max(0, Math.min(1, scroll))));
    map.needsUpdate = true;
  }
  return map;
};

const SCREEN_LIFT = 0.002;

const ScreenSurface = ({
  phone,
  scroll,
  brightness,
  opacity = 1,
  layer = 0,
}: {
  phone: PromoPhone;
  scroll: number;
  brightness: number;
  opacity?: number;
  layer?: number;
}) => {
  const map = useScreenMap(phone, scroll);
  const tint = useMemo(() => new THREE.Color(brightness, brightness, brightness), [brightness]);
  return (
    <mesh
      position={[0, 0, GLASS_SURFACE + SCREEN_LIFT * (1 + layer)]}
      geometry={screenGeometry()}
      renderOrder={1 + layer}
    >
      <meshBasicMaterial
        map={map}
        color={tint}
        toneMapped={false}
        transparent={opacity < 1}
        opacity={opacity}
        polygonOffset
        polygonOffsetFactor={-2 - layer}
        polygonOffsetUnits={-4 - layer * 2}
      />
    </mesh>
  );
};

export interface PhoneModelProps {
  phone: PromoPhone;
  nextPhone?: PromoPhone | undefined;
  screenMix?: number;
  reflections?: number;
  scroll?: number;
  brightness?: number;
}

export const PhoneModel = ({
  phone,
  nextPhone,
  screenMix = 0,
  reflections = 1,
  scroll = 0,
  brightness = 1,
}: PhoneModelProps) => {
  const materials = phoneMaterials(phone.finish, reflections);
  const glassCenter = PHONE.depth / 2 + PHONE.glassLift;
  return (
    <group>
      <mesh geometry={bodyGeometry()} material={materials.frame} castShadow receiveShadow />
      <mesh
        position={[0, 0, glassCenter]}
        geometry={glassSlabGeometry()}
        material={materials.frontGlass}
      />
      <ScreenSurface phone={phone} scroll={scroll} brightness={brightness} />
      {nextPhone !== undefined && screenMix > 0 ? (
        <ScreenSurface
          phone={nextPhone}
          scroll={scroll}
          brightness={brightness}
          opacity={Math.min(1, screenMix)}
          layer={1}
        />
      ) : null}
      <mesh
        position={[0, 0, GLASS_SURFACE + SCREEN_LIFT * 3]}
        geometry={glassFaceGeometry()}
        material={materials.glare}
        renderOrder={3}
      />
      <mesh
        position={[0, 0, -glassCenter]}
        geometry={glassSlabGeometry()}
        material={materials.back}
        castShadow
      />
      <CameraPlateau materials={materials} />
      <SideButtons materials={materials} />
      <AntennaBands materials={materials} />
      <BottomPorts materials={materials} />
    </group>
  );
};
