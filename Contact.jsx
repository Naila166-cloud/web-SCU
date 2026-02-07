// src/pages/Contact.jsx
import { useEffect, useMemo, useState } from "react";
import Section from "../components/ui/Section";
import PageHero from "../components/ui/PageHero";
import { supabase } from "../supabaseClient";
import {
  MapPin,
  Phone,
  Building2,
  Mail,
  Printer,
  Copy,
  Check,
  Clock,
} from "lucide-react";

import slide3 from "../assets/slide3.jpg";

/* ---------- Small helpers ---------- */
const telHref = (num) => `tel:${num.replace(/[^+\d]/g, "")}`;
const mailHref = (e) => `mailto:${e}`;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

/* ---------- Office Card ---------- */
function OfficeCard({ title, address, phone, fax }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <p className="flex items-start gap-2 text-gray-700">
        <MapPin className="w-4 h-4 mt-1 text-gray-500 shrink-0" />
        <span>{address}</span>
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <a
          href={telHref(phone)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border hover:bg-gray-50"
        >
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{phone}</span>
        </a>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border hover:bg-gray-50"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-500" />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>

        {fax && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-gray-50">
            <Printer className="w-4 h-4 text-gray-500" />
            <span>Fax: {fax}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Office Hours ---------- */
function HoursCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Operating Hours</h3>
      </div>
      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span className="text-gray-600">Monday–Friday</span>
          <span className="font-medium">08:00 – 17:00 WIB</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-600">Saturday</span>
          <span className="font-medium">08:00 – 12:00 WIB</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-600">Sunday / Holidays</span>
          <span className="font-medium">Closed</span>
        </li>
      </ul>
    </div>
  );
}

export default function Contact() {
  /* ====== STATE KHUSUS COPY SALES (TAMBAHAN SAJA) ====== */
  const [copiedSales, setCopiedSales] = useState(false);

  const handleCopySales = async () => {
    try {
      await navigator.clipboard.writeText("(+62) 8117 5047 76");
      setCopiedSales(true);
      setTimeout(() => setCopiedSales(false), 1200);
    } catch {}
  };

  /* ====== FORM STATE ====== */
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const [showAlert, setShowAlert] = useState(false);

  const MAX = 2000;
  const used = form.message.length;
  const left = useMemo(() => clamp(MAX - used, 0, MAX), [used]);

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  useEffect(() => {
    if (status.type !== "idle") {
      setShowAlert(true);
      const t = setTimeout(() => setShowAlert(false), 2500);
      return () => clearTimeout(t);
    }
  }, [status]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from("contacts").insert([
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
      ]);
      setStatus({ type: "success", msg: "Message sent successfully." });
      setForm({ name: "", email: "", message: "", website: "" });
    } catch {
      setStatus({ type: "error", msg: "Failed to send message." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Reach out to our offices — we’re ready to assist you."
        image={slide3}
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            <OfficeCard
              title="Head Office (Jakarta)"
              address="Graha Elnusa, 7th Floor, Jl. TB. Simatupang Kav. 1B, South Jakarta"
              phone="(62-21) 7883 0856"
              fax="(62-21) 7883 0857"
            />

            <OfficeCard
              title="Operational Office (BSD)"
              address="Jl. Tekno I Blok B5–B7, BSD, South Tangerang"
              phone="(62-21) 7587 1955"
              fax="(62-21) 7587 1933"
            />

            <div className="flex flex-col gap-6">
              <OfficeCard
                title="Project Office (Duri – SCADA Project)"
                address="Jl. Asrama Tribrata No.22, Duri, Riau, Indonesia"
                phone="(62-76) 1175 0477 6 "
                fax="—"
              />
              <HoursCard />
            </div>

            {/* ===== United Head Sales (HANYA DITAMBAH COPY) ===== */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold">
                    United Head Sales (Duri)
                  </h3>
                  <h5 className="text-sm font-semibold text-gray-500">
                    Marwan Siregar
                  </h5>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <a
                  href={mailHref("marwan.siregar@elnusa.co.id")}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                >
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>marwan.siregar@elnusa.co.id</span>
                </a>

                <div className="flex items-center gap-3">
                  <a
                    href={telHref("(+62) 8117 5047 76")}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                  >
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>(62) 811 7504 776</span>
                  </a>

                  <button
                    onClick={handleCopySales}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border hover:bg-gray-50"
                  >
                    {copiedSales ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                    <span>{copiedSales ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit"
          >
            <h3 className="text-lg font-semibold mb-3">Send a Message</h3>

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={onChange}
              className="w-full mb-3 border rounded-lg px-3 py-2"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              className="w-full mb-3 border rounded-lg px-3 py-2"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={onChange}
              rows={5}
              className="w-full mb-3 border rounded-lg px-3 py-2"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </Section>
    </div>
  );
}
