import { createFileRoute } from "@tanstack/react-router";
import { DashboardTopbar } from "@/components/genesis/DashboardTopbar";
import { GlassCard, CardHeader } from "@/components/genesis/GlassCard";
import { Radar, Eye, Waves, Thermometer, Gauge } from "lucide-react";
import { sensorSeries } from "@/lib/mock-data";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/dashboard/sensors")({
  component: SensorsPage,
});

function IRChannel({ label, value, max = 1023 }: { label: string; value: number; max?: number }) {
  const pct = (value / max) * 100;
  const triggered = value > 600;
  return (
    <div className="rounded-xl glass p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
        <span
          className={`h-2 w-2 rounded-full ${triggered ? "bg-accent animate-pulse-glow" : "bg-success/60"}`}
        />
      </div>
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-3 h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${triggered ? "bg-accent" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 text-[10px] font-mono text-muted-foreground">{triggered ? "LINE DETECTED" : "clear"}</div>
    </div>
  );
}

function SensorsPage() {
  const latest = sensorSeries[sensorSeries.length - 1];
  return (
    <>
      <DashboardTopbar title="Sensor Monitor" subtitle="Diagnostics & live values" />
      <div className="p-5 md:p-8 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2">
            <CardHeader title="IR Array" subtitle="line-follower sensors" icon={<Radar className="h-4 w-4" />} />

            {/* Rover schematic with sensor dots */}
            <div className="relative h-44 rounded-xl border border-border bg-white/5 grid place-items-center mb-5 overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div className="relative w-56 h-24 rounded-2xl border border-primary/30 bg-background/40">
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-6">
                  {[latest.ir1, latest.ir2, latest.ir3].map((v, i) => (
                    <div
                      key={i}
                      className={`h-4 w-4 rounded-full border-2 ${
                        v > 600 ? "border-accent bg-accent/60 animate-pulse-glow" : "border-primary bg-primary/40"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute top-2 left-2 text-[9px] font-mono text-muted-foreground">GENESIS-01</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <IRChannel label="IR · Left" value={latest.ir1} />
              <IRChannel label="IR · Center" value={latest.ir2} />
              <IRChannel label="IR · Right" value={latest.ir3} />
            </div>
          </GlassCard>

          <GlassCard>
            <CardHeader title="Sensor Health" subtitle="diagnostics" icon={<Eye className="h-4 w-4" />} />
            <ul className="space-y-3 text-sm">
              {[
                { name: "IR Array (3ch)", status: "Operational", ok: true },
                { name: "IMU · MPU-6050", status: "Nominal", ok: true },
                { name: "Voltage Sensor", status: "Nominal", ok: true },
                { name: "Ultrasonic HC-SR04", status: "Not connected", ok: false },
                { name: "Camera Module", status: "Reserved", ok: false },
              ].map((s) => (
                <li key={s.name} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-border">
                  <span className="text-foreground">{s.name}</span>
                  <span className={`text-[10px] font-mono px-2 py-1 rounded ${
                    s.ok ? "text-success bg-success/10 border border-success/30" : "text-muted-foreground bg-white/5"
                  }`}>{s.status}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: <Waves className="h-4 w-4" />, label: "Ultrasonic", value: "—", note: "Hardware not connected", placeholder: true },
            { icon: <Thermometer className="h-4 w-4" />, label: "Temperature", value: "42.6°C", note: "Within range" },
            { icon: <Gauge className="h-4 w-4" />, label: "IMU Tilt", value: "2.4°", note: "Stable surface" },
          ].map((s) => (
            <GlassCard key={s.label} className={s.placeholder ? "opacity-70" : ""}>
              <CardHeader title={s.label} subtitle="module" icon={s.icon} />
              <div className="text-3xl font-semibold tracking-tight">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.note}</div>
              {!s.placeholder && (
                <div className="mt-4 h-16">
                  <ResponsiveContainer>
                    <AreaChart data={sensorSeries}>
                      <defs>
                        <linearGradient id={`g-${s.label}`} x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="var(--cyan-glow)" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="var(--cyan-glow)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip contentStyle={{ background: "oklch(0.18 0.025 250 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 10, fontSize: 12 }} />
                      <Area dataKey="ir2" stroke="var(--cyan-glow)" strokeWidth={2} fill={`url(#g-${s.label})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </>
  );
}
