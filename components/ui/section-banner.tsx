"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { cn } from "@/lib/utils";

interface SectionBannerProps {
  image: string;
  fallback?: string;
  alt?: string;
  children: React.ReactNode;
  className?: string;
  overlay?: "dark" | "brand" | "light";
  height?: "md" | "lg" | "auto";
}

const overlayClass = {
  dark: "from-text/90 via-text/70 to-text/85",
  brand: "from-primary-dark/95 via-primary/85 to-primary-dark/90",
  light: "from-text/80 via-primary-dark/60 to-text/75",
};

const heightClass = {
  md: "min-h-[320px]",
  lg: "min-h-[420px]",
  auto: "min-h-0",
};

export function SectionBanner({
  image,
  fallback,
  alt = "",
  children,
  className,
  overlay = "brand",
  height = "auto",
}: SectionBannerProps) {
  return (
    <div className={cn("relative overflow-hidden", heightClass[height], className)}>
      <div className="absolute inset-0">
        <SafeImage
        src={image}
        fallbackSrc={fallback}
        alt={alt}
        fill
        className="object-cover scale-105"
        sizes="100vw"
        />
      </div>
      <div className={cn("absolute inset-0 bg-gradient-to-br", overlayClass[overlay])} />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJWNHloMnY0em0tNiA2aC00VjIwaDR2NGgtNHYyaDR2LTJ6bTAgNGgtNHYyaDR2LTJ6bTEwLTZoLTJ2LTRoMnY0em0wLTZoLTJWNHloMnY0em0tNiA2aC00VjIwaDR2NGgtNHYyaDR2LTJ6bTAgNGgtNHYyaDR2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
