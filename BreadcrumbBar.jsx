// src/components/BreadcrumbBar.jsx
import { Link, useLocation } from "react-router-dom";

/** Alias segment → label (dirender uppercase) */
const ALIASES = {
  // Halaman perusahaan
  profile: "Company Profile",
  structure: "Struktur Organisasi",
  "vision-mission": "Visi & Misi",

  // Layanan
  services: "Produk & Jasa",
  ict: "ICT Services",
  avts: "Automatic Vessel Tracking (AVTS)",
  ndr: "National Data Repository (NDR)",
  retina: "RETINA Monitoring",
  "data-asset": "Data & Asset Management",
  scada: "SCADA — Supervisory Control and Data Acquisition",

  // Lainnya
  clients: "Klien",
  contact: "Kontak",
  career: "Karir",
  feedback: "Feedback",
  admin: "Admin",

  // Certificates
  awards: "Certificates & Awards",
  penghargaan: "Certificates & Awards",
};

function segToLabel(seg = "") {
  if (ALIASES[seg]) return ALIASES[seg];
  return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BreadcrumbBar({
  titleMap = {},
  labelOverride,
  showOnHome = false,
  inHero = false,
  solid = false,
  className = "",
}) {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  // Sembunyikan di home
  if (!showOnHome && parts.length === 0) return null;

  // Langsung pakai path asli (tanpa parent virtual)
  const crumbs = parts.map((_, i) => {
    const href = "/" + parts.slice(0, i + 1).join("/");
    const seg = parts[i];
    const label = titleMap[href] || segToLabel(seg);
    return { href, label };
  });

  // Override label terakhir
  if (crumbs.length && labelOverride) {
    crumbs[crumbs.length - 1].label = labelOverride;
  }

  const wrapperCls = inHero
    ? `absolute bottom-0 left-0 right-0 z-20 ${className}`
    : `w-full ${className}`;

  const barBgCls = solid
    ? inHero
      ? "bg-[#0076C6]/90 backdrop-blur-sm"
      : "bg-[#0076C6]"
    : "";

  return (
    <div className={wrapperCls}>
      <div className={barBgCls}>
        <div className="container mx-auto px-6 py-1.5 md:py-2 text-xs md:text-sm tracking-wide drop-shadow">
          <Link to="/" className="font-semibold text-white">
            BERANDA
          </Link>

          {crumbs.length > 0 && (
            <>
              <span className="text-white/80">&nbsp;/&nbsp;</span>
              {crumbs.map((c, i) => {
                const isLast = i === crumbs.length - 1;
                const labelUpper = (c.label || "").toUpperCase();
                return isLast ? (
                  <span key={c.href} className="font-semibold text-[#E73431]">
                    {labelUpper}
                  </span>
                ) : (
                  <span key={c.href}>
                    <Link to={c.href} className="text-white hover:underline">
                      {labelUpper}
                    </Link>
                    <span className="text-white/80">&nbsp;/&nbsp;</span>
                  </span>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
