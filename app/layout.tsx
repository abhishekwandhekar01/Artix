import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css"
import { StickyCTA } from "@/components/layout/sticky-cta";
import { ArtixChatbot } from "@/components/chatbot/artix-chatbot";
import { HashScrollHandler } from "@/components/providers/hash-scroll-handler";
import { siteConfig } from "@/lib/constants";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/schema";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Cloud IVF Management System | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "IVF management software",
    "fertility clinic software",
    "IVF cycle tracking",
    "embryology management",
    "hospital IVF system",
    "ARTiX",
    "cloud IVF platform",
    "fertility hospital management",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} — Cloud IVF Management System`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} IVF Management Platform`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Cloud IVF Management System`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/images/artixlogo.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  const webSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSchema) }}
        />
      </head>
      <body
        className="min-h-screen overflow-x-hidden bg-background font-sans text-text antialiased"
        suppressHydrationWarning
      >
        <HashScrollHandler />

        <LayoutWrapper>
          {children}
        </LayoutWrapper>

      </body>
    </html>
  );
}
