"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export function SafeImage({
  src,
 fallbackSrc,
  alt,
  className,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center rounded-inherit bg-gradient-to-br from-primary/10 to-primary-light/10 p-4",
          className
        )}
        role="img"
        aria-label={alt}
      >
        <div className="text-center">
          <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-primary/20 sm:h-10 sm:w-10" />
          <p className="text-[11px] sm:text-xs font-medium text-primary/60 break-words">
            {alt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}