"use client";

import Link from "next/link";
import { footerLinks, siteConfig, socialLinks } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WaveDividerTop } from "@/components/ui/wave-divider";
import { BrandLogo } from "@/components/layout/brand-logo";
import { SocialIcon } from "@/components/ui/social-icon";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-text text-white">
      <WaveDividerTop color="primary" />
      <div className="container-wide section-padding pb-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLogo variant="footer" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Cloud-based IVF management for modern fertility clinics and hospital chains.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map(({ platform, label, href }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow ARTiX on ${label}`}
                  title={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/90 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:ring-primary/40 hover:shadow-lg hover:shadow-primary/20"
                >
                  <SocialIcon platform={platform} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-5">
            {[
              { title: "Solutions", links: footerLinks.solutions },
              { title: "Resources", links: footerLinks.resources },
              { title: "Company", links: footerLinks.company },
              { title: "Legal", links: footerLinks.legal },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white/80">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/55 hover:text-primary-light">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white/80">Newsletter</h3>
            <p className="mb-3 text-sm text-white/55">IVF insights and product updates.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Email" className="border-white/10 bg-white/10 text-white placeholder:text-white/35" aria-label="Newsletter email" />
              <Button type="submit" variant="accent" size="sm">Join</Button>
            </form>
            <div className="mt-4 space-y-2 text-sm text-white/55">
              <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-primary-light">
                <Mail className="h-3.5 w-3.5 shrink-0" />{siteConfig.contact.email}
              </a>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary-light">
                <Phone className="h-3.5 w-3.5 shrink-0" />{siteConfig.contact.phone}
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/45">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="text-xs text-white/45">{siteConfig.tagline} — Transforming fertility care.</p>
        </div>
      </div>
    </footer>
  );
}
