import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "ARTiX terms of use for our IVF management platform and website.",
};

export default function TermsPage() {
  return (
    <div className="pt-28">
      <article className="section-padding prose prose-slate mx-auto max-w-3xl">
        <h1>Terms of Use</h1>
        <p className="text-gray">Last updated: June 2025</p>
        <p>
          By accessing or using the ARTiX website and platform, you agree to be bound by these
          Terms of Use. If you do not agree, please do not use our services.
        </p>
        <h2>Service Description</h2>
        <p>
          ARTiX provides cloud-based IVF management software for fertility clinics and hospitals.
          Access to the platform requires a valid subscription agreement.
        </p>
        <h2>Acceptable Use</h2>
        <p>
          Users must comply with all applicable healthcare regulations and use the platform
          solely for legitimate clinical and administrative purposes related to fertility care.
        </p>
        <h2>Intellectual Property</h2>
        <p>
          All content, software, and materials on this website are owned by ARTiX and protected
          by applicable intellectual property laws.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms may be directed to{" "}
          <a href="mailto:hello@artix.io">hello@artix.io</a>.
        </p>
      </article>
    </div>
  );
}
