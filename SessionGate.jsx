import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function SessionGate({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let unsub;
    (async () => {
      // panggil sekali untuk hydrate sesi dari localStorage
      await supabase.auth.getSession();
      // listen perubahan auth (opsional, untuk jaga-jaga)
      unsub = supabase.auth.onAuthStateChange(() => {}).data?.subscription;
      // beri 1 tick agar AdminDashboard bisa membaca sesi
      requestAnimationFrame(() => setReady(true));
    })();
    return () => unsub?.unsubscribe?.();
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Memuat sesi…
      </div>
    );
  }
  return children;
}
