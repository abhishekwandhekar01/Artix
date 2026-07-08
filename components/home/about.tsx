"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Button } from "@/components/ui/button";
import { images, siteConfig } from "@/lib/constants";
import { useMounted } from "@/hooks/use-mounted";
import {
  ArrowRight,
  Microscope,
  Settings2,
  Sparkles,
} from "lucide-react";

const pillars = [
  {
    icon: Microscope,
    title: "Precision Embryology",
    desc: "Lab-grade culture, grading & transfer documentation.",
    img: images.embryology,
  },
  {
    icon: Sparkles,
    title: "Advanced IVF Tech",
    desc: "Cycle Navigator, digital consent & integrated billing.",
    img: images.technology,
  },
  {
    icon: Settings2,
    title: "Custom Workflows",
    desc: "Protocols tailored to your clinic's exact needs.",
    img: images.consultation,
  },
];

export function About() {
  const mounted = useMounted();

  return (
    <section id="about" className="section-white">
      <div className="container-wide px-4 sm:px-6 lg:px-8 section-padding">
        <MotionSection>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl premium-shadow">
                  <SafeImage
                    src={images.about}
                    fallbackSrc={images.consultation}
                    alt="Doctor consultation"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                </div>

                <div className="relative aspect-square overflow-hidden rounded-2xl premium-shadow">
                  <SafeImage
                    src={images.doctorFemale}
                    fallbackSrc={images.doctor}
                    alt="Fertility doctor"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                </div>

                <div className="relative aspect-square overflow-hidden rounded-2xl premium-shadow">
                  <SafeImage
                    src={images.patientCouple}
                    fallbackSrc={images.fertility}
                    alt="Patient journey"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                </div>
              </div>

              <div
                className={`absolute -bottom-3 right-2 rounded-2xl gradient-brand px-4 py-3 sm:px-5 sm:py-4 text-white shadow-xl lg:-right-6 ${
                  mounted ? "animate-float-slow" : ""
                }`}
              >
                <p className="text-2xl sm:text-3xl font-extrabold">17+</p>
                <p className="text-[11px] sm:text-xs font-semibold text-white/80">
                  Years IVF Expertise
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div>
              <SectionHeader
                align="left"
                eyebrow="About ARTiX"
                title="Transforming Fertility Care With Intelligent Technology"
                description="Purpose-built for IVF clinics, embryology labs, and hospital fertility departments."
                className="mb-6"
              />

              <p className="leading-relaxed text-gray">
                From digital patient intake to embryology tracking, billing,
                and compliance — every ARTiX module works together seamlessly.
                One login. One source of truth. Zero duplicate data entry.
              </p>

              <blockquote className="mt-5 rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-4 sm:px-5 text-sm sm:text-base font-semibold text-text">
                &ldquo;{siteConfig.tagline}&rdquo; — in patient outcomes and
                clinic operations.
              </blockquote>

              <div className="mt-8 space-y-3">
                {pillars.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={false}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md"
                  >
                    <div className="relative hidden w-24 shrink-0 sm:block">
                      <SafeImage
                        src={item.img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    <div className="flex gap-3 p-4">
                      <item.icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" />

                      <div className="min-w-0">
                        <p className="font-bold text-text break-words">
                          {item.title}
                        </p>

                        <p className="text-sm leading-relaxed text-gray break-words">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                className="mt-8 w-full sm:w-auto"
                size="lg"
                asChild
              >
                <Link href="/modules">
                  Explore Modules
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </MotionSection>
      </div>

      <WaveDivider color="muted" height="sm" />
    </section>
  );
}