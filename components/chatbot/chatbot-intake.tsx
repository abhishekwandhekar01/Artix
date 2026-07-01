"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, UserCircle } from "lucide-react";
import {
  branchCountOptions,
  clinicTypeOptions,
  demoFormModules,
  emptyProfile,
  indianStates,
  intakeSteps,
  monthlyVolumeOptions,
  primaryGoalOptions,
  roleOptions,
  type ClientProfile,
  validateIntakeStep,
} from "@/lib/chatbot-intake";
import { cn } from "@/lib/utils";

interface ChatbotIntakeProps {
  onComplete: (profile: ClientProfile) => void;
  onSkip?: () => void;
}

const fieldClass =
  "mt-1 w-full rounded-xl border border-primary/15 bg-white px-3 py-2.5 text-sm text-text outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10";
const labelClass = "text-xs font-semibold text-text";
const errorClass = "mt-1 text-[11px] text-red-500";

export function ChatbotIntake({ onComplete, onSkip }: ChatbotIntakeProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(emptyProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const current = intakeSteps[step];
  const progress = ((step + 1) / intakeSteps.length) * 100;

  const update = (patch: Partial<typeof data>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setErrors({});
  };

  const toggleModule = (mod: string) => {
    setData((prev) => ({
      ...prev,
      interestedModules: prev.interestedModules.includes(mod)
        ? prev.interestedModules.filter((m) => m !== mod)
        : [...prev.interestedModules, mod],
    }));
  };

  const goNext = () => {
    const stepErrors = validateIntakeStep(current.id, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors as Record<string, string>);
      return;
    }

    if (step < intakeSteps.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    onComplete({
      ...data,
      completedAt: new Date().toISOString(),
    });
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Progress */}
      <div className="shrink-0 border-b border-primary/5 bg-primary-soft/30 px-4 py-3">
        <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted">
          <span>Step {step + 1} of {intakeSteps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
        <div className="mt-3 flex items-start gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {step <= 1 ? <UserCircle className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
          </div>
          <div>
            <p className="text-sm font-bold text-text">{current.title}</p>
            <p className="text-[11px] text-gray">{current.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {current.id === "personal" && (
              <>
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    className={fieldClass}
                    value={data.fullName}
                    onChange={(e) => update({ fullName: e.target.value })}
                    placeholder="Dr. Priya Sharma"
                    autoFocus
                  />
                  {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
                </div>
                <div>
                  <label className={labelClass}>Your Role *</label>
                  <select
                    className={fieldClass}
                    value={data.role}
                    onChange={(e) => update({ role: e.target.value })}
                  >
                    <option value="">Select role</option>
                    {roleOptions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.role && <p className={errorClass}>{errors.role}</p>}
                </div>
              </>
            )}

            {current.id === "clinic" && (
              <>
                <div>
                  <label className={labelClass}>Clinic / Hospital Name *</label>
                  <input
                    className={fieldClass}
                    value={data.clinicName}
                    onChange={(e) => update({ clinicName: e.target.value })}
                    placeholder="LifeSpring IVF Centre"
                    autoFocus
                  />
                  {errors.clinicName && <p className={errorClass}>{errors.clinicName}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>City *</label>
                    <input
                      className={fieldClass}
                      value={data.city}
                      onChange={(e) => update({ city: e.target.value })}
                      placeholder="Pune"
                    />
                    {errors.city && <p className={errorClass}>{errors.city}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>State *</label>
                    <select
                      className={fieldClass}
                      value={data.state}
                      onChange={(e) => update({ state: e.target.value })}
                    >
                      <option value="">Select</option>
                      {indianStates.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && <p className={errorClass}>{errors.state}</p>}
                  </div>
                </div>
              </>
            )}

            {current.id === "contact" && (
              <>
                <div>
                  <label className={labelClass}>Work Email *</label>
                  <input
                    type="email"
                    className={fieldClass}
                    value={data.email}
                    onChange={(e) => update({ email: e.target.value })}
                    placeholder="you@clinic.com"
                    autoFocus
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>
                <div>
                  <label className={labelClass}>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    className={fieldClass}
                    value={data.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>
                <p className="rounded-xl bg-primary-soft/60 px-3 py-2 text-[11px] leading-relaxed text-gray">
                  Your details are kept confidential and used only to personalize your ARTiX consultation.
                </p>
              </>
            )}

            {current.id === "profile" && (
              <>
                <div>
                  <label className={labelClass}>Clinic Type *</label>
                  <select
                    className={fieldClass}
                    value={data.clinicType}
                    onChange={(e) => update({ clinicType: e.target.value })}
                  >
                    <option value="">Select type</option>
                    {clinicTypeOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  {errors.clinicType && <p className={errorClass}>{errors.clinicType}</p>}
                </div>
                <div>
                  <label className={labelClass}>Number of Locations *</label>
                  <select
                    className={fieldClass}
                    value={data.branchCount}
                    onChange={(e) => update({ branchCount: e.target.value })}
                  >
                    <option value="">Select</option>
                    {branchCountOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  {errors.branchCount && <p className={errorClass}>{errors.branchCount}</p>}
                </div>
                <div>
                  <label className={labelClass}>Approx. IVF Cycles / Month *</label>
                  <select
                    className={fieldClass}
                    value={data.monthlyVolume}
                    onChange={(e) => update({ monthlyVolume: e.target.value })}
                  >
                    <option value="">Select volume</option>
                    {monthlyVolumeOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  {errors.monthlyVolume && <p className={errorClass}>{errors.monthlyVolume}</p>}
                </div>
              </>
            )}

            {current.id === "interests" && (
              <>
                <div>
                  <label className={labelClass}>Primary Goal *</label>
                  <select
                    className={fieldClass}
                    value={data.primaryGoal}
                    onChange={(e) => update({ primaryGoal: e.target.value })}
                  >
                    <option value="">What brings you here?</option>
                    {primaryGoalOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  {errors.primaryGoal && <p className={errorClass}>{errors.primaryGoal}</p>}
                </div>
                <div>
                  <label className={labelClass}>Modules of Interest</label>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {demoFormModules.map((mod) => (
                      <button
                        key={mod}
                        type="button"
                        onClick={() => toggleModule(mod)}
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-[10px] font-medium transition",
                          data.interestedModules.includes(mod)
                            ? "border-primary bg-primary text-white"
                            : "border-primary/20 bg-white text-primary-dark hover:border-primary/40"
                        )}
                      >
                        {mod.replace(" System", "").replace(" Module", "")}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Anything else we should know?</label>
                  <textarea
                    className={cn(fieldClass, "min-h-[72px] resize-none")}
                    value={data.notes}
                    onChange={(e) => update({ notes: e.target.value })}
                    placeholder="Current software, timeline, specific challenges…"
                    rows={3}
                  />
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="shrink-0 border-t border-primary/10 bg-white/90 p-3">
        <div className="flex gap-2">
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center justify-center gap-1 rounded-xl border border-primary/15 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary-soft/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
          <button
            type="button"
            onClick={goNext}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
          >
            {step === intakeSteps.length - 1 ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Save Details
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
        {onSkip && step === 0 && (
          <button
            type="button"
            onClick={onSkip}
            className="mt-2 w-full py-1.5 text-center text-[11px] font-medium text-muted transition hover:text-primary"
          >
            Skip for now — keep chatting
          </button>
        )}
        <p className="mt-2 text-center text-[10px] text-muted">
          Required fields · Secure & confidential
        </p>
      </div>
    </div>
  );
}
