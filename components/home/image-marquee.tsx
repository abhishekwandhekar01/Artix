"use client";

import { galleryImages } from "@/lib/images";
import { SafeImage } from "@/components/ui/safe-image";
import { motion } from "framer-motion";

export function ImageMarquee() {
  const items = [...galleryImages, ...galleryImages];

  return (
    <section className="relative overflow-hidden border-y border-primary/10 bg-primary-soft py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,138,158,0.06),transparent_70%)]" />
      <div className="relative mb-5 text-center">
        <motion.p
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary"
        >
          Fertility Care · Clinical Precision · Digital Excellence
        </motion.p>
        <p className="mt-1 text-sm text-gray">Trusted by IVF clinics, embryology labs & hospital fertility departments</p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 gap-4 px-2">
          {items.map((img, i) => (
            <div
              key={`${img.alt}-${i}`}
              className="group relative h-40 w-64 shrink-0 overflow-hidden rounded-2xl premium-shadow sm:h-48 sm:w-80"
            >
              <SafeImage
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/75 via-primary/20 to-transparent" />
              <span className="absolute bottom-4 left-4 text-sm font-semibold text-white">
                {img.alt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
