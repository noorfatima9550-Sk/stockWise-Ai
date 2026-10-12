import { useState } from "react";
import { Facebook, Twitter, Linkedin, Youtube, Send } from "lucide-react";
import { brand, footerLinks } from "../../data/landingData.js";
import logo from "../../images/smart-stationery-logo.png";

const SOCIAL_LINKS = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" }
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    // Newsletter subscription would call the backend API here once
    // that endpoint is wired up in the full project.
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="bg-brand-900 text-slate-300">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-2">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt={brand.name} className="h-10 w-10 rounded-lg object-contain" />
            <span className="text-lg font-bold text-white">{brand.name}</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            AI-Powered Wholesale Distribution &amp; Inventory Management System for
            stationery businesses.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-600"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-sm font-semibold text-white">{heading}</h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-400 transition-colors hover:text-brand-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="text-sm font-semibold text-white">Stay Updated</h4>
          <p className="mt-4 text-sm text-slate-400">
            Subscribe to our newsletter for the latest updates and tips.
          </p>
          <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full min-w-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex shrink-0 items-center justify-center rounded-lg bg-brand-600 px-3 text-white transition-colors hover:bg-brand-700"
            >
              <Send size={16} />
            </button>
          </form>
          {submitted && (
            <p className="mt-2 text-xs text-emerald-400">Subscribed! Thanks for joining.</p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-page text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
