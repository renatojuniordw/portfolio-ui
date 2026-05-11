"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function useActiveNavLink() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    setActiveHash(window.location.hash);
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  function isActive(href: string): boolean {
    const [itemPath, itemHash] = href.split("#");
    if (itemHash) return pathname === itemPath && activeHash === `#${itemHash}`;
    if (href === "/") return pathname === "/" && (!activeHash || activeHash === "#");
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  }

  function onLinkClick(href: string, extra?: () => void) {
    const [, itemHash] = href.split("#");
    setActiveHash(itemHash ? `#${itemHash}` : "");
    extra?.();
  }

  return { isActive, onLinkClick };
}
