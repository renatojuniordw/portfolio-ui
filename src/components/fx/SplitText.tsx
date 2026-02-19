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
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.015,
        delay,
        scrollTrigger: {
          trigger: elRef.current,
          start: "top 95%",
          once: true,
        },
      },
    );

    return () => {
      split.revert();
    };
  }, [delay, text]);

  return (
    <h2
      ref={elRef}
      className={cn("will-change-transform opacity-100", className)}
    >
      {text}
    </h2>
  );
}
