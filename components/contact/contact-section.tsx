"use client";

import { siteConfig, images } from "@/lib/constants";
import { MotionSection, SectionHeader } from "@/components/ui/motion";
import { SafeImage } from "@/components/ui/safe-image";
import { GradientMesh } from "@/components/ui/floating-shapes";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden section-white">
      <GradientMesh />
      <div className="container-wide relative section-padding">
        <MotionSection>
          <SectionHeader
            eyebrow="Contact"
            title="Get in Touch With Our Team"
            description="Questions about ARTiX? Our IVF software specialists help fertility centers evaluate, implement, and scale."
          />
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl premium-shadow">
                <div className="relative aspect-[4/3]">
                  <SafeImage
                    src={images.team}
                    fallbackSrc={images.clinic}
                    alt="ARTiX team"
                    fill
                    className="object-cover"
                    sizes="40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-lg font-bold">Ready to transform your clinic?</p>
                  <p className="mt-1 text-sm text-white/75">
                    Book a personalized demo or reach us directly — we respond within 24 hours.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-primary-light">
                    <Clock className="h-4 w-4" />
                    Mon–Sat, 9 AM – 7 PM IST
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[images.doctorFemale, images.lab, images.reception].map((src) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-xl premium-shadow">
                    <SafeImage src={src} alt="" fill className="object-cover" sizes="120px" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-2">
              {[
                { icon: MapPin, title: "Office", content: siteConfig.contact.address },
                { icon: Mail, title: "Email", content: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
                { icon: Phone, title: "Phone", content: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
                { icon: MessageCircle, title: "WhatsApp", content: "Chat on WhatsApp", href: `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}` },
              ].map((item) => (
                <div key={item.title} className="glass-card flex gap-4 p-5 transition hover:shadow-xl">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl gradient-brand text-white shadow-md">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="mt-1 text-sm text-gray transition hover:text-primary"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-gray">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="overflow-hidden rounded-2xl border border-slate-200 premium-shadow sm:col-span-2">
                <iframe
                  title="ARTiX Office"
                  src={siteConfig.contact.mapEmbedUrl}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
