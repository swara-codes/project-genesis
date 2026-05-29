import { Cog } from "lucide-react";

export function GenesisLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative grid h-9 w-9 place-items-center rounded-full glass glow-cyan">
        <Cog className="h-5 w-5 text-primary" strokeWidth={1.8} />
        <span className="absolute -inset-px rounded-full border border-primary/30" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">Project</span>
        <span className="text-sm font-semibold tracking-wide text-foreground">GENESIS</span>
      </div>
    </div>
  );
}
