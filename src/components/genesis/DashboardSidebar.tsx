import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Gamepad2,
  Activity,
  Radar,
  ScrollText,
  Settings,
  ChevronLeft,
  Cpu,
} from "lucide-react";
import { useState } from "react";
import { GenesisLogo } from "./Logo";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const navItems: NavItem[] = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/control", label: "Control Center", icon: Gamepad2 },
  { to: "/dashboard/telemetry", label: "Telemetry", icon: Activity },
  { to: "/dashboard/sensors", label: "Sensors", icon: Radar },
  { to: "/dashboard/logs", label: "Activity & Logs", icon: ScrollText },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];


export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={`relative shrink-0 transition-[width] duration-300 ease-out ${
        collapsed ? "w-[72px]" : "w-64"
      } hidden md:flex flex-col glass-strong border-r border-sidebar-border`}
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
        {!collapsed ? (
          <GenesisLogo />
        ) : (
          <div className="mx-auto grid h-9 w-9 place-items-center rounded-lg glass glow-cyan text-primary">
            <Cpu className="h-4 w-4" />
          </div>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to as "/dashboard"}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-primary/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r bg-primary shadow-[0_0_12px_var(--primary)]" />
              )}
              <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-primary" : ""}`} />
              {!collapsed && <span className="font-medium truncate">{item.label}</span>}
              {!collapsed && active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="p-3 mx-3 mb-4 rounded-xl glass border border-primary/20 relative overflow-hidden animate-scan">
          <div className="text-[10px] font-mono uppercase tracking-widest text-primary/80">Firmware</div>
          <div className="mt-1 text-sm font-semibold text-foreground">Genesis v0.9.4</div>
          <div className="mt-1 text-xs text-muted-foreground">ESP32 · stable channel</div>
        </div>
      )}
    </aside>
  );
}
