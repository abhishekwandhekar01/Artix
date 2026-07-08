"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { siteConfig, demoFormModules, indianStates } from "@/lib/constants";
import { unsplash } from "@/lib/images";
import { GradientMesh } from "@/components/ui/floating-shapes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowRight,
  HeartPulse,
  Shield,
  Sparkles,
} from "lucide-react";

const HERO_IMAGE = unsplash("photo-1516549655169-df83a0774514", 1920);

function ContactHeroWaves() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5]">
      <div className="relative h-20 overflow-hidden sm:h-24">
        <motion.div
          className="absolute bottom-0 flex w-[200%]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((i) => (
            <svg
              key={i}
              viewBox="0 0 1440 80"
              className="h-16 w-1/2 shrink-0 opacity-50"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 C240,64 480,16 720,40 C960,64 1200,16 1440,40 L1440,80 L0,80 Z"
                fill="rgba(31,138,158,0.08)"
              />
            </svg>
          ))}
        </motion.div>
        <svg viewBox="0 0 1440 48" className="absolute bottom-0 h-10 w-full" preserveAspectRatio="none">
          <path
            d="M0 24C180 48 360 0 540 24C720 48 900 0 1080 24C1260 48 1350 24 1440 24V48H0V24Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </div>
  );
}

const demoSchema = z.object({
  name: z.string().min(2),
  hospital: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  state: z.string().min(1),
  city: z.string().min(2),
  message: z.string().optional(),
});

type DemoFormData = z.infer<typeof demoSchema>;

const CONTACT_METHODS: {
  icon: typeof Mail;
  title: string;
  value: string;
  hint: string;
  href?: string;
}[] = [
    {
      icon: Mail,
      title: "Email Us",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      hint: "Product & demo inquiries",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
      hint: "Mon–Sat, 9 AM – 7 PM IST",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "Chat with our team",
      href: `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`,
      hint: "Quick responses",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: siteConfig.contact.address,
      hint: siteConfig.contact.cityHint,
    },
  ];

