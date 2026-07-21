"use client";

import dynamic from "next/dynamic";

const ParticleFieldImpl = dynamic(
  () => import("@/components/fx/ParticleField").then((m) => ({ default: m.ParticleField })),
  { ssr: false },
);

export function DynamicParticleField({ className }: { className?: string }) {
  return <ParticleFieldImpl className={className} />;
}
