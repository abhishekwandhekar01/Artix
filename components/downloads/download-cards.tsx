"use client";

import { downloads, downloadCardImages } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { SafeImage } from "@/components/ui/safe-image";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";

const BROCHURE = downloads[0];

function Icon({ name }: { name: string }) {
  const I = (Icons[name as keyof typeof Icons] as LucideIcon) || Icons.File;
  return <I className="h-5 w-5" />;
}

function BrochurePreview() {
  const previewUrl = `${BROCHURE.file}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12 overflow-hidden rounded-3xl border border-primary/15 bg-white shadow-[0_24px_60px_-24px_rgba(31,138,158,0.35)] ring-1 ring-slate-900/[0.04]"
    >
      <div className="border-b border-slate-100 bg-gradient-to-r from-primary/[0.07] via-white to-accent/[0.08] px-4 py-5 sm:px-6 sm:py-6 lg:px-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow-brand">
              <BookOpen className="h-3.5 w-3.5" />
              ARTiX Brochure
            </span>

            <h3 className="mt-3 text-lg font-extrabold text-text sm:text-xl lg:text-2xl">
              {BROCHURE.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray sm:text-base">
              {BROCHURE.description}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a href={BROCHURE.file} download>
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              asChild
            >
              <a
                href={BROCHURE.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Open Full Screen
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-slate-100 to-slate-50/80 p-3 sm:p-5 lg:p-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-inner">
          <iframe
            src={previewUrl}
            title="ARTiX Product Brochure"
            className="block h-[420px] w-full bg-white sm:h-[520px] lg:h-[72vh] lg:max-h-[780px]"
          />
        </div>

        <p className="mt-3 px-2 text-center text-xs text-gray">
          Scroll inside the viewer to read every page, or download the PDF for
          offline sharing.
        </p>
      </div>
    </motion.div>
  );
}

export function Downloads() {
  return (
    <section id="downloads" className="section-brand-soft">
      <div className="container-wide px-4 sm:px-6 lg:px-8 section-padding">
        <MotionSection>
          <SectionHeader
            eyebrow="Resources"
            title="Download Product Resources"
            description="Brochures, feature sheets, and implementation guides — share with your clinical and leadership team."
          />

          <BrochurePreview />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {downloads.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.file}
                download
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-card group flex flex-col overflow-hidden"
              >
                <div className="relative h-40 sm:h-36 lg:h-32 overflow-hidden">
                  <SafeImage
                    src={downloadCardImages[i] ?? downloadCardImages[0]}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-text/80 to-primary/30" />

                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-lg">
                    <Icon name={item.icon} />
                  </div>

                  <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    PDF
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-2 text-primary">
                    <FileText className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      Free Download
                    </span>
                  </div>

                  <h3 className="break-words font-bold text-text">
                    {item.title}
                  </h3>

                  <p className="mb-4 mt-1.5 flex-1 break-words text-xs leading-relaxed text-gray">
                    {item.description}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:gap-2.5">
                    <Download className="h-3.5 w-3.5" />
                    Download PDF
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </MotionSection>
      </div>

      <WaveDivider color="muted" height="sm" />
    </section>
  );
}