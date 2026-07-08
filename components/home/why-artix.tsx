"use client";

import { whyArtix, images } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { SafeImage } from "@/components/ui/safe-image";
import { WaveDivider } from "@/components/ui/wave-divider";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const cardImages = [
  images.hospital,
  images.embryology,
  images.dashboard,
  images.technology,
];

export function WhyArtix() {
  return (
    <section className="section-white">
      <div className="container-wide px-4 sm:px-6 lg:px-8 section-padding">
        <MotionSection>
          <SectionHeader
            eyebrow="Why ARTiX"
            title="The Gold Standard in IVF Management Software"
            description="Built exclusively for fertility — trusted by doctors, embryologists, and clinic owners."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {whyArtix.map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                className="glass-card overflow-hidden rounded-2xl"
              >
                <div className="relative h-48 sm:h-44 lg:h-40">
                  <SafeImage
                    src={cardImages[i]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 to-primary/50" />

                  <CheckCircle2 className="absolute bottom-4 left-4 h-8 w-8 text-accent" />
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-text break-words">
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

      <WaveDivider color="muted" height="sm" />
    </section>
  );
}