import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

type TypingModelProps = {
  isDark: boolean;
  scale: number;
  opacity: number;
  position: [number, number, number];
};

const TypingModel: React.FC<TypingModelProps> = ({ isDark, scale, opacity, position }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/modules/typing.glb');
  const { actions } = useAnimations(animations, scene);

  const baseRotation = useMemo(
    () => new THREE.Euler(0.05, THREE.MathUtils.degToRad(-40) - 0.25, 0),
    []
  );
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const tempStartVec = useMemo(() => new THREE.Vector3(), []);
  const introStartRef = useRef<number | null>(null);
  const introDuration = 3.2;
  const introDelay = 0.2;
  const basePosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const skinnedMesh = useMemo<THREE.SkinnedMesh | null>(() => {
    let found: THREE.SkinnedMesh | null = null;
    scene.traverse((child) => {
      if (found) return;
      if ((child as THREE.SkinnedMesh).isSkinnedMesh) {
        found = child as THREE.SkinnedMesh;
      }
    });
    return found;
  }, [scene]);

  const basePositionRef = useRef<THREE.BufferAttribute | null>(null);
  const introPositionsRef = useRef<Float32Array | null>(null);
  const particleGeometry = useMemo<THREE.BufferGeometry | null>(() => {
    if (!skinnedMesh) return null;
    const positionAttr = skinnedMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
    basePositionRef.current = positionAttr;

    const positions = new Float32Array(positionAttr.count * 3);
    for (let i = 0; i < positionAttr.count; i += 1) {
      positions[i * 3 + 0] = positionAttr.getX(i);
      positions[i * 3 + 1] = positionAttr.getY(i);
      positions[i * 3 + 2] = positionAttr.getZ(i);
    }

    const geometry = new THREE.BufferGeometry();
    const dynamicPosition = new THREE.BufferAttribute(positions, 3);
    dynamicPosition.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', dynamicPosition);
    geometry.computeBoundingSphere();

    const bounds = new THREE.Box3().setFromBufferAttribute(positionAttr);
    const size = new THREE.Vector3();
    bounds.getSize(size);
    const spread = Math.max(size.x, size.y, size.z) * 0.65;
    const center = new THREE.Vector3();
    bounds.getCenter(center);

    const introPositions = new Float32Array(positionAttr.count * 3);
    let seed = 1337;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < positionAttr.count; i += 1) {
      const rx = rand() > 0.5 ? 1 : -1;
      const ry = rand() > 0.5 ? 1 : -1;
      const rz = rand() > 0.5 ? 1 : -1;
      const jitter = (rand() - 0.5) * 0.35 * spread;

      introPositions[i * 3 + 0] = center.x + rx * (size.x * 0.6 + spread) + jitter;
      introPositions[i * 3 + 1] = center.y + ry * (size.y * 0.6 + spread) + jitter;
      introPositions[i * 3 + 2] = center.z + rz * (size.z * 0.6 + spread) + jitter;
    }

    introPositionsRef.current = introPositions;
    return geometry;
  }, [skinnedMesh]);
  const normalizationScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (!Number.isFinite(maxDim) || maxDim === 0) return 1;
    const targetSize = 2.6;
    return targetSize / maxDim;
  }, [scene]);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => {
            material.transparent = true;
            material.opacity = opacity;
            material.needsUpdate = true;
          });
        } else {
          mesh.material.transparent = true;
          mesh.material.opacity = opacity;
          mesh.material.needsUpdate = true;
        }
      }
    });
  }, [scene, opacity]);

  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => {
      if (action) {
        action.reset().fadeIn(0.4).play();
      }
    });

    return () => {
      Object.values(actions).forEach((action) => {
        action?.fadeOut(0.2);
      });
    };
  }, [actions]);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = basePosition.y + Math.sin(t * 0.6) * 0.08;
    groupRef.current.rotation.y = baseRotation.y + Math.sin(t * 0.25) * 0.06 + mouse.x * 0.06;
    groupRef.current.rotation.x = baseRotation.x + Math.sin(t * 0.2) * 0.03 - mouse.y * 0.04;

    if (!skinnedMesh || !particleGeometry || !basePositionRef.current) return;
    if (introStartRef.current === null) {
      introStartRef.current = clock.getElapsedTime();
    }
    const introElapsed = clock.getElapsedTime() - introStartRef.current;
    const introProgress = THREE.MathUtils.clamp(
      (introElapsed - introDelay) / introDuration,
      0,
      1
    );
    const easedIntro = 1 - Math.pow(1 - introProgress, 3);
    const skinnedMeshWithBoneTransform =
      skinnedMesh as THREE.SkinnedMesh & {
        boneTransform: (index: number, target: THREE.Vector3) => THREE.Vector3;
      };
    const positionAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
    const basePositionAttr = basePositionRef.current;
    const introPositions = introPositionsRef.current;

    for (let i = 0; i < basePositionAttr.count; i += 1) {
      tempVec.fromBufferAttribute(basePositionAttr, i);
      skinnedMeshWithBoneTransform.boneTransform(i, tempVec);
      if (introPositions && introProgress < 1) {
        tempStartVec.set(
          introPositions[i * 3 + 0],
          introPositions[i * 3 + 1],
          introPositions[i * 3 + 2]
        );
        tempStartVec.lerp(tempVec, easedIntro);
        positionAttr.setXYZ(i, tempStartVec.x, tempStartVec.y, tempStartVec.z);
      } else {
        positionAttr.setXYZ(i, tempVec.x, tempVec.y, tempVec.z);
      }
    }

    positionAttr.needsUpdate = true;
  });

  const lightBoost = isDark ? 1.08 : 0.98;
  const particleColor = isDark ? '#e4d6bf' : '#c8b29a';
  const particleOpacity = isDark ? 0.35 : 0.24;
  const particleSize = isDark ? 0.012 : 0.01;

  return (
    <group
      ref={groupRef}
      position={basePosition}
      rotation={baseRotation}
      scale={[
        scale * normalizationScale * lightBoost * 2.5,
        scale * normalizationScale * lightBoost * 2.5,
        scale * normalizationScale * lightBoost * 2.5,
      ]}
    >
      {particleGeometry && (
        <points geometry={particleGeometry}>
          <pointsMaterial
            color={particleColor}
            size={particleSize}
            opacity={particleOpacity}
            transparent
            depthWrite={false}
            sizeAttenuation
          />
        </points>
      )}
      <primitive object={scene} visible={false} />
    </group>
  );
};

useGLTF.preload('/modules/typing.glb');

export default TypingModel;
