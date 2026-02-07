// src/pages/DataAsset.jsx
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import slide2 from "../assets/slide2.jpg";
import {
  Archive,
  Boxes,
  ShieldCheck,
  Layers,
  Server,
  MapPin,
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

export default function DataAsset() {
  return (
    <div className="relative text-sm">
      {/* HERO */}
      <PageHero
        title="Data & Asset Management"
        subtitle="A total solution to acquire, organize, track, utilize, and optimize data and assets — fully auditable and secure."
        image={slide2}
      />

      {/* INTRO */}
      <Section>
        <p className="text-gray-700 max-w-3xl">
          Our services cover the full lifecycle: intake, classification, storage, tracking, utilization, and disposal.
          The modular architecture supports phased (pilot) implementation and cross-site scalability without compromising
          governance or security.
        </p>
      </Section>

      {/* SERVICE AREAS */}
      <Section title="Service Areas">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Archive className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Asset & Records</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>Indexing & barcode/QR labeling</Item>
              <Item>Retention policy & disposal management</Item>
              <Item>Chain of custody & full traceability</Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Core Services</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>Cutting, slabbing, scanning, and photography</Item>
              <Item>Metadata enrichment & quality control</Item>
              <Item>Quality scoring & automated reporting</Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Managed Storage</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>On-prem tiered storage & backup systems</Item>
              <Item>Regular health checks & maintenance</Item>
              <Item>Dashboard & API integration</Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <Boxes className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Warehouse</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>Onsite & offsite • 29,616 m² capacity</Item>
              <Item>Fabricated racking & cargo lift systems</Item>
              <Item>Standardized SOPs: put-away, picking, cycle count</Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Governance</h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <Item>RBAC, audit logs, TLS in-transit encryption</Item>
              <Item>ISO 9001 • 14001 • 45001 • 20000-1 • 27001 certified</Item>
              <Item>Compliance with Indonesian archival & ESDM regulations</Item>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Locations</h3>
            </div>
            <p className="text-gray-700">BSD • Sentul • BizHub • Curug • PND</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
