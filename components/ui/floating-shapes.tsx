"use client";

interface FloatingShapesProps {
  variant?: "hero" | "section" | "dark";
}

export function FloatingShapes({ variant = "hero" }: FloatingShapesProps) {
  const isDark = variant === "dark";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Large gradient orb */}
      <div
        className={`absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full blur-3xl ${
          isDark ? "bg-primary-light/20" : "bg-primary/10"
        }`}
      />

      {/* Accent orb */}
      <div
        className={`absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full blur-3xl ${
          isDark ? "bg-accent/15" : "bg-accent/10"
        }`}
      />

      {/* Floating ring */}
      <div
        className={`absolute right-[15%] top-[20%] h-24 w-24 rounded-full border-2 ${
          isDark ? "border-white/10" : "border-primary/15"
        } animate-float-slow`}
      />

      {/* Floating square */}
      <div
        className={`absolute left-[10%] top-[35%] h-16 w-16 rotate-45 rounded-2xl border ${
          isDark ? "border-primary-light/20 bg-primary/10" : "border-primary/10 bg-primary/5"
        } animate-float-delayed`}
      />

      {/* Small dots cluster */}
      <div className="absolute right-[25%] bottom-[30%] flex gap-2 animate-float-slow">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${isDark ? "bg-primary-light/40" : "bg-primary/25"}`}
            style={{ opacity: 1 - i * 0.25 }}
          />
        ))}
      </div>

      {/* Plus shape */}
      <svg
        className={`absolute left-[20%] bottom-[20%] h-8 w-8 animate-float-delayed ${
          isDark ? "text-white/10" : "text-primary/20"
        }`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M11 5h2v14h-2V5zm-7 7h14v2H4v-2z" />
      </svg>

      {/* Circle outline */}
      <div
        className={`absolute right-[8%] top-[55%] h-32 w-32 rounded-full border ${
          isDark ? "border-white/5" : "border-primary/8"
        } animate-float-slow`}
      />
    </div>
  );
}

export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.35] ${className}`}
      aria-hidden
      style={{
        backgroundImage: `radial-gradient(circle, rgba(31,138,158,0.15) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    />
  );
}

export function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(31,138,158,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,177,42,0.06),transparent_50%)]" />
    </div>
  );
}
