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
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 shadow-md backdrop-blur-sm
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

      <div className="container-wide relative z-10 pt-28 pb-12 lg:pt-32 lg:pb-16">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-8 xl:gap-x-16">
          <motion.div
            initial={false}
            animate={mounted ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.65 }}
            className="lg:pt-2"
          >
            <span className="eyebrow-brand flex items-center gap-2">
              <SafeImage
                src={Logo}
                alt="Logo"
                width={60}
                height={60}
                className="rounded-sm"
              />

              <span>
                  ♦ {siteConfig.tagline}
              </span>
            </span>

            <h1 className="mt-5 text-balance text-[2rem] font-extrabold leading-[1.05] sm:text-5xl xl:text-[3.4rem]">
              The Biggest Challenges{" "}
              <span className="gradient-text">IVF Clinics Face Every Day</span>
            </h1>

            <div className="mt-6 flex flex-col gap-4">

              {/* Top Row */}
              <div className="flex items-center justify-between gap-2">

                <ChallengeCard {...clinicChallenges[0]} />

                <ArrowRight className="h-4 w-4 text-primary shrink-0" />

                <ChallengeCard {...clinicChallenges[1]} />

                <ArrowRight className="h-4 w-4 text-primary shrink-0" />

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

                <ArrowLeft className="h-4 w-4 text-primary shrink-0" />

                <ChallengeCard {...clinicChallenges[4]} />

                <ArrowLeft className="h-4 w-4 text-primary shrink-0" />

                <ChallengeCard {...clinicChallenges[3]} />

              </div>

            </div>



            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/#demo" onClick={(e) => handleNavClick(e, "/#demo")}>
                  Book Free Demo <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/#downloads" onClick={(e) => handleNavClick(e, "/#downloads")}>
                  <Download className="h-4 w-4" /> Download Brochure
                </Link>
              </Button>
              <Button variant="accent" size="lg" asChild>
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
            <div className="mb-4 flex justify-center gap-2 sm:gap-3 lg:justify-end">
              {heroStats.map((s) => (
                <div
                  key={s.l}
                  className="min-w-[5.5rem] rounded-xl border border-primary/15 bg-white/95 px-3 py-2.5 text-center shadow-md backdrop-blur-sm sm:min-w-[6rem] sm:px-4 sm:py-3"
                >
                  <p className="text-lg font-extrabold gradient-text sm:text-xl">{s.v}</p>
                  <p className="text-[10px] font-semibold text-gray">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="premium-shadow relative overflow-hidden rounded-3xl border-4 border-white/90 ring-1 ring-primary/10">
              <div className="relative aspect-[4/3] sm:aspect-[16/11]">
                <SafeImage
                  src={images.dashboard}
                  fallbackSrc={images.hero}
                  alt="ARTiX dashboard"
                  fill
                  className="object-cover"
                  priority
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text/75 via-text/10 to-transparent" />

                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/20 bg-text/60 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md sm:left-4 sm:top-4">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Live clinic data
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="glass-dark rounded-2xl p-4 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-primary-light">ARTiX · Live Clinic Dashboard</p>
                      <TrendingUp className="h-4 w-4 text-emerald-300" />
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[
                        { l: "Registered", v: "2,847" },
                        { l: "Active Cycles", v: "847" },
                        { l: "Billed Today", v: "₹1.2L" },
                      ].map((s) => (
                        <div key={s.l} className="rounded-xl bg-white/10 py-2 text-center">
                          <p className="text-sm font-extrabold">{s.v}</p>
                          <p className="text-[10px] text-white/60">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-1 top-14 z-10 hidden animate-float-slow overflow-hidden rounded-2xl border-2 border-white shadow-xl sm:block lg:-left-8 lg:top-16">
              <div className="relative h-32 w-28">
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
                <p className="text-[11px] font-bold text-primary">Dr. Sharma</p>
                <p className="text-[9px] text-gray">IVF Specialist</p>
              </div>
            </div>

            <div className="absolute -right-1 top-[42%] z-10 hidden animate-float-delayed rounded-2xl border-2 border-white bg-white p-3 shadow-xl sm:block lg:-right-8">
              <p className="text-xs font-bold text-text">Patient Registered</p>
              <p className="text-lg font-extrabold text-primary">#IVF-2847</p>
              <p className="text-[10px] text-gray">Cycle started today</p>
            </div>
          </motion.div>
        </div>
      </div>

      <WaveDivider color="muted" height="sm" />
    </section>
  );
}
