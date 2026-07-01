"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials, images } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { GradientMesh } from "@/components/ui/floating-shapes";
import { cn } from "@/lib/utils";

const backdropImages = [images.hospital, images.embryology, images.clinic];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="testimonials" className="relative overflow-hidden section-muted">
      <GradientMesh />
      <div className="container-wide relative section-padding">
        <MotionSection>
          <SectionHeader
            eyebrow="Client Stories"
            title="Trusted by Fertility Leaders Across India"
            description="Doctors, embryologists, and clinic owners on how ARTiX transformed their operations."
          />

          <div className="mb-8 hidden gap-3 lg:grid lg:grid-cols-3">
            {backdropImages.map((src, i) => (
              <motion.div
                key={src}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative h-28 overflow-hidden rounded-2xl premium-shadow"
              >
                <SafeImage src={src} alt="" fill className="object-cover" sizes="33vw" />
                <div className="absolute inset-0 bg-primary-dark/50" />
                <div className="absolute bottom-3 left-4 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-3 w-3 fill-accent text-accent" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex gap-5">
              {testimonials.map((item, i) => (
                <div
                  key={item.name}
                  className="min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)]"
                >
                  <article className="glass-card group flex h-full flex-col overflow-hidden">
                    <div className="relative h-32 overflow-hidden">
                      <SafeImage
                        src={backdropImages[i % backdropImages.length]}
                        fallbackSrc={images.medical}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary/40" />
                      <Quote className="absolute bottom-4 left-4 h-8 w-8 text-white/30" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="mb-6 flex-1 text-sm leading-relaxed text-text/85">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                        <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-primary/15">
                          <SafeImage
                            src={item.image}
                            fallbackSrc={images.doctor}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="44px"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text">{item.name}</p>
                          <p className="text-xs font-medium text-primary">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:border-primary/30 hover:text-primary"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === selectedIndex ? "w-8 bg-primary" : "w-1.5 bg-primary/20"
                  )}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:border-primary/30 hover:text-primary"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </MotionSection>
      </div>
      <WaveDivider color="white" height="sm" />
    </section>
  );
}
