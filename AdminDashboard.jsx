// src/pages/AdminDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- tambah
import { supabase, BUCKETS } from "../supabaseClient";
import { LogOut, Users, Briefcase, Search, Download } from "lucide-react";
import Logo from "../assets/logo.png";

/* =============== Utils =============== */
const cn = (...cls) => cls.filter(Boolean).join(" ");
const fmt = (d) => new Date(d).toLocaleString();
const toMonthKey = (d) => {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
};
const prettyMonth = (key) => {
  const [y, m] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, 1);
  return new Intl.DateTimeFormat("id-ID", { month: "short", year: "2-digit" }).format(dt);
};

const upsertById = (arr, row) => {
  if (!row) return arr;
  const i = arr.findIndex((r) => r.id === row.id);
  if (i === -1) return [row, ...arr].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const copy = [...arr];
  copy[i] = row;
  return copy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};
const removeById = (arr, id) => arr.filter((r) => r.id !== id);

/* CSV helpers (tetap sama) */
function toCSV(headers, rows) {
  const esc = (v) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const head = headers.map(esc).join(",");
  const body = rows.map((r) => r.map(esc).join(",")).join("\n");
  return head + "\n" + body;
}
function downloadCSV(filename, headers, rows) {
  const blob = new Blob([toCSV(headers, rows)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* Download CV helpers (tetap sama) */
const isHttpUrl = (s = "") => /^https?:\/\//i.test(s);
const basename = (p = "") => p.split("/").pop() || "";
const extname = (p = "") => {
  const b = basename(p);
  const i = b.lastIndexOf(".");
  return i >= 0 ? b.slice(i + 1) : "";
};
const sanitize = (s = "") =>
  s.normalize("NFKD").replace(/[^\w.-]+/g, "_").replace(/_+/g, "_").replace(/^_+|_+$/g, "");

async function downloadBlob(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Gagal mengunduh (${res.status})`);
  const blob = await res.blob();
  const a = document.createElement("a");
  const href = URL.createObjectURL(blob);
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

async function handleDownloadCV({ cv_path, name }) {
  try {
    if (!cv_path) throw new Error("CV tidak tersedia");
    const safeName = sanitize(name || "pelamar");
    const ext = extname(cv_path) || "pdf";
    const filename = `CV_${safeName}.${ext}`;

    if (isHttpUrl(cv_path)) {
      await downloadBlob(cv_path, filename);
      return;
    }

    const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${BUCKETS.CV}/${cv_path}`;
    const head = await fetch(publicUrl, { method: "HEAD" });

    if (head.ok) {
      await downloadBlob(publicUrl, filename);
      return;
    }

    const { data, error } = await supabase.storage
      .from(BUCKETS.CV)
      .createSignedUrl(cv_path, 60);

    if (error || !data?.signedUrl) throw error || new Error("Gagal membuat signed URL");
    await downloadBlob(data.signedUrl, filename);
  } catch (e) {
    alert(e?.message || "Gagal mengunduh CV");
  }
}

/* =============== Recharts imports (tetap sama) =============== */
import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
  AreaChart, Area,
} from "recharts";

/* Tooltip kecil */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const { name, value, color } = payload[0];
  return (
    <div className="rounded-md bg-white/95 shadow px-3 py-2 text-xs">
      <div className="font-medium mb-0.5">{label}</div>
      <div className="flex items-center gap-2">
        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: color }} />
        <span className="text-gray-700">{name}:</span>
        <span className="font-semibold text-gray-900">{value}</span>
      </div>
    </div>
  );
}

