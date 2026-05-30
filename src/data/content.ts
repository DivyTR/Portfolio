/* ════════════════════════════════════════════════════════════
   SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
   Edit this file to update the site. Everything renders from here.
   ════════════════════════════════════════════════════════════ */

export const profile = {
  firstName: "Divyansh",
  lastName: "Tripathi",
  role: "Cybersecurity Analyst",
  tagline:
    "SOC Analyst at TCS. PJPT-certified. Former Big 4 risk intern. Defending enterprise environments by day. Breaking them ethically by night.",
  available: true,
  location: "Delhi, India",
  email: "divyanshtripathi04@gmail.com",
  phone: "+91 96505 37291",
  phoneHref: "+919650537291",
  linkedin: "https://linkedin.com/in/divyansh-tripathi",
  linkedinHandle: "divyansh-tripathi",
  github: "https://github.com/DivyTR",
  githubHandle: "DivyTR",
} as const;

export type NavItem = { label: string; href: string };
export const nav: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  heading: "Security-First Mindset",
  paragraphs: [
    "I'm a Cybersecurity Analyst working in the Security Operations Center at Tata Consultancy Services, where I monitor and defend enterprise client environments using Microsoft Sentinel and Defender XDR.",
    "Previously, I interned at Grant Thornton Bharat on cyber and IT risk engagements — assessing SOC 1 controls, ITGC frameworks, and audit readiness for enterprise clients across BFSI and technology sectors.",
    "I'm a three-time hackathon winner, published researcher, and Student Excellence Award recipient. I combine hands-on SOC operations with VAPT expertise and a full-stack development background to approach security holistically.",
  ],
};

export type Stat = { value: string; label: string };
export const stats: Stat[] = [
  { value: "100+", label: "Daily Alerts Triaged" },
  { value: "3×", label: "Hackathon Winner" },
  { value: "4+", label: "Security Roles" },
  { value: "1", label: "Published Paper" },
];

export type SkillCard = {
  icon: string;
  title: string;
  category: "defense" | "offense" | "compliance" | "cloud" | "dev";
  tags: string[];
};
export const skills: SkillCard[] = [
  {
    icon: "🛡️",
    title: "SOC & SIEM",
    category: "defense",
    tags: ["Microsoft Sentinel", "Defender XDR", "KQL", "Log Analysis", "MITRE ATT&CK", "Threat Triage", "Incident Response"],
  },
  {
    icon: "🔓",
    title: "VAPT & AppSec",
    category: "offense",
    tags: ["Burp Suite", "Nessus", "Nmap", "OWASP Top 10", "Web App Testing", "PJPT"],
  },
  {
    icon: "📋",
    title: "GRC & Risk",
    category: "compliance",
    tags: ["SOC 1 / ITGC", "Risk Assessment", "Audit Readiness", "ISO 27001", "Compliance Frameworks", "DPDP Act"],
  },
  {
    icon: "☁️",
    title: "Cloud & IAM",
    category: "cloud",
    tags: ["Azure", "Firebase", "JWT", "RBAC", "Spring Boot", "Terraform"],
  },
  {
    icon: "💻",
    title: "Languages",
    category: "dev",
    tags: ["Python", "Java", "C/C++", "SQL", "Bash"],
  },
  {
    icon: "🤖",
    title: "Dev & ML",
    category: "dev",
    tags: ["React", "D3.js", "Tailwind", "FastAPI", "Git", "YOLOv8", "Machine Learning"],
  },
];

export const skillFilters = [
  { label: "All Domains", value: "all" },
  { label: "Defense / SOC", value: "defense" },
  { label: "Offense / VAPT", value: "offense" },
  { label: "Compliance / GRC", value: "compliance" },
  { label: "Cloud / IAM", value: "cloud" },
  { label: "Development", value: "dev" },
] as const;

