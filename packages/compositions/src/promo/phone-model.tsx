import type { PromoPhone } from '@cliplibrary/schemas';
import { useMemo } from 'react';
import * as THREE from 'three';
import { AntennaBands, BottomPorts, CameraPlateau, SideButtons } from './phone-details';
import {
  bodyGeometry,
  frontGlassGeometry,
  PHONE,
  roundedPlane,
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

const ScreenSurface = ({
  phone,
  scroll,
  brightness,
}: {
  phone: PromoPhone;
  scroll: number;
  brightness: number;
}) => {
  const map = useScreenMap(phone, scroll);
  const tint = useMemo(() => new THREE.Color(brightness, brightness, brightness), [brightness]);
  return (
    <mesh position={[0, 0, PHONE.depth / 2 + 0.0012]} geometry={screenGeometry()}>
      <meshBasicMaterial map={map} color={tint} toneMapped={false} />
    </mesh>
  );
};

export interface PhoneModelProps {
  phone: PromoPhone;
  reflections?: number;
  scroll?: number;
  brightness?: number;
}

export const PhoneModel = ({
  phone,
  reflections = 1,
  scroll = 0,
  brightness = 1,
}: PhoneModelProps) => {
  const materials = phoneMaterials(phone.finish, reflections);
  const backGlass = roundedPlane(PHONE.width - 0.03, PHONE.height - 0.03, PHONE.radius - 0.015);
  return (
    <group>
      <mesh geometry={bodyGeometry()} material={materials.frame} castShadow receiveShadow />
      <mesh
        position={[0, 0, PHONE.depth / 2 + 0.0006]}
        geometry={frontGlassGeometry()}
        material={materials.frontGlass}
      />
      <ScreenSurface phone={phone} scroll={scroll} brightness={brightness} />
      <mesh
        position={[0, 0, PHONE.depth / 2 + 0.002]}
        geometry={frontGlassGeometry()}
        material={materials.glare}
      />
      <mesh
        position={[0, 0, -PHONE.depth / 2 - 0.0006]}
        rotation={[0, Math.PI, 0]}
        geometry={backGlass}
        material={materials.back}
      />
      <CameraPlateau materials={materials} />
      <SideButtons materials={materials} />
      <AntennaBands materials={materials} />
      <BottomPorts materials={materials} />
    </group>
  );
};
