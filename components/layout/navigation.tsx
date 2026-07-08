"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/layout/brand-logo";

export function Navigation() {
  const scrolled = useScrollPosition(16);
  const pathname = usePathname();
  const { handleNavClick } = useAnchorScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || mobileOpen
            ? "border-b border-slate-200/90 bg-white/95 py-2 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-white/90 py-2.5 backdrop-blur-md"
        )}
      >
        <div className="container-wide flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:gap-6 lg:px-8">
          <BrandLogo onClick={() => setMobileOpen(false)} />

          <nav className="hidden items-center gap-0 lg:flex" aria-label="Main">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : !link.href.startsWith("/#") && pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-text"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            <Button variant="ghost" size="sm" className="text-slate-600" asChild>
              <Link href="/#downloads" onClick={(e) => handleNavClick(e, "/#downloads")}>
                Brochure
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/#demo" onClick={(e) => handleNavClick(e, "/#demo")}>
                Book Demo
              </Link>
            </Button>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-text transition-colors hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-text/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="fixed inset-x-3 top-[4.25rem] z-50 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl lg:hidden">
            <nav className="flex flex-col p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setMobileOpen(false);
                  }}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-text transition-colors hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-1 flex gap-2 border-t border-slate-100 p-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link
                    href="/#downloads"
                    onClick={(e) => {
                      handleNavClick(e, "/#downloads");
                      setMobileOpen(false);
                    }}
                  >
                    Brochure
                  </Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link
                    href="/#demo"
                    onClick={(e) => {
                      handleNavClick(e, "/#demo");
                      setMobileOpen(false);
                    }}
                  >
                    Demo
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
