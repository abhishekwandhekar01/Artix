"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/ui/safe-image";
import { WaveDivider } from "@/components/ui/wave-divider";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { HeroBackground } from "@/components/home/hero-background";
import { images, siteConfig } from "@/lib/constants";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { useMounted } from "@/hooks/use-mounted";
import Logo from "@/app/icon.png";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  HeartPulse,
  Play,
  Shield,
  Sparkles,
  TrendingUp,
  FileText,
  FolderOpen,
  Activity,
  CreditCard,
  TriangleAlert,
  ChevronDown,
} from "lucide-react";

const clinicChallenges = [
  { icon: FileText, title: "Patient Registration" },
  { icon: FolderOpen, title: "Fragmented Records" },
  { icon: Activity, title: "Manual IVF Cycle" },
  { icon: HeartPulse, title: "Embryology" },
  { icon: CreditCard, title: "Billing & Consent" },
  {
    icon: TriangleAlert,
    title: "Revenue Loss",
    danger: true,
  },
];
const heroStats = [
  { v: "523+", l: "Clinics" },
  { v: "877+", l: "Appts/mo" },
  { v: "98%", l: "Satisfied" },
];
function ChallengeCard({
  icon: Icon,
  title,
  danger = false,
}: {
  icon: any;
  title: string;
  danger?: boolean;
}) {
  return (
    <div
      className={`flex min-w-[140px] flex-1 items-center gap-2 rounded-xl border px-3 py-2 shadow-md backdrop-blur-sm sm:min-w-0 sm:flex-none
      ${danger
          ? "border-red-200 bg-red-50"
          : "border-primary/10 bg-white/90"
        }`}
    >
      <div
        className={`rounded-lg p-1.5 ${danger
          ? "bg-red-100 text-red-600"
          : "bg-primary/10 text-primary"
          }`}
      >
        <Icon size={15} />
      </div>

      <span
        className={`text-xs font-medium whitespace-nowrap ${danger ? "text-red-600" : "text-text"
          }`}
      >
        {title}
      </span>
    </div>
  );
}
export function Hero() {
  const { handleNavClick } = useAnchorScroll();
  const mounted = useMounted();

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-background lg:min-h-[92vh]">
      <HeroBackground />
      <FloatingShapes variant="hero" />

      <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-14 lg:pb-16">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-8 xl:gap-x-16">
          <motion.div
            initial={false}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65 }}
            className="lg:pt-2"
          >
            <span className="eyebrow-brand flex flex-wrap items-center gap-2">
              <SafeImage
                src={Logo}
                alt="Logo"
                width={56}
                height={56}
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-sm"
              />

              <span>
                ♦ {siteConfig.tagline}
              </span>
            </span>

            <h1 className="mt-5 text-balance text-[2rem] font-extrabold leading-[1.05] sm:text-5xl xl:text-[3.4rem]">
              The Biggest Challenges{" "}
              <span className="gradient-text">IVF Clinics Face Every Day</span>
            </h1>

            <div className="mt-6">

              {/* ================= Desktop Snake Layout ================= */}
              <div className="hidden md:flex md:flex-col md:gap-4">

                {/* Top Row */}
                <div className="flex items-center justify-between gap-2">
                  <ChallengeCard {...clinicChallenges[0]} />

                  <ArrowRight className="h-4 w-4 shrink-0 text-primary" />

                  <ChallengeCard {...clinicChallenges[1]} />

                  <ArrowRight className="h-4 w-4 shrink-0 text-primary" />

                  <ChallengeCard {...clinicChallenges[2]} />
                </div>

                {/* Turn */}
                <div className="flex justify-end pr-10">
                  <ChevronDown className="h-5 w-5 text-primary" />
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between gap-2">

                  <ChallengeCard
                    icon={TriangleAlert}
                    title="Revenue Loss"
                    danger
                  />

                  <ArrowLeft className="h-4 w-4 shrink-0 text-primary" />

                  <ChallengeCard {...clinicChallenges[4]} />

                  <ArrowLeft className="h-4 w-4 shrink-0 text-primary" />

                  <ChallengeCard {...clinicChallenges[3]} />

                </div>

              </div>

              {/* ================= Mobile Flow Chart ================= */}
              {/* Mobile only (<640px) */}
{/* Mobile only (<640px) */}
<div className="flex flex-col items-center gap-1.5 sm:hidden">

  {[
    clinicChallenges[0],
    clinicChallenges[1],
    clinicChallenges[2],
    clinicChallenges[3],
    clinicChallenges[4],
  ].map((item, index) => {
    const Icon = item.icon;

    return (
      <div key={item.title} className="flex flex-col items-center">
        <div
  className="
    flex
    w-48
    items-center
    gap-2
    rounded-xl
    border
    border-slate-200
    bg-white
    px-3
    py-2
    shadow-sm
  "
>
  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
    <Icon className="h-3.5 w-3.5 text-primary" />
  </div>

  <span className="text-xs font-medium text-text">
    {item.title}
  </span>
</div>

        {index !== 4 && (
          <ChevronDown className="my-1 h-3.5 w-3.5 text-primary" />
        )}
      </div>
    );
  })}

  <ChevronDown className="my-1 h-3.5 w-3.5 text-primary" />

 <div
  className="
    flex
    w-48
    items-center
    gap-2
    rounded-xl
    border
    border-red-200
    bg-red-50
    px-3
    py-2
    shadow-sm
  "
