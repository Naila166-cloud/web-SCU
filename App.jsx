// src/App.js
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "./layouts/MainLayout";
import { supabase } from "./supabaseClient";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Clients from "./pages/Clients";
import Ict from "./pages/Ict";
import AVTS from "./pages/AVTS";
import Retina from "./pages/Retina";
import DataAsset from "./pages/DataAsset";
import Ndr from "./pages/Ndr";
import Career from "./pages/Career";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Structure from "./pages/Structure";
import VisionMission from "./pages/VisionMission";
import SCADA from "./pages/SCADA"; // <-- NEW
import Penghargaan from "./pages/penghargaan";

import "./App.css";
import "./index.css";

/* ---------------------------
   Auto scroll ke atas
---------------------------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ---------------------------
   SessionGate
---------------------------- */
function SessionGate({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let unsub;
    (async () => {
      await supabase.auth.getSession();
      unsub = supabase.auth.onAuthStateChange(() => {}).data?.subscription;
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

/* ---------------------------
   PageWrapper → animasi transisi
---------------------------- */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}        
      animate={{ opacity: 1, y: 0 }}         
      exit={{ opacity: 0, y: -20 }}          
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />

        {/* Services */}
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/services/ict" element={<PageWrapper><Ict /></PageWrapper>} />
        <Route path="/services/avts" element={<PageWrapper><AVTS /></PageWrapper>} />
        <Route path="/services/data-asset" element={<PageWrapper><DataAsset /></PageWrapper>} />
        <Route path="/services/ndr" element={<PageWrapper><Ndr /></PageWrapper>} />
        <Route path="/scada" element={<PageWrapper><SCADA /></PageWrapper>} />

        {/* Other Pages */}
        <Route path="/clients" element={<PageWrapper><Clients /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/retina" element={<PageWrapper><Retina /></PageWrapper>} />
        <Route path="/career" element={<PageWrapper><Career /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />

        {/* Company */}
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/structure" element={<PageWrapper><Structure /></PageWrapper>} />
        <Route path="/vision-mission" element={<PageWrapper><VisionMission /></PageWrapper>} />

        <Route path="/penghargaan" element={<Penghargaan />} />

        {/* Fallback 404 */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h1 className="text-6xl font-bold mb-4 text-blue-600">404</h1>
                <p className="text-gray-600 mb-6">
                  Halaman yang Anda cari tidak ditemukan.
                </p>
                <a
                  href="/"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Kembali ke Beranda
                </a>
              </div>
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <MainLayout>
        <SessionGate>
          <AnimatedRoutes />
        </SessionGate>
      </MainLayout>
    </HashRouter>
  );
}

export default App;
