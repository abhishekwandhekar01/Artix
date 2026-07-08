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
  sm: "h-48 sm:h-52",
  md: "h-56 sm:h-64",
  lg: "h-64 sm:h-72 lg:h-80",
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
      whileHover={{ y: -4 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      className={cn(
        "glass-card group relative cursor-default overflow-hidden rounded-2xl",
        sizeHeights[size],
        className
      )}
    >
      <SafeImage
        src={image}
        fallbackSrc={fallback}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-text via-text/40 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />

      <div className="absolute inset-0 shine-border opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
        {badge && (
          <span className="mb-2 inline-block rounded-lg bg-accent px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-text sm:text-[10px]">
            {badge}
          </span>
        )}

        <h3 className="break-words text-lg font-bold text-white sm:text-xl">
          {title}
        </h3>

        {description && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/75 sm:mt-2">
            {description}
          </p>
        )}
      </div>
    </motion.article>
  );
}