export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<DemoFormData>({ resolver: zodResolver(demoSchema) });

  return (
    <>
      {/* Hero — premium, clean, airy */}
      <section className="relative overflow-hidden pt-20 sm:pt-24 lg:pt-28">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-soft/80 via-background to-white" />
        <GradientMesh />

        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ scale: [1, 1.04] }}
          transition={{ duration: 24, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt=""
            className="h-full w-full object-cover opacity-[0.12]"
          />
        </motion.div>

        <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-32 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

        <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8 pb-16 pt-8 sm:pb-20 sm:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="eyebrow-brand shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Contact ARTiX
            </motion.span>

            <h1 className="mt-5 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-text sm:text-4xl lg:text-5xl">
              Let&apos;s Transform Your{" "}
              <span className="gradient-text">IVF Clinic Together</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray sm:text-lg">
              Book a free personalized demo, explore ARTiX modules, or speak with our IVF software
              specialists — we respond within 24 hours.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted">
              <span className="inline-flex items-center gap-1.5">
                <HeartPulse className="h-3.5 w-3.5 text-primary" /> 500+ Clinics
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-primary/30 sm:block" />
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-primary" /> DISHA Compliant
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-primary/30 sm:block" />
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" /> 24h Response
              </span>
            </div>
          </motion.div>

          {/* Contact action cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CONTACT_METHODS.slice(0, 3).map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.href?.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-white/80 bg-white/90 p-5 text-center shadow-lg backdrop-blur-sm transition hover:border-primary/25 hover:shadow-xl"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl gradient-brand text-white shadow-md transition group-hover:scale-105">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold text-text">{item.title}</p>
                <p className="mt-1 text-xs font-medium text-primary transition group-hover:text-primary-dark">
                  {item.value}
                </p>
                <p className="mt-1.5 text-[10px] text-muted">{item.hint}</p>
              </motion.a>
            ))}
          </motion.div>

          {/* Office location pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mx-auto mt-6 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-primary/10 bg-white/70 px-4 py-3 text-center shadow-sm backdrop-blur-sm sm:flex-row sm:items-start sm:justify-center"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-center text-xs leading-relaxed text-gray sm:text-left sm:text-sm break-words">
              <span className="font-semibold text-text">{siteConfig.contact.cityHint} Office · </span>
              {siteConfig.contact.address}
            </p>
          </motion.div>
        </div>

        <ContactHeroWaves />
      </section>

      {/* Main — form + contact info unified */}
      <section className="section-white pb-16 sm:pb-20">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
            {/* Left — meaningful info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-extrabold text-text sm:text-3xl">
                Why Clinics Reach Out to ARTiX
              </h2>
              <p className="mt-3 leading-relaxed text-gray">
                Whether you&apos;re evaluating IVF software for the first time or replacing a
                legacy system — our specialists guide you through every module, integration, and
                implementation step.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Free 30-minute demo tailored to your clinic size",
                  "Walkthrough of patient, cycle, lab & billing modules",
                  "Implementation timeline & multi-branch setup guidance",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CONTACT_METHODS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 sm:p-5 transition hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-bold text-text">{item.title}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="mt-1 block text-xs leading-relaxed text-gray transition hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-xs leading-relaxed text-gray">{item.value}</p>
                    )}
                    <p className="mt-1 text-[10px] font-medium text-muted">{item.hint}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-primary/10 bg-primary-soft/50 px-4 py-3">
                <Clock className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-text">Office Hours</p>
                  <p className="text-xs text-gray">Monday – Saturday · 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray">
                  <HeartPulse className="h-4 w-4 text-primary" /> 500+ IVF Clinics
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray">
                  <Shield className="h-4 w-4 text-primary" /> DISHA Compliant
                </div>
              </div>
            </motion.div>

            {/* Right — demo form */}
            <motion.div
              id="demo"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="scroll-mt-28"
            >
              <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 lg:p-8 shadow-xl ring-1 ring-primary/5">
                <div className="mb-6 border-b border-slate-100 pb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    <Sparkles className="h-3 w-3" />
                    Book Free Demo
                  </span>
                  <h3 className="mt-3 text-lg sm:text-xl lg:text-2xl font-extrabold text-text">
                    Schedule Your Walkthrough
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray">
                    No commitment. Share your details and our Pune team will reach out within 24 hours.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="mx-auto mb-3 h-14 w-14 text-primary" />
                    <h3 className="text-xl font-bold text-text">Demo Scheduled!</h3>
                    <p className="mt-2 text-sm text-gray">
                      Our team will contact you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(async (d) => {
                      await new Promise((r) => setTimeout(r, 900));
                      console.log({ ...d, selectedModules });
                      setSubmitted(true);
                    })}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label>Name *</Label>
                        <Input {...register("name")} className="mt-1" placeholder="Dr. Priya" />
                      </div>
                      <div>
                        <Label>Clinic *</Label>
                        <Input
                          {...register("hospital")}
                          className="mt-1"
                          placeholder="LifeSpring IVF"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label>Email *</Label>
                        <Input type="email" {...register("email")} className="mt-1" />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input {...register("phone")} className="mt-1" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label>State *</Label>
                        <Select onValueChange={(v) => setValue("state", v)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>City *</Label>
                        <Input {...register("city")} className="mt-1" placeholder="Pune" />
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Modules of interest</Label>
                      <div className="flex flex-wrap gap-2">
                        {demoFormModules.map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() =>
                              setSelectedModules((p) =>
                                p.includes(m) ? p.filter((x) => x !== m) : [...p, m]
                              )
                            }
                            className={`rounded-full px-3 py-2 text-xs font-semibold transition-all duration-200 ${selectedModules.includes(m)
                              ? "bg-primary text-white shadow-sm"
                              : "border border-slate-200 text-gray hover:border-primary/30 hover:bg-primary/5"
                              }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Message</Label>
                      <Textarea
                        {...register("message")}
                        className="mt-1"
                        rows={3}
                        placeholder="Tell us about your clinic size, branches, or specific needs..."
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          Schedule My Free Demo <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 overflow-hidden rounded-2xl border border-slate-100 premium-shadow ring-1 ring-primary/5"
          >
            <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-primary-soft/60 to-white px-4 py-4 sm:px-5 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-brand text-white shadow-md">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text">ARTiX Office — {siteConfig.contact.cityHint}</p>
                  <p className="mt-0.5 max-w-xl text-xs leading-relaxed text-gray">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>
                    <Phone className="h-3.5 w-3.5" /> Call
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
            <iframe
              title="ARTiX Office Location"
              src={siteConfig.contact.mapEmbedUrl}
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="h-[280px] sm:h-[320px] w-full grayscale transition-all duration-500 hover:grayscale-0"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
