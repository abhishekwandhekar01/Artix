"use client";

import { useEffect } from "react";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";

export function HashScrollHandler() {
  const { scrollToSection } = useAnchorScroll();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => scrollToSection(hash), 100);
      return () => clearTimeout(timer);
    }
  }, [scrollToSection]);

  return null;
}
