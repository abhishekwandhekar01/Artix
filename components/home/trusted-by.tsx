"use client";

import Link from "next/link";
import { trustedBy, siteConfig } from "@/lib/constants";

export function TrustedBy() {
  return (
    <section className="border-y border-primary/10 bg-white py-8">
      <div className="container-wide">
        <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          {siteConfig.name} — Trusted Nationwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3">
          {trustedBy.map((name) => (
            <span key={name} className="text-sm font-bold text-slate-400 transition-colors hover:text-primary sm:text-base">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
