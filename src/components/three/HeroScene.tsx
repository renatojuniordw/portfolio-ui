"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useFrame((state) => {
    if (meshRef.current) {
      // Rotação contínua
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.002;

      // Seguir o mouse (suavemente)
      const targetX = state.pointer.x * 2;
      const targetY = state.pointer.y * 2;

      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetX,
        0.05,
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        0.05,
      );
    }
  });

  // Cores dinâmicas baseadas no tema
  const baseColor = isDark ? "#7C3AED" : "#2563EB"; // Roxo no dark, Azul no light
  const emissiveColor = isDark ? "#4C1D95" : "#1E40AF";

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere
        ref={meshRef}
        args={[1.2, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <MeshDistortMaterial
          color={hovered ? "#EC4899" : baseColor}
          speed={hovered ? 5 : 2}
          distort={0.3}
          radius={1.2}
          metalness={0.3}
          roughness={0.2}
          emissive={hovered ? "#BE185D" : emissiveColor}
          emissiveIntensity={0.6}
        />
      </Sphere>
    </Float>
  );
}

export function HeroScene() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="absolute inset-0 -z-10 h-screen w-full bg-bg transition-colors duration-300">
      <Suspense fallback={<div className="w-full h-full bg-bg" />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={isDark ? 0.8 : 1.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={isDark ? 1.5 : 2}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <Orb />

          <Environment preset="city" />
          <ContactShadows
            position={[0, -2, 0]}
            opacity={isDark ? 0.4 : 0.2}
            scale={10}
            blur={2}
            far={10}
          />
        </Canvas>
      </Suspense>
      {/* Overlay gradiente adaptável */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--bg),0)_0%,rgba(var(--bg),0.8)_100%)] pointer-events-none" />
    </div>
  );
}
