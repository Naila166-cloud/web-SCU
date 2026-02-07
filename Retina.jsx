// src/pages/Retina.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";

// --- EXISTING ASSETS ---
import RetinaDiagram from "../assets/retina.png";
import heroBg from "../assets/slide2.jpg";

// --- ICONS (already used in your project) ---
import {
  Activity,
  AlarmCheck,
  Satellite,
  MonitorSmartphone,
  Camera,
  ShieldCheck,
  Cpu,
  Server,
  Radio,
  Bell,
  Wrench,
  Sparkles,
  BarChart3,
  Workflow,
  Smartphone,
  ArrowRight,
} from "lucide-react";

// ---- SMALL COMPONENTS ----
function Pill({ children }) {
  return (
    <span className="inline-block rounded-full border px-3 py-1 text-sm text-gray-700 bg-white">
      {children}
    </span>
  );
}

function Metric({ value, label }) {
  return (
    <div className="rounded-2xl border bg-white p-5 text-center shadow-sm">
      <div className="text-3xl font-extrabold text-blue-600">{value}</div>
      <div className="text-gray-600 mt-1">{label}</div>
    </div>
  );
}

function IconCard({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <div className="p-3 rounded-xl bg-blue-50 shrink-0" aria-hidden="true">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-base font-semibold mb-1">{title}</h3>
          <p className="text-gray-700 leading-relaxed text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function AccordionItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-xl bg-white">
      <button
        className="w-full text-left px-4 py-3 flex items-center justify-between"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <span className="text-gray-500">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-gray-700">{a}</div>}
    </div>
  );
}

