// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "../assets/logo.png";

const linkCls = (isScrolled, { isActive }) =>
  `block px-3 py-2 transition ${
    isScrolled
      ? isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-800 hover:text-blue-600"
      : "text-white hover:text-blue-300"
  }`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [offsetTop, setOffsetTop] = useState("top-0");
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.9;

      if (location.pathname === "/") {
        if (window.scrollY > heroHeight) {
          setScrolled(true);
          setOffsetTop("top-0");
        } else {
          setScrolled(false);
          setOffsetTop("top-12");
        }
      } else {
        setScrolled(window.scrollY > 50);
        setOffsetTop("top-0");
      }

      setDropdownOpen(null);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed ${offsetTop} left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 shadow-sm text-gray-800" : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="SCU Logo"
            className="h-14 md:h-18 w-auto transition-all duration-300"
          />
        </Link>

        {/* Desktop Menu */}
        <div
          className="hidden md:flex gap-8 font-medium text-base items-center"
          ref={dropdownRef}
        >
          {/* About Us */}
          <div className="relative">
            <span
              onClick={() =>
                setDropdownOpen(dropdownOpen === "about" ? null : "about")
              }
              className="flex items-center gap-1 cursor-pointer"
            >
              About Us <ChevronDown size={16} />
            </span>
            {dropdownOpen === "about" && (
              <div className="absolute left-0 mt-2 w-56 bg-white shadow rounded py-2 text-gray-800">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(null)}
                >
                  Company Profile
                </NavLink>
                <NavLink
                  to="/structure"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(null)}
                >
                  Management Structure
                </NavLink>
                <NavLink
                  to="/vision-mission"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(null)}
                >
                  Vision & Mission
                </NavLink>
                <NavLink
                  to="/penghargaan"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(null)}
                >
                  Certificates & Awards
                </NavLink>
              </div>
            )}
          </div>

          {/* Products & Services */}
          <div className="relative">
            <span
              onClick={() =>
                setDropdownOpen(dropdownOpen === "services" ? null : "services")
              }
              className="flex items-center gap-1 cursor-pointer"
            >
              Products & Services <ChevronDown size={16} />
            </span>
            {dropdownOpen === "services" && (
              <div className="absolute left-0 mt-2 w-64 bg-white shadow rounded py-2 text-gray-800">
                <NavLink
                  to="/services"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(null)}
                >
                  All Services
                </NavLink>

                <NavLink
                  to="/scada"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(null)}
                >
                  SCADA
                </NavLink>

                <NavLink
                  to="/services/data-asset"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(null)}
                >
                  Data & Asset Management
                </NavLink>

                <NavLink
                  to="/services/ict"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(null)}
                >
                  ICT Services
                </NavLink>

                <NavLink
                  to="/services/ndr"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(null)}
                >
                  National Data Repository
                </NavLink>

                <NavLink
                  to="/services/avts"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(null)}
                >
                  Automatic Vessel Tracking
                </NavLink>

                <NavLink
                  to="/retina"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(null)}
                >
                  RETINA Monitoring
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/career" className={(props) => linkCls(scrolled, props)}>
            Careers
          </NavLink>
          <NavLink to="/contact" className={(props) => linkCls(scrolled, props)}>
            Contact
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden ${
            scrolled ? "bg-white/95 text-gray-800" : "bg-white text-gray-800"
          } shadow-sm`}
        >
          <div className="px-6 py-4 space-y-2">
            <details>
              <summary className="cursor-pointer py-2 font-medium">About Us</summary>
              <div className="mt-2 pl-3 space-y-1">
                <NavLink to="/profile" className="block py-1" onClick={() => setIsOpen(false)}>
                  Company Profile
                </NavLink>
                <NavLink to="/structure" className="block py-1" onClick={() => setIsOpen(false)}>
                  Management Structure
                </NavLink>
                <NavLink to="/vision-mission" className="block py-1" onClick={() => setIsOpen(false)}>
                  Vision & Mission
                </NavLink>
                <NavLink to="/penghargaan" className="block py-1" onClick={() => setIsOpen(false)}>
                  Awards
                </NavLink>
              </div>
            </details>

            <details>
              <summary className="cursor-pointer py-2 font-medium">Products & Services</summary>
              <div className="mt-2 pl-3 space-y-1">
                <NavLink to="/services" className="block py-1" onClick={() => setIsOpen(false)}>
                  All Services
                </NavLink>
                <NavLink to="/scada" className="block py-1" onClick={() => setIsOpen(false)}>
                  SCADA
                </NavLink>
                <NavLink to="/services/data-asset" className="block py-1" onClick={() => setIsOpen(false)}>
                  Data & Asset Management
                </NavLink>
                <NavLink to="/services/ict" className="block py-1" onClick={() => setIsOpen(false)}>
                  ICT Services
                </NavLink>
                <NavLink to="/services/ndr" className="block py-1" onClick={() => setIsOpen(false)}>
                  National Data Repository
                </NavLink>
                <NavLink to="/services/avts" className="block py-1" onClick={() => setIsOpen(false)}>
                  Automatic Vessel Tracking
                </NavLink>
                <NavLink to="/retina" className="block py-1" onClick={() => setIsOpen(false)}>
                  RETINA Monitoring
                </NavLink>
              </div>
            </details>

            <NavLink to="/career" className="block py-2" onClick={() => setIsOpen(false)}>
              Careers
            </NavLink>
            <NavLink to="/contact" className="block py-2" onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
