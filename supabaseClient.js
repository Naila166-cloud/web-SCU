// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Ambil URL & Anon Key dari .env
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Opsional: warning kalau env belum diisi
if (!SUPABASE_URL || !SUPABASE_ANON) {
  console.warn(
    "[Supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum di-set di .env"
  );
}

// Buat client Supabase (HMR-safe)
export const supabase =
  globalThis.__supabaseClient ??
  createClient(SUPABASE_URL, SUPABASE_ANON, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce", // aman untuk login password & OAuth
      storageKey: "scu-auth", // nama storage unik
    },
  });

// Pastikan singleton (tidak duplikat saat hot-reload)
if (!globalThis.__supabaseClient) {
  globalThis.__supabaseClient = supabase;
}

// Export konstanta bucket (opsional)
export const BUCKETS = {
  CV: "cv-uploads",
};
