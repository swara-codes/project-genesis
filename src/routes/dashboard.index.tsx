import { createFileRoute } from "@tanstack/react-router";
import { DashboardTopbar } from "@/components/genesis/DashboardTopbar";
import { GlassCard, CardHeader } from "@/components/genesis/GlassCard";
import { batterySeries, speedSeries, sensorSeries } from "@/lib/mock-data";
import {
  Activity,
  BatteryCharging,
  Cpu,
  Gauge,
  Radio,
  Signal,
  ThermometerSun,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/dashboard/")({
  component: OverviewPage,
});

function Stat({
  icon,
  label,
  value,
  unit,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  trend?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20">
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-xl font-semibold tracking-tight">
          {value}
          {unit && <span className="text-xs text-muted-foreground ml-1 font-normal">{unit}</span>}
        </div>
        {trend && <div className="text-[10px] text-success font-mono mt-0.5">{trend}</div>}
      </div>
    </div>
  );
}

function OverviewPage() {
  return (
    <>
      <DashboardTopbar title="Overview" subtitle="System status · command center" />
      <div className="p-5 md:p-8 space-y-6">
        {/* Top row - Rover Status hero */}
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2 overflow-hidden" glow>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Rover Status</div>
                <div className="mt-1 flex items-center gap-3">
                  <h2 className="text-2xl font-semibold tracking-tight">GENESIS-01</h2>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-success/10 text-success text-[11px] font-mono border border-success/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
                    ONLINE
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Idle · awaiting command · last move 00:02:14 ago</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-mono border border-accent/30">
                  MODE: LINE FOLLOWER
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <Stat icon={<Gauge className="h-5 w-5" />} label="Speed" value="0" unit="cm/s" />
              <Stat icon={<Signal className="h-5 w-5" />} label="Signal" value="-52" unit="dBm" trend="▲ excellent" />
              <Stat icon={<ThermometerSun className="h-5 w-5" />} label="Core temp" value="42.6" unit="°C" />
              <Stat icon={<Cpu className="h-5 w-5" />} label="CPU load" value="37" unit="%" />
            </div>

            <div className="mt-6 h-32">
              <ResponsiveContainer>
                <AreaChart data={speedSeries}>
                  <defs>
                    <linearGradient id="ovSpeed" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyan-glow)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="var(--cyan-glow)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="speed" stroke="var(--cyan-glow)" strokeWidth={2} fill="url(#ovSpeed)" />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.18 0.025 250 / 0.95)",
                      border: "1px solid oklch(1 0 0 / 0.1)",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Battery */}
          <GlassCard>
            <CardHeader title="Battery" subtitle="Power module" icon={<BatteryCharging className="h-4 w-4" />} />
            <div className="flex items-end justify-between">
              <div>
                <div className="text-5xl font-semibold tracking-tight text-glow-cyan">78<span className="text-2xl text-muted-foreground">%</span></div>
                <div className="text-xs text-muted-foreground mt-1 font-mono">7.41 V · 1.2 A draw</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">Est. runtime</div>
                <div className="text-lg font-semibold">2h 14m</div>
              </div>
            </div>
            <div className="mt-5 h-3 rounded-full bg-white/5 overflow-hidden border border-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent relative animate-scan"
                style={{ width: "78%" }}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {["Cell 1", "Cell 2", "Cell 3"].map((c, i) => (
                <div key={c} className="rounded-lg bg-white/5 border border-border p-2">
                  <div className="text-[9px] font-mono text-muted-foreground">{c}</div>
                  <div className="text-sm font-semibold">{[2.47, 2.46, 2.48][i]}V</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Health row */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Connection", value: "STABLE", icon: <Radio className="h-4 w-4" />, accent: "success" },
            { label: "Telemetry", value: "32 Hz", icon: <Activity className="h-4 w-4" />, accent: "primary" },
            { label: "Motors", value: "ARMED", icon: <Zap className="h-4 w-4" />, accent: "accent" },
            { label: "Sensors", value: "3 / 3", icon: <Radio className="h-4 w-4" />, accent: "success" },
          ].map((s) => (
            <GlassCard key={s.label}>
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</div>
                <div className="text-muted-foreground">{s.icon}</div>
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">{s.value}</div>
              <div className={`mt-3 h-1 rounded-full bg-${s.accent}/60 w-full opacity-70`} />
            </GlassCard>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2">
            <CardHeader title="Battery performance" subtitle="last 24 hours" icon={<BatteryCharging className="h-4 w-4" />} />
            <div className="h-56">
              <ResponsiveContainer>
                <AreaChart data={batterySeries}>
                  <defs>
                    <linearGradient id="bat" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyan-glow)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--cyan-glow)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" stroke="oklch(0.6 0.03 240)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.03 240)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.18 0.025 250 / 0.95)",
                      border: "1px solid oklch(1 0 0 / 0.1)",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Area dataKey="percent" stroke="var(--cyan-glow)" strokeWidth={2} fill="url(#bat)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard>
            <CardHeader title="Sensor preview" subtitle="IR array" icon={<Radio className="h-4 w-4" />} />
            <div className="h-56">
              <ResponsiveContainer>
                <LineChart data={sensorSeries}>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={[200, 800]} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.18 0.025 250 / 0.95)",
                      border: "1px solid oklch(1 0 0 / 0.1)",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Line dataKey="ir1" stroke="var(--cyan-glow)" dot={false} strokeWidth={2} />
                  <Line dataKey="ir2" stroke="var(--purple-glow)" dot={false} strokeWidth={2} />
                  <Line dataKey="ir3" stroke="var(--success)" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