/* Small UI components (StatCard, Card, Table, Pager) - sama persis seperti filemu */
function StatCard({ title, value }) {
  return (
    <div className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
function Card({ title, right, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {right}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
function Table({ columns, rows }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 text-left">
          <tr>{columns.map((c) => <th key={c} className="px-4 py-2">{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              {r.map((cell, j) => <td key={j} className="px-4 py-2">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Pager({ page, setPage, pageCount, pageSize, setPageSize, total }) {
  const canPrev = page > 1;
  const canNext = page < pageCount;
  return (
    <div className="flex items-center justify-between mt-3">
      <div className="text-xs text-gray-500">
        Halaman <span className="font-medium">{page}</span> dari{" "}
        <span className="font-medium">{pageCount || 1}</span> •{" "}
        <span className="font-medium">{total}</span> baris
      </div>
      <div className="flex items-center gap-2">
        <select
          value={pageSize}
          onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
          className="border rounded-lg px-2 py-1 text-sm"
        >
          {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n} / halaman</option>)}
        </select>
        <div className="flex items-center gap-1">
          <button
            onClick={() => canPrev && setPage(page - 1)}
            disabled={!canPrev}
            className={cn(
              "px-3 py-1 rounded-lg border text-sm",
              canPrev ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"
            )}
          >
            Prev
          </button>
          <button
            onClick={() => canNext && setPage(page + 1)}
            disabled={!canNext}
            className={cn(
              "px-3 py-1 rounded-lg border text-sm",
              canNext ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== AdminLogin (sama) ===== */
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setLoading(false);
    if (error) alert(error.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <form onSubmit={login} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-4">
        <img src={Logo} alt="logo" className="h-12 mx-auto" />
        <h1 className="text-xl font-bold text-center">Admin Login</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-lg p-2" required />
        <input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} className="w-full border rounded-lg p-2" required />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          {loading ? "Loading..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}

/* =============== Main =============== */
export default function AdminDashboard() {
  const navigate = useNavigate(); // <-- gunakan navigate
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("dashboard");
  const [contacts, setContacts] = useState([]);
  const [applications, setApps] = useState([]);
  const [counts, setCounts] = useState({ contacts: 0, applications: 0 });

  const [searchC, setSearchC] = useState("");
  const [searchA, setSearchA] = useState("");

  const [pageC, setPageC] = useState(1);
  const [sizeC, setSizeC] = useState(10);
  const [pageA, setPageA] = useState(1);
  const [sizeA, setSizeA] = useState(10);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    })();
    const sub = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => sub?.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: c } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
      setContacts(c || []);
      const { data: a } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
      setApps(a || []);
      setCounts({ contacts: c?.length || 0, applications: a?.length || 0 });
    };
    fetchData();
  }, [tab]);

  useEffect(() => {
    const chContacts = supabase
      .channel("realtime:contacts")
      .on("postgres_changes", { event: "*", schema: "public", table: "contacts" }, (payload) => {
        if (payload.eventType === "INSERT") {
          setContacts((prev) => upsertById(prev, payload.new));
          setCounts((c) => ({ ...c, contacts: (c.contacts || 0) + 1 }));
        } else if (payload.eventType === "UPDATE") {
          setContacts((prev) => upsertById(prev, payload.new));
        } else if (payload.eventType === "DELETE") {
          setContacts((prev) => removeById(prev, payload.old?.id));
          setCounts((c) => ({ ...c, contacts: Math.max((c.contacts || 1) - 1, 0) }));
        }
      })
      .subscribe();

    const chApps = supabase
      .channel("realtime:applications")
      .on("postgres_changes", { event: "*", schema: "public", table: "applications" }, (payload) => {
        if (payload.eventType === "INSERT") {
          setApps((prev) => upsertById(prev, payload.new));
          setCounts((c) => ({ ...c, applications: (c.applications || 0) + 1 }));
        } else if (payload.eventType === "UPDATE") {
          setApps((prev) => upsertById(prev, payload.new));
        } else if (payload.eventType === "DELETE") {
          setApps((prev) => removeById(prev, payload.old?.id));
          setCounts((c) => ({ ...c, applications: Math.max((c.applications || 1) - 1, 0) }));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(chContacts);
      supabase.removeChannel(chApps);
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // <-- redirect ke root setelah logout
  };

  const last12MonthKeys = useMemo(() => {
    const now = new Date();
    const keys = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      keys.push(toMonthKey(d));
    }
    return keys;
  }, []);

  const contactsByMonth = useMemo(() => {
    const mcount = new Map(last12MonthKeys.map(k => [k, 0]));
    for (const c of contacts) {
      const k = toMonthKey(c.created_at);
      if (mcount.has(k)) mcount.set(k, mcount.get(k) + 1);
    }
    return last12MonthKeys.map(k => ({ key: k, label: prettyMonth(k), contacts: mcount.get(k) }));
  }, [contacts, last12MonthKeys]);

  const appsByPosition = useMemo(() => {
    const map = new Map();
    for (const a of applications) {
      const p = (a.position || "Unknown").trim();
      map.set(p, (map.get(p) || 0) + 1);
    }
    return Array.from(map, ([position, count]) => ({ position, count }))
      .sort((x, y) => y.count - x.count)
      .slice(0, 8);
  }, [applications]);

  const qC = searchC.toLowerCase();
  const qA = searchA.toLowerCase();

  const filteredContacts = useMemo(() => {
    if (!qC) return contacts;
    return contacts.filter(c =>
      c.name?.toLowerCase().includes(qC) ||
      c.email?.toLowerCase().includes(qC) ||
      c.message?.toLowerCase().includes(qC)
    );
  }, [contacts, qC]);

  const filteredApplications = useMemo(() => {
    if (!qA) return applications;
    return applications.filter(a =>
      a.name?.toLowerCase().includes(qA) ||
      a.email?.toLowerCase().includes(qA) ||
      a.position?.toLowerCase().includes(qA)
    );
  }, [applications, qA]);

  useEffect(() => { setPageC(1); }, [qC]);
  useEffect(() => { setPageA(1); }, [qA]);

  const pageCountC = Math.max(1, Math.ceil(filteredContacts.length / sizeC));
  const pageRowsC = useMemo(() => {
    const start = (pageC - 1) * sizeC;
    return filteredContacts.slice(start, start + sizeC);
  }, [filteredContacts, pageC, sizeC]);

  const pageCountA = Math.max(1, Math.ceil(filteredApplications.length / sizeA));
  const pageRowsA = useMemo(() => {
    const start = (pageA - 1) * sizeA;
    return filteredApplications.slice(start, start + sizeA);
  }, [filteredApplications, pageA, sizeA]);

  if (!user) return <AdminLogin />;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-60 bg-white shadow flex flex-col">
        <div
          onClick={() => { setTab("dashboard"); navigate("/admin"); }} // <-- navigate to /admin (hash-aware)
          className="px-6 py-4 border-b flex items-center justify-center cursor-pointer hover:bg-gray-50"
          title="Kembali ke Dashboard"
        >
          <img src={Logo} alt="SCU Logo" className="h-12 w-auto" />
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setTab("contacts")}
            className={cn("w-full flex items-center gap-2 px-3 py-2 rounded-lg",
              tab === "contacts" ? "bg-blue-600 text-white" : "hover:bg-gray-100")}>
            <Users size={18}/> Contacts
          </button>
          <button onClick={() => setTab("applications")}
            className={cn("w-full flex items-center gap-2 px-3 py-2 rounded-lg",
              tab === "applications" ? "bg-blue-600 text-white" : "hover:bg-gray-100")}>
            <Briefcase size={18}/> Applications
          </button>
        </nav>

        <div className="p-4 border-t">
          <button onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-red-600">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white px-6 py-3 shadow flex justify-between items-center">
          <h1 className="font-semibold">
            {tab === "dashboard" ? "Dashboard" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </h1>
          <div />
        </header>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* ... isi konten tetap sama seperti file originalmu ... */}
          {tab === "dashboard" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard title="Total Contacts" value={counts.contacts}/>
                <StatCard title="Total Applications" value={counts.applications}/>
                <StatCard title="Status" value="Online ✅"/>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card title="Kontak per Bulan (12 bln)">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={contactsByMonth} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
                        <defs>
                          <linearGradient id="ctArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0.04} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#6b7280" }} tickMargin={6} />
                        <YAxis allowDecimals={false} width={28} tick={{ fontSize: 12, fill: "#6b7280" }} />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Area type="monotone" dataKey="contacts" name="Contacts" stroke="#2563eb" strokeWidth={2} fill="url(#ctArea)" dot={{ r: 2 }} activeDot={{ r: 4 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card title="Aplikasi per Posisi (Top 8)">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={appsByPosition} margin={{ top: 8, right: 12, left: 0, bottom: 12 }} barSize={28}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="position" tick={{ fontSize: 12, fill: "#6b7280" }} tickMargin={10} interval={0} />
                        <YAxis allowDecimals={false} width={28} tick={{ fontSize: 12, fill: "#6b7280" }} />
                        <Tooltip content={<ChartTooltip />} />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Bar dataKey="count" name="Applications" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </>
          )}

          {tab === "contacts" && (
            <Card title="Contacts" right={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={searchC} onChange={(e) => setSearchC(e.target.value)} placeholder="Cari nama, email, atau pesan…" className="border rounded-lg pl-8 pr-3 py-1.5 text-sm" />
                </div>
                <button onClick={() => {
                  const headers = ["id","name","email","message","created_at"];
                  const rows = filteredContacts.map(c => [c.id, c.name, c.email, c.message, c.created_at]);
                  downloadCSV(`contacts_${Date.now()}.csv`, headers, rows);
                }} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50" title="Export hasil filter ke CSV">
                  <Download size={16}/> Export CSV
                </button>
              </div>
            }>
              <Table columns={["Name","Email","Message","Date"]} rows={pageRowsC.map(c => [c.name, c.email, c.message, fmt(c.created_at)])} />
              <Pager page={pageC} setPage={setPageC} pageCount={pageCountC} pageSize={sizeC} setPageSize={setSizeC} total={filteredContacts.length} />
            </Card>
          )}

          {tab === "applications" && (
            <Card title="Applications" right={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={searchA} onChange={(e) => setSearchA(e.target.value)} placeholder="Cari nama, email, posisi…" className="border rounded-lg pl-8 pr-3 py-1.5 text-sm" />
                </div>
                <button onClick={() => {
                  const headers = ["id","name","email","position","cv_path","created_at"];
                  const rows = filteredApplications.map(a => [a.id, a.name, a.email, a.position, a.cv_path ?? "", a.created_at]);
                  downloadCSV(`applications_${Date.now()}.csv`, headers, rows);
                }} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border hover:bg-gray-50" title="Export hasil filter ke CSV">
                  <Download size={16}/> Export CSV
                </button>
              </div>
            }>
              <Table columns={["Name","Email","Position","CV","Date"]} rows={pageRowsA.map(a => [
                a.name,
                a.email,
                a.position,
                a.cv_path ? (
                  <button key={a.id} onClick={() => handleDownloadCV({ cv_path: a.cv_path, name: a.name })} className="inline-flex items-center gap-1 px-2 py-1 rounded border text-sm hover:bg-gray-50" title="Download CV">
                    <Download size={14} /> Download
                  </button>
                ) : "-",
                fmt(a.created_at)
              ])} />
              <Pager page={pageA} setPage={setPageA} pageCount={pageCountA} pageSize={sizeA} setPageSize={setSizeA} total={filteredApplications.length} />
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
