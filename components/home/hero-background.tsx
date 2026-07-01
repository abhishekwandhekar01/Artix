"use client";

import { useEffect, useRef } from "react";
import { SafeImage } from "@/components/ui/safe-image";
import { heroVideoSrc, images } from "@/lib/constants";

export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      void video.play().catch(() => undefined);
    };

    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <SafeImage
        src={images.heroDoctor}
        fallbackSrc={images.hero}
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={images.heroDoctor}
        className="hero-video-bg absolute inset-0 h-full w-full object-cover"
      >
        <source src={heroVideoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-background/92 via-background/78 to-primary/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_40%,rgba(31,138,158,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_85%_20%,rgba(245,177,42,0.08),transparent)]" />
    </div>
  );
}
