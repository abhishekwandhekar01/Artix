"use client";

import { stats } from "@/lib/constants";
import { images } from "@/lib/constants";
import { useCounter } from "@/hooks/use-counter";
import { SectionBanner } from "@/components/ui/section-banner";
import { motion } from "framer-motion";

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCounter(value);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.05 }}
      className="flex h-full flex-col justify-center rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-all sm:p-5 lg:p-6"
    >
      <p className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
        {count}
        <span className="text-accent">{suffix}</span>
      </p>

      <p className="mt-2 text-xs leading-relaxed text-white/75 sm:text-sm">
        {label}
      </p>
    </motion.div>
  );
}

export function Statistics() {
  return (
    <SectionBanner image={images.clinic} overlay="brand" height="md">
      <div className="container-wide px-4 py-12 sm:px-6 lg:px-8 section-padding-sm">
        <div className="mb-8 text-center">
          <span className="eyebrow-light">
            Impact at Scale
          </span>

          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
            Trusted by Fertility Leaders Nationwide
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>
    </SectionBanner>
  );
}