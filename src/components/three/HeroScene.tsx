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
import * as THREE from "three";

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <MeshDistortMaterial
          color={hovered ? "#7C3AED" : "#2563EB"}
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.2}
          roughness={0.2}
          emissive={hovered ? "#4C1D95" : "#1E40AF"}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 h-screen w-full bg-white">
      <Suspense fallback={<div className="w-full h-full bg-white" />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={1.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <pointLight position={[-10, -10, -10]} intensity={1} />

          <Orb />

          <Environment preset="city" />
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.2}
            scale={10}
            blur={2}
            far={10}
          />
        </Canvas>
      </Suspense>
      {/* Overlay gradiente suave mais sutil para o tema claro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
