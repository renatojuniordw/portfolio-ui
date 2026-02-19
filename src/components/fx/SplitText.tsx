"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
};

export function SplitText({ text, className, delay = 0 }: Props) {
  const elRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!elRef.current) return;

    const split = new SplitType(elRef.current, { types: "chars,words" });

    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.02,
        delay,
        scrollTrigger: {
          trigger: elRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => split.revert();
  }, [delay]);

  return (
    <h2 ref={elRef} className={cn("overflow-hidden", className)}>
      {text}
    </h2>
  );
}
