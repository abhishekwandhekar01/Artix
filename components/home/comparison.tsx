"use client";

import { comparison, images } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { SafeImage } from "@/components/ui/safe-image";
import { WaveDivider } from "@/components/ui/wave-divider";
import { X, Check, Zap } from "lucide-react";

export function Comparison() {
  return (
    <section className="section-white">
      <div className="container-wide px-4 sm:px-6 lg:px-8 section-padding">
        <MotionSection>
          <SectionHeader
            eyebrow="Make the Switch"
            title="Paper Clinic vs ARTiX Digital Clinic"
            description="See why 500+ fertility centers replaced legacy tools with ARTiX."
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Traditional */}
            <div className="relative overflow-hidden rounded-2xl border border-red-100">
              <div className="relative h-44 sm:h-48 lg:h-40">
                <SafeImage
                  src={images.reception}
                  alt=""
                  fill
                  className="object-cover grayscale"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />

                <div className="absolute inset-0 bg-red-900/60" />

                <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/80">
                    <X className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-base font-bold">
                      Traditional Clinic
                    </p>

                    <p className="text-xs text-white/70">
                      Manual · Slow · Error-prone
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 p-4 sm:p-5">
                {comparison.traditional.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-lg bg-red-50 px-3 py-2.5 text-sm leading-relaxed text-gray"
                  >
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />

                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ARTiX */}
            <div className="relative overflow-hidden rounded-2xl border border-primary/20 premium-shadow">
              <div className="relative h-44 sm:h-48 lg:h-40">
                <SafeImage
                  src={images.dashboard}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />

                <div className="absolute inset-0 bg-primary-dark/70" />

                <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
                    <Zap className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-base font-bold">
                      ARTiX Digital Clinic
                    </p>

                    <p className="text-xs text-primary-light">
                      Cloud · Unified · Profitable
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 p-4 sm:p-5">
                {comparison.artix.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-lg border border-primary/10 bg-primary-soft/50 px-3 py-2.5 text-sm font-medium leading-relaxed text-text"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </MotionSection>
      </div>

      <WaveDivider color="muted" height="sm" />
    </section>
  );
}