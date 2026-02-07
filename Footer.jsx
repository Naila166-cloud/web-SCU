// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom"; // <-- untuk navigasi internal
import Logo from "../assets/logo.png";
import { Facebook, Instagram, Youtube, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "Facebook", href: "https://www.facebook.com/fb.elnusa", Icon: Facebook, color: "hover:text-[#0076C0]" },
    { label: "Instagram", href: "https://www.instagram.com/sigmaciptautama", Icon: Instagram, color: "hover:text-[#E53935]" },
    { label: "YouTube", href: "https://youtube.com/@sigmaciptautama", Icon: Youtube, color: "hover:text-[#E53935]" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sigmaciptautama/", Icon: Linkedin, color: "hover:text-[#8BC34A]" },
  ];

  const quickLinks = [
    { label: "About Us", to: "/profile" },
    { label: "Services", to: "/services" },
    { label: "Careers", to: "/career" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="mt-16 px-4 sm:px-6">
      <div className="relative rounded-t-2xl overflow-hidden shadow-md bg-[#0B1A2E] text-white">
        {/* Blue–red–green accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0076C0] via-[#E53935] to-[#8BC34A]" />

        <div className="container mx-auto px-6 md:px-8 py-12">
          <div className="grid gap-10 lg:gap-14 md:grid-cols-4">
            {/* Brand + Address */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={Logo} alt="SCU Logo" className="h-10 w-auto" />
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                PT Sigma Cipta Utama (SCU) — a total solutions provider for Data Management & ICT Services.
              </p>
              <address className="not-italic text-sm text-gray-400 leading-relaxed">
                Graha Elnusa, Jl. TB. Simatupang Kav 1B, South Jakarta, DKI Jakarta — Indonesia<br></br>
               Jl. Asrama Tribrata No.22, Mandau District, Bengkalis Regency, Duri, Riau — Indonesia
              </address>

              {/* Socials */}
              <nav className="mt-5 flex gap-3 flex-wrap" aria-label="Social media">
                {socials.map(({ href, label, Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:bg-white/10 ${color}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-lg text-[#0076C0]">Quick Links</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="hover:text-white transition inline-flex items-center gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0076C0]" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Hours */}
            <div>
              <h3 className="font-semibold mb-4 text-lg text-[#0076C0]">Contact</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>📞 <a href="tel:+62211234567" className="hover:text-white">(+62) 21-123-4567</a></li>
                <li>✉️ <a href="mailto:info@sigmaciptautama.co.id" className="hover:text-white">info@sigmaciptautama.co.id</a></li>
                <li>🌐 <a href="https://www.sigmaciptautama.co.id" target="_blank" rel="noopener noreferrer" className="hover:text-white">sigmaciptautama.co.id</a></li>
              </ul>
              <h4 className="mt-5 font-medium text-white/90">Operational Hours</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Monday–Friday: 08:00–17:00 <br /> Saturday–Sunday & Public Holidays: Closed
              </p>
            </div>
          </div>

          <hr className="border-white/10 my-8" />

          {/* Bottom Line */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <div>© {year} PT Sigma Cipta Utama. All rights reserved.</div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-white hover:bg-white/10"
            >
              <ArrowUp className="h-4 w-4" /> Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
