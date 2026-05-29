import { createFileRoute } from "@tanstack/react-router";
import { DashboardTopbar } from "@/components/genesis/DashboardTopbar";
import { GlassCard, CardHeader } from "@/components/genesis/GlassCard";
import { activityLogs, LogLevel } from "@/lib/mock-data";
import { AlertTriangle, CheckCircle2, Info, ScrollText, XCircle } from "lucide-react";

export const Route = createFileRoute("/dashboard/logs")({
  component: LogsPage,
});

const levelMeta: Record<LogLevel, { icon: React.ReactNode; color: string; bg: string }> = {
  info: { icon: <Info className="h-4 w-4" />, color: "text-primary", bg: "bg-primary/10 border-primary/30" },
  success: { icon: <CheckCircle2 className="h-4 w-4" />, color: "text-success", bg: "bg-success/10 border-success/30" },
  warn: { icon: <AlertTriangle className="h-4 w-4" />, color: "text-warning", bg: "bg-warning/10 border-warning/30" },
  error: { icon: <XCircle className="h-4 w-4" />, color: "text-destructive", bg: "bg-destructive/10 border-destructive/30" },
};

function LogsPage() {
  return (
    <>
      <DashboardTopbar title="Activity & Logs" subtitle="System events · live feed" />
      <div className="p-5 md:p-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { label: "Events", value: "1,284", t: "▲ 12 today" },
            { label: "Warnings", value: "3", t: "last hour" },
            { label: "Errors", value: "1", t: "ultrasonic" },
            { label: "Uptime", value: "04:18", t: "session" },
          ].map((s) => (
            <GlassCard key={s.label}>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className="mt-2 text-2xl font-semibold">{s.value}</div>
              <div className="mt-1 text-[10px] font-mono text-muted-foreground">{s.t}</div>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2">
            <CardHeader title="Event Timeline" subtitle="newest first" icon={<ScrollText className="h-4 w-4" />} />
            <div className="relative pl-6">
              <span className="absolute left-2 top-1 bottom-1 w-px bg-border" />
              <ul className="space-y-3">
                {activityLogs.map((log, i) => {
                  const m = levelMeta[log.level];
                  return (
                    <li key={i} className="relative">
                      <span className={`absolute -left-[18px] top-2 h-3 w-3 rounded-full border-2 ${m.color.replace("text-", "border-")} bg-background`} />
                      <div className={`rounded-xl border ${m.bg} p-3 flex items-start gap-3`}>
                        <span className={m.color}>{m.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
                            <span className="text-muted-foreground">{log.time}</span>
                            <span className={m.color}>{log.source}</span>
                          </div>
                          <div className="mt-1 text-sm">{log.message}</div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </GlassCard>

          <div className="space-y-6">
            <GlassCard>
              <CardHeader title="Alerts" subtitle="active" icon={<AlertTriangle className="h-4 w-4" />} />
              <div className="space-y-2">
                <div className="rounded-lg p-3 border border-warning/30 bg-warning/5">
                  <div className="text-xs font-mono text-warning">BATTERY · WARN</div>
                  <div className="text-sm mt-1">Voltage trending below 7.3V threshold</div>
                </div>
                <div className="rounded-lg p-3 border border-destructive/30 bg-destructive/5">
                  <div className="text-xs font-mono text-destructive">SENSOR · ERROR</div>
                  <div className="text-sm mt-1">Ultrasonic HC-SR04 module not detected</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <CardHeader title="Connection History" subtitle="link quality" />
              <ul className="space-y-2 text-sm">
                {[
                  ["14:30", "Connected · -52 dBm"],
                  ["13:12", "Reconnected · -58 dBm"],
                  ["12:48", "Dropout · 1.2s"],
                  ["12:00", "Connected · -49 dBm"],
                ].map(([t, msg]) => (
                  <li key={t} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-border">
                    <span className="font-mono text-xs text-muted-foreground">{t}</span>
                    <span>{msg}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </>
  );
}
