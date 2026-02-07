// src/pages/Ndr.jsx
import Section from "../components/ui/Section";
import PageHero from "../components/ui/PageHero";
import slide2 from "../assets/slide2.jpg";
import {
  Database,
  ClipboardList,
  FileBarChart,
  Network,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

function Item({ children }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

export default function Ndr() {
  return (
    <div className="relative text-sm">
      {/* Hero (UNCHANGED STRUCTURE) */}
      <PageHero
        title="National Data Repository (NDR)"
        subtitle="End-to-end management of national energy data to support exploration and investment."
        image={slide2}
      />

      {/* Overview */}
      <Section>
        <p className="text-gray-700 max-w-3xl">
          We manage the full data lifecycle for corporate and national repositories:
          collecting & cataloging, standardizing & loading, verification & remastering,
          through to cross-source integration and media migration/digitizing — all under
          governance that ensures reliability and increases data value.
        </p>
      </Section>

      {/* Service Scope */}
      <Section title="Service Scope">
        <div className="grid md:grid-cols-3 gap-5">
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Data Management</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>Data collecting & cataloging</Item>
              <Item>Standardizing & loading</Item>
              <Item>Metadata & taxonomy</Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <FileBarChart className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Quality & Value Add</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>Verification & quality control</Item>
              <Item>Remastering</Item>
              <Item>Enhancement & evaluation</Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Network className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Integration & Digitizing</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>API/CSV integration</Item>
              <Item>Scanning, imaging, tape transcription</Item>
              <Item>Governance & lineage</Item>
            </ul>
          </div>
        </div>
      </Section>

      {/* Security & Compliance */}
      <Section title="Security & Compliance">
        <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">Standards</h3>
          </div>
          <p className="text-gray-700">
            RBAC, audit logs, in-transit encryption; aligned with ISO 9001 • 14001 • 45001 • 20000-1 • 27001
            and relevant Indonesian regulations (Archival Law, ANRI, and Ministry of Energy & Mineral Resources).
          </p>
        </div>
      </Section>
    </div>
  );
}
