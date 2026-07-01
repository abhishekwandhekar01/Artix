"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const handleMove = (e: MouseEvent) => {
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]"
      style={{
        background:
          "radial-gradient(circle, rgba(31,138,158,0.4) 0%, rgba(245,177,42,0.1) 50%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
