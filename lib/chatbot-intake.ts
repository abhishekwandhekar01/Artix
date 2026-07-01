import { demoFormModules, indianStates } from "./constants";

export const CLIENT_PROFILE_KEY = "artix-aria-client-profile";
export const INTAKE_NUDGE_DISMISSED_KEY = "artix-aria-intake-nudge-dismissed";

export type ClientProfile = {
  fullName: string;
  role: string;
  clinicName: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  clinicType: string;
  branchCount: string;
  monthlyVolume: string;
  interestedModules: string[];
  primaryGoal: string;
  notes: string;
  completedAt: string;
};

export const roleOptions = [
  "Clinic Owner / Director",
  "Medical Director",
  "IVF Specialist / Doctor",
  "Embryologist",
  "Hospital Administrator",
  "Operations / IT Manager",
  "Other",
];

export const clinicTypeOptions = [
  "Standalone IVF Clinic",
  "Hospital IVF Department",
  "Multi-branch Fertility Chain",
  "Fertility Network / Corporate",
];

export const branchCountOptions = [
  "Single location",
  "2–3 branches",
  "4–10 branches",
  "10+ branches",
];

export const monthlyVolumeOptions = [
  "Under 50 cycles/month",
  "50–150 cycles/month",
  "150–500 cycles/month",
  "500+ cycles/month",
  "Not sure yet",
];

export const primaryGoalOptions = [
  "Evaluate IVF software",
  "Book a live demo",
  "Get pricing information",
  "Plan data migration",
  "General product inquiry",
];

export type IntakeStep = {
  id: string;
  title: string;
  subtitle: string;
};

export const intakeSteps: IntakeStep[] = [
  {
    id: "personal",
    title: "About You",
    subtitle: "Help us personalize your ARTiX experience",
  },
  {
    id: "clinic",
    title: "Your Clinic",
    subtitle: "Tell us about your fertility center",
  },
  {
    id: "contact",
    title: "Contact Details",
    subtitle: "So our team can follow up when needed",
  },
  {
    id: "profile",
    title: "Clinic Profile",
    subtitle: "Understand your scale and setup",
  },
  {
    id: "interests",
    title: "Your Requirements",
    subtitle: "What matters most for your clinic",
  },
];

export const emptyProfile: Omit<ClientProfile, "completedAt"> = {
  fullName: "",
  role: "",
  clinicName: "",
  city: "",
  state: "",
  email: "",
  phone: "",
  clinicType: "",
  branchCount: "",
  monthlyVolume: "",
  interestedModules: [],
  primaryGoal: "",
  notes: "",
};

export { demoFormModules, indianStates };

export function loadClientProfile(): ClientProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CLIENT_PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ClientProfile;
    return parsed.fullName && parsed.email ? parsed : null;
  } catch {
    return null;
  }
}

export function saveClientProfile(profile: ClientProfile): void {
  sessionStorage.setItem(CLIENT_PROFILE_KEY, JSON.stringify(profile));
}

export function formatProfileForAi(profile: ClientProfile): string {
  return `VISITOR PROFILE (use to personalize responses — address by first name when natural):
- Name: ${profile.fullName} (${profile.role})
- Clinic: ${profile.clinicName}, ${profile.city}, ${profile.state}
- Contact: ${profile.email} | ${profile.phone}
- Setup: ${profile.clinicType} · ${profile.branchCount} · ${profile.monthlyVolume}
- Primary goal: ${profile.primaryGoal}
- Modules of interest: ${profile.interestedModules.length ? profile.interestedModules.join(", ") : "Not specified"}
${profile.notes ? `- Additional notes: ${profile.notes}` : ""}`;
}

export function buildPersonalizedGreeting(profile: ClientProfile): string {
  const firstName = profile.fullName.split(/\s+/)[0] || profile.fullName;
  const modules =
    profile.interestedModules.length > 0
      ? ` I see you're interested in **${profile.interestedModules.slice(0, 2).join("** and **")}** — great choices for ${profile.clinicName}.`
      : "";

  return `Thank you, **${firstName}**! Your details for **${profile.clinicName}** are saved.${modules}\n\nI'm ready to help with ARTiX — modules, pricing, demos, security, migration, or anything about our IVF platform. What would you like to know first?`;
}

type StepErrors = Partial<Record<string, string>>;

export function validateIntakeStep(
  stepId: string,
  data: Omit<ClientProfile, "completedAt">
): StepErrors {
  const errors: StepErrors = {};

  if (stepId === "personal") {
    if (data.fullName.trim().length < 2) errors.fullName = "Please enter your full name";
    if (!data.role) errors.role = "Please select your role";
  }

  if (stepId === "clinic") {
    if (data.clinicName.trim().length < 2) errors.clinicName = "Please enter clinic name";
    if (data.city.trim().length < 2) errors.city = "Please enter city";
    if (!data.state) errors.state = "Please select state";
  }

  if (stepId === "contact") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Valid email required";
    if (data.phone.replace(/\D/g, "").length < 10) errors.phone = "Valid phone number required";
  }

  if (stepId === "profile") {
    if (!data.clinicType) errors.clinicType = "Please select clinic type";
    if (!data.branchCount) errors.branchCount = "Please select branch count";
    if (!data.monthlyVolume) errors.monthlyVolume = "Please select approximate volume";
  }

  if (stepId === "interests") {
    if (!data.primaryGoal) errors.primaryGoal = "Please select your primary goal";
  }

  return errors;
}
