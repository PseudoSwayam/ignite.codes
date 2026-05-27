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
  const tempDirVec = useMemo(() => new THREE.Vector3(), []);
  const tempOrbitVec = useMemo(() => new THREE.Vector3(), []);
  const tempCurveVec = useMemo(() => new THREE.Vector3(), []);
  const tempCursorVec = useMemo(() => new THREE.Vector3(), []);
  const tempCursorDir = useMemo(() => new THREE.Vector3(), []);
  const introStartRef = useRef<number | null>(null);
  const introDuration = 5.6;
  const introDelay = 0.6;
  const basePosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const reducedMotionRef = useRef(false);
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
  const introPhaseRef = useRef<Float32Array | null>(null);
  const particleSourceIndexRef = useRef<Uint32Array | null>(null);
  const ambientGeometryRef = useRef<THREE.BufferGeometry | null>(null);
  const ambientBaseRef = useRef<Float32Array | null>(null);
  const ambientPhaseRef = useRef<Float32Array | null>(null);
  const particleGeometry = useMemo<THREE.BufferGeometry | null>(() => {
    if (!skinnedMesh) return null;
    const positionAttr = skinnedMesh.geometry.getAttribute('position') as THREE.BufferAttribute;
    basePositionRef.current = positionAttr;

    const vertexCount = positionAttr.count;
    const densityMultiplier = 1.7;
    const particleCount = Math.floor(vertexCount * densityMultiplier);
    const positions = new Float32Array(particleCount * 3);
    const normals = new Float32Array(particleCount * 3);
    const sourceIndices = new Uint32Array(particleCount);
    const normalAttr = skinnedMesh.geometry.getAttribute('normal') as THREE.BufferAttribute;

    let seed = 1337;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const bounds = new THREE.Box3().setFromBufferAttribute(positionAttr);
    const size = new THREE.Vector3();
    bounds.getSize(size);
    const center = new THREE.Vector3();
    bounds.getCenter(center);

    let filled = 0;
    const maxTries = particleCount * 6;
    let tries = 0;
    while (filled < particleCount && tries < maxTries) {
      tries += 1;
      const sourceIndex = Math.floor(rand() * vertexCount);
      const px = positionAttr.getX(sourceIndex);
      const py = positionAttr.getY(sourceIndex);
      const pz = positionAttr.getZ(sourceIndex);

      const yNorm = (py - center.y) / Math.max(size.y, 0.0001);
      const upperBoost = THREE.MathUtils.clamp((yNorm + 0.1) * 1.6, 0, 1);
      const headBoost = THREE.MathUtils.smoothstep(yNorm, 0.35, 0.8);
      const shoulderBand = 1 - Math.abs(yNorm - 0.18) * 3.2;
      const shoulderBoost = THREE.MathUtils.clamp(shoulderBand, 0, 1);
      const armBoost = THREE.MathUtils.smoothstep(Math.abs(px - center.x) / Math.max(size.x, 0.0001), 0.18, 0.55);

      const radial = Math.sqrt((px - center.x) ** 2 + (pz - center.z) ** 2);
      const outerNorm = radial / Math.max(Math.max(size.x, size.z) * 0.5, 0.0001);
      const shellBoost = THREE.MathUtils.smoothstep(outerNorm, 0.45, 1.0);

      const weight = THREE.MathUtils.clamp(
        0.22 + upperBoost * 0.45 + headBoost * 0.35 + shoulderBoost * 0.3 + armBoost * 0.35 + shellBoost * 0.35,
        0,
        1
      );

      if (rand() <= weight) {
        sourceIndices[filled] = sourceIndex;
        positions[filled * 3 + 0] = px;
        positions[filled * 3 + 1] = py;
        positions[filled * 3 + 2] = pz;
        normals[filled * 3 + 0] = normalAttr.getX(sourceIndex);
        normals[filled * 3 + 1] = normalAttr.getY(sourceIndex);
        normals[filled * 3 + 2] = normalAttr.getZ(sourceIndex);
        filled += 1;
      }
    }

    for (let i = filled; i < particleCount; i += 1) {
      const sourceIndex = Math.floor(rand() * vertexCount);
      sourceIndices[i] = sourceIndex;
      positions[i * 3 + 0] = positionAttr.getX(sourceIndex);
      positions[i * 3 + 1] = positionAttr.getY(sourceIndex);
      positions[i * 3 + 2] = positionAttr.getZ(sourceIndex);
      normals[i * 3 + 0] = normalAttr.getX(sourceIndex);
      normals[i * 3 + 1] = normalAttr.getY(sourceIndex);
      normals[i * 3 + 2] = normalAttr.getZ(sourceIndex);
    }

    const geometry = new THREE.BufferGeometry();
    const dynamicPosition = new THREE.BufferAttribute(positions, 3);
    dynamicPosition.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', dynamicPosition);
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.computeBoundingSphere();

    const spread = Math.max(size.x, size.y, size.z) * 1.55;

    const introPositions = new Float32Array(particleCount * 3);
    const introPhases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i += 1) {
      const jitterX = (rand() - 0.5) * spread * 2.0;
      const jitterY = (rand() - 0.5) * spread * 1.6;
      const jitterZ = (rand() - 0.5) * spread * 2.0;
      introPhases[i] = rand() * Math.PI * 2;

      introPositions[i * 3 + 0] = center.x + jitterX;
      introPositions[i * 3 + 1] = center.y + jitterY;
      introPositions[i * 3 + 2] = center.z + jitterZ;
    }

    introPositionsRef.current = introPositions;
    introPhaseRef.current = introPhases;
    particleSourceIndexRef.current = sourceIndices;

    const ambientCount = Math.min(particleCount, 520);
    const ambientPositions = new Float32Array(ambientCount * 3);
    const ambientPhases = new Float32Array(ambientCount);
    for (let i = 0; i < ambientCount; i += 1) {
      const jitterX = (rand() - 0.5) * spread * 2.2;
      const jitterY = (rand() - 0.5) * spread * 1.4;
      const jitterZ = (rand() - 0.5) * spread * 2.2;
      ambientPositions[i * 3 + 0] = center.x + jitterX;
      ambientPositions[i * 3 + 1] = center.y + jitterY;
      ambientPositions[i * 3 + 2] = center.z + jitterZ;
      ambientPhases[i] = rand() * Math.PI * 2;
    }

    const ambientGeometry = new THREE.BufferGeometry();
    const ambientAttr = new THREE.BufferAttribute(ambientPositions, 3);
    ambientAttr.setUsage(THREE.DynamicDrawUsage);
    ambientGeometry.setAttribute('position', ambientAttr);
    ambientGeometry.computeBoundingSphere();
    ambientGeometryRef.current = ambientGeometry;
    ambientBaseRef.current = ambientPositions;
    ambientPhaseRef.current = ambientPhases;

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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const particleMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        uniforms: {
          uColor: { value: new THREE.Color('#f4e8d6') },
          uOpacity: { value: 0.5 },
          uPointSize: { value: 0.012 },
          uDepthNear: { value: 0.6 },
          uDepthRange: { value: 5.5 },
          uFrontBoost: { value: 1.1 },
          uEdgeBoost: { value: 0.22 },
          uEdgeSharpness: { value: 0.2 },
          uTime: { value: 0 },
        },
        vertexShader: /* glsl */`
          uniform float uPointSize;
          uniform float uDepthNear;
          uniform float uDepthRange;
          uniform float uEdgeSharpness;
          varying float vDepth;
          varying float vEdge;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float depth = clamp((-mvPosition.z - uDepthNear) / uDepthRange, 0.0, 1.0);
            vDepth = depth;
            vec3 viewNormal = normalize(normalMatrix * normal);
            vec3 viewDir = normalize(-mvPosition.xyz);
            float edge = 1.0 - abs(dot(viewNormal, viewDir));
            vEdge = smoothstep(0.2, 0.95, edge);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = uPointSize * (1.0 - depth * 0.35) * (1.0 - vEdge * uEdgeSharpness);
          }
        `,
        fragmentShader: /* glsl */`
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uFrontBoost;
          uniform float uEdgeBoost;
          varying float vDepth;
          varying float vEdge;
          void main() {
            vec2 cxy = gl_PointCoord - 0.5;
            float d = length(cxy);
            float mask = smoothstep(0.5, 0.0, d);
            float depthFade = mix(uFrontBoost, 0.35, vDepth);
            float edgeBoost = 1.0 + vEdge * uEdgeBoost;
            float alpha = uOpacity * depthFade * mask * edgeBoost;
            gl_FragColor = vec4(uColor * edgeBoost, alpha);
          }
        `,
      }),
    []
  );

  const ambientMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        uniforms: {
          uColor: { value: new THREE.Color('#d7c4ab') },
          uOpacity: { value: 0.2 },
          uPointSize: { value: 0.006 },
          uDepthNear: { value: 0.8 },
          uDepthRange: { value: 6.5 },
          uFrontBoost: { value: 0.9 },
          uTime: { value: 0 },
        },
        vertexShader: /* glsl */`
          uniform float uPointSize;
          uniform float uDepthNear;
          uniform float uDepthRange;
          varying float vDepth;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float depth = clamp((-mvPosition.z - uDepthNear) / uDepthRange, 0.0, 1.0);
            vDepth = depth;
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = uPointSize * (1.0 - depth * 0.25);
          }
        `,
        fragmentShader: /* glsl */`
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uFrontBoost;
          varying float vDepth;
          void main() {
            vec2 cxy = gl_PointCoord - 0.5;
            float d = length(cxy);
            float mask = smoothstep(0.5, 0.0, d);
            float depthFade = mix(uFrontBoost, 0.25, vDepth);
            float alpha = uOpacity * depthFade * mask;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      }),
    []
  );

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
    const attractProgress = THREE.MathUtils.smoothstep(introProgress, 0.25, 0.7);
    const settleProgress = THREE.MathUtils.smoothstep(introProgress, 0.7, 1.0);
    const orbitStrength = (1 - attractProgress) * 0.85;
    const flowStrength = (1 - introProgress) * 0.6;
    const skinnedMeshWithBoneTransform =
      skinnedMesh as THREE.SkinnedMesh & {
        boneTransform: (index: number, target: THREE.Vector3) => THREE.Vector3;
      };
    const positionAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
    const basePositionAttr = basePositionRef.current;
    const introPositions = introPositionsRef.current;
    const introPhases = introPhaseRef.current;
    const sourceIndices = particleSourceIndexRef.current;
    const cursorX = mouse.x * 1.2;
    const cursorY = mouse.y * 0.9;
    tempCursorVec.set(cursorX, cursorY, 0);

    const particleCount = sourceIndices ? sourceIndices.length : basePositionAttr.count;

    for (let i = 0; i < particleCount; i += 1) {
      const sourceIndex = sourceIndices ? sourceIndices[i] : i;
      tempVec.fromBufferAttribute(basePositionAttr, sourceIndex);
      skinnedMeshWithBoneTransform.boneTransform(sourceIndex, tempVec);
      if (introPositions && introPhases && introProgress < 1) {
        tempStartVec.set(
          introPositions[i * 3 + 0],
          introPositions[i * 3 + 1],
          introPositions[i * 3 + 2]
        );
        tempDirVec.copy(tempVec).sub(tempStartVec);
        const dirLength = tempDirVec.length() + 0.0001;
        tempDirVec.normalize();

        tempOrbitVec.set(-tempDirVec.z, tempDirVec.y * 0.2, tempDirVec.x).normalize();
        const orbitAngle = introPhases[i] + t * 0.6 + (1 - introProgress) * 2.4;
        const orbitRadius = dirLength * orbitStrength * 0.12;
        tempOrbitVec.multiplyScalar(Math.sin(orbitAngle) * orbitRadius);

        const curveAmplitude = dirLength * flowStrength * 0.08;
        tempCurveVec.set(
          Math.sin(introPhases[i] + t * 0.35) * curveAmplitude,
          Math.cos(introPhases[i] * 0.7 + t * 0.25) * curveAmplitude * 0.6,
          Math.sin(introPhases[i] * 1.1 + t * 0.3) * curveAmplitude
        );

        tempStartVec.add(tempOrbitVec).add(tempCurveVec);
        tempStartVec.lerp(tempVec, easedIntro);

        tempCursorDir.copy(tempVec).sub(tempCursorVec);
        const cursorDist = tempCursorDir.length();
        if (cursorDist > 0.0001) {
          tempCursorDir.normalize();
          const cursorInfluence = Math.exp(-cursorDist * 1.6) * 0.04;
          tempStartVec.addScaledVector(tempCursorDir, cursorInfluence);
        }

        if (reducedMotionRef.current) {
          tempStartVec.copy(tempVec);
        }
        positionAttr.setXYZ(i, tempStartVec.x, tempStartVec.y, tempStartVec.z);
      } else {
        positionAttr.setXYZ(i, tempVec.x, tempVec.y, tempVec.z);
      }
    }

    positionAttr.needsUpdate = true;

    particleMaterial.uniforms.uTime.value = t;
    particleMaterial.uniforms.uOpacity.value = opacity * (1.02 + 0.18 * settleProgress);
    particleMaterial.uniforms.uFrontBoost.value = THREE.MathUtils.lerp(1.25, 1.0, settleProgress);
    particleMaterial.uniforms.uPointSize.value = particleSize * (1.05 - settleProgress * 0.1);
    particleMaterial.uniforms.uColor.value.set(isDark ? '#f4e8d6' : '#dbc8b1');
    particleMaterial.uniforms.uEdgeBoost.value = isDark ? 0.28 : 0.22;
    particleMaterial.uniforms.uEdgeSharpness.value = isDark ? 0.24 : 0.2;

    const ambientGeometry = ambientGeometryRef.current;
    const ambientBase = ambientBaseRef.current;
    const ambientPhases = ambientPhaseRef.current;
    if (ambientGeometry && ambientBase && ambientPhases) {
      const ambientAttr = ambientGeometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < ambientPhases.length; i += 1) {
        const baseIndex = i * 3;
        const drift = Math.sin(t * 0.35 + ambientPhases[i]) * 0.08;
        const driftZ = Math.cos(t * 0.3 + ambientPhases[i]) * 0.08;
        ambientAttr.setXYZ(
          i,
          ambientBase[baseIndex + 0] + drift,
          ambientBase[baseIndex + 1] + Math.sin(t * 0.2 + ambientPhases[i]) * 0.05,
          ambientBase[baseIndex + 2] + driftZ
        );
      }
      ambientAttr.needsUpdate = true;
      ambientMaterial.uniforms.uTime.value = t;
      ambientMaterial.uniforms.uOpacity.value = isDark ? 0.2 : 0.12;
      ambientMaterial.uniforms.uColor.value.set(isDark ? '#dccab2' : '#d0bda5');
    }
  });

  const lightBoost = isDark ? 1.08 : 0.98;
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
      {ambientGeometryRef.current && (
        <points geometry={ambientGeometryRef.current} material={ambientMaterial} />
      )}
      {particleGeometry && (
        <points geometry={particleGeometry} material={particleMaterial} />
      )}
      <primitive object={scene} visible={false} />
    </group>
  );
};

useGLTF.preload('/modules/typing.glb');

export default TypingModel;
