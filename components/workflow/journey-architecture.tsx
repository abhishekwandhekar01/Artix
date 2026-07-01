"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { patientJourney } from "@/lib/constants";
import { WaveDivider } from "@/components/ui/wave-divider";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { cn } from "@/lib/utils";
import { journeyImages } from "@/lib/images";

const JOURNEY_IMAGES = journeyImages;
const FALLBACK_IMAGE = JOURNEY_IMAGES.doctorFemale;

function StepIcon({ name }: { name: string }) {
  const I = (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Circle;
  return <I className="h-4 w-4" />;
}

function JourneyImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  );
}

export function JourneyArchitecture() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { handleNavClick } = useAnchorScroll();
  const current = patientJourney[active];
  const total = patientJourney.length;

  const goTo = useCallback((index: number) => {
    setActive((index + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const imageSrc = JOURNEY_IMAGES[current.imageKey] || FALLBACK_IMAGE;

  return (
    <section id="workflow" className="relative overflow-hidden bg-text">
      <FloatingShapes variant="dark" />
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url(${JOURNEY_IMAGES.consultation})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 via-text/92 to-primary-dark/95" />

      <div className="container-wide relative z-10 section-padding">
        {/* Header */}
        <div className="mb-8 text-center lg:mb-12">
          <span className="eyebrow-light">Patient Journey Architecture</span>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            One Platform. Every Step From Registration to Follow-Up.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
            ARTiX maps your entire IVF patient lifecycle — connecting reception, doctors,
            embryologists, billing, and leadership in one intelligent cloud architecture.
          </p>
        </div>

        {/* Top pagination flow */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={prev}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Previous step"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex-1 min-w-0 px-1 py-2">
              <div className="flex min-w-max items-center justify-center gap-0 overflow-x-auto px-2 pb-1 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {patientJourney.map((step, i) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className={cn(
                        "group relative flex flex-col items-center gap-1.5 px-0.5 py-1 transition-all",
                        active === i ? "opacity-100" : "opacity-70 hover:opacity-100"
                      )}
                      aria-label={step.title}
                      aria-current={active === i ? "step" : undefined}
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all sm:h-10 sm:w-10",
                          i <= active
                            ? "gradient-brand text-white shadow-lg shadow-primary/30"
                            : "border border-white/25 bg-white/10 text-white/60",
                          active === i && "ring-2 ring-inset ring-accent shadow-[0_0_14px_rgba(245,177,42,0.45)]"
                        )}
                      >
                        {active === i ? <StepIcon name={step.icon} /> : step.step}
                      </span>
                      <span
                        className={cn(
                          "hidden max-w-[72px] truncate text-center text-[9px] font-semibold leading-tight sm:block",
                          active === i ? "text-accent" : "text-white/50"
                        )}
                      >
                        {step.title.split(" ")[0]}
                      </span>
                    </button>
                    {i < total - 1 && (
                      <div className="relative mx-0.5 h-0.5 w-4 overflow-hidden rounded-full bg-white/15 sm:w-6">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-accent"
                          animate={{ width: i < active ? "100%" : "0%" }}
                          transition={{ duration: 0.35 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={next}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Next step"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-accent to-primary-light"
              animate={{ width: `${((active + 1) / total) * 100}%` }}
              transition={{ duration: 0.45 }}
            />
          </div>
          <p className="mt-2 text-center text-xs font-medium text-white/50">
            Step {active + 1} of {total} · {current.title}
          </p>
        </div>

        <div
          className="grid gap-6 lg:grid-cols-12 lg:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Step list — no scroll, compact grid */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary-light">
                Journey Steps
              </p>
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1">
                {patientJourney.map((step, i) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => goTo(i)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all",
                      active === i
                        ? "bg-white/15 shadow-md ring-1 ring-white/20"
                        : "hover:bg-white/8"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold",
                        active === i
                          ? "gradient-brand text-white"
                          : "bg-white/10 text-white/55"
                      )}
                    >
                      {active === i ? <StepIcon name={step.icon} /> : step.step}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-xs font-semibold",
                          active === i ? "text-white" : "text-white/65"
                        )}
                      >
                        {step.title}
                      </span>
                      <span className="block truncate text-[10px] text-primary-light/80">
                        {step.module}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active step detail + image */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
              >
                {/* Image — clear, bright, no heavy overlay */}
                <div className="relative h-56 sm:h-72 lg:h-80">
                  <JourneyImage src={imageSrc} alt={current.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-lg bg-accent px-3 py-1 text-xs font-bold text-text shadow-md">
                      Step {current.step} of {total}
                    </span>
                  </div>
                  <div className="absolute right-4 top-4">
                    <span className="rounded-lg bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      {current.module}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-extrabold text-white drop-shadow-md sm:text-2xl">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <p className="leading-relaxed text-white/80">{current.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-primary-light/30 bg-primary/25 px-4 py-2.5 text-sm font-semibold text-primary-light">
                    <StepIcon name={current.icon} />
                    {current.highlight}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button variant="accent" size="lg" asChild>
            <Link href="/#demo" onClick={(e) => handleNavClick(e, "/#demo")}>
              See Journey Live in Demo <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            asChild
          >
            <Link href="/modules">Explore All Modules</Link>
          </Button>
        </div>
      </div>

      <WaveDivider color="background" height="sm" />
    </section>
  );
}
