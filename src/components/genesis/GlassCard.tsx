import { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl glass p-5 transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5 ${
        glow ? "glow-cyan" : ""
      } ${className}`}
    >
      <span className="pointer-events-none absolute inset-px rounded-[15px] bg-gradient-to-b from-white/5 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  icon,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">{subtitle}</div>
          <div className="text-base font-semibold tracking-tight truncate">{title}</div>
        </div>
      </div>
      {action}
    </div>
  );
}
