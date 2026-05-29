import { createFileRoute, Link } from "@tanstack/react-router";
import roverImg from "@/assets/rover-hero.jpg";
import { GenesisLogo } from "@/components/genesis/Logo";
import {
  ArrowRight, Cpu, Activity, Radar, Sparkles, ShieldCheck, Wifi, Zap, Github,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Genesis — Futuristic Rover Operating System" },
      { name: "description", content: "Genesis is an ESP32-powered RC + Line Follower rover ecosystem with engineering-grade telemetry, control, and AI-ready dashboard." },
      { property: "og:title", content: "Genesis — Rover Operating System" },
      { property: "og:description", content: "An AI-ready engineering command center for autonomous and remote rover operation." },
    ],
  }),
  component: Landing,
});

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`relative mx-auto w-full max-w-7xl px-5 md:px-8 ${className}`}>{children}</section>;
}

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10 grid-bg opacity-50" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80%] h-[420px] -z-10 blur-3xl opacity-50 bg-[radial-gradient(ellipse_at_center,var(--cyan-glow)_0%,transparent_60%)]" />

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/50 border-b border-border">
        <Section className="flex items-center h-16">
          <GenesisLogo />
          <nav className="hidden md:flex items-center gap-7 ml-10 text-sm text-muted-foreground">
            <a href="#hardware" className="hover:text-foreground transition">Hardware</a>
            <a href="#dashboard" className="hover:text-foreground transition">Dashboard</a>
            <a href="#ai" className="hover:text-foreground transition">AI Roadmap</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a href="#" className="hidden sm:grid h-9 w-9 place-items-center rounded-lg glass hover:bg-white/5 transition text-muted-foreground hover:text-foreground">
              <Github className="h-4 w-4" />
            </a>
            <Link
              to="/dashboard"
              className="group relative inline-flex rounded-full bg-gradient-to-r from-primary to-accent p-px transition hover:shadow-[0_0_24px_-4px_var(--cyan-glow)]"
            >
              <span className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-background/80 backdrop-blur-md text-sm font-medium transition group-hover:bg-background/60">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Launch Dashboard
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
              </span>
            </Link>
          </div>
        </Section>
      </header>

      {/* Hero */}
      <Section className="pt-16 md:pt-24 pb-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono uppercase tracking-widest text-primary border border-primary/30">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              v0.9.4 · ESP32 Edition
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight leading-[1.05] md:text-7xl">
              Project
              <span className="block bg-gradient-to-r from-cyan-glow via-accent to-purple-glow bg-clip-text text-transparent text-glow-cyan">
                Genesis
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl whitespace-pre-line">
              A modular RC and line-follower rover ecosystem - engineered with{"\n"}real-time telemetry, multi-sensor fusion and an AI-ready command{"\n"}interface.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="group relative inline-flex rounded-full bg-gradient-to-r from-primary to-accent p-px transition hover:shadow-[0_0_24px_-4px_var(--cyan-glow)]"
              >
                <span className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-background/80 backdrop-blur-md font-medium transition group-hover:bg-background/60">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Open Command Center
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </span>
              </Link>
              <a href="#hardware" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl glass hover:border-primary/40 transition">
                View hardware
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 max-w-md gap-4">
              {[
                ["32 Hz", "telemetry"],
                ["3 ch", "IR sensors"],
                ["< 50ms", "control loop"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-2xl font-semibold tracking-tight">{v}</div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,var(--cyan-glow)_0%,transparent_60%)] opacity-30 blur-3xl" />
            <div className="relative rounded-3xl glass overflow-hidden glow-cyan animate-float">
              <img
                src={roverImg}
                alt="Genesis rover"
                width={1536}
                height={1152}
                className="w-full h-auto"
              />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md glass-strong text-[10px] font-mono uppercase tracking-widest text-primary">
                  ◉ Live · GENESIS-01
                </span>
                <span className="px-2.5 py-1 rounded-md glass-strong text-[10px] font-mono uppercase tracking-widest text-success">
                  ONLINE
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                {[
                  ["BATT", "78%"],
                  ["TEMP", "42.6°"],
                  ["SIG", "-52dB"],
                ].map(([k, v]) => (
                  <div key={k} className="flex-1 glass-strong rounded-lg px-2.5 py-1.5">
                    <div className="text-[9px] font-mono text-muted-foreground">{k}</div>
                    <div className="text-xs font-semibold">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Hardware */}
      <Section className="py-20" >
        <div id="hardware" className="text-center max-w-2xl mx-auto">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Hardware</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Engineered on ESP32.</h2>
          <p className="mt-3 text-muted-foreground">
            A modular hardware stack designed for reliable telemetry and clean expansion paths.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <Cpu className="h-5 w-5" />, title: "ESP32 Core", desc: "Dual-core MCU with Wi-Fi + BLE for real-time control." },
            { icon: <Radar className="h-5 w-5" />, title: "IR Array", desc: "3-channel line-follower with calibrated baselines." },
            { icon: <Zap className="h-5 w-5" />, title: "Motor Driver", desc: "PWM dual H-bridge with current sensing." },
            { icon: <Wifi className="h-5 w-5" />, title: "Telemetry Link", desc: "32 Hz packet stream over Wi-Fi to the dashboard." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl glass p-5 hover:border-primary/30 hover:-translate-y-0.5 transition">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20">{f.icon}</div>
              <div className="mt-4 font-semibold">{f.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Dashboard preview */}
      <Section className="py-20">
        <div id="dashboard" className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary">Command Center</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">A dashboard that feels like an OS.</h2>
            <p className="mt-3 text-muted-foreground">
              Six purpose-built screens: overview, manual control, telemetry, sensor diagnostics,
              system logs, and configuration — wired into one cohesive engineering surface.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                ["Activity", "Live status, battery & health"],
                ["Control", "Buttery-smooth RC + autonomous toggle"],
                ["Telemetry", "Speed, load, and sensor charts"],
                ["Diagnostics", "IR array map and module health"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary glow-cyan" />
                  <div>
                    <span className="font-semibold mr-2">{k}.</span>
                    <span className="text-muted-foreground">{v}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/dashboard"
              className="group relative mt-8 inline-flex rounded-full bg-gradient-to-r from-primary to-accent p-px transition hover:shadow-[0_0_24px_-4px_var(--cyan-glow)]"
            >
              <span className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-background/80 backdrop-blur-md font-medium transition group-hover:bg-background/60">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Open Dashboard
                </span>
                <ArrowRight className="h-4 w-4 text-primary" />
              </span>
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,var(--purple-glow)_0%,transparent_60%)] opacity-20 blur-3xl" />
            <div className="relative rounded-2xl glass-strong p-4 glow-cyan">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                <span className="ml-3 text-[10px] font-mono text-muted-foreground">genesis://dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 rounded-xl bg-white/5 border border-border p-4 h-40">
                  <div className="text-[10px] font-mono text-muted-foreground">ROVER STATUS</div>
                  <div className="mt-1 text-xl font-semibold">GENESIS-01</div>
                  <div className="mt-2 h-20 rounded bg-gradient-to-t from-primary/40 to-transparent border-b border-primary/40 relative overflow-hidden animate-scan" />
                </div>
                <div className="rounded-xl bg-white/5 border border-border p-4">
                  <div className="text-[10px] font-mono text-muted-foreground">BATTERY</div>
                  <div className="mt-1 text-2xl font-semibold text-glow-cyan">78%</div>
                  <div className="mt-3 h-2 rounded-full bg-white/5">
                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 border border-border p-3">
                  <div className="text-[10px] font-mono text-muted-foreground">SIGNAL</div>
                  <div className="mt-1 text-lg font-semibold">-52dB</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-border p-3">
                  <div className="text-[10px] font-mono text-muted-foreground">CPU</div>
                  <div className="mt-1 text-lg font-semibold">37%</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-border p-3">
                  <div className="text-[10px] font-mono text-muted-foreground">MODE</div>
                  <div className="mt-1 text-lg font-semibold text-accent">LINE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* AI roadmap */}
      <Section className="py-20">
        <div id="ai" className="rounded-3xl glass-strong p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[radial-gradient(circle,var(--purple-glow)_0%,transparent_70%)] opacity-30 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[radial-gradient(circle,var(--cyan-glow)_0%,transparent_70%)] opacity-30 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono uppercase tracking-widest border border-accent/30">
                <Sparkles className="h-3 w-3" /> AI Roadmap
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
                Built today. <span className="text-accent">AI-ready tomorrow.</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg">
                Genesis ships with hooks for computer vision, obstacle reasoning, and adaptive
                path-finding. Drop in a model — the OS handles the rest.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                { icon: <Sparkles className="h-4 w-4" />, t: "Vision-assisted line following", d: "Planned Q1" },
                { icon: <ShieldCheck className="h-4 w-4" />, t: "Obstacle avoidance via ultrasonic + IMU", d: "Planned Q2" },
                { icon: <Activity className="h-4 w-4" />, t: "On-device anomaly detection", d: "Research" },
              ].map((r) => (
                <div key={r.t} className="rounded-xl glass p-4 flex items-center gap-3 hover:border-accent/40 transition">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent border border-accent/30">{r.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{r.t}</div>
                    <div className="text-xs text-muted-foreground font-mono">{r.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border mt-10">
        <Section className="py-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
          <div>
            <GenesisLogo />
            <p className="mt-3 text-xs text-muted-foreground max-w-xs">
              Genesis · futuristic rover ecosystem & engineering command center.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Product</div>
              <ul className="space-y-1.5">
                <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
                <li><a href="#hardware" className="text-muted-foreground hover:text-foreground">Hardware</a></li>
                <li><a href="#ai" className="text-muted-foreground hover:text-foreground">AI roadmap</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Resources</div>
              <ul className="space-y-1.5">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Docs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Firmware</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Changelog</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">System</div>
              <ul className="space-y-1.5 font-mono text-xs text-muted-foreground">
                <li>v0.9.4 · stable</li>
                <li>ESP32 · Wi-Fi</li>
                <li>© 2026 Genesis</li>
              </ul>
            </div>
          </div>
        </Section>
      </footer>
    </div>
  );
}
