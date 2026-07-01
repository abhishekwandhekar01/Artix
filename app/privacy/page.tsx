import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ARTiX privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-28">
      <article className="section-padding prose prose-slate mx-auto max-w-3xl">
        <h1>Privacy Policy</h1>
        <p className="text-gray">Last updated: June 2025</p>
        <p>
          ARTiX (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy and security
          of personal and health information processed through our cloud-based IVF management platform.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly, including contact details, clinic information,
          and demo request data. Our platform processes patient health information on behalf of
          healthcare providers in accordance with applicable regulations.
        </p>
        <h2>How We Use Information</h2>
        <p>
          We use collected information to provide and improve our services, respond to inquiries,
          and ensure platform security and compliance with healthcare data protection standards.
        </p>
        <h2>Data Security</h2>
        <p>
          ARTiX implements encryption, role-based access controls, audit logging, and
          DISHA-aligned security practices to protect sensitive reproductive health data.
        </p>
        <h2>Contact</h2>
        <p>
          For privacy-related inquiries, contact us at{" "}
          <a href="mailto:hello@artix.io">hello@artix.io</a>.
        </p>
      </article>
    </div>
  );
}
