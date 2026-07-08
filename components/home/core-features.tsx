"use client";

import { features } from "@/lib/constants";
import { images } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { SafeImage } from "@/components/ui/safe-image";
import { WaveDivider } from "@/components/ui/wave-divider";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const featureImages = [
  images.consultation,
  images.embryology,
  images.lab,
  images.hospital,
  images.consent,
  images.billing,
  images.analytics,
  images.staff,
  images.pharmacy,
  images.dashboard,
  images.technology,
  images.nurse,
  images.dashboard,
  images.analytics,
  images.medical,
  images.team,
];

function Icon({ name }: { name: string }) {
  const I =
    (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Sparkles;

  return <I className="h-5 w-5" />;
}

export function CoreFeatures() {
  return (
    <section id="features" className="section-muted">
      <div className="container-wide px-4 sm:px-6 lg:px-8 section-padding">
        <MotionSection>
          <SectionHeader
            eyebrow="Core Features"
            title="Enterprise Capabilities for Modern IVF Centers"
            description="Sixteen powerful features — from patient intake to executive analytics — in one unified platform."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card group overflow-hidden rounded-2xl"
              >
                <div className="relative h-44 sm:h-36 lg:h-32 overflow-hidden">
                  <SafeImage
                    src={featureImages[i % featureImages.length]}
                    fallbackSrc={images.medical}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 25vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-text/80 to-primary/30" />

                  <div className="absolute bottom-3 left-3 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/95 text-primary shadow-lg">
                    <Icon name={f.icon} />
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-text break-words">
                    {f.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray break-words">
                    {f.description}
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