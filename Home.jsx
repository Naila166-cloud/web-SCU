// src/pages/Home.jsx
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { memo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Cpu,
  Ship,
  ShieldCheck,
  Server,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Gauge,
  // ikon untuk kartu AKHLAK
  Users,
  Handshake,
  BadgeCheck,
  SlidersHorizontal,
  Award,
} from "lucide-react";

import CaraouselImg from "../components/CaraouselImg";
import Section from "../components/ui/Section";

// client logos
import pertaminaLogo from "../assets/pertamina.png";
import elnusaLogo from "../assets/elnusa.png";
import chevronLogo from "../assets/chevron.png";
import skkmigasLogo from "../assets/skkmigas.png";
import exxonLogo from "../assets/exxon.png";
import bpLogo from "../assets/bp.png";
import plnLogo from "../assets/pln.png";


// AKHLAK image
import akhlakSide from "../assets/akhlak_side.jpg";

/* ===== Helpers ===== */
const Stripe = ({ bg = "bg-white", children }) => (
  <div className={bg}>
    <div className="py-10 md:py-14">{children}</div>
  </div>
);
Stripe.propTypes = { bg: PropTypes.string, children: PropTypes.node };

/* ===== Data ===== */
const SERVICES = [
  {
    icon: Database,
    title: "Data & Asset Management",
    desc:
      "End-to-end management of data and assets: intake, storage, traceability, through disposal — audit-ready.",
    to: "/services/data-asset",
    bullets: ["Records & Warehouse", "Governance", "Reporting"],
  },
  {
    icon: Cpu,
    title: "ICT Services",
    desc:
      "Digital solutions & infrastructure: applications, IoT & automation, up to data center & managed services.",
    to: "/services/ict",
    bullets: ["App Dev", "IoT/Network", "Managed Services"],
  },
  {
    icon: Ship,
    title: "Automatic Vessel Tracking (AVTS)",
    desc:
      "Real-time vessel tracking with geofencing and alerts for operational efficiency and safety.",
    to: "/services/avts",
    bullets: ["Real-time", "Geofence", "Reporting"],
  },
  {
    icon: Gauge,
    title: "SCADA",
    desc:
      "Supervisory Control & Data Acquisition — monitoring, control, and data acquisition for industrial processes.",
    to: "/scada",
    bullets: ["Real-time Monitoring", "Alarms", "Historian"],
  },
];

const CLIENT_LOGOS = [
  { src: pertaminaLogo, alt: "Pertamina" },
  { src: elnusaLogo, alt: "Elnusa" },
  { src: chevronLogo, alt: "Chevron" },
  { src: skkmigasLogo, alt: "SKK Migas" },
  { src: exxonLogo, alt: "ExxonMobil" },
  { src: bpLogo, alt: "BP" },
  { src: plnLogo, alt: "PLN" },
];

/* ===== AKHLAK DATA ===== */
const AKHLAK = [
  {
    key: "amanah",
    title: "AMANAH",
    subtitle: "Menepati janji",
    bullets: [
      "Menunaikan amanah yang diberikan",
      "Jujur & bertanggung jawab",
      "Taat pada peraturan & etika",
    ],
    Icon: BadgeCheck,
    tone: "teal",
  },
  {
    key: "kompeten",
    title: "KOMPETEN",
    subtitle: "Terus belajar & mengembangkan kapabilitas",
    bullets: [
      "Meningkatkan kualitas diri",
      "Memberi hasil terbaik",
      "Berbagi pengetahuan",
    ],
    Icon: Users,
    tone: "navy",
  },
  {
    key: "harmonis",
    title: "HARMONIS",
    subtitle: "Saling peduli & menghargai perbedaan",
    bullets: [
      "Menghargai orang lain",
      "Suka menolong",
      "Menciptakan suasana nyaman",
    ],
    Icon: Handshake,
    tone: "teal",
  },
  {
    key: "loyal",
    title: "LOYAL",
    subtitle: "Berdedikasi & mengutamakan kepentingan bangsa",
    bullets: [
      "Menjaga nama baik perusahaan",
      "Patuh pada pimpinan",
      "Setia pada tujuan bersama",
    ],
    Icon: ShieldCheck,
    tone: "navy",
  },
  {
    key: "adaptif",
    title: "ADAPTIF",
    subtitle: "Terus berinovasi & antusias hadapi perubahan",
    bullets: [
      "Cepat menyesuaikan",
      "Inovatif & produktif",
      "Berpikir solutif",
    ],
    Icon: SlidersHorizontal,
    tone: "teal",
  },
  {
    key: "kolaboratif",
    title: "KOLABORATIF",
    subtitle: "Membangun kerjasama yang sinergis",
    bullets: [
      "Mengutamakan kepentingan tim",
      "Keterbukaan & komunikasi",
      "Raih hasil bersama",
    ],
    Icon: Award,
    tone: "navy",
  },
];

