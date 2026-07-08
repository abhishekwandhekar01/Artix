"use client";

import { useState } from "react";
import Image from "next/image";
import { videos } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { YouTubePlayer } from "@/components/ui/youtube-player";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Play, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export function VideoShowcase() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  const current = videos[active];

  const selectVideo = (index: number) => {
    setActive(index);
    setPlaying(true);
  };

  return (
    <section id="videos" className="section-white">
      <div className="container-wide px-4 sm:px-6 lg:px-8 section-padding">
        <MotionSection>
          <SectionHeader
            eyebrow="Product Videos"
            title="See ARTiX Transform Fertility Care"
            description="Watch how clinics streamline operations from consultation to successful outcomes."
          />

          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Main Video */}
            <div className="lg:col-span-3">
              <YouTubePlayer
                key={current.youtubeId}
                videoId={current.youtubeId}
                title={current.title}
                thumbnail={current.thumbnail}
                playing={playing}
                onPlay={() => setPlaying(true)}
              />

              <div className="mt-5 flex gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Video className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-text sm:text-lg">
                    {current.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray">
                    {current.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Playlist */}
            <div className="flex flex-col gap-3 lg:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted sm:text-[11px] sm:tracking-widest">
                Select video
              </p>

              {videos.map((video, i) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => selectVideo(i)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 text-left transition-all",
                    active === i
                      ? "border-primary/30 bg-primary/5 shadow-md"
                      : "border-slate-200 bg-white hover:border-primary/20"
                  )}
                >
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-200 sm:h-16 sm:w-24">
                    <Image
                      src={video.thumbnail}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width:640px) 112px, 96px"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-text/30">
                      <Play className="h-4 w-4 fill-white text-white sm:h-3 sm:w-3" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 py-0.5">
                    <p
                      className={cn(
                        "text-sm font-bold break-words",
                        active === i
                          ? "text-primary"
                          : "text-text"
                      )}
                    >
                      {video.title}
                    </p>

                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray">
                      {video.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </MotionSection>
      </div>

      <WaveDivider color="background" height="sm" />
    </section>
  );
}