import { createFileRoute } from "@tanstack/react-router";
import { DashboardTopbar } from "@/components/genesis/DashboardTopbar";
import { GlassCard, CardHeader } from "@/components/genesis/GlassCard";
import { batterySeries, speedSeries, sensorSeries, cpuSeries } from "@/lib/mock-data";
import { Activity, Cpu, Gauge, TrendingUp } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export const Route = createFileRoute("/dashboard/telemetry")({
  component: TelemetryPage,
});

const tooltip = {
  contentStyle: {
    background: "oklch(0.18 0.025 250 / 0.95)",
    border: "1px solid oklch(1 0 0 / 0.1)",
    borderRadius: 10,
    fontSize: 12,
  },
};

function TelemetryPage() {
  return (
    <>
      <DashboardTopbar title="Telemetry & Analytics" subtitle="Real-time engineering metrics" />
      <div className="p-5 md:p-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Distance", v: "1.42", u: "km", t: "▲ 8% today" },
            { label: "Avg speed", v: "38", u: "cm/s", t: "▲ stable" },
            { label: "Runtime", v: "04:18", u: "h", t: "session 2" },
            { label: "Packets", v: "128k", u: "rx", t: "▲ 99.8% ok" },
          ].map((s) => (
            <GlassCard key={s.label}>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-3xl font-semibold tracking-tight">{s.v}</span>
                <span className="text-xs text-muted-foreground">{s.u}</span>
              </div>
              <div className="mt-2 text-[10px] font-mono text-success">{s.t}</div>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2">
            <CardHeader title="Speed profile" subtitle="vs target" icon={<Gauge className="h-4 w-4" />} />
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={speedSeries}>
                  <defs>
                    <linearGradient id="sp" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyan-glow)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--cyan-glow)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="t" stroke="oklch(0.6 0.03 240)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.03 240)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <Area dataKey="speed" stroke="var(--cyan-glow)" strokeWidth={2} fill="url(#sp)" />
                  <Line dataKey="target" stroke="var(--purple-glow)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard>
            <CardHeader title="System load" subtitle="CPU / Memory" icon={<Cpu className="h-4 w-4" />} />
            <div className="h-64">
              <ResponsiveContainer>
                <LineChart data={cpuSeries}>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="t" hide />
                  <YAxis stroke="oklch(0.6 0.03 240)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <Line dataKey="cpu" stroke="var(--cyan-glow)" strokeWidth={2} dot={false} />
                  <Line dataKey="mem" stroke="var(--purple-glow)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <CardHeader title="Battery trend" subtitle="24h" icon={<TrendingUp className="h-4 w-4" />} />
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={batterySeries}>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="t" stroke="oklch(0.6 0.03 240)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.03 240)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <Bar dataKey="percent" fill="var(--cyan-glow)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard>
            <CardHeader title="IR sensor activity" subtitle="3-channel" icon={<Activity className="h-4 w-4" />} />
            <div className="h-64">
              <ResponsiveContainer>
                <LineChart data={sensorSeries}>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="t" stroke="oklch(0.6 0.03 240)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.6 0.03 240)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltip} />
                  <Line dataKey="ir1" stroke="var(--cyan-glow)" strokeWidth={2} dot={false} />
                  <Line dataKey="ir2" stroke="var(--purple-glow)" strokeWidth={2} dot={false} />
                  <Line dataKey="ir3" stroke="var(--success)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
