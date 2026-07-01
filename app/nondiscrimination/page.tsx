import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notice of Nondiscrimination",
  description: "ARTiX notice of nondiscrimination policy.",
};

export default function NondiscriminationPage() {
  return (
    <div className="pt-28">
      <article className="section-padding prose prose-slate mx-auto max-w-3xl">
        <h1>Notice of Nondiscrimination</h1>
        <p>
          ARTiX complies with applicable civil rights laws and does not discriminate on the
          basis of race, color, national origin, age, disability, sex, gender identity,
          religion, or any other protected characteristic.
        </p>
        <p>
          Our platform and services are designed to support equitable access to fertility
          care management tools for all qualified healthcare providers and their patients.
        </p>
        <h2>Contact</h2>
        <p>
          To report discrimination concerns, contact{" "}
          <a href="mailto:hello@artix.io">hello@artix.io</a>.
        </p>
      </article>
    </div>
  );
}
