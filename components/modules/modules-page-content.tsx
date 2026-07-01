"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { modules } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Users,
  HeartPulse,
  Microscope,
  FileCheck,
  CreditCard,
  BarChart3,
  Play,
  CheckCircle2,
  Shield,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { moduleImages, unsplash } from "@/lib/images";

const MODULE_IMAGES = moduleImages;

const MODULE_ICONS = {
  hospital: Building2,
  "user-master": Users,
  patient: HeartPulse,
  "cycle-navigator": Microscope,
  consent: FileCheck,
  billing: CreditCard,
  reports: BarChart3,
} as const;

const HERO_VIDEOS = [
  "https://videos.pexels.com/video-files/7570252/7570252-hd_1920_1080_25fps.mp4",
  "https://videos.pexels.com/video-files/853179/853179-hd_1920_1080_25fps.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-scientist-working-with-the-microscope-4770-large.mp4",
];

const HERO_IMAGE = unsplash("photo-1516549655169-df83a0774514", 1920);
const HERO_IMAGE_ALT = unsplash("photo-1519494026892-80bbd2d6fd0d", 1920);

const MODULE_HIGHLIGHTS: Record<string, string[]> = {
  hospital: ["Multi-branch configuration", "Appointment & HR management", "Centralized clinic operations"],
  "user-master": ["Role-based access control", "Custom menu permissions", "Secure staff onboarding"],
  patient: ["Digital registration & records", "Insurance & identity capture", "Full treatment history"],
  "cycle-navigator": ["Stimulation to transfer tracking", "Embryology lab integration", "Automated cycle alerts"],
  consent: ["Digital consent archiving", "Legal & medical compliance", "Semen & embryo freezing docs"],
  billing: ["Procedure packages & lab charges", "Advance payment tracking", "Transparent invoicing"],
  reports: ["Clinical & financial analytics", "Executive dashboards", "Custom workflow settings"],
};

const MODULE_TAGLINES: Record<string, string> = {
  hospital: "Run every branch from one hub",
  "user-master": "Secure access for every role",
  patient: "Registration to follow-up",
  "cycle-navigator": "IVF cycles with lab precision",
  consent: "Compliant digital documentation",
  billing: "Revenue without leakage",
  reports: "Insights for clinic leaders",
};

