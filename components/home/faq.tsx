"use client";

import { faqs, images } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { SafeImage } from "@/components/ui/safe-image";
import { GradientMesh } from "@/components/ui/floating-shapes";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";

export function FAQ() {
  const { handleNavClick } = useAnchorScroll();

  return (
    <section id="faq" className="section-mesh relative overflow-hidden">
      <GradientMesh />
      <div className="container-wide relative section-padding">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <MotionSection className="lg:col-span-5">
            <SectionHeader
              align="left"
              eyebrow="FAQ"
              title="Questions Before You Book a Demo?"
              description="Everything fertility clinic owners, doctors, and IT teams ask about ARTiX."
              className="mb-8"
            />
            <div className="relative overflow-hidden rounded-2xl premium-shadow">
              <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                <SafeImage
                  src={images.consultation}
                  fallbackSrc={images.doctorFemale}
                  alt="Doctor consultation"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 text-primary-light">
                  <HelpCircle className="h-5 w-5" />
                  <span className="text-sm font-bold">Still have questions?</span>
                </div>
                <p className="mt-2 text-sm text-white/80">
                  Our IVF software specialists respond within 24 hours.
                </p>
                <Link
                  href="/#demo"
                  onClick={(e) => handleNavClick(e, "/#demo")}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-text transition hover:bg-accent/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </MotionSection>

          <MotionSection className="lg:col-span-7">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white px-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <AccordionTrigger className="text-left font-semibold text-text hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-gray">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </MotionSection>
        </div>
      </div>
      <WaveDivider color="white" height="sm" />
    </section>
  );
}
