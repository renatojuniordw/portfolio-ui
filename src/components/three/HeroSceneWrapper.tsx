"use client";

import dynamic from "next/dynamic";

const HeroSceneInternal = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  { ssr: false },
);

export function HeroScene() {
  return <HeroSceneInternal />;
}
