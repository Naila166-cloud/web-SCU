// src/pages/AVTS.jsx
import React from "react";
import PageHero from "../components/ui/PageHero";
import slide2 from "../assets/slide2.jpg";
import {
  CheckCircle2,
  MapPin,
  Radio,
  Satellite,
  ShieldCheck,
  Gauge,
  Lock,
  Waves,
  Cpu,
  Server,
} from "lucide-react";

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />
      <span>{children}</span>
    </li>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl border bg-white/80 backdrop-blur p-4 text-center shadow-sm">
      <div className="text-2xl font-extrabold text-blue-600">{value}</div>
      <div className="text-xs text-gray-600 mt-1">{label}</div>
    </div>
  );
}

export default function AVTS() {
  return (
    <div className="relative text-sm">
      {/* HERO */}
      <PageHero
        title="Automatic Vessel Tracking System (AVTS)"
        subtitle="Real-time vessel monitoring for safer and more efficient maritime & oil and gas operations."
        image={slide2}
      />

      {/* EXECUTIVE SUMMARY */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-2">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              AVTS is a <i>real-time</i> monitoring solution for vessels/fleets that integrates
              on-board devices, communications networks (GSM/LoRa/AIS), data processing services,
              and a command center. It is purpose-built to deliver high levels of operational
              visibility, safety, and accountability across marine and industrial waterways.
            </p>
            <ul className="space-y-1.5 text-gray-700">
              <Bullet>Real-time position, speed, heading, and operational status.</Bullet>
              <Bullet>Geofence notifications, route deviations, excessive idling, and condition alarms.</Bullet>
              <Bullet>Voyage trails & analytics reporting for audits and optimization.</Bullet>
            </ul>
          </div>

          {/* Project Context */}
          <div className="grid grid-cols-3 gap-3">
            <Stat value="270" label="Mobile Units (Vessels)" />
            <Stat value="40" label="Call-Off Basis (Vessels)" />
            <Stat value="48 Months" label="Contract Period" />
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS / KEY FEATURES */}
      <section className="container mx-auto px-4 pb-10">
        <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
          <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" /> Key Features
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-1.5">
              <Bullet>Network integration: <b>GSM / LoRa / AIS</b> (multi-network).</Bullet>
              <Bullet>Optional <b>3-channel CCTV</b> for visual recording.</Bullet>
              <Bullet><b>End-to-end encryption</b> and audit trail.</Bullet>
              <Bullet>Compatible with <b>ex-proof tablets</b> for local monitoring.</Bullet>
            </ul>
            <ul className="space-y-1.5">
              <Bullet><b>Edge-to-cloud</b> architecture optimized for fast-moving vessels.</Bullet>
              <Bullet>Integration with <b>Dashboard / Command Center</b>.</Bullet>
              <Bullet>Panels & sensors: <b>AVTS Panel, GPS/IoT, SMART MT</b>.</Bullet>
              <Bullet>Supports <b>health checks</b> & <b>preventive maintenance</b>.</Bullet>
            </ul>
          </div>
        </div>
      </section>

      {/* SCOPE OF WORK */}
      <section className="container mx-auto px-4 pb-10">
        <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
          <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" /> Scope of Work
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-1.5">
              <Bullet>Design and installation of AVTS equipment on vessels.</Bullet>
              <Bullet>Configuration of geofences, routes, and operational parameters.</Bullet>
              <Bullet>Backhaul integration (GSM/LoRa/AIS; VSAT/cellular/radio).</Bullet>
              <Bullet>Monitoring dashboards, alerting, and periodic reporting.</Bullet>
            </ul>
            <ul className="space-y-1.5">
              <Bullet>Operator training and incident response procedures.</Bullet>
              <Bullet>Device maintenance and system <i>health checks</i>.</Bullet>
              <Bullet>Data management, retention policies, and <i>audit trails</i>.</Bullet>
              <Bullet>Daily operations under a defined Service Level Agreement (SLA).</Bullet>
            </ul>
          </div>
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE */}
      <section className="container mx-auto px-4 pb-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
              <Satellite className="w-5 h-5 text-blue-600" /> General System Architecture
            </h3>
            <p className="text-gray-700 leading-relaxed">
              On-board GPS/IoT devices send data over available links (GSM/LoRa/AIS, VSAT/cellular/radio)
              to the central platform. Message brokering, processing, and storage on servers/cloud ensure
              low-latency access for web/mobile applications and the command center.
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-gray-700">
              <Bullet><Server className="inline w-4 h-4 mr-1 -mt-1" /> Edge & Cloud Storage</Bullet>
              <Bullet><Cpu className="inline w-4 h-4 mr-1 -mt-1" /> Real-time Processing</Bullet>
              <Bullet><Lock className="inline w-4 h-4 mr-1 -mt-1" /> Encryption & Access Control</Bullet>
              <Bullet><Waves className="inline w-4 h-4 mr-1 -mt-1" /> Multi-Network Resilience</Bullet>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            {/* Export architecture image to: public/avts/avts-architecture.png */}
            <img
              src="/avts/avts-architecture.png"
              alt="AVTS - General System Architecture"
              className="rounded-xl shadow-md w-full"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>
      </section>

      {/* MOBILE DEVICES */}
      <section className="container mx-auto px-4 pb-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
              <Radio className="w-5 h-5 text-blue-600" /> Mobile System Devices
            </h3>
            <ul className="space-y-1.5 text-gray-700">
              <Bullet>On-board GPS/IoT units with supporting sensors.</Bullet>
              <Bullet>Communications terminals (VSAT / 4G-LTE / Radio) with failover.</Bullet>
              <Bullet>Marine-grade power and mounting.</Bullet>
              <Bullet>Encryption and buffering during link drops.</Bullet>
            </ul>
          </div>
          <div>
            {/* Export from deck to: public/avts/avts-mobile-devices.png */}
            <img
              src="/avts/avts-mobile-devices.png"
              alt="AVTS - Mobile System Devices"
              className="rounded-xl shadow-md w-full"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>
      </section>

      {/* DATA FLOW */}
      <section className="container mx-auto px-4 pb-10">
        <div className="rounded-2xl border bg-white/80 backdrop-blur p-5">
          <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
            <Gauge className="w-5 h-5 text-blue-600" /> Data Flow
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vessel data is processed on-board/at the edge, transmitted through available links,
            then stored and visualized as positions, statuses, alarms, and historical reports.
          </p>
          {/* Export from deck to: public/avts/avts-data-flow.png */}
          <img
            src="/avts/avts-data-flow.png"
            alt="AVTS - Data Flow"
            className="rounded-xl shadow-md w-full"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      </section>

      {/* OPERATIONAL AREAS */}
      <section className="container mx-auto px-4 pb-16">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" /> Operational Areas
        </h3>
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <ul className="space-y-1.5 text-gray-700">
              <Bullet>Samarinda</Bullet>
              <Bullet>Mahakam Delta: Handil, Tambora, Tunu</Bullet>
              <Bullet>Offshore: Bekapai, Peciko, Sisi–Nubi, South Mahakam, South East Mahakam</Bullet>
              <Bullet>Senipah</Bullet>
              <Bullet>Balikpapan (Offshore Supply Base)</Bullet>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
