"use client";

import { problems, solutions } from "@/lib/constants";
import { images } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { SafeImage } from "@/components/ui/safe-image";
import { WaveDivider } from "@/components/ui/wave-divider";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

function Icon({ name }: { name: string }) {
  const I = (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.Circle;
  return <I className="h-5 w-5" />;
}

export function ProblemsSolutions() {
  return (
    <>
      <section className="section-white">
        <div className="container-wide section-padding">
          <MotionSection>
            <SectionHeader eyebrow="The Challenge" title="What's Holding Your Clinic Back?" description="Legacy tools create friction at every step of the fertility journey." />
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="relative hidden overflow-hidden rounded-2xl premium-shadow lg:block">
                <SafeImage src={images.reception} fallbackSrc={images.clinic} alt="Busy clinic" fill className="object-cover" sizes="50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-text/80 to-transparent" />
                <p className="absolute bottom-6 left-6 max-w-xs text-lg font-bold text-white">Manual processes slow down every patient visit</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {problems.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                      <Icon name={item.icon} />
                    </div>
                    <h3 className="font-bold text-text">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-gray">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      <section className="relative section-muted overflow-hidden">
        <div className="absolute inset-0 opacity-20 relative min-h-[400px]">
          <SafeImage src={images.dashboard} alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="container-wide relative section-padding">
          <MotionSection>
            <SectionHeader eyebrow="The ARTiX Advantage" title="One Platform. Complete Control." description="Integrated clinical, lab, and business operations in the cloud." />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {solutions.map((item, i) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -6 }}
                  className="glass-card overflow-hidden"
                >
                  <div className="relative h-28">
                    <SafeImage
                      src={[images.technology, images.billing, images.lab, images.analytics][i]}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-primary/60" />
                    <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary">
                      <Icon name={item.icon} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-text">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </MotionSection>
        </div>
        <WaveDivider color="background" height="sm" />
      </section>
    </>
  );
}
