"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

const HEADER_OFFSET = 88;

export function useAnchorScroll() {
  const router = useRouter();

  const scrollToSection = useCallback((hash: string) => {
    const id = hash.replace(/^#/, "");
    if (!id) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.includes("#")) return;

      const [path, hash] = href.split("#");
      const targetPath = path || "/";
      const isSamePage = targetPath === window.location.pathname;

      if (isSamePage && hash) {
        e.preventDefault();
        scrollToSection(`#${hash}`);
        window.history.pushState(null, "", `#${hash}`);
      } else if (hash && !isSamePage) {
        e.preventDefault();
        router.push(`${targetPath}#${hash}`);
      }
    },
    [scrollToSection, router]
  );

  return { scrollToSection, handleNavClick };
}
