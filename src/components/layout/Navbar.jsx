import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import { brand, navLinks } from "../../data/landingData.js";
import logo from "../../images/smart-stationery-logo.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/90 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <nav className="container-page flex h-[4.5rem] items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <img src={logo} alt={brand.name} className="h-11 w-11 rounded-lg object-contain" />
          <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
            {brand.name}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex items-center gap-1 text-sm font-medium text-slate-300 transition-colors hover:text-brand-300"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={15} />}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button as={Link} to="/login" variant="outline" size="sm">
            Login
          </Button>
          <Button as={Link} to="/login" variant="primary" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#07111f] lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="flex items-center justify-between rounded-md px-2 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={15} />}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-page flex flex-col gap-2 border-t border-white/10 py-4">
            <Button as={Link} to="/login" variant="outline" size="sm">
              Login
            </Button>
            <Button as={Link} to="/login" variant="primary" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
