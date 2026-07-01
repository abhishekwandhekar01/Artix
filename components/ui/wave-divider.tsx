type WaveColor = "white" | "background" | "muted" | "primary" | "surface";

const fills: Record<WaveColor, string> = {
  white: "#ffffff",
  surface: "#ffffff",
  background: "#f8fbfc",
  muted: "#f0f7f9",
  primary: "#1f8a9e",
};

interface WaveProps {
  className?: string;
  flip?: boolean;
  color?: WaveColor;
  height?: "sm" | "md" | "lg";
}

const heights = { sm: "h-8", md: "h-12", lg: "h-16" };

/** Smooth healthcare-style wave — full bleed edge to edge */
export function WaveDivider({
  className = "",
  flip = false,
  color = "background",
  height = "md",
}: WaveProps) {
  return (
    <div
      className={`pointer-events-none w-full overflow-hidden leading-none ${heights[height]} ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 24C180 48 360 0 540 24C720 48 900 0 1080 24C1260 48 1350 24 1440 24V48H0V24Z"
          fill={fills[color]}
        />
        <path
          d="M0 32C240 16 480 40 720 28C960 16 1200 36 1440 28V48H0V32Z"
          fill={fills[color]}
          fillOpacity="0.45"
        />
      </svg>
    </div>
  );
}

export function WaveDividerTop({ color = "background" }: { color?: WaveColor }) {
  return <WaveDivider color={color} flip height="sm" />;
}

/** Section wrapper — consistent spacing & backgrounds */
interface SectionShellProps {
  children: React.ReactNode;
  id?: string;
  variant?: "white" | "default" | "muted" | "primary";
  waveTop?: WaveColor;
  waveBottom?: WaveColor;
  className?: string;
  padding?: "default" | "sm" | "none";
}

const variantClass = {
  white: "section-white",
  default: "section-mesh",
  muted: "section-muted",
  primary: "bg-text text-white",
};

const paddingClass = {
  default: "section-padding",
  sm: "section-padding-sm",
  none: "",
};

export function SectionShell({
  children,
  id,
  variant = "white",
  waveTop,
  waveBottom,
  className = "",
  padding = "default",
}: SectionShellProps) {
  return (
    <section id={id} className={`relative ${variantClass[variant]} ${className}`}>
      {waveTop && <WaveDividerTop color={waveTop} />}
      <div className={`container-wide ${paddingClass[padding]}`}>{children}</div>
      {waveBottom && <WaveDivider color={waveBottom} />}
    </section>
  );
}
