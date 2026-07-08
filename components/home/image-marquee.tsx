"use client";

import { galleryImages } from "@/lib/images";
import { SafeImage } from "@/components/ui/safe-image";
import { motion } from "framer-motion";

export function ImageMarquee() {
  const items = [...galleryImages, ...galleryImages];

  return (
    <section className="relative overflow-hidden border-y border-primary/10 bg-primary-soft px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,138,158,0.06),transparent_70%)]" />

      <div className="relative mb-5 text-center">
        <motion.p
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary sm:text-[11px] sm:tracking-[0.2em]"
        >
          Fertility Care · Clinical Precision · Digital Excellence
        </motion.p>

        <p className="mx-auto mt-2 max-w-2xl px-2 text-xs leading-relaxed text-gray sm:text-sm">
          Trusted by IVF clinics, embryology labs & hospital fertility
          departments
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 gap-3 px-2 sm:gap-4">
          {items.map((img, i) => (
            <div
              key={`${img.alt}-${i}`}
              className="group relative h-36 w-56 shrink-0 overflow-hidden rounded-2xl premium-shadow sm:h-44 sm:w-72 lg:h-48 lg:w-80"
            >
              <SafeImage
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:640px) 224px, (max-width:1024px) 288px, 320px"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/75 via-primary/20 to-transparent" />

              <span className="absolute bottom-3 left-3 text-xs font-semibold text-white sm:bottom-4 sm:left-4 sm:text-sm">
                {img.alt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}