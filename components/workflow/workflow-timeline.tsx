"use client";

import { workflowSteps } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { WaveDivider } from "@/components/ui/wave-divider";
import { CheckCircle2 } from "lucide-react";

export function Workflow() {
  return (
    <section id="workflow" className="section-mesh">
      <div className="container-wide section-padding">
        <MotionSection>
          <SectionHeader
            eyebrow="Clinical Workflow"
            title="From Registration to Follow-Up"
            description="A structured journey guiding every patient through their fertility treatment lifecycle."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {workflowSteps.map((step, i) => (
              <div
                key={step.title}
                className="glass-card relative flex h-full flex-col rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Step Number */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </span>

                  {i < workflowSteps.length - 1 && (
                    <div className="hidden h-px flex-1 bg-primary/15 lg:block" />
                  )}
                </div>

                {/* Icon */}
                <CheckCircle2 className="mb-3 h-5 w-5 text-primary" />

                {/* Content */}
                <h3 className="text-base font-bold text-text">
                  {step.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </MotionSection>
      </div>

      <WaveDivider color="primary" height="sm" />
    </section>
  );
}