import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar hanya muncul kalau bukan admin */}
      {!isAdmin && <Navbar />}

      {/* Main transparan */}
      <main className="flex-1">{children}</main>

      {/* Footer juga disembunyikan di admin */}
      {!isAdmin && <Footer />}
    </div>
  );
}
