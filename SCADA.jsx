// src/pages/SCADA.jsx
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import slide2 from "../assets/slide2.jpg";
import {
  CheckCircle2,
  Cpu,
  Share2,
  Network,
  Lock,
  Satellite,
  MapPin,
} from "lucide-react";

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

export default function SCADA() {
  return (
    <div className="text-sm">
      {/* HERO */}
      <PageHero
        title="SCADA"
        subtitle="Real-time supervision, control, and data acquisition for safer, more efficient, and auditable industrial operations."
        image={slide2}
      />

      {/* WHAT IS SCADA */}
      <Section title="What is SCADA?">
        <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-3">
          <p>
            SCADA is an integrated system that enables <b>monitoring</b>,{" "}
            <b>control</b>, and <b>data acquisition</b> of field devices and
            industrial processes remotely over multiple communications media
            (wired, radio, cellular). It combines field devices, RTUs/PLCs,
            communications networks, and a control center with an HMI interface.
          </p>
        </div>
      </Section>

      {/* CORE COMPONENTS */}
      <Section title="Core Components">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4 text-gray-700">
          <div className="rounded-2xl border bg-white/80 p-5 backdrop-blur">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Field & Controllers</h3>
            </div>
            <ul className="space-y-1.5">
              <Bullet>Sensors/Actuators (digital & analog)</Bullet>
              <Bullet>RTU/PLC — data acquisition & control logic</Bullet>
              <Bullet>Common protocols: Modbus, DNP3, IEC</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white/80 p-5 backdrop-blur">
            <div className="flex items-center gap-2 mb-2">
              <Network className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Communications</h3>
            </div>
            <ul className="space-y-1.5">
              <Bullet>RS-232/RS-485, Ethernet</Bullet>
              <Bullet>Radio, GSM/LTE, VSAT/cellular</Bullet>
              <Bullet>Latency-tolerant & small packets (&lt;2 KB)</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white/80 p-5 backdrop-blur">
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Control Center</h3>
            </div>
            <ul className="space-y-1.5">
              <Bullet>MTU/Gateway, HMI, Historian</Bullet>
              <Bullet>Alarms & Events, Trending, Reports</Bullet>
              <Bullet>Dashboard/Command Center integration</Bullet>
            </ul>
          </div>
        </div>
      </Section>

      {/* FUNCTIONS & VALUE */}
      <Section title="Functions & Value">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4 text-gray-700">
          <div className="rounded-2xl border bg-white/80 p-5 backdrop-blur">
            <h3 className="font-semibold mb-2">Functions</h3>
            <ul className="space-y-1.5">
              <Bullet>Real-time status & process parameter monitoring</Bullet>
              <Bullet>Automatic & manual control from the center</Bullet>
              <Bullet>Alarms/Notifications for abnormal conditions</Bullet>
              <Bullet>Historical data recording & reporting</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white/80 p-5 backdrop-blur">
            <h3 className="font-semibold mb-2">Benefits</h3>
            <ul className="space-y-1.5">
              <Bullet>Reduce potential production losses</Bullet>
              <Bullet>Faster incident response & maintenance</Bullet>
              <Bullet>Operational visibility & auditability</Bullet>
              <Bullet>Energy efficiency & process optimization</Bullet>
            </ul>
          </div>
        </div>
      </Section>

      {/* IMPLEMENTATION EXAMPLES */}
      <Section title="Implementation Examples">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4 text-gray-700">
          <div className="rounded-2xl border bg-white/80 p-5 backdrop-blur">
            <h3 className="font-semibold mb-1">Well Monitoring</h3>
            <p className="mb-2">
              Track pressure, temperature, and flow to accelerate diagnostics and
              actions—keeping well production optimal.
            </p>
          </div>
          <div className="rounded-2xl border bg-white/80 p-5 backdrop-blur">
            <h3 className="font-semibold mb-1">Pipeline Monitoring</h3>
            <p className="mb-2">
              Monitor pipeline conditions and weather to prevent congeal/viscosity
              spikes; early alarms improve risk mitigation.
            </p>
          </div>
          <div className="rounded-2xl border bg-white/80 p-5 backdrop-blur">
            <h3 className="font-semibold mb-1">Recloser Monitoring</h3>
            <p className="mb-2">
              Collect recloser status and performance data on power distribution
              networks for faster, more accurate decision-making.
            </p>
          </div>
        </div>
      </Section>

      {/* REFERENCE ARCHITECTURE */}
      <Section title="Reference Architecture">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Satellite className="w-5 h-5 text-blue-600" /> Edge-to-Cloud Flow
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Field sensor/actuator data is collected by RTUs/PLCs and delivered
              over radio/cellular/satellite links to the control center. There,
              data is processed, visualized on HMI/dashboards, archived in a
              historian, and triggers alarms/controls according to logic.
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-gray-700">
              <Bullet>RTUs/PLCs & industrial protocols</Bullet>
              <Bullet>Message brokering & buffering</Bullet>
              <Bullet>Command Center integration</Bullet>
              <Bullet>Reporting & analytics</Bullet>
            </ul>
          </div>
          <div>
            {/* (optional) export image to public/scada/architecture.png */}
            <img
              src="/scada/architecture.png"
              alt="SCADA Architecture"
              className="rounded-xl shadow-md w-full"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>
      </Section>

      {/* IT–OT CONVERGENCE & SECURITY */}
      <Section title="IT–OT Convergence & Security">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4 text-gray-700">
          <div className="rounded-2xl border bg-white/80 p-5 backdrop-blur">
            <h3 className="font-semibold mb-2">IT–OT Convergence</h3>
            <ul className="space-y-1.5">
              <Bullet>Unified data for analysis & optimization</Bullet>
              <Bullet>IIoT-ready (edge, cloud, APIs)</Bullet>
              <Bullet>Interoperability & scalability</Bullet>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white/80 p-5 backdrop-blur">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" /> Security
            </h3>
            <ul className="space-y-1.5">
              <Bullet>Network segmentation & access control</Bullet>
              <Bullet>Data encryption & audit trails</Bullet>
              <Bullet>ICS/OT best practices (e.g., IEC/ISA 62443)</Bullet>
            </ul>
          </div>
        </div>
      </Section>

      {/* OPERATIONAL AREAS (optional) */}
      <Section title="Operational Areas (Examples)">
        <div className="max-w-4xl mx-auto text-gray-700">
          <ul className="space-y-1.5">
            <Bullet>
              <MapPin className="inline w-4 h-4 -mt-1 mr-1" />
              Samarinda & Mahakam Delta (Handil, Tambora, Tunu)
            </Bullet>
            <Bullet>
              <MapPin className="inline w-4 h-4 -mt-1 mr-1" />
              Bekapai, Peciko, Sisi–Nubi, South Mahakam, South East Mahakam
            </Bullet>
            <Bullet>
              <MapPin className="inline w-4 h-4 -mt-1 mr-1" />
              Senipah & Balikpapan (Offshore Supply Base)
            </Bullet>
          </ul>
        </div>
      </Section>
    </div>
  );
}
