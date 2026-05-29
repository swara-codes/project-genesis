import { DashboardSidebar } from "@/components/genesis/DashboardSidebar";
import { Outlet, createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Gamepad2, Activity, Radar, ScrollText, Settings } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const mobileNav: NavItem[] = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/control", label: "Control", icon: Gamepad2 },
  { to: "/dashboard/telemetry", label: "Telemetry", icon: Activity },
  { to: "/dashboard/sensors", label: "Sensors", icon: Radar },
  { to: "/dashboard/logs", label: "Logs", icon: ScrollText },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];


function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen w-full">
      <div className="fixed inset-0 -z-10 grid-bg opacity-60" />
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main key={pathname} className="flex-1 animate-fade-up pb-24 md:pb-6">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-3 left-3 right-3 z-40 glass-strong rounded-2xl px-2 py-2 flex justify-between">
          {mobileNav.map((i) => {
            const active = i.exact ? pathname === i.to : pathname.startsWith(i.to);
            const Icon = i.icon;
            return (
              <Link
                key={i.to}
                to={i.to as "/dashboard"}
                className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl text-[10px] font-medium transition ${
                  active ? "text-primary bg-primary/10" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{i.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
