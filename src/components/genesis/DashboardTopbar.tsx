import { Bell, Search, Wifi, Power } from "lucide-react";

export function DashboardTopbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 h-16 px-5 md:px-8 border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="min-w-0">
        <h1 className="text-lg md:text-xl font-semibold tracking-tight truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
      </div>

      <div className="ml-auto hidden lg:flex items-center gap-2 px-3 h-9 w-72 rounded-lg glass text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        <input
          placeholder="Search modules, sensors, logs…"
          className="bg-transparent outline-none flex-1 placeholder:text-muted-foreground/70 text-foreground"
        />
        <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border text-muted-foreground">⌘K</kbd>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-lg glass">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success/60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-xs font-mono text-foreground">ROVER ONLINE</span>
          <Wifi className="h-3.5 w-3.5 text-success" />
        </div>

        <button className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/5 transition relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>

        <button className="grid h-9 w-9 place-items-center rounded-lg glass hover:bg-destructive/20 hover:text-destructive transition" title="Disconnect">
          <Power className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
