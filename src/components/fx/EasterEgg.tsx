"use client";

import { useEffect } from "react";
import { initEasterEgg } from "@/lib/easter-egg";

export function EasterEgg() {
  useEffect(() => {
    initEasterEgg();
  }, []);

  return null;
}
