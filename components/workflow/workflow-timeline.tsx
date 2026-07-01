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

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {workflowSteps.map((step, i) => (
              <div key={step.title} className="glass-card relative p-4 lg:p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {i < workflowSteps.length - 1 && (
                    <div className="hidden h-px flex-1 bg-primary/15 lg:block" />
                  )}
                </div>
                <CheckCircle2 className="mb-2 h-4 w-4 text-primary/60" />
                <h3 className="text-sm font-bold text-text">{step.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray">{step.description}</p>
              </div>
            ))}
          </div>
        </MotionSection>
      </div>
      <WaveDivider color="primary" height="sm" />
    </section>
  );
}
