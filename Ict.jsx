// src/pages/Ict.jsx
import Section from "../components/ui/Section";
import PageHero from "../components/ui/PageHero";
import slide2 from "../assets/slide2.jpg";
import {
  Cpu,
  Layers,
  Radio,
  Satellite,
  Server,
  ShieldCheck,
  LineChart,
  Smartphone,
  CheckCircle2,
  Gauge, // highlight SCADA
} from "lucide-react";

function Item({ children }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

export default function Ict() {
  return (
    <div className="relative text-sm">
      {/* HERO */}
      <PageHero
        title="ICT Services"
        subtitle="Applications, infrastructure, and automation — SCADA-ready for secure and efficient real-time operations."
        image={slide2}
      />

      {/* OVERVIEW */}
      <Section>
        <p className="text-gray-700 max-w-3xl">
          We design and operate reliable ICT solutions for day-to-day and project-scale needs:
          enterprise application development, IoT and network integration, radio/telecom for remote sites,
          fleet tracking, and data center & managed services. Every service is backed by clear governance,
          security, and defined SLAs.
        </p>
      </Section>

      {/* SERVICE DOMAINS */}
      <Section title="ICT Service Domains">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Application & Solution */}
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Application & Solution</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>Web & mobile apps (dashboard/command center)</Item>
              <Item>API & SSO integration (enterprise)</Item>
              <Item>Data services & warehousing</Item>
              <Item>Enterprise system integration</Item>
            </ul>
          </div>

          {/* IoT & Automation */}
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">IoT & Automation</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>Sensing, telemetry, edge compute & gateways</Item>
              <Item>Rules engine, alerting, and real-time telemetry</Item>
              <Item>Well/asset monitoring & tracking</Item>
              <Item>Smart Metering (water/power/geothermal)</Item>
            </ul>
          </div>

          {/* General IT Services */}
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">General IT Services</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>Data center & cloud (hosting, backup, DR)</Item>
              <Item>Network & telephony; LAN/WAN, VPN, QoS</Item>
              <Item>Radio/telecommunications for remote locations</Item>
              <Item>IT maintenance & managed services (with SLAs)</Item>
            </ul>
          </div>
        </div>
      </Section>

      {/* SCADA INTEGRATION */}
      <Section title="SCADA Integration (Supervisory Control & Data Acquisition)">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Key Features</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>Real-time process monitoring & control (HMI/command center)</Item>
              <Item>Alarms & events (geofence, deviation, excessive idling)</Item>
              <Item>Historian & reporting for audit and analytics</Item>
              <Item>Edge-to-cloud architecture; buffered during link drops</Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Connectivity & Security</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>Multi-network: GSM / LoRa / AIS; VSAT/cellular/radio</Item>
              <Item>End-to-end encryption, access control, and audit trails</Item>
              <Item>Compatible with ex-proof devices and optional CCTV</Item>
              <Item>Integration to dashboards/command centers and mobile</Item>
            </ul>
          </div>
        </div>
        <div className="mt-4 text-gray-600">
          Want to see architecture and detailed use cases? Visit the{" "}
          <a href="/scada" className="text-blue-600 underline">SCADA</a> page.
        </div>
      </Section>

      {/* ICT REFERENCE ARCHITECTURE */}
      <Section title="ICT Reference Architecture">
        <div className="grid lg:grid-cols-3 gap-5 text-gray-700">
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Satellite className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Field & Edge</h3>
            </div>
            <ul className="space-y-1">
              <Item>Sensors/actuators, RTUs/PLCs, edge gateways</Item>
              <Item>Local logic & buffering (on lossy links)</Item>
              <Item>Lightweight telemetry & failover</Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Communications</h3>
            </div>
            <ul className="space-y-1">
              <Item>LAN/WAN, VPN, QoS; radio/VSAT/cellular</Item>
              <Item>Multi-path reliability & channel hardening</Item>
              <Item>Network monitoring & security hardening</Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Core & Applications</h3>
            </div>
            <ul className="space-y-1">
              <Item>Message brokering, processing, storage/cloud</Item>
              <Item>HMI/dashboards, APIs, enterprise integrations</Item>
              <Item>Observability, logging, and SLAs</Item>
            </ul>
          </div>
        </div>
      </Section>

      {/* BENEFITS */}
      <Section title="Benefits">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-4 text-center">
            <LineChart className="w-5 h-5 text-blue-600 mx-auto" />
            <div className="font-semibold mt-2">Efficiency</div>
            <p className="text-gray-700 text-sm mt-1">
              Automation and real-time data drive productivity.
            </p>
          </div>
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-4 text-center">
            <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto" />
            <div className="font-semibold mt-2">Security</div>
            <p className="text-gray-700 text-sm mt-1">
              Encryption, RBAC, auditability, and consistent policies.
            </p>
          </div>
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-4 text-center">
            <Smartphone className="w-5 h-5 text-blue-600 mx-auto" />
            <div className="font-semibold mt-2">Mobility</div>
            <p className="text-gray-700 text-sm mt-1">
              Web and mobile access for faster collaboration.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
