"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function MotionSection({ children, className, id }: MotionSectionProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-10 lg:mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow mb-3 ${light ? "border-white/20 bg-white/10 text-primary-light" : ""}`}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-balance text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl lg:leading-tight ${
          light ? "text-white" : "text-text"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-white/70" : "text-gray"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
