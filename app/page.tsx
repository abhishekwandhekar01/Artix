import { Hero } from "@/components/home/hero";
import { ImageMarquee } from "@/components/home/image-marquee";
import { TrustedBy } from "@/components/home/trusted-by";
import { Statistics } from "@/components/home/statistics";
import { About } from "@/components/home/about";
import { ProblemsSolutions } from "@/components/home/problems-solutions";
import { WhyArtix } from "@/components/home/why-artix";
import { CoreFeatures } from "@/components/home/core-features";
import { Modules } from "@/components/home/modules";
import { VideoShowcase } from "@/components/home/video-showcase";
import { JourneyArchitecture } from "@/components/workflow/journey-architecture";
import { DashboardShowcase } from "@/components/home/dashboard-showcase";
import { Benefits } from "@/components/home/benefits";
import { Comparison } from "@/components/home/comparison";
import { Testimonials } from "@/components/testimonials/testimonial-slider";
import { CaseStudies } from "@/components/home/case-studies";
import { FAQ } from "@/components/home/faq";
import { Downloads } from "@/components/downloads/download-cards";
import { BookDemo } from "@/components/contact/book-demo-form";
import { Contact } from "@/components/contact/contact-section";
import { generateFAQSchema } from "@/lib/schema";
import { faqs } from "@/lib/constants";

export default function HomePage() {
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <ImageMarquee />
      <TrustedBy />
      <Statistics />
      <JourneyArchitecture />
      <About />
      <ProblemsSolutions />
      <WhyArtix />
      <CoreFeatures />
      <Modules />
      <VideoShowcase />
      <DashboardShowcase />
      <Benefits />
      <Comparison />
      <Testimonials />
      <CaseStudies />
      <FAQ />
      <Downloads />
      <BookDemo />
      <Contact />
    </>
  );
}
