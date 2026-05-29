import { createFileRoute } from "@tanstack/react-router";
import { DashboardTopbar } from "@/components/genesis/DashboardTopbar";
import { GlassCard, CardHeader } from "@/components/genesis/GlassCard";
import {
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Square, AlertOctagon, Gamepad2, Route as RouteIcon, Zap,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/control")({
  component: ControlPage,
});

type Dir = "F" | "B" | "L" | "R" | "S" | null;

function CtrlButton({
  icon, label, active, onMouseDown, onMouseUp, variant = "default",
}: {
  icon: React.ReactNode; label: string; active?: boolean;
  onMouseDown?: () => void; onMouseUp?: () => void;
  variant?: "default" | "stop" | "emergency";
}) {
  const base =
    "group relative grid place-items-center rounded-2xl transition-all duration-200 select-none border";
  const palette =
    variant === "emergency"
      ? "bg-destructive/10 border-destructive/40 text-destructive hover:bg-destructive/20"
      : variant === "stop"
      ? "bg-white/5 border-border text-foreground hover:bg-white/10"
      : active
      ? "bg-primary/20 border-primary/60 text-primary glow-cyan"
      : "glass hover:border-primary/40 hover:text-primary";
  return (
    <button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchEnd={onMouseUp}
      className={`${base} ${palette} h-20 w-20 md:h-24 md:w-24`}
    >
      <span className="flex flex-col items-center gap-1">
        <span className="h-7 w-7 grid place-items-center">{icon}</span>
        <span className="text-[10px] font-mono uppercase tracking-widest">{label}</span>
      </span>
    </button>
  );
}

function ControlPage() {
  const [dir, setDir] = useState<Dir>(null);
  const [speed, setSpeed] = useState(60);
  const [mode, setMode] = useState<"RC" | "LINE">("RC");

  const press = (d: Dir) => setDir(d);
  const release = () => setDir(null);

  return (
    <>
      <DashboardTopbar title="Control Center" subtitle="Manual rover operation" />
      <div className="p-5 md:p-8 space-y-6">
        {/* Mode switch */}
        <GlassCard>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Operating Mode</div>
              <div className="mt-1 text-xl font-semibold tracking-tight">
                {mode === "RC" ? "Remote Control" : "Autonomous Line Follower"}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {mode === "RC" ? "Direct joystick / keyboard control of motors." : "Onboard IR-based path tracking."}
              </p>
            </div>
            <div className="flex p-1 rounded-xl glass">
              {(["RC", "LINE"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    mode === m ? "bg-primary text-primary-foreground glow-cyan" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m === "RC" ? <Gamepad2 className="h-4 w-4" /> : <RouteIcon className="h-4 w-4" />}
                  {m === "RC" ? "RC Mode" : "Line Follower"}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* D-pad */}
          <GlassCard className="lg:col-span-2">
            <CardHeader title="Directional Control" subtitle="Hold to move" icon={<Gamepad2 className="h-4 w-4" />} />
            <div className="flex flex-col items-center gap-3 py-4">
              <CtrlButton icon={<ArrowUp className="h-6 w-6" />} label="Forward" active={dir === "F"} onMouseDown={() => press("F")} onMouseUp={release} />
              <div className="flex items-center gap-3">
                <CtrlButton icon={<ArrowLeft className="h-6 w-6" />} label="Left" active={dir === "L"} onMouseDown={() => press("L")} onMouseUp={release} />
                <CtrlButton icon={<Square className="h-5 w-5" />} label="Stop" variant="stop" onMouseDown={() => setDir("S")} onMouseUp={release} active={dir === "S"} />
                <CtrlButton icon={<ArrowRight className="h-6 w-6" />} label="Right" active={dir === "R"} onMouseDown={() => press("R")} onMouseUp={release} />
              </div>
              <CtrlButton icon={<ArrowDown className="h-6 w-6" />} label="Reverse" active={dir === "B"} onMouseDown={() => press("B")} onMouseUp={release} />

              <button
                onClick={() => setDir("S")}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-destructive/10 border border-destructive/40 text-destructive hover:bg-destructive/20 transition font-semibold text-sm"
              >
                <AlertOctagon className="h-4 w-4" />
                EMERGENCY STOP
              </button>
            </div>
          </GlassCard>

          {/* Telemetry & visualization */}
          <div className="space-y-6">
            <GlassCard>
              <CardHeader title="Direction" subtitle="Live vector" icon={<Zap className="h-4 w-4" />} />
              <div className="relative grid place-items-center h-44 rounded-xl bg-white/5 border border-border overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="relative h-28 w-28 rounded-full border border-primary/30">
                  <div className="absolute inset-2 rounded-full border border-primary/20" />
                  <div
                    className="absolute left-1/2 top-1/2 h-12 w-1 bg-gradient-to-t from-primary to-transparent rounded-full origin-bottom transition-transform duration-200 glow-cyan"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${
                        dir === "F" ? 0 : dir === "R" ? 90 : dir === "B" ? 180 : dir === "L" ? 270 : 0
                      }deg)`,
                      opacity: dir && dir !== "S" ? 1 : 0.25,
                    }}
                  />
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary animate-pulse-glow" />
                </div>
              </div>
              <div className="mt-3 flex justify-between text-xs font-mono">
                <span className="text-muted-foreground">VECTOR</span>
                <span className="text-foreground">{dir ?? "IDLE"}</span>
              </div>
            </GlassCard>

            <GlassCard>
              <CardHeader title="Speed" subtitle="motor PWM" />
              <div className="flex items-end justify-between mb-3">
                <div className="text-4xl font-semibold tracking-tight">{speed}<span className="text-base text-muted-foreground ml-1">%</span></div>
                <div className="text-xs font-mono text-muted-foreground">{Math.round(speed * 2.55)} / 255</div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={speed}
                onChange={(e) => setSpeed(+e.target.value)}
                className="w-full accent-[var(--cyan-glow)]"
              />
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                {[
                  ["Throttle", `${speed}%`],
                  ["Torque", `${Math.round(speed * 0.6)}Nm`],
                  ["RPM", `${speed * 24}`],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-white/5 border border-border p-2">
                    <div className="text-muted-foreground">{k}</div>
                    <div className="text-sm font-semibold font-sans">{v}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </>
  );
}