export default function Retina() {
  return (
    <div className="relative">
      {/* HERO — light overlay for better text contrast */}
      <div className="relative">
        <PageHero
          title="RETINA Monitoring System"
          subtitle="Real-time online monitoring for Drilling Parameters & Activities — faster, safer, and measurable."
          image={heroBg}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />
      </div>

      {/* PRODUCT SUMMARY / VALUE PROPOSITION */}
      <Section center>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-gray-700 leading-relaxed">
            <b>RETINA</b> delivers end-to-end visibility from rig to head office.
            It is designed for rapid decision-making, safety, and operational efficiency through
            drilling parameter monitoring, integrated CCTV, and real-time notifications across devices.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Pill>Real-time Telemetry</Pill>
            <Pill>Alerts & Notifications</Pill>
            <Pill>Integrated CCTV</Pill>
            <Pill>Web & Mobile Access</Pill>
            <Pill>On-Prem / Data Center</Pill>
            <Pill>Audit-ready</Pill>
          </div>
        </div>
      </Section>

      {/* QUICK KPIs */}
      <Section>
        <div className="grid sm:grid-cols-3 gap-4">
          <Metric value="60+" label="Monitored Wells" />
          <Metric value="99%+" label="Data Uptime (illustrative)" />
          <Metric value="100+" label="Alerts / month (illustrative)" />
        </div>
      </Section>

      {/* KEY FEATURES (WITH ICONS) */}
      <Section title="Key Features">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <IconCard
            icon={Activity}
            title="Drilling Parameters"
            desc="WITS-based parameter setup: depth, ROP, WOB, RPM, SPP, flow, etc. Consistent views across wells."
          />
          <IconCard
            icon={AlarmCheck}
            title="Alerts & Thresholds"
            desc="Real-time notifications when parameters cross limits: SMS/WhatsApp/email/in-app (optional per policy)."
          />
          <IconCard
            icon={Camera}
            title="Real-time CCTV"
            desc="Stream critical areas to verify conditions during alarms and post-incident investigations."
          />
          <IconCard
            icon={MonitorSmartphone}
            title="Multi-Device Access"
            desc="Web & mobile dashboards so drillers, mud loggers, and company men stay connected."
          />
          <IconCard
            icon={Satellite}
            title="VSAT Backhaul"
            desc="Satellite connectivity for remote sites with buffering & retry for reliable data."
          />
          <IconCard
            icon={ShieldCheck}
            title="Security & Audit"
            desc="Layered access control, activity logging, and archived data that’s audit-ready."
          />
        </div>
      </Section>

      {/* HOW IT WORKS + DIAGRAM */}
      <Section title="How RETINA Works">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>
                <b>Data Acquisition</b> — Rig sensors and acquisition units collect drilling parameters.
              </li>
              <li>
                <b>VSAT Backhaul</b> — Data is securely transmitted to the <i>RETINA Appliance</i> and processed.
              </li>
              <li>
                <b>Processing & Storage</b> — Normalization, validation, aggregation; ready for analytics & alerts.
              </li>
              <li>
                <b>Visualization</b> — Web & mobile dashboards; <b>CCTV</b> integration for visual verification.
              </li>
              <li>
                <b>Notifications</b> — Thresholds & rules dispatch alerts to relevant stakeholders.
              </li>
            </ol>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Cpu className="w-4 h-4 text-blue-600" /> Data Processing
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Server className="w-4 h-4 text-blue-600" /> Storage & Archive
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Radio className="w-4 h-4 text-blue-600" /> VSAT/Network
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Bell className="w-4 h-4 text-blue-600" /> Alerting Engine
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={RetinaDiagram}
              alt="RETINA workflow diagram from rig to head office"
              className="rounded-xl shadow-lg max-w-3xl w-full"
            />
          </div>
        </div>
      </Section>

      {/* USE CASES */}
      <Section title="Common Use Cases">
        <div className="grid md:grid-cols-3 gap-5">
          <IconCard
            icon={Wrench}
            title="Operational Safety"
            desc="Parameter deviation alarms to prevent incidents (e.g., kick indications, loss/gain anomalies)."
          />
          <IconCard
            icon={BarChart3}
            title="Performance Tracking"
            desc="Compare ROP vs targets, identify flat time, and optimize drilling parameters."
          />
          <IconCard
            icon={Workflow}
            title="Remote Collaboration"
            desc="Company men and engineers monitor from the center, accelerating decisions without onsite presence."
          />
        </div>
      </Section>

      {/* PROJECTS (ORIGIN) */}
      <Section title="Projects & Coverage">
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <b>Asset 5</b> — Bunyu (25 wells) & Sembakung (16 wells) | 2018–2020
          </li>
          <li>
            <b>Asset 1</b> — Jambi (21 wells) | 2020–Present
          </li>
          <li>Batang — 6 wells | 2019</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2">
          * Figures are illustrative/placeholders — replace with actual data where available.
        </p>
      </Section>

      {/* MEASURABLE BENEFITS */}
      <Section title="Tangible Benefits">
        <div className="grid md:grid-cols-2 gap-5">
          <IconCard
            icon={Sparkles}
            title="Faster Decisions"
            desc="Real-time notifications and CCTV visuals reduce response time during critical conditions."
          />
          <IconCard
            icon={ShieldCheck}
            title="Safety & Compliance"
            desc="Clear thresholds, audit trails, and clean historical data to support audits and investigations."
          />
        </div>
      </Section>

      {/* TECHNICAL SPECIFICATIONS (BRIEF) */}
      <Section title="Technical Specifications (Brief)">
        <div className="overflow-x-auto rounded-2xl border bg-white">
          <table className="min-w-full text-sm">
            <tbody className="[&>tr:nth-child(even)]:bg-gray-50">
              <tr>
                <td className="p-3 font-medium text-gray-800">Data Protocols</td>
                <td className="p-3 text-gray-700">WITS / WITSML (roadmap), CSV/JSON adapters</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-800">Connectivity</td>
                <td className="p-3 text-gray-700">VSAT, IP VPN, local fallback buffering</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-800">Access</td>
                <td className="p-3 text-gray-700">Web dashboards & Mobile (Android)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-800">Security</td>
                <td className="p-3 text-gray-700">RBAC, audit logs, TLS in-transit (optional on-prem/DC)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-gray-800">CCTV Integration</td>
                <td className="p-3 text-gray-700">RTSP/HTTP streaming, multi-view, snapshots on alarms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* ROADMAP & TIMELINE */}
      <Section title="Development Roadmap">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>WITSML Data Format Support</li>
              <li>Gas Ratio Analysis</li>
              <li>Kick Monitoring</li>
              <li>Integrated Unit DD Services</li>
            </ol>
          </div>
          <div className="space-y-3 text-gray-700">
            <p>📍 User Requirement Analysis → 1 week</p>
            <p>📍 Data Analysis → 2 weeks</p>
            <p>📍 Development → 4 weeks</p>
            <p>📍 System & Infrastructure Preparation → 1 week</p>
            <p>📍 On-site Installation → 1 week</p>
            <p>
              <b>Total: 5 weeks</b>
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
