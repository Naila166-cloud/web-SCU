import { useEffect, useState } from "react";
import Section from "../components/ui/Section";
import PageHero from "../components/ui/PageHero";
import { Eye, Calendar, Medal, X } from "lucide-react";
import slide2 from "../assets/slide2.jpg";

/* Date formatter (English) */
const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

/* Static certificates (duplicated to 10 items) */
const CERTS_LIST = Array.from({ length: 10 }, (_, i) => ({
  id: `phr-730days-${i + 1}`,
  title: `Certificate of Appreciation — 730 Safe Operating Days #${i + 1}`,
  issuer: "PT Pertamina Hulu Rokan",
  date: "2025-05-07",
  image_url: "/penghargaan/sertfikat730.png",
}));

/* Preview Modal */
function PreviewModal({ open, onClose, cert }) {
  if (!open || !cert) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 border-b bg-gradient-to-r from-blue-50 to-white">
          <div>
            <h4 className="font-semibold text-gray-800">{cert.title}</h4>
            <p className="text-sm text-gray-600">
              {cert.issuer} • {fmtDate(cert.date)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            title="Close"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="bg-gray-50 flex items-center justify-center p-3">
          <img
            src={cert.image_url}
            alt={cert.title}
            className="max-h-[70vh] max-w-[90vw] rounded-lg border object-contain shadow"
          />
        </div>
      </div>
    </div>
  );
}

/* Certificate Card */
function CertificateCard({ cert, onView }) {
  return (
    <div className="relative group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all">
      <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
        <img
          src={cert.image_url}
          alt={cert.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          loading="lazy"
        />

        {/* Hover overlay + centered eye icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300">
          <button
            onClick={() => onView(cert)}
            className="opacity-0 group-hover:opacity-100 p-3 rounded-full bg-white/90 text-gray-800 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg"
            title="View certificate"
            aria-label="View certificate"
          >
            <Eye className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-gray-800 leading-snug line-clamp-2">
          {cert.title}
        </h4>
        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
          <Medal className="w-4 h-4 text-amber-600" />
          <span>{cert.issuer}</span>
          <span className="mx-1">•</span>
          <Calendar className="w-4 h-4 text-blue-500" />
          <time dateTime={cert.date}>{fmtDate(cert.date)}</time>
        </div>
      </div>
    </div>
  );
}

/* Page */
export default function Awards() {
  const [certs, setCerts] = useState([]);
  const [preview, setPreview] = useState({ open: false, cert: null });

  useEffect(() => {
    setCerts(CERTS_LIST);
  }, []);

  return (
    <div>
      <PageHero
        title="Certificates & Awards"
        subtitle="Official documentation of PT Sigma Cipta Utama’s recognitions and achievements."
        image={slide2}
      />

      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c) => (
            <CertificateCard
              key={c.id}
              cert={c}
              onView={(cert) => setPreview({ open: true, cert })}
            />
          ))}
        </div>
      </Section>

      <PreviewModal
        open={preview.open}
        cert={preview.cert}
        onClose={() => setPreview({ open: false, cert: null })}
      />
    </div>
  );
}
