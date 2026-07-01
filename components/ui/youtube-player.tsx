"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  className?: string;
  thumbnail?: string;
  playing: boolean;
  onPlay: () => void;
}

function thumbnailUrl(videoId: string, quality: "hqdefault" | "mqdefault" | "sddefault" = "hqdefault") {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}

export function YouTubePlayer({
  videoId,
  title,
  className = "",
  thumbnail,
  playing,
  onPlay,
}: YouTubePlayerProps) {
  const [thumbSrc, setThumbSrc] = useState(thumbnail || thumbnailUrl(videoId));

  useEffect(() => {
    setThumbSrc(thumbnail || thumbnailUrl(videoId));
  }, [videoId, thumbnail]);

  const handleThumbError = () => {
    setThumbSrc((current) => {
      if (current.includes("/mqdefault.")) return thumbnailUrl(videoId, "sddefault");
      if (current.includes("/sddefault.")) return thumbnailUrl(videoId, "hqdefault");
      return thumbnailUrl(videoId, "mqdefault");
    });
  };

  if (!playing) {
    return (
      <button
        type="button"
        onClick={onPlay}
        className={cn(
          "group relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-900 premium-shadow",
          className
        )}
        aria-label={`Play video: ${title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbSrc}
          alt={title}
          onError={handleThumbError}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-text/25 to-text/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/30">
            <div className="absolute inset-0 animate-ping rounded-full bg-white/40 opacity-0 group-hover:opacity-100" />
            <Play className="relative ml-1 h-7 w-7 fill-primary text-primary" />
          </div>
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            Click to play
          </span>
        </div>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-3xl bg-slate-900 premium-shadow",
        className
      )}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
