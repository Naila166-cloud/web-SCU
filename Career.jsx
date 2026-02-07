// src/pages/Career.jsx
import { useState } from "react";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { supabase, BUCKETS } from "../supabaseClient";
import {
  CheckCircle, AlertTriangle, Upload, X,
  Users, GraduationCap, Clock, Award, MapPin
} from "lucide-react";
import slide2 from "../assets/slide2.jpg";

/* Utility – unique filename */
function uid() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const MAX_FILE_MB = 10;
const ALLOWED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function Career() {
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateFile = (file) => {
    if (!file) return { ok: true };
    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_FILE_MB) return { ok: false, msg: `File size exceeds ${MAX_FILE_MB} MB.` };
    if (!ALLOWED.includes(file.type)) return { ok: false, msg: "Unsupported file type. Please upload a PDF/DOC/DOCX file." };
    return { ok: true };
  };

  const uploadCv = async (file) => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const ext = (file.name.split(".").pop() || "dat").toLowerCase();
    const path = `applications/${yyyy}/${mm}/${uid()}.${ext}`;

    const { error } = await supabase.storage
      .from(BUCKETS.CV)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || "application/octet-stream",
      });
    if (error) throw error;
    return path;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setOk(""); setErr("");

    if (!form.name.trim() || !form.email.trim() || !form.position.trim()) {
      setErr("All fields are required."); return;
    }

    const fv = validateFile(cvFile);
    if (!fv.ok) { setErr(fv.msg); return; }

    setLoading(true);
    try {
      let cv_path = null;
      if (cvFile) cv_path = await uploadCv(cvFile);

      const { error } = await supabase.from("applications").insert([{
        name: form.name.trim(),
        email: form.email.trim(),
        position: form.position.trim(),
        cv_path,
      }]);
      if (error) throw error;

      setOk("Application submitted successfully!");
      setForm({ name: "", email: "", position: "" });
      setCvFile(null);
    } catch (e1) {
      console.error(e1);
      setErr(e1?.message || "Failed to submit your application. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  /* --- static example data --- */
  const perks = [
    { icon: <Users className="w-5 h-5" />, title: "Collaborative Culture", desc: "A supportive team with open communication and a healthy work ethic." },
    { icon: <GraduationCap className="w-5 h-5" />, title: "Learning Budget", desc: "Access to courses, certifications, and conferences to enhance your skills." },
    { icon: <Clock className="w-5 h-5" />, title: "Hybrid & Flexible", desc: "Work hours and arrangements that adapt to team needs." },
    { icon: <Award className="w-5 h-5" />, title: "Clear Career Path", desc: "Structured career roadmap and regular performance reviews." },
  ];

  const openings = [
    { title: "Software Engineer", tags: ["React", "Node.js", "REST"], location: "Jakarta / Hybrid" },
    { title: "Data Analyst", tags: ["SQL", "BI", "Dashboard"], location: "BSD / Onsite" },
    { title: "DevOps Engineer", tags: ["CI/CD", "Docker", "Cloud"], location: "Jakarta / Hybrid" },
  ];

  const steps = [
    { name: "Apply Online", desc: "Submit your CV and fill out the form on this page." },
    { name: "Screening", desc: "Our HR team will review your application and contact shortlisted candidates." },
    { name: "Interview", desc: "Technical and HR interviews, conducted online or onsite." },
    { name: "Offer", desc: "If successful, you will receive an offer and start onboarding." },
  ];

  return (
    <div>
      <PageHero
        title="Careers at SCU"
        subtitle="Join us to shape the future of the energy industry through innovation and digital transformation."
        image={slide2}
      />

      {/* Info + Form Section */}
      <Section title="Join Our Team">
        <div className="grid gap-12 items-start md:grid-cols-[1.25fr_1fr]">
          {/* Info Left */}
          <div className="space-y-6 md:pr-4 lg:pr-8">
            <p className="text-gray-700 leading-relaxed">
              PT Sigma Cipta Utama invites talented individuals to grow with us.
              Join a professional team committed to advancing the energy industry through innovative digital solutions.
            </p>

            {/* Perks */}
            <div className="grid sm:grid-cols-2 gap-4">
              {perks.map((p) => (
                <div key={p.title} className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-2 text-blue-600">
                    {p.icon}
                    <span className="font-semibold text-gray-900">{p.title}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-blue-600" />
              Recruitment is open for Jakarta & BSD areas. Work arrangements are adjusted based on team needs.
            </div>
          </div>

          {/* Form Right */}
          <form
            onSubmit={onSubmit}
            className="bg-white shadow-md rounded-2xl p-6 space-y-4 w-full max-w-md md:ml-auto"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Application Form</h2>

            {ok && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 text-green-700 px-4 py-2">
                <CheckCircle className="w-5 h-5" /> {ok}
              </div>
            )}
            {err && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 text-red-700 px-4 py-2">
                <AlertTriangle className="w-5 h-5" /> {err}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                placeholder="Your Full Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                placeholder="email@domain.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position Applied</label>
              <input
                name="position"
                value={form.position}
                onChange={onChange}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                placeholder="e.g., Software Engineer"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV</label>
              <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500">
                <Upload className="w-6 h-6 mb-2" />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                  className="w-full text-sm text-gray-600"
                />
                {cvFile && (
                  <div className="mt-2 flex items-center justify-between w-full text-sm bg-gray-50 p-2 rounded">
                    <span className="truncate">{cvFile.name}</span>
                    <button type="button" onClick={() => setCvFile(null)} className="text-red-600 hover:text-red-800">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Max {MAX_FILE_MB}MB. Accepted formats: PDF/DOC/DOCX. *Your CV will be stored privately.*
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </div>
      </Section>
    </div>
  );
}
