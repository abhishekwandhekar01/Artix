"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { modules } from "@/lib/constants";
import { moduleImages } from "@/lib/images";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { ImageCard } from "@/components/ui/image-card";
import { SectionBanner } from "@/components/ui/section-banner";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/constants";

export function Modules() {
  const [featured, ...rest] = modules;

  return (
    <section id="modules" className="section-brand-soft">
      <SectionBanner image={images.lab} overlay="brand" height="md">
        <div className="container-wide flex h-full min-h-[320px] flex-col justify-center section-padding-sm">
          <span className="eyebrow-light">Complete IVF Suite</span>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Every Module Your Fertility Center Needs
          </h2>
          <p className="mt-4 max-w-xl text-base text-white/80">
            From patient registration to embryology, billing, consent &amp; reports —
            purpose-built for IVF, not generic hospital software.
          </p>
        </div>
      </SectionBanner>

      <div className="container-wide section-padding">
        <MotionSection>
          {/* Bento featured layout */}
          <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
            <div className="relative lg:col-span-7 lg:row-span-2">
              <ImageCard
                image={moduleImages[featured.id as keyof typeof moduleImages] || featured.image}
                alt={featured.title}
                title={featured.title}
                description={featured.description}
                badge={featured.shortTitle}
                size="lg"
                className="h-full min-h-[420px]"
              />
            </div>
            {rest.slice(0, 2).map((mod, i) => (
              <div key={mod.id} className="lg:col-span-5">
                <ImageCard
                  image={moduleImages[mod.id as keyof typeof moduleImages] || mod.image}
                  alt={mod.title}
                  title={mod.title}
                  description={mod.description}
                  badge={mod.shortTitle}
                  size="md"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rest.slice(2).map((mod, i) => (
              <motion.div
                key={mod.id}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ImageCard
                  image={moduleImages[mod.id as keyof typeof moduleImages] || mod.image}
                  alt={mod.title}
                  title={mod.title}
                  badge={mod.shortTitle}
                  size="sm"
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/modules">Explore All Modules <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </MotionSection>
      </div>
      <WaveDivider color="white" height="sm" />
    </section>
  );
}