/* ===== Animations ===== */
const gridStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.08, staggerChildren: 0.12 },
  },
};
const cardVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* ===== Small UI ===== */
const Pill = ({ children }) => (
  <span className="inline-block rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">
    {children}
  </span>
);
Pill.propTypes = { children: PropTypes.node };

const StatCard = memo(function StatCard({ value, label, accent = "blue" }) {
  const map = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    amber: "text-amber-600 bg-amber-50",
  };
  return (
    <div className="rounded-2xl border bg-white shadow-sm p-6" role="group" aria-label={label}>
      <div className={`text-3xl sm:text-4xl font-extrabold ${map[accent] ?? map.blue} mb-2`}>{value}</div>
      <p className="text-gray-600">{label}</p>
    </div>
  );
});
StatCard.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  accent: PropTypes.oneOf(["blue", "green", "amber"]),
};

const ServiceCard = memo(function ServiceCard({ icon: Icon, title, desc, to, bullets = [] }) {
  return (
    <Link
      to={to}
      className="group relative flex h-full flex-col rounded-2xl border bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`${title} — View details`}
      onMouseMove={(e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(59,130,246,.12), transparent 40%)",
        }}
        aria-hidden="true"
      />
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 rounded-xl bg-blue-50" aria-hidden="true">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
      </div>
      <div className="flex-1 flex flex-col">
        <p className="text-gray-600 leading-relaxed mb-3 text-sm sm:text-[15px]">{desc}</p>
        {bullets.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {bullets.map((b) => (
              <Pill key={b}>{b}</Pill>
            ))}
          </div>
        )}
        <div className="mt-auto">
          <span className="inline-flex items-center gap-2 text-blue-600 font-medium">
            View details <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
});
ServiceCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  bullets: PropTypes.arrayOf(PropTypes.string),
};

