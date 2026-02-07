// src/components/PageHeader.jsx
import { Link, useLocation } from "react-router-dom";

const TITLES = {
  about: "Tentang Kami",
  services: "Produk & Jasa",
  ict: "ICT Services",
  avts: "Automatic Vessel Tracking (AVTS)",
  ndr: "National Data Repository (NDR)",
  clients: "Klien",
  contact: "Kontak",
  retina: "RETINA Monitoring",
  career: "Karir",
  feedback: "Feedback",
  admin: "Admin",
};

function toLabel(seg) {
  if (seg === "data-asset") return "Data & Asset Management";
  if (TITLES[seg]) return TITLES[seg];
  return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ⬇️ Aturan parent virtual: child → parent
const PARENT_OF = {
  retina: "services",            // RETINA berada di Produk & Jasa
  profile: "about",              // Tentang Kami
  structure: "about",
  "vision-mission": "about",
};

export default function PageHeader({ title, image, height = "h-[380px] md:h-[460px]" }) {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  // sisipkan parent kalau perlu (tanpa ubah URL)
  const augmented = [...parts];
  if (augmented.length > 0) {
    const parent = PARENT_OF[augmented[0]];
    if (parent && augmented[0] !== parent) {
      augmented.unshift(parent);
    }
  }

  const crumbs = [{ href: "/", label: "BERANDA" }].concat(
    augmented.map((seg, i) => ({
      href: "/" + augmented.slice(0, i + 1).join("/"),
      label: toLabel(seg),
      isLast: i === augmented.length - 1,
    }))
  );

  return (
    <header className={`relative w-full ${height}`}>
      {/* Background image */}
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/10 pointer-events-none" />

      {/* Title */}
      <div className="relative z-10 h-full container mx-auto px-6 flex items-center justify-center text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow">
          {title}
        </h1>
      </div>

      {/* Breadcrumb IN-HERO (transparan). Tidak tampil di Home */}
      {parts.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="container mx-auto px-6 py-1.5 md:py-2 text-xs md:text-sm tracking-wide drop-shadow">
            <Link to="/" className="font-semibold text-white">BERANDA</Link>
            <span className="text-white/80">&nbsp;/&nbsp;</span>
            {crumbs.slice(1).map((c, i, arr) => {
              const isLast = i === arr.length - 1;
              // Gunakan title halaman untuk crumb terakhir jika ada, agar bisa “PROFIL PERUSAHAAN”, dll.
              const labelUpper = (isLast && title ? String(title).toUpperCase() : (c.label || "").toUpperCase());
              return isLast ? (
                <span key={c.href} className="font-semibold text-[#E73431]">{labelUpper}</span>
              ) : (
                <span key={c.href}>
                  <Link to={c.href} className="text-white hover:underline">{labelUpper}</Link>
                  <span className="text-white/80">&nbsp;/&nbsp;</span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