export type Job = {
  role: string;
  company: string;
  date: string;
  bullets: string[];
};
export const experience: Job[] = [
  {
    role: "Cyber Security Analyst — SOC",
    company: "Tata Consultancy Services (TCS)",
    date: "Aug 2025 – Present",
    bullets: [
      "Triaging and investigating 100+ daily security alerts across enterprise environments using Microsoft Defender XDR and Sentinel with consistent SLA compliance.",
      "Reduced false-positive escalation rate by identifying and tuning noisy detection rules — improving SOC signal quality and reducing analyst fatigue.",
      "Leading end-to-end incident response workflows from alert classification through containment, eradication, and post-incident review for BFSI clients.",
      "Integrated threat intelligence into triage workflows with IOC enrichment and MITRE ATT&CK mappings for faster escalation decisions.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "JP Tokyo & Co. Inc.",
    date: "Feb 2025 – Jun 2025",
    bullets: [
      "Architected a full-stack platform with RBAC enforcing strict separation of user and admin privileges using secure-by-design principles.",
      "Implemented JWT-based stateless authentication with Spring Boot REST APIs; tested endpoints against injection and broken authentication scenarios.",
    ],
  },
  {
    role: "Cyber & IT Risk Intern",
    company: "Grant Thornton Bharat LLP",
    date: "Jun 2024 – Aug 2024",
    bullets: [
      "Assessed SOC 1 (Type I) controls across 5+ IT process areas — change management, access provisioning, and backup — supporting audit readiness.",
      "Identified critical gaps in IT security procedures and presented findings to senior auditors; coordinated remediation tracking with stakeholders.",
      "Applied ITGC framework methodology and risk-control matrix scoring to prioritize control weaknesses by business impact.",
    ],
  },
  {
    role: "Security Analyst Intern",
    company: "Aithent Inc.",
    date: "May 2023 – Jul 2023",
    bullets: [
      "Conducted vulnerability analysis on live web applications using Burp Suite and Nessus — identifying OWASP Top 10 vulnerabilities including SQLi, XSS, and broken auth.",
      "Prepared professional penetration testing reports with CVSS-scored findings, remediation recommendations, and executive summaries.",
      "Performed manual and automated security testing across application endpoints, documenting reproducible proof-of-concept steps.",
    ],
  },
];

export type ProjectStat = { value: string; label: string };
export const featuredProject = {
  number: "FEATURED · OPEN SOURCE",
  title: "SentinelBench — Detection Quality Benchmarking for Microsoft Sentinel",
  body: [
    "Most SOC teams assume their SIEM is working. SentinelBench proves whether it actually is. The tool executes 15 MITRE ATT&CK-mapped attack simulations in an isolated lab via Atomic Red Team, then queries the Microsoft Sentinel Log Analytics API to measure three dimensions per technique: caught/missed status, detection latency in seconds, and severity accuracy against ATT&CK-defined expected impact levels.",
    "For every missed detection, the KQL generation engine fires — pulling the actual EventIDs, process names, and command-line arguments observed during the simulation to produce a targeted detection rule, not a generic template. Results are visualised in a React + D3.js dashboard with an ATT&CK latency heatmap, a run-history table, and a remediation panel with one-click KQL copy. Open-source alternative to AttackIQ / Picus Security.",
  ],
  stats: [
    { value: "15", label: "ATT&CK Techniques" },
    { value: "46.7%", label: "Default Coverage" },
    { value: "7m 19s", label: "Avg Latency" },
    { value: "8", label: "KQL Rules Generated" },
    { value: "5", label: "Severity Miscalibrations" },
  ] as ProjectStat[],
  tech: ["Python", "Microsoft Sentinel", "KQL", "MITRE ATT&CK", "Atomic Red Team", "React", "D3.js", "FastAPI", "SQLite", "Log Analytics API"],
  github: "https://github.com/DivyTR/SentinelBench",
  status: "v1.0 · Active development",
};

export type Project = {
  number: string;
  title: string;
  body: string;
  tech: string[];
};
export const projects: Project[] = [
  {
    number: "PROJECT 01",
    title: "Cyber Attack Detection using ML",
    body: "Built a machine learning model to classify anomalous network traffic and predict attacks in real time — achieving strong accuracy across DoS, probe, and R2L categories. Evaluated Random Forest, SVM, and Neural Network classifiers on the KDD Cup dataset.",
    tech: ["Python", "Machine Learning", "Network Security", "scikit-learn"],
  },
  {
    number: "PROJECT 02",
    title: "Secure Quiz Management System",
    body: "Full-stack platform with RBAC, JWT-based auth, and CSRF protection. Tested against OWASP Top 10. Built with Spring Boot REST APIs and React (Vite + Tailwind) with dynamic role assignment and secure admin workflows.",
    tech: ["Spring Boot", "React", "JWT", "RBAC", "Tailwind"],
  },
  {
    number: "PROJECT 03",
    title: "HandWAVE — Hands-Free Accessibility",
    body: "Accessibility-focused, hands-free interaction system achieving 98.6% real-time detection accuracy. Integrates MediaPipe, Face Recognition, and Google Speech API with Firebase sync — designed for users with limited mobility.",
    tech: ["Computer Vision", "MediaPipe", "Firebase", "Python"],
  },
  {
    number: "PROJECT 04",
    title: "Intelligent Parking Management System",
    body: "Computer vision solution using YOLOv8, OCR, and OpenCV for detecting vehicles, parking spaces, and recognizing license plates. Published in the World Journal of Applied Science & Research.",
    tech: ["YOLOv8", "OpenCV", "OCR", "Firebase", "Research"],
  },
];

export type Achievement = {
  icon: string;
  title: string;
  body: string;
  prize?: string;
  link?: { label: string; href: string };
};
export const achievements: Achievement[] = [
  {
    icon: "🏆",
    title: "1st Place — Turing Sapiens Hackathon",
    body: "Built HandWAVE, an accessibility system using computer vision. First place as a team.",
    prize: "₹15,000 Prize",
  },
  {
    icon: "🥉",
    title: "3rd Place — MUJHACKX International",
    body: "Built a Contactless Healthcare Database System with facial recognition and voice control.",
    prize: "₹50,000 Prize",
  },
  {
    icon: "📄",
    title: "Published Research — WJASR",
    body: '"Intelligent Parking Management System" published in the World Journal of Applied Science & Research.',
    link: { label: "DOI: 10.59467/WJASR.2024.14.17", href: "https://doi.org/10.59467/WJASR.2024.14.17" },
  },
  {
    icon: "⭐",
    title: "Student Excellence Award",
    body: "Awarded by Manipal University Jaipur in April 2024 for outstanding academic achievement.",
  },
];

export type Cert = { icon: string; title: string; issuer: string };
export const certs: Cert[] = [
  { icon: "🔑", title: "Junior Penetration Tester (PJPT)", issuer: "TCM Security" },
  { icon: "🔐", title: "Google Cybersecurity Certificate", issuer: "Google / Coursera" },
];

export const education = {
  icon: "🎓",
  degree: "B.Tech — Computer Science & Engineering",
  school: "Manipal University Jaipur",
  period: "2021 – 2025 · Jaipur, Rajasthan",
  body: "Coursework in Data Structures, OS, DBMS, Cyber Security, Machine Learning, Computer Networks. Led teams to three national-level hackathon wins and received the Student Excellence Award.",
};

/* Boot screen sequence (legacy DivyOS boot) */
export const bootLines: { text: string; tone?: "ok" | "warn" | "err" | "white" | "dim" }[] = [
  { text: "BIOS POST... [OK]", tone: "ok" },
  { text: "Initializing kernel v4.19.0-divyos..." },
  { text: "Loading security modules... [OK]", tone: "ok" },
  { text: "Mounting encrypted filesystem /dev/sda1... [OK]", tone: "ok" },
  { text: "Starting network interface eth0... [CONNECTED]", tone: "ok" },
  { text: "Loading firewall rules... [ACTIVE]", tone: "ok" },
  { text: "Initializing Microsoft Sentinel agent... [LINKED]", tone: "ok" },
  { text: "Loading SentinelBench v1.0... [READY]", tone: "ok" },
  { text: "Scanning for threats... [3 advisories]", tone: "warn" },
  { text: "Patching vulnerabilities... [PATCHED]", tone: "ok" },
  { text: "Loading MITRE ATT&CK framework... [READY]", tone: "ok" },
  { text: "Authenticating session guest@divyansh.sec... [GRANTED]", tone: "ok" },
  { text: "" },
  { text: "System ready. Welcome to DivyOS.", tone: "white" },
];

export const bootAscii = String.raw`
 ____  _            ___  ____
|  _ \(_)_   ___  _/ _ \/ ___|
| | | | \ \ / / | | | | \___ \
| |_| | |\ V /| |_| |_| |___) |
|____/|_| \_/  \__, \___/|____/
               |___/`;
