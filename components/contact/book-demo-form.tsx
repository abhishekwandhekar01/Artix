"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { demoFormModules, indianStates, images } from "@/lib/constants";
import { SectionBanner } from "@/components/ui/section-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";
import { WaveDivider } from "@/components/ui/wave-divider";
import axios from "axios";

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

export function BookDemo() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
  });

  return (
    <section id="demo">
      <SectionBanner image={images.consultation} overlay="brand" height="lg">
        <div className="container-wide section-padding">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow-light">Book Live Demo</span>
              <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
                See ARTiX Transform Your Clinic
              </h2>
              <p className="mt-4 text-white/80">
                Personalized 30-minute walkthrough with our IVF software specialists.
                No commitment. Tailored to your clinic size and modules.
              </p>
              <ul className="mt-6 space-y-2">
                {["Doctor & embryologist workflows", "Billing & patient modules", "Multi-branch setup", "Implementation timeline"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-accent" />{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-2xl lg:p-8">
              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="mx-auto mb-3 h-14 w-14 text-primary" />

                  <h3 className="text-xl font-bold">
                    Demo Scheduled!
                  </h3>

                  <p className="mt-2 text-sm text-gray">
                    We'll contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(async (d) => {
                    try {
                      await axios.post("http://localhost:5000/api/inquiry", {
                        name: d.name,
                        email: d.email,
                        phone: d.phone,
                        hospital: d.hospital,
                        city: d.city,
                        message: `
${d.message || ""}

State: ${d.state}

Modules:
${selectedModules.join(", ")}
            `,
                      });

                      setSubmitted(true);
                    } catch (error) {
                      console.error(error);
                      alert("Failed to submit inquiry.");
                    }
                  })}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Name *</Label>
                      <Input
                        {...register("name")}
                        className="mt-1"
                        placeholder="Dr. Priya"
                      />
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
                      <Input
                        type="email"
                        {...register("email")}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Phone *</Label>
                      <Input
                        {...register("phone")}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>State *</Label>

                      <Select
                        onValueChange={(v) => setValue("state", v)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select" />
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

                      <Input
                        {...register("city")}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {demoFormModules.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() =>
                          setSelectedModules((prev) =>
                            prev.includes(m)
                              ? prev.filter((x) => x !== m)
                              : [...prev, m]
                          )
                        }
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${selectedModules.includes(m)
                            ? "bg-primary text-white"
                            : "border border-slate-200 text-gray"
                          }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div>
                    <Label>Message</Label>

                    <Textarea
                      {...register("message")}
                      className="mt-1"
                      rows={2}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Schedule My Free Demo"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </SectionBanner>
      <WaveDivider color="white" height="sm" />
    </section>
  );
}
