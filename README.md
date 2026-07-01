# ARTiX — Premium IVF Management System Website

World-class sales, branding, and lead generation website for **ARTiX**, a cloud-based IVF Management System.

**Tagline:** Transformation for Sure

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Shadcn UI (Radix primitives)
- Framer Motion
- GSAP + Lenis Smooth Scroll
- React Hook Form + Zod
- Embla Carousel
- Lucide Icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
app/                    # Pages & routes
components/
  home/                 # Homepage sections
  layout/               # Nav, footer, sticky CTA
  contact/              # Demo form & contact
  downloads/            # Brochure downloads
  testimonials/         # Testimonial slider
  workflow/             # Clinical workflow timeline
  ui/                   # Shadcn UI components
hooks/                  # Lenis, counter, scroll hooks
lib/                    # Constants, schema, utils
public/
  brochures/            # PDF downloads (replace placeholders)
  images/               # Static assets
styles/                 # Global CSS
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Full marketing homepage |
| `/modules` | Detailed module breakdown |
| `/contact` | Demo booking & contact |
| `/careers` | Job openings |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |

## Customization

- **Brand colors:** `styles/globals.css` (`@theme inline`)
- **Content:** `lib/constants.ts`
- **Brochures:** Replace files in `public/brochures/`
- **Contact info:** Update `siteConfig` in `lib/constants.ts`
- **OG image:** Add `public/images/og-image.jpg`

## SEO

- Metadata in `app/layout.tsx`
- JSON-LD schema in `lib/schema.ts`
- `app/sitemap.ts` and `app/robots.ts` auto-generated
