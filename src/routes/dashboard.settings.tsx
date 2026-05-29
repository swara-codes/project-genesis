import { createFileRoute } from "@tanstack/react-router";
import { DashboardTopbar } from "@/components/genesis/DashboardTopbar";
import { GlassCard, CardHeader } from "@/components/genesis/GlassCard";
import { Bell, Cpu, Palette, Settings as SettingsIcon, User, Wifi } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-primary" : "bg-white/10"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-all ${on ? "left-[22px] glow-cyan" : "left-0.5"}`} />
    </button>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {hint && <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function SettingsPage() {
  const [notif, setNotif] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [telemetry, setTelemetry] = useState(true);
  const [autoConnect, setAutoConnect] = useState(false);

  return (
    <>
      <DashboardTopbar title="Settings" subtitle="System · profile · preferences" />
      <div className="p-5 md:p-8 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard>
            <CardHeader title="Profile" subtitle="operator" icon={<User className="h-4 w-4" />} />
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground font-bold text-lg">G</div>
              <div>
                <div className="text-sm font-semibold">Genesis Operator</div>
                <div className="text-xs text-muted-foreground font-mono">operator@genesis.local</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <input className="rounded-lg glass px-3 py-2 text-sm outline-none focus:border-primary/40" defaultValue="Genesis" />
              <input className="rounded-lg glass px-3 py-2 text-sm outline-none focus:border-primary/40" defaultValue="Operator" />
            </div>
          </GlassCard>

          <GlassCard className="lg:col-span-2">
            <CardHeader title="Rover Configuration" subtitle="hardware" icon={<Cpu className="h-4 w-4" />} />
            <Row label="Device ID" hint="ESP32 unique identifier">
              <code className="text-xs font-mono text-muted-foreground">GEN-01-A4F2</code>
            </Row>
            <Row label="Default Mode" hint="On boot">
              <select className="rounded-lg glass px-3 py-1.5 text-sm">
                <option>RC Mode</option>
                <option>Line Follower</option>
              </select>
            </Row>
            <Row label="Max Speed" hint="Motor PWM ceiling">
              <input type="range" min={0} max={100} defaultValue={80} className="accent-[var(--cyan-glow)] w-40" />
            </Row>
            <Row label="Telemetry Rate" hint="Hz">
              <select className="rounded-lg glass px-3 py-1.5 text-sm">
                <option>16 Hz</option>
                <option>32 Hz</option>
                <option>64 Hz</option>
              </select>
            </Row>
          </GlassCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard>
            <CardHeader title="Notifications" subtitle="alerts" icon={<Bell className="h-4 w-4" />} />
            <Row label="Push notifications"><Toggle on={notif} onChange={setNotif} /></Row>
            <Row label="Critical alerts"><Toggle on={alerts} onChange={setAlerts} /></Row>
            <Row label="Telemetry digest"><Toggle on={telemetry} onChange={setTelemetry} /></Row>
          </GlassCard>

          <GlassCard>
            <CardHeader title="Connectivity" subtitle="link" icon={<Wifi className="h-4 w-4" />} />
            <Row label="Auto-connect on launch"><Toggle on={autoConnect} onChange={setAutoConnect} /></Row>
            <Row label="Wi-Fi SSID"><span className="text-xs font-mono text-muted-foreground">genesis-mesh</span></Row>
            <Row label="Channel"><span className="text-xs font-mono text-muted-foreground">0x1A</span></Row>
          </GlassCard>

          <GlassCard>
            <CardHeader title="Appearance" subtitle="theme" icon={<Palette className="h-4 w-4" />} />
            <Row label="Theme">
              <div className="flex gap-2">
                <button className="h-7 w-7 rounded-lg border-2 border-primary glow-cyan bg-background" />
                <button className="h-7 w-7 rounded-lg border border-border bg-white opacity-50" />
              </div>
            </Row>
            <Row label="Accent">
              <div className="flex gap-2">
                <button className="h-6 w-6 rounded-full bg-primary border-2 border-primary glow-cyan" />
                <button className="h-6 w-6 rounded-full bg-accent border border-border" />
                <button className="h-6 w-6 rounded-full bg-success border border-border" />
              </div>
            </Row>
          </GlassCard>
        </div>

        <GlassCard>
          <CardHeader title="System" subtitle="firmware & data" icon={<SettingsIcon className="h-4 w-4" />} />
          <div className="grid gap-3 md:grid-cols-3">
            <button className="rounded-xl glass px-4 py-3 text-sm hover:border-primary/40 transition text-left">
              <div className="font-medium">Check for updates</div>
              <div className="text-xs text-muted-foreground mt-0.5">Firmware v0.9.4 · current</div>
            </button>
            <button className="rounded-xl glass px-4 py-3 text-sm hover:border-primary/40 transition text-left">
              <div className="font-medium">Calibrate sensors</div>
              <div className="text-xs text-muted-foreground mt-0.5">Re-baseline IR array</div>
            </button>
            <button className="rounded-xl glass px-4 py-3 text-sm hover:border-destructive/40 hover:text-destructive transition text-left">
              <div className="font-medium">Factory reset</div>
              <div className="text-xs text-muted-foreground mt-0.5">Erase configuration</div>
            </button>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