>
  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100">
    <TriangleAlert className="h-3.5 w-3.5 text-red-600" />
  </div>

  <span className="text-xs font-semibold text-red-600">
    Revenue Loss
  </span>
</div>

</div>

            </div>



            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/#demo" onClick={(e) => handleNavClick(e, "/#demo")}>
                  Book Free Demo <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/#downloads" onClick={(e) => handleNavClick(e, "/#downloads")}>
                  <Download className="h-4 w-4" /> Download Brochure
                </Link>
              </Button>
              <Button
                variant="accent"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/#workflow" onClick={(e) => handleNavClick(e, "/#workflow")}>
                  <Play className="h-4 w-4" /> See Patient Journey
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-sm font-medium text-muted">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-primary" /> DISHA Compliant
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" /> 500+ Clinics
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
          >
            <div className="mb-5 flex flex-wrap justify-center gap-3 lg:justify-end">
              {heroStats.map((s) => (
                <div
                  key={s.l}
                  className="min-w-[5rem] flex-1 rounded-xl border border-primary/15 bg-white/95 px-3 py-2.5 text-center shadow-md backdrop-blur-sm sm:min-w-[6rem] sm:flex-none sm:px-4 sm:py-3"
                >
                  <p className="text-base font-extrabold gradient-text sm:text-xl">{s.v}</p>
                  <p className="mt-1 text-[10px] leading-tight font-semibold text-gray">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="premium-shadow relative overflow-hidden rounded-3xl border-4 border-white/90 ring-1 ring-primary/10">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3]">
                <SafeImage
                  src={images.dashboard}
                  fallbackSrc={images.hero}
                  alt="ARTiX dashboard"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text/75 via-text/10 to-transparent" />

                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/20 bg-text/60 px-2.5 py-1 text-[9px] font-semibold text-white backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[10px]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Live clinic data
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                  <div className="glass-dark rounded-2xl p-3 sm:p-4 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-primary-light">ARTiX · Live Clinic Dashboard</p>
                      <TrendingUp className="h-4 w-4 text-emerald-300" />
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
                      {[
                        { l: "Registered", v: "2,847" },
                        { l: "Active Cycles", v: "847" },
                        { l: "Billed Today", v: "₹1.2L" },
                      ].map((s) => (
                        <div key={s.l} className="rounded-xl bg-white/10 py-2 text-center">
                          <p className="text-xs sm:text-sm font-extrabold">{s.v}</p>
                          <p className="mt-1 text-[9px] sm:text-[10px] leading-tight text-white/60">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-2 top-10 z-10 hidden animate-float-slow overflow-hidden rounded-2xl border-2 border-white shadow-xl md:block lg:-left-8 lg:top-16">
              <div className="relative h-28 w-24 lg:h-32 lg:w-28">
                <SafeImage
                  src={images.heroSpecialist}
                  fallbackSrc={images.doctorFemale}
                  alt="Dr. Sharma"
                  fill
                  className="object-cover object-top"
                  sizes="112px"
                />
              </div>
              <div className="bg-white px-2.5 py-2 text-center">
                <p className="text-[10px] lg:text-[11px] font-bold text-primary">Dr. Sharma</p>
                <p className="text-[8px] lg:text-[9px] text-gray">IVF Specialist</p>
              </div>
            </div>

            <div className="absolute right-2 top-[40%] z-10 hidden animate-float-delayed rounded-2xl border-2 border-white bg-white p-2.5 shadow-xl md:block lg:-right-8 lg:p-3">
              <p className="text-[11px] lg:text-xs font-bold text-text">Patient Registered</p>
              <p className="text-base lg:text-lg font-extrabold text-primary">#IVF-2847</p>
              <p className="text-[9px] lg:text-[10px] text-gray">Cycle started today</p>
            </div>
          </motion.div>
        </div>
      </div>

      <WaveDivider color="muted" height="sm" />
    </section>
  );
}
