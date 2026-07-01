import type { Metadata } from "next";
import { ModulesPageContent } from "@/components/modules/modules-page-content";

export const metadata: Metadata = {
  title: "IVF Management Modules",
  description:
    "Explore ARTiX modules — Hospital Administration, Patient Management, IVF Cycle Navigator, Digital Consent, Billing, and Reports.",
};

export default function ModulesPage() {
  return <ModulesPageContent />;
}
