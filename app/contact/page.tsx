import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact ARTiX for demo requests, product inquiries, and support for your IVF clinic.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
