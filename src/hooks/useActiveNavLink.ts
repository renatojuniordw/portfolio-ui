"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

export function useActiveNavLink() {
  const pathname = usePathname();
  const activeHash = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("hashchange", onStoreChange);
      window.addEventListener("popstate", onStoreChange);
      return () => {
        window.removeEventListener("hashchange", onStoreChange);
        window.removeEventListener("popstate", onStoreChange);
      };
    },
    () => window.location.hash,
    () => "",
  );

  function isActive(href: string): boolean {
    const [itemPath, itemHash] = href.split("#");
    if (itemHash) return pathname === itemPath && activeHash === `#${itemHash}`;
    if (href === "/") return pathname === "/" && (!activeHash || activeHash === "#");
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  }

  return { isActive };
}
