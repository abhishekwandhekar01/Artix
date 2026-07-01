import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";

const LOGO_SRC = "/images/artixlogo.png";

interface BrandLogoProps {
  variant?: "header" | "footer";
  className?: string;
  onClick?: () => void;
}

export function BrandLogo({ variant = "header", className, onClick }: BrandLogoProps) {
  const isHeader = variant === "header";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "group inline-flex shrink-0 items-center transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        className
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src={LOGO_SRC}
        alt={siteConfig.name}
        width={140}
        height={48}
        className={cn(
          "w-auto object-contain object-left",
          isHeader ? "h-8 sm:h-9" : "h-9 sm:h-10"
        )}
        priority={isHeader}
        sizes="140px"
      />
    </Link>
  );
}