function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcIndex, setSrcIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [srcIndex]);

  return (
    <>
      {/* Primary — professional hospital/clinic image with slow zoom */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.05] }}
        transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = HERO_IMAGE_ALT;
          }}
        />
      </motion.div>

      {/* Subtle video layer when available */}
      <video
        ref={videoRef}
        key={srcIndex}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={cn(
          "absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-1000",
          videoReady ? "opacity-35" : "opacity-0"
        )}
        aria-hidden
        onCanPlay={() => setVideoReady(true)}
        onError={() => {
          setVideoReady(false);
          if (srcIndex < HERO_VIDEOS.length - 1) setSrcIndex((i) => i + 1);
        }}
      >
        <source src={HERO_VIDEOS[srcIndex]} type="video/mp4" />
      </video>

      {/* Premium overlays — text readable, image visible on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-text/92 via-text/70 to-primary-dark/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-transparent to-primary-dark/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(72,175,194,0.18),transparent_55%)]" />
    </>
  );
}

function HeroAnimatedWaves() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[8]">
      <div className="relative h-32 overflow-hidden sm:h-36">
        <motion.div
          className="absolute bottom-0 flex w-[200%]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((i) => (
            <svg
              key={i}
              viewBox="0 0 1440 120"
              className="h-24 w-1/2 shrink-0 opacity-60"
              preserveAspectRatio="none"
            >
              <path
                d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z"
                fill="rgba(72,175,194,0.22)"
              />
            </svg>
          ))}
        </motion.div>
        <motion.div
          className="absolute bottom-0 flex w-[200%]"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((i) => (
            <svg
              key={i}
              viewBox="0 0 1440 120"
              className="h-20 w-1/2 shrink-0 opacity-40"
              preserveAspectRatio="none"
            >
              <path
                d="M0,80 C360,48 720,112 1080,80 C1260,64 1350,72 1440,80 L1440,120 L0,120 Z"
                fill="rgba(255,255,255,0.12)"
              />
            </svg>
          ))}
        </motion.div>
        <svg
          viewBox="0 0 1440 48"
          className="absolute bottom-0 h-12 w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 24C180 48 360 0 540 24C720 48 900 0 1080 24C1260 48 1350 24 1440 24V48H0V24Z"
            fill="#eaf3f5"
          />
          <path
            d="M0 32C240 16 480 40 720 28C960 16 1200 36 1440 28V48H0V32Z"
            fill="#eaf3f5"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden" aria-hidden>
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[12%] top-[18%] h-40 w-40 rounded-full bg-primary-light/15 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[28%] left-[8%] h-32 w-32 rounded-full bg-accent/10 blur-3xl"
      />
    </div>
  );
}

function ModuleImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      loading="lazy"
    />
  );
}

export function ModulesPageContent() {
  return (
    <>
      {/* Hero — healthcare video + animated waves */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden pt-28 sm:min-h-[660px] lg:min-h-[700px]">
        <HeroBackground />
        <FloatingOrbs />

        <div className="container-wide relative z-10 pb-36 pt-10 sm:pb-40 lg:pb-44">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="eyebrow-light"
              >
                <Layers className="h-3.5 w-3.5" />
                Complete IVF Software Suite
              </motion.span>

              <h1 className="mt-5 text-balance text-3xl font-extrabold leading-[1.08] text-white sm:text-4xl lg:text-[2.65rem]">
                Purpose-Built Modules for{" "}
                <span className="bg-gradient-to-r from-primary-light via-white to-accent bg-clip-text text-transparent">
                  Fertility Excellence
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/88 sm:text-lg">
                From patient registration and IVF cycle tracking to embryology, digital consent,
                billing, and executive reports — ARTiX unifies every department in one secure
                cloud platform trusted by 500+ fertility centers across India.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  "End-to-end patient lifecycle — registration to pregnancy follow-up",
                  "IVF Cycle Navigator with real-time embryology lab integration",
                  "Automated billing, consent forms & compliance-ready documentation",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-2.5 text-sm text-white/90 sm:text-base"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="accent" size="lg" asChild>
                  <Link href="/#demo">
                    Book Free Demo <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  asChild
                >
                  <Link href="/#workflow">
                    <Play className="h-4 w-4" /> See Patient Journey
                  </Link>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-lg">
                {[
                  { v: "7", l: "Integrated Modules", icon: Layers },
                  { v: "500+", l: "IVF Clinics", icon: HeartPulse },
                  { v: "100%", l: "Cloud Secure", icon: Shield },
                ].map((s, i) => (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="rounded-2xl border border-white/20 bg-white/12 px-3 py-3.5 text-center backdrop-blur-md"
                  >
                    <s.icon className="mx-auto mb-1.5 h-4 w-4 text-primary-light" />
                    <p className="text-lg font-extrabold text-white sm:text-xl">{s.v}</p>
                    <p className="text-[10px] font-semibold leading-tight text-white/70">{s.l}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — module architecture panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative lg:col-span-5"
            >
              <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-xl">
                {/* Panel header image */}
                <div className="relative h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={MODULE_IMAGES["cycle-navigator"]}
                    alt="IVF lab"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-light">
                        ARTiX Platform
                      </p>
                      <p className="text-lg font-extrabold text-white">Module Architecture</p>
                    </div>
                    <span className="rounded-xl bg-accent px-3 py-1.5 text-xs font-bold text-text shadow-lg">
                      All-in-One
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="mb-3 text-xs leading-relaxed text-gray">
                    Seven connected modules — one login, one patient record, zero duplicate data entry.
                  </p>
                  <div className="space-y-2">
                    {modules.map((mod, i) => {
                      const Icon = MODULE_ICONS[mod.id as keyof typeof MODULE_ICONS] || Building2;
                      return (
                        <motion.a
                          key={mod.id}
                          href={`#${mod.id}`}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 + i * 0.06 }}
                          whileHover={{ x: 4 }}
                          className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 transition hover:border-primary/25 hover:bg-primary-soft/50"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-brand text-white shadow-sm">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-xs font-bold text-text">{mod.shortTitle}</span>
                            <span className="block truncate text-[11px] text-gray">
                              {MODULE_TAGLINES[mod.id]}
                            </span>
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary opacity-0 transition group-hover:opacity-100" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <HeroAnimatedWaves />
      </section>

      {/* Quick nav + module cards — visible immediately, no empty gap */}
      <section className="section-muted">
        <div className="container-wide section-padding-sm">
          <MotionSection>
            <SectionHeader
              eyebrow="Explore Modules"
              title="Every Module Your Fertility Center Needs"
              description="Hospital admin, patient records, IVF cycles, embryology, consent, billing, and reports — connected in one intelligent cloud platform built exclusively for IVF."
              className="mb-8"
            />

            {/* Quick jump pills */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {modules.map((mod) => {
                const Icon = MODULE_ICONS[mod.id as keyof typeof MODULE_ICONS] || Building2;
                return (
                  <a
                    key={mod.id}
                    href={`#${mod.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-white px-3 py-1.5 text-xs font-semibold text-text shadow-sm transition hover:border-primary/30 hover:bg-primary-soft hover:text-primary"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {mod.shortTitle}
                  </a>
                );
              })}
            </div>

            {/* Module cards grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {modules.map((mod, i) => {
                const Icon = MODULE_ICONS[mod.id as keyof typeof MODULE_ICONS] || Building2;
                const img = MODULE_IMAGES[mod.id] || MODULE_IMAGES.hospital;
                return (
                  <motion.a
                    key={mod.id}
                    href={`#${mod.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -6 }}
                    className="glass-card group flex flex-col overflow-hidden"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <ModuleImage
                        src={img}
                        alt={mod.title}
                        className="transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-text/85 via-text/25 to-transparent" />
                      <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-primary shadow-md">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="absolute bottom-3 left-3 rounded-lg bg-accent px-2 py-0.5 text-[10px] font-bold text-text">
                        {mod.shortTitle}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-bold text-text">{mod.title}</h3>
                      <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-gray">
                        {mod.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        Learn more <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Detailed module sections */}
      <section className="section-white">
        <div className="container-wide section-padding">
          <div className="space-y-16 lg:space-y-20">
            {modules.map((mod, i) => {
              const Icon = MODULE_ICONS[mod.id as keyof typeof MODULE_ICONS] || Building2;
              const img = MODULE_IMAGES[mod.id] || MODULE_IMAGES.hospital;
              const reversed = i % 2 === 1;

              return (
                <MotionSection key={mod.id}>
                  <article
                    id={mod.id}
                    className={cn(
                      "scroll-mt-28 grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
                      reversed && "lg:[direction:rtl]"
                    )}
                  >
                    <div className={cn(reversed && "lg:[direction:ltr]")}>
                      <span className="eyebrow-brand mb-4">
                        <Icon className="h-3.5 w-3.5" />
                        {mod.shortTitle}
                      </span>
                      <h2 className="text-2xl font-extrabold text-text sm:text-3xl lg:text-4xl">
                        {mod.title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-gray sm:text-lg">
                        {mod.description}
                      </p>
                      <ul className="mt-6 space-y-2">
                        {(MODULE_HIGHLIGHTS[mod.id] || []).map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-text">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <CheckCircle2 className="h-3 w-3" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Button className="mt-8" size="lg" asChild>
                        <Link href="/#demo">
                          Request Demo <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    <div
                      className={cn(
                        "premium-shadow relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-100",
                        reversed && "lg:[direction:ltr]"
                      )}
                    >
                      <ModuleImage src={img} alt={mod.title} />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 rounded-xl bg-white/95 px-4 py-2 shadow-lg">
                        <p className="text-xs font-bold text-primary">{mod.shortTitle}</p>
                        <p className="text-sm font-extrabold text-text">ARTiX Module</p>
                      </div>
                    </div>
                  </article>
                </MotionSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-text">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${MODULE_IMAGES.patient})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 to-text/95" />
        <div className="container-wide relative section-padding-sm text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Ready to Transform Your IVF Clinic?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            See all ARTiX modules live in a personalized demo tailored to your clinic size and workflow.
          </p>
          <Button variant="accent" size="lg" className="mt-6" asChild>
            <Link href="/#demo">
              Schedule Free Demo <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
