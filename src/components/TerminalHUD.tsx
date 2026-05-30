import { useEffect, useRef, useState } from "react";
import { profile } from "../data/content";

type Tone = "out" | "sys" | "err" | "warn";
type Line = { text: string; tone: Tone };

const PROMPT = "guest@soc:~$";

/** Static command handlers return lines synchronously. */
const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    {
      text: "Commands: whoami · skills · experience · projects · sentinelbench · certs · scan · contact · resume · clear · sudo",
      tone: "sys",
    },
  ],
  whoami: () => [
    {
      text: `${profile.firstName} ${profile.lastName} — SOC Analyst at TCS. PJPT-certified. 3× hackathon winner. Defending systems by day, breaking them by night.`,
      tone: "out",
    },
  ],
  skills: () => [
    {
      text: "Sentinel · Defender XDR · KQL · Burp Suite · Nessus · Nmap · Python · Java · React · D3.js · FastAPI · Spring Boot · Azure · Terraform · YOLOv8",
      tone: "sys",
    },
  ],
  experience: () => [
    {
      text: "TCS (SOC Analyst) → JP Tokyo (Dev Intern) → Grant Thornton (IT Risk Intern) → Aithent (Security Analyst Intern)",
      tone: "sys",
    },
  ],
  projects: () => [
    {
      text: "1. SentinelBench (Sentinel · KQL · ATT&CK)  2. Cyber Attack Detection (ML)  3. Secure Quiz System (Spring Boot)  4. HandWAVE (CV)  5. Smart Parking (YOLOv8)",
      tone: "sys",
    },
  ],
  sentinelbench: () => [
    {
      text: "SentinelBench: open-source detection-quality benchmark for Microsoft Sentinel. 15 ATT&CK techniques. Measures latency + severity accuracy. Auto-generates KQL for missed detections.",
      tone: "sys",
    },
    { text: "→ github.com/DivyTR/SentinelBench", tone: "out" },
  ],
  certs: () => [
    { text: "PJPT (TCM Security) · Google Cybersecurity Certificate", tone: "sys" },
  ],
  resume: () => [
    {
      text: "Scroll up, or visit linkedin.com/in/divyansh-tripathi for full details.",
      tone: "sys",
    },
  ],
  hire: () => [
    {
      text: `Great idea! Head to the contact section or email ${profile.email}`,
      tone: "sys",
    },
  ],
  hack: () => [
    { text: "Nice try. Logging your IP... just kidding. But seriously, don't.", tone: "err" },
  ],
};

const WELCOME: Line[] = [
  { text: "DivyOS v2.0 Initiated.", tone: "sys" },
  { text: "Type 'help' to see available commands.", tone: "out" },
];

/** A simulated nmap-style port scan, streamed line by line. */
const SCAN_STEPS: Line[] = [
  { text: "Starting Nmap 7.94 ( https://nmap.org )", tone: "out" },
  { text: "Scanning divyansh.sec (10.0.0.1) [1000 ports]", tone: "out" },
  { text: "PORT     STATE  SERVICE", tone: "warn" },
  { text: "22/tcp   open   ssh        OpenSSH 9.6 (hardened)", tone: "sys" },
  { text: "443/tcp  open   https      TLS 1.3 · HSTS", tone: "sys" },
  { text: "8443/tcp open   sentinel   SentinelBench API", tone: "sys" },
  { text: "3389/tcp closed rdp        (firewalled)", tone: "out" },
  { text: "Host is up. 0 vulnerabilities found. Nice and locked down.", tone: "sys" },
];

export function TerminalHUD() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const push = (...next: Line[]) => setLines((prev) => [...prev, ...next]);

  const runScan = () => {
    setBusy(true);
    SCAN_STEPS.forEach((line, i) => {
      setTimeout(() => {
        push(line);
        if (i === SCAN_STEPS.length - 1) setBusy(false);
      }, 260 * (i + 1));
    });
  };

  const handleEnter = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    push({ text: `${PROMPT} ${cmd}`, tone: "out" });
    setValue("");

    if (cmd === "clear") {
      setLines([{ text: "Terminal cleared.", tone: "sys" }]);
      return;
    }
    if (cmd === "scan") {
      runScan();
      return;
    }
    if (cmd === "sudo") {
      push({ text: "Access denied. This incident will be reported.", tone: "err" });
      return;
    }
    if (cmd === "contact") {
      push({ text: "Routing to secure channel...", tone: "sys" });
      window.location.hash = "#contact";
      return;
    }
    const handler = COMMANDS[cmd];
    if (handler) push(...handler());
    else
      push({
        text: `Command not found: ${cmd}. Type 'help' for available commands.`,
        tone: "err",
      });
  };

  const toneClass: Record<Tone, string> = {
    out: "text-text",
    sys: "text-primary",
    err: "text-alert",
    warn: "text-warn",
  };

  if (!open) {
    return (
      <button
        aria-label="Open terminal"
        onClick={() => setOpen(true)}
        className="fixed bottom-7 right-7 z-50 hidden h-14 w-14 items-center justify-center rounded-full glass-panel text-primary crt-glow font-mono text-xl transition-transform hover:scale-110 md:flex"
      >
        $_
      </button>
    );
  }

  return (
    <div className="fixed bottom-7 right-7 z-50 hidden w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl glass-panel font-mono text-[0.8rem] md:flex">
      <div
        onClick={() => setOpen(false)}
        className="flex cursor-pointer items-center justify-between border-b border-primary/15 bg-black/40 px-4 py-2 text-text-dim hover:text-primary"
      >
        <span>root@divyansh: ~</span>
        <span className="tracking-widest">[ _ ]</span>
      </div>

      <div ref={bodyRef} className="flex h-[260px] flex-col gap-1.5 overflow-y-auto p-4">
        {lines.map((line, i) => (
          <span key={i} className={`whitespace-pre-wrap break-words ${toneClass[line.tone]}`}>
            {line.text}
          </span>
        ))}

        <div className="mt-1 flex items-center gap-2">
          <span className="shrink-0 text-primary">{PROMPT}</span>
          <input
            ref={inputRef}
            value={value}
            disabled={busy}
            spellCheck={false}
            autoComplete="off"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEnter(value);
            }}
            className="w-full bg-transparent text-text outline-none disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}
