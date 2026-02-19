"use client";

import { useRef, useState } from "react";
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
          color={hovered ? "#8B5CF6" : "#2F6BFF"}
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.6}
          roughness={0.2}
          emissive={hovered ? "#4C1D95" : "#1E3A8A"}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 h-screen w-full bg-bg">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Orb />

        <Environment preset="city" />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={10}
        />
      </Canvas>
    </div>
  );
}
