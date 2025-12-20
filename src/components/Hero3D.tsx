import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, shape, color }: { position: [number, number, number], shape: string, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {shape === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
        {shape === 'box' && <boxGeometry args={[0.8, 0.8, 0.8]} />}
        {shape === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 100]} />}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number],
        scale: Math.random() * 0.05 + 0.02,
      });
    }
    return temp;
  }, []);

  return (
    <>
      {particles.map((particle, i) => (
        <Sphere key={i} position={particle.position} args={[particle.scale, 8, 8]}>
          <meshStandardMaterial color="#d4c5ad" emissive="#d4c5ad" emissiveIntensity={0.3} />
        </Sphere>
      ))}
    </>
  );
};

const Scene3D = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = mouse.y * 0.1;
      groupRef.current.rotation.y = mouse.x * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c4ae91" />
      
      <FloatingShape position={[-2, 1, 0]} shape="sphere" color="#d4c5ad" />
      <FloatingShape position={[2, -1, -2]} shape="box" color="#c4ae91" />
      <FloatingShape position={[0, 2, -1]} shape="torus" color="#b69978" />
      <FloatingShape position={[-1.5, -1.5, 1]} shape="sphere" color="#e8dfd0" />
      
      <ParticleField />
    </group>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="!absolute !inset-0"
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
