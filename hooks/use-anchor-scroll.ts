"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

const HEADER_OFFSET = 88;

export function useAnchorScroll() {
  const router = useRouter();

  const scrollToSection = useCallback((hash: string) => {
    const id = hash.replace(/^#/, "");

    if (!id) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const element = document.getElementById(id);

    if (!element) return;

    const headerOffset =
      window.innerWidth < 640 ? 72 : HEADER_OFFSET;

    const top =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, []);

  const handleNavClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string
    ) => {
      if (!href.includes("#")) return;

      const [path, hash] = href.split("#");
      const targetPath = path || "/";

      const isSamePage =
        targetPath === window.location.pathname;

      if (isSamePage && hash) {
        e.preventDefault();

        scrollToSection(`#${hash}`);

        window.history.replaceState(
          null,
          "",
          `#${hash}`
        );
      } else if (hash) {
        e.preventDefault();
        router.push(`${targetPath}#${hash}`);
      }
    },
    [router, scrollToSection]
  );

  return {
    scrollToSection,
    handleNavClick,
  };
}