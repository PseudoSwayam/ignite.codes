import React, { Suspense, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import TypingModel from './TypingModel';
import { useTheme } from '../../contexts/ThemeContext';

type SceneContentProps = {
  darkMode: boolean;
};

const SceneContent: React.FC<SceneContentProps> = ({ darkMode }) => {
  const { size } = useThree();

  const config = useMemo(() => {
    const isMobile = size.width < 640;
    const isTablet = size.width >= 640 && size.width < 1024;

    if (isMobile) {
      return {
        hide: true,
        scale: 0.26,
        opacity: 0.38,
        position: [2.0, -1.6, -0.6] as [number, number, number],
      };
    }

    if (isTablet) {
      return {
        hide: false,
        scale: 0.34,
        opacity: 0.55,
        position: [2.2, -1.45, -0.6] as [number, number, number],
      };
    }

    return {
      hide: false,
      scale: 0.45,
      opacity: 0.68,
      position: [2.4, -1.35, -0.6] as [number, number, number],
    };
  }, [size.width]);

  if (config.hide) return null;

  return (
    <group>
      <ambientLight intensity={darkMode ? 0.55 : 0.4} />
      <directionalLight
        position={[4, 6, 6]}
        intensity={darkMode ? 1.1 : 0.85}
        color={darkMode ? new THREE.Color('#f2e9da') : new THREE.Color('#e8dcc8')}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-6, -2, 2]}
        intensity={darkMode ? 0.4 : 0.25}
        color={new THREE.Color('#c9b79a')}
      />
      <pointLight
        position={[0, 2.5, -2]}
        intensity={darkMode ? 0.35 : 0.2}
        color={new THREE.Color('#ffffff')}
      />

      <TypingModel
        isDark={darkMode}
        scale={config.scale}
        opacity={config.opacity}
        position={config.position}
      />
    </group>
  );
};

const HeroScene: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        className="!absolute !inset-0"
        camera={{ position: [0, 0, 7], fov: 36 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        shadows
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <SceneContent darkMode={darkMode} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