/* ===== Page ===== */
export default function Home() {
  // drag helpers (dipakai untuk drag-scroll track kartu)
  const trackRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const dragStart = (e) => {
    const el = trackRef.current;
    if (!el) return;
    isDown.current = true;
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    startX.current = pageX - el.getBoundingClientRect().left;
    scrollStart.current = el.scrollLeft;
    el.classList.add("cursor-grabbing");
  };
  const dragMove = (e) => {
    const el = trackRef.current;
    if (!el || !isDown.current) return;
    e.preventDefault();
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    const x = pageX - el.getBoundingClientRect().left;
    const walk = x - startX.current;
    el.scrollLeft = scrollStart.current - walk;
  };
  const dragEnd = () => {
    isDown.current = false;
    trackRef.current?.classList.remove("cursor-grabbing");
  };

  return (
    <div className="relative overflow-x-hidden">
      {/* HERO */}
      <div className="relative">
        <CaraouselImg />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1/2">
          <div className="mx-auto max-w-6xl px-4">
            <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2" />
          </div>
        </div>
      </div>

      {/* STRIPE 1: About */}
      <Stripe bg="bg-white">
        <Section
          title="About Us"
          subtitle="PT Sigma Cipta Utama (SCU) — a total solutions provider in Data Management and ICT Services."
          center
        >
          <div className="relative">
            <div className="pointer-events-none absolute -inset-x-8 -top-6 h-24 bg-gradient-to-b from-blue-50/60 to-transparent blur-2xl" />
            <div className="relative max-w-3xl mx-auto space-y-5 bg-white/90 rounded-2xl p-6 sm:p-8 shadow border">
              <p className="text-gray-700 leading-relaxed text-center text-[15px] sm:text-base">
                With deep experience in energy and enterprise, we help organizations build
                <b> clean data governance</b>, <b> efficient operations</b>, and <b> secure infrastructure</b> — from physical warehousing to applications and data centers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <Link
                  to="/services"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 text-white shadow text-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Explore Services
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-center bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </Stripe>

      {/* STRIPE 2: Core Services */}
      <Stripe bg="bg-slate-50">
        <div id="services">
          <Section title="Core Services" center>
            <motion.div
              variants={gridStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch"
            >
              {SERVICES.map((s) => (
                <motion.div
                  key={s.title}
                  variants={cardVariant}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="h-full"
                >
                  <ServiceCard {...s} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                <div>
                  <div className="font-medium">Standards & Compliance</div>
                  <p className="text-gray-600 text-sm">Measured SOPs, audit-ready, best practices.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Server className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                <div>
                  <div className="font-medium">Reliable Infrastructure</div>
                  <p className="text-gray-600 text-sm">Data centers & warehouses with layered security controls.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <LineChart className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                <div>
                  <div className="font-medium">Outcome-Focused</div>
                  <p className="text-gray-600 text-sm">Clear ROI, SLAs, and day-to-day operational KPIs.</p>
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </Stripe>

{/* STRIPE 3: AKHLAK (gambar kiri, cards overlap sedikit & turun sedikit) */}
<Stripe bg="bg-white">
  <Section
    title="AKHLAK Values"
    subtitle="Amanah • Kompeten • Harmonis • Loyal • Adaptif • Kolaboratif"
    center
  >
    {/* Full-bleed agar gambar benar² nempel ke tepi kiri viewport */}
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-visible">
      <div className="grid grid-cols-12 gap-0 items-stretch">

        {/* KIRI — GAMBAR mentok kiri & tidak terpotong */}
        <div className="col-span-12 lg:col-span-6">
          <div className="w-full h-full flex items-center justify-start">
            <img
              src={akhlakSide}
              alt="SCU Engineer"
              className="w-full h-auto max-h-[520px] object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* KANAN — CARDS: overlap ke kiri + turun sedikit */}
        <div className="col-span-12 lg:col-span-6 relative lg:-ml-20 lg:mt-10">

          {/* (opsional) fade kanan; hapus jika tidak perlu */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />

          {/* TRACK SCROLL */}
          <div
            ref={trackRef}
            onMouseDown={dragStart}
            onMouseMove={dragMove}
            onMouseLeave={dragEnd}
            onMouseUp={dragEnd}
            onTouchStart={dragStart}
            onTouchMove={dragMove}
            onTouchEnd={dragEnd}
            className="relative flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-1"
          >
            {AKHLAK.map(({ key, title, subtitle, bullets, Icon, tone }) => {
              const toneMap =
                tone === "teal"
                  ? { wrap: "bg-teal-600", chip: "bg-teal-400", ghost: "text-teal-300/30" }
                  : { wrap: "bg-slate-800", chip: "bg-slate-600", ghost: "text-slate-400/20" };

              return (
                <div key={key} className="snap-start min-w-[300px] max-w-[300px]">
                  <div className={`relative rounded-2xl ${toneMap.wrap} text-white p-6 py-8 min-h-[360px]`}>
                    {Icon && (
                      <Icon className={`absolute -right-2 -bottom-2 w-28 h-28 md:w-32 md:h-32 ${toneMap.ghost}`} />
                    )}

                    <div className="text-sm font-extrabold tracking-widest">{title}</div>
                    <div className="mt-1 h-[3px] w-12 bg-white/80 rounded" />
                    <p className="mt-3 text-xs text-white/90">{subtitle}</p>

                    <ul className="mt-3 space-y-1.5 text-[12px]">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${toneMap.chip}`} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tombol scroll */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => trackRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
              className="w-10 h-10 grid place-items-center rounded-lg border bg-white shadow-sm hover:bg-gray-50"
            >
              ←
            </button>
            <button
              onClick={() => trackRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
              className="w-10 h-10 grid place-items-center rounded-lg border bg-white shadow-sm hover:bg-gray-50"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  </Section>
</Stripe>


      {/* STRIPE 4: Achievements */}
      <Stripe bg="bg-slate-50">
        <Section title="Achievements & Certifications" center>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <StatCard value="29,616 m²" label="Warehouse Area" accent="blue" />
            <StatCard value="ISO Certified" label="9001 · 14001 · 45001 · 20000-1 · 27001" accent="green" />
            <StatCard value="100+" label="National Clients & Partners" accent="amber" />
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border bg-white p-4 text-center">
              <Sparkles className="w-5 h-5 text-blue-600 mx-auto" />
              <div className="mt-1 text-sm font-semibold">Rapid Implementation</div>
              <p className="text-xs text-gray-600">Modular architecture, start with a pilot.</p>
            </div>
            <div className="rounded-xl border bg-white p-4 text-center">
              <Gauge className="w-5 h-5 text-blue-600 mx-auto" />
              <div className="mt-1 text-sm font-semibold">Clear SLAs & KPIs</div>
              <p className="text-xs text-gray-600">Transparent, measurable, and accountable.</p>
            </div>
            <div className="rounded-xl border bg-white p-4 text-center">
              <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto" />
              <div className="mt-1 text-sm font-semibold">Layered Security</div>
              <p className="text-xs text-gray-600">RBAC, audit logs, and continuous hardening.</p>
            </div>
          </div>
        </Section>
      </Stripe>

      {/* STRIPE 5: Clients */}
      <Stripe bg="bg-white">
        <Section title="Our Clients" subtitle="Delivered solutions for these companies and many more." center>
          <div className="rounded-3xl border bg-white shadow-sm overflow-hidden">
            <div className="relative">
              <ul className="flex items-center gap-8 sm:gap-12 py-5 sm:py-6 animate-marquee will-change-transform">
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map(({ src, alt }, i) => (
                  <li key={alt + i} className="shrink-0">
                    <img
                      src={src}
                      alt={`${alt} — logo`}
                      loading="lazy"
                      width={160}
                      height={56}
                      className="h-7 md:h-10 lg:h-12 object-contain"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </li>
                ))}
              </ul>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-14 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-14 bg-gradient-to-l from-white to-transparent" />
            </div>
          </div>
        </Section>
      </Stripe>
    </div>
  );
}
