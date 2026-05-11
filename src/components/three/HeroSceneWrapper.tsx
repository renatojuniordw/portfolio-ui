"use client";

import dynamic from "next/dynamic";
import { Component, ReactNode } from "react";

const HeroSceneInternal = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  { ssr: false },
);

class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="absolute inset-0 bg-bg" aria-hidden="true" />;
    }
    return this.props.children;
  }
}

export function HeroScene() {
  return (
    <SceneErrorBoundary>
      <HeroSceneInternal />
    </SceneErrorBoundary>
  );
}
