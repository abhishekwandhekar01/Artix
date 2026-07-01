import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join ARTiX and help transform fertility care through intelligent healthcare technology.",
};

const openings = [
  {
    title: "Senior Full-Stack Engineer",
    location: "Navi Mumbai / Remote",
    type: "Full-time",
  },
  {
    title: "Healthcare Product Manager",
    location: "Navi Mumbai",
    type: "Full-time",
  },
  {
    title: "Clinical Solutions Consultant",
    location: "Pan India",
    type: "Full-time",
  },
  {
    title: "UI/UX Designer",
    location: "Remote",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <div className="pt-28">
      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <SectionHeader
            eyebrow="Careers"
            title="Build the Future of Fertility Care"
            description="Join a passionate team building world-class IVF management software that transforms clinics across India and beyond."
          />
          <div className="space-y-4">
            {openings.map((job) => (
              <div
                key={job.title}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-primary/10 p-6 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-bold text-text">{job.title}</h3>
                  <p className="text-sm text-gray">
                    {job.location} · {job.type}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">Apply Now</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
