"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { handleNavClick } = useAnchorScroll();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 800);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1rem)] max-w-md -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300 sm:bottom-6 sm:w-[calc(100%-2rem)]">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm font-bold text-text sm:text-base">
              Ready to go digital?
            </p>

            <p className="mt-1 text-xs leading-relaxed text-gray sm:text-sm">
              Book a free 30-minute demo with our team.
            </p>
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            <Button
              size="sm"
              className="flex-1 sm:flex-none"
              asChild
            >
              <Link
                href="/#demo"
                onClick={(e) => handleNavClick(e, "/#demo")}
              >
                Book Demo
              </Link>
            </Button>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="rounded-lg p-2 text-gray transition-colors hover:bg-slate-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}