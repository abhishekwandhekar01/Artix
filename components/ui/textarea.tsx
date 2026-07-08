import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[96px] sm:min-h-[100px] w-full rounded-xl border border-primary/10 bg-white/80 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-text shadow-sm backdrop-blur-sm transition-colors placeholder:text-gray/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };