"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { caseStudies, images } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { ArrowUpRight, TrendingUp } from "lucide-react";

const caseImages = [
  images.hospital,
  images.fertility,
  images.clinic,
  images.embryology,
  images.dashboard,
  images.billing,
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="section-white">
      <div className="container-wide px-4 sm:px-6 lg:px-8 section-padding">
        <MotionSection>
          <SectionHeader
            eyebrow="Case Studies"
            title="Proven Results Across Clinic Types"
            description="Real outcomes from fertility centers that transformed with ARTiX — from metro chains to boutique IVF labs."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, i) => (
              <motion.article
                key={study.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className={`glass-card group overflow-hidden rounded-2xl ${
                  i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-1" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    i === 0
                      ? "h-56 sm:h-60 lg:h-52"
                      : "h-44 sm:h-48 lg:h-44"
                  }`}
                >
                  <SafeImage
                    src={caseImages[i] || study.image}
                    fallbackSrc={images.medical}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/25 to-transparent" />

                  <div className="absolute left-4 top-4 flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-accent text-text shadow-lg">
                    <TrendingUp className="h-4 w-4" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div className="min-w-0">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white break-words">
                        {study.metric}
                      </span>

                      <p className="text-xs font-medium text-white/80 break-words">
                        {study.metricLabel}
                      </p>
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition group-hover:bg-accent group-hover:text-text">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-text break-words">
                    {study.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray break-words">
                    {study.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </MotionSection>
      </div>

      <WaveDivider color="background" height="sm" />
    </section>
  );
}