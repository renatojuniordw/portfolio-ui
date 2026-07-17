"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className,
  as = "button",
  href,
  target,
  rel,
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  };

  const Tag = as;

  return (
    <div
      ref={ref}
      className="inline-block transition-transform duration-200 ease-out will-change-transform"
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        {as === "a" ? (
          <a
            href={href}
            target={target}
            rel={rel}
            onClick={onClick}
            aria-label={ariaLabel}
            className={className}
          >
            {children}
          </a>
        ) : (
          <button
            onClick={onClick}
            aria-label={ariaLabel}
            className={className}
          >
            {children}
          </button>
        )}
      </motion.div>
    </div>
  );
}
