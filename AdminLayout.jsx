export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("dashboard");
  const [counts, setCounts] = useState({ contacts: 0, applications: 0 });
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => sub?.subscription?.unsubscribe();
  }, []);

  // ambil counts + data terbaru
  useEffect(() => {
    (async () => {
      const [c1, c2] = await Promise.all([
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase.from("applications").select("*", { count: "exact", head: true }),
      ]);
      setCounts({
        contacts: c1.count || 0,
        applications: c2.count || 0,
      });

      // ambil data list terbaru
      const { data: contactRows } = await supabase.from("contacts").select("*").order("created_at", { ascending: false }).limit(5);
      const { data: applicationRows } = await supabase.from("applications").select("*").order("created_at", { ascending: false }).limit(5);

      setContacts(contactRows || []);
      setApplications(applicationRows || []);
    })();
  }, [active]);

  const logout = async () => { await supabase.auth.signOut(); };

  if (!user) return <AdminLogin />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar ... */}
      <main className="flex-1 p-6 overflow-y-auto">
        {active === "dashboard" && (
          <Overview counts={counts} contacts={contacts} applications={applications} />
        )}
        {active === "contacts" && <ContactsCard />}
        {active === "applications" && <ApplicationsCard />}
      </main>
    </div>
  );
}
