import { useState } from "react";
import {
  ArrowLeft,
  BellRing,
  BrainCircuit,
  Boxes,
  FileBarChart2,
  LayoutDashboard,
  LogOut,
  Menu,
  PackagePlus,
  Settings,
  Truck,
  Users,
  Warehouse,
  X
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { brand } from "../../data/landingData.js";
import logo from "../../images/smart-stationery-logo.png";
import { useAuth } from "../../context/AuthContext.jsx";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Inventory", icon: Boxes, href: "/inventory" },
  { label: "Warehouses", icon: Warehouse, href: "/warehouses" },
  { label: "Smart Alerts", icon: BellRing, href: "/smart-alerts" },
  { label: "Reports", icon: FileBarChart2, href: "/reports" },
  { label: "Sales Orders", icon: Truck, href: "/sales-orders" },
  { label: "AI Forecasting", icon: BrainCircuit, href: "/ai-forecasting" },
  { label: "Customers", icon: Users, href: "/customers" },
  { label: "Settings", icon: Settings, href: "/settings" }
];

export default function AppSidebar({ footerTitle = "StockWise AI", footerText = "Your business overview, all in one place." }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0b1f4d] px-4 py-5 text-white shadow-xl flex flex-col justify-between transition-transform lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <div className="flex items-center justify-between px-2">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt={brand.name} className="h-9 w-9 rounded-lg object-contain" />
              <span className="text-base font-bold">{brand.name}</span>
            </Link>
            <button type="button" className="rounded-md p-1 text-blue-100 lg:hidden" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation"><X size={20} /></button>
          </div>
          <nav className="mt-6 space-y-1">
            {navigation.map(({ label, icon: Icon, href }) => {
              const active = href === "/inventory" ? location.pathname === "/inventory" : location.pathname === href;
              return <Link key={label} to={href} onClick={() => setMobileNavOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-brand-600 text-white shadow-sm" : "text-blue-100 hover:bg-white/10 hover:text-white"}`}><Icon size={17} />{label}</Link>;
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-4 border-t border-white/10">
          {user && (
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[11px] text-blue-200 capitalize truncate">{user.role} • {user.email}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition-colors"
          >
            <LogOut size={17} />
            Sign Out / Logout
          </button>

          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-600"
            onClick={() => setMobileNavOpen(false)}
          >
            <ArrowLeft size={15} />
            Back to landing page
          </Link>
        </div>
      </aside>
      {mobileNavOpen && <button type="button" className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation overlay" />}
      <button type="button" className="fixed left-4 top-4 z-20 rounded-md bg-white p-2 text-slate-600 shadow lg:hidden" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
    </>
  );
}
