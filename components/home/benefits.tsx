"use client";

import { benefits, images } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { SafeImage } from "@/components/ui/safe-image";
import { WaveDivider } from "@/components/ui/wave-divider";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const benefitImages = [
  images.clinic,
  images.billing,
  images.team,
  images.patientCouple,
  images.dashboard,
  images.lab,
];

function Icon({ name }: { name: string }) {
  const I = (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Star;
  return <I className="h-5 w-5" />;
}

export function Benefits() {
  return (
    <section className="section-muted">
      <div className="container-wide px-4 sm:px-6 lg:px-8 section-padding">
        <MotionSection>
          <SectionHeader
            eyebrow="Why Clinics Choose ARTiX"
            title="Software That Pays for Itself"
            description="ARTiX delivers measurable ROI — less admin, more patients, higher billing accuracy."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                className="glass-card group overflow-hidden rounded-2xl"
              >
                <div className="relative h-44 sm:h-40 lg:h-36 overflow-hidden">
                  <SafeImage
                    src={benefitImages[i]}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-primary/40 to-transparent" />

                  <div className="absolute bottom-3 left-3 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white text-primary shadow-lg">
                    <Icon name={item.icon} />
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-text break-words">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray break-words">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </MotionSection>
      </div>

      <WaveDivider color="white" height="sm" />
    </section>
  );
}