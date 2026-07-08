"use client";

import { trustedBy, siteConfig } from "@/lib/constants";

export function TrustedBy() {
  return (
    <section className="border-y border-primary/10 bg-white py-6 sm:py-8">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <p className="mb-5 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-primary sm:text-[11px] sm:tracking-[0.2em]">
          {siteConfig.name} — Trusted Nationwide
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10 lg:gap-x-12">
          {trustedBy.map((name) => (
            <span
              key={name}
              className="text-center text-sm font-bold text-slate-400 transition-colors hover:text-primary sm:text-base break-words"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}