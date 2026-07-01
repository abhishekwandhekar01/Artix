"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  image: string;
  fallback?: string;
  alt: string;
  title: string;
  description?: string;
  badge?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

const sizeHeights = {
  sm: "h-52",
  md: "h-64",
  lg: "h-80",
};

export function ImageCard({
  image,
  fallback,
  alt,
  title,
  description,
  badge,
  className,
  size = "md",
}: ImageCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn("glass-card group relative cursor-default", sizeHeights[size], className)}
    >
      <SafeImage
        src={image}
        fallbackSrc={fallback}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width:768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-text via-text/40 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
      <div className="absolute inset-0 shine-border opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        {badge && (
          <span className="mb-2 inline-block rounded-lg bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-text">
            {badge}
          </span>
        )}
        <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
        {description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">{description}</p>
        )}
      </div>
    </motion.article>
  );
}
