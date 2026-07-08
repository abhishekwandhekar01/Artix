"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SafeImage } from "@/components/ui/safe-image";
import { images } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "Executive Command Center",
    description:
      "Real-time cycles, revenue, appointments & lab throughput.",
    image: images.dashboard,
    device: "desktop" as const,
    stat: "3× faster reporting",
  },
  {
    title: "IVF Cycle Navigator",
    description:
      "Stimulation, retrieval & transfer with alerts and docs.",
    image: images.team,
    device: "tablet" as const,
    stat: "Zero missed steps",
  },
  {
    title: "Mobile Clinical Access",
    description:
      "Records and cycle updates from any clinic-floor device.",
    image: images.technology,
    device: "mobile" as const,
    stat: "Anywhere access",
  },
];

const deviceIcons = {
  desktop: Monitor,
  tablet: Tablet,
  mobile: Smartphone,
};

export function DashboardShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () =>
      setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="dashboard"
      className="relative overflow-hidden bg-text"
    >
      <FloatingShapes variant="dark" />

      <div className="container-wide px-4 sm:px-6 lg:px-8 section-padding">
        <MotionSection>
          <SectionHeader
            light
            eyebrow="Platform Preview"
            title="Designed for Clinical Precision"
            description="Clean interfaces across every device — clarity under pressure."
          />

          <div
            ref={emblaRef}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <div className="flex">
              {slides.map((slide) => {
                const DeviceIcon = deviceIcons[slide.device];

                return (
                  <div
                    key={slide.title}
                    className="min-w-0 flex-[0_0_100%]"
                  >
                    <div className="grid items-center gap-8 p-5 sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-10">
                      {/* Content */}
                      <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-primary-light">
                          <DeviceIcon className="h-3.5 w-3.5" />
                          <span className="capitalize">
                            {slide.device}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                          {slide.title}
                        </h3>

                        <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/70">
                          {slide.description}
                        </p>

                        <span className="mt-5 inline-block rounded-lg bg-accent/20 px-3 py-1.5 text-xs font-bold text-accent">
                          {slide.stat}
                        </span>
                      </div>

                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 premium-shadow">
                        <SafeImage
                          src={slide.image}
                          fallbackSrc={images.dashboard}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          sizes="(max-width:1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={scrollPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === selectedIndex
                      ? "w-7 bg-primary-light"
                      : "w-2 bg-white/25"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </MotionSection>
      </div>

      <WaveDivider color="background" height="sm" />
    </section>
  );
}