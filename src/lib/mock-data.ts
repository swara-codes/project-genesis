// Simulated telemetry data for the Project Genesis UI.
// All values are mock; replace with real ESP32 telemetry when wired.

export const batterySeries = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}h`,
  voltage: +(7.2 + Math.sin(i / 3) * 0.25 + (24 - i) * 0.01).toFixed(2),
  percent: Math.max(20, Math.min(100, Math.round(95 - i * 2.6 + Math.sin(i) * 4))),
}));

export const speedSeries = Array.from({ length: 40 }, (_, i) => ({
  t: i,
  speed: Math.max(0, Math.round(40 + Math.sin(i / 2) * 28 + Math.cos(i / 5) * 12)),
  target: 60,
}));

export const sensorSeries = Array.from({ length: 30 }, (_, i) => ({
  t: i,
  ir1: Math.round(500 + Math.sin(i / 2) * 200),
  ir2: Math.round(520 + Math.cos(i / 2.5) * 180),
  ir3: Math.round(480 + Math.sin(i / 1.7 + 1) * 220),
}));

export const cpuSeries = Array.from({ length: 30 }, (_, i) => ({
  t: i,
  cpu: Math.round(35 + Math.sin(i / 3) * 18 + Math.random() * 8),
  mem: Math.round(48 + Math.cos(i / 4) * 10 + Math.random() * 5),
}));

export type LogLevel = "info" | "warn" | "error" | "success";
export const activityLogs: { time: string; level: LogLevel; source: string; message: string }[] = [
  { time: "14:32:18", level: "success", source: "ROVER", message: "Telemetry handshake established on channel 0x1A" },
  { time: "14:32:14", level: "info", source: "MODE", message: "Switched to Line Follower mode" },
  { time: "14:31:58", level: "info", source: "SENSORS", message: "IR array calibration complete (3/3 nominal)" },
  { time: "14:31:42", level: "warn", source: "BATTERY", message: "Voltage drop detected: 7.41V → 7.28V" },
  { time: "14:31:20", level: "info", source: "ESP32", message: "Wi-Fi link stable, RSSI -52 dBm" },
  { time: "14:30:55", level: "success", source: "BOOT", message: "Genesis firmware v0.9.4 initialized" },
  { time: "14:30:48", level: "info", source: "MOTOR", message: "PWM controller armed, duty 0%" },
  { time: "14:30:42", level: "error", source: "SENSOR", message: "Ultrasonic module not detected (optional)" },
  { time: "14:30:30", level: "info", source: "SYSTEM", message: "Cold boot sequence initiated" },
];
