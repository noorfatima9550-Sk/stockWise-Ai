import { useMemo, useState } from "react";
import {
  Bell,
  Boxes,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Menu,
  PackagePlus,
  Search,
  Settings,
  Truck,
  Users,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import AppSidebar from "../components/common/AppSidebar.jsx";
import { brand } from "../data/landingData.js";

const customers = [
  { id: "CUS-001", name: "Sharma Stationers", contact: "Rajesh Sharma", phone: "+91 98765 43210", orders: 42, purchases: "₹4,85,000", status: "Active" },
  { id: "CUS-002", name: "Bright Book Depot", contact: "Amit Verma", phone: "+91 98220 11876", orders: 35, purchases: "₹3,72,500", status: "Active" },
  { id: "CUS-003", name: "Om Traders", contact: "Mohan Patel", phone: "+91 97654 20981", orders: 28, purchases: "₹2,96,800", status: "Active" },
  { id: "CUS-004", name: "ABC Stationery", contact: "Priya Nair", phone: "+91 98901 77821", orders: 19, purchases: "₹1,84,200", status: "Active" },
  { id: "CUS-005", name: "PQR Retail", contact: "Sanjay Mehta", phone: "+91 98111 64002", orders: 12, purchases: "₹98,400", status: "Inactive" },
  { id: "CUS-006", name: "MNO Mart", contact: "Neha Kapoor", phone: "+91 97532 11220", orders: 24, purchases: "₹2,21,750", status: "Active" }
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-slate-100 text-slate-600"
};

function StatCard({ label, value, detail, tone }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
      <div className={`mt-3 h-1 w-12 rounded-full ${tone}`} />
    </div>
  );
}

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");

  const filteredCustomers = useMemo(() => {
    const query = search.toLowerCase().trim();
    return customers.filter((customer) => {
      const matchesSearch = !query || `${customer.name} ${customer.contact} ${customer.phone}`.toLowerCase().includes(query);
      const matchesStatus = status === "All Statuses" || customer.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AppSidebar footerTitle="Customer workspace" footerText="Build stronger relationships with every buyer." />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div><p className="text-xs text-slate-500">Workspace / Customers</p><h1 className="text-lg font-bold text-slate-900">Customers</h1></div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications"><Bell size={19} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" /></button>
            <span className="hidden text-right sm:block"><strong className="block text-xs text-slate-800">Admin</strong><span className="text-[10px] text-slate-500">Administrator</span></span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">AD</span>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-sm text-slate-500">Manage your wholesale customers and their purchase activity.</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Customer Overview</h2></div>
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"><Users size={17} /> Add Customer</button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total Customers" value="126" detail="Across all locations" tone="bg-brand-600" />
            <StatCard label="Active Customers" value="118" detail="93.7% of total customers" tone="bg-emerald-500" />
            <StatCard label="New This Month" value="12" detail="+20% from last month" tone="bg-blue-500" />
            <StatCard label="Total Purchases" value="₹32.4 Lakh" detail="From all customers" tone="bg-violet-500" />
          </div>

          <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div><h3 className="font-bold text-slate-900">All Customers</h3><p className="mt-1 text-xs text-slate-500">{filteredCustomers.length} customers shown</p></div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="relative block"><span className="sr-only">Search customers</span><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customers..." className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 sm:w-56" /></label>
                <label className="relative"><span className="sr-only">Filter customers by status</span><select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-600 outline-none focus:border-brand-500 sm:w-36"><option>All Statuses</option><option>Active</option><option>Inactive</option></select><ChevronDown size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" /></label>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3 font-semibold">Customer</th><th className="px-4 py-3 font-semibold">Contact Person</th><th className="px-4 py-3 font-semibold">Phone</th><th className="px-4 py-3 font-semibold">Orders</th><th className="px-4 py-3 font-semibold">Total Purchases</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 text-right font-semibold">Action</th></tr></thead>
                <tbody className="divide-y divide-slate-100">{filteredCustomers.map((customer) => <tr key={customer.id} className="hover:bg-slate-50/70"><td className="px-4 py-3.5"><span className="block font-semibold text-slate-800">{customer.name}</span><span className="mt-0.5 block text-xs text-slate-400">{customer.id}</span></td><td className="px-4 py-3.5 text-slate-700">{customer.contact}</td><td className="px-4 py-3.5 text-slate-600">{customer.phone}</td><td className="px-4 py-3.5 font-semibold text-slate-800">{customer.orders}</td><td className="px-4 py-3.5 font-semibold text-slate-800">{customer.purchases}</td><td className="px-4 py-3.5"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[customer.status]}`}>{customer.status}</span></td><td className="px-4 py-3.5 text-right"><button type="button" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">View <ChevronRight size={14} /></button></td></tr>)}</tbody>
              </table>
              {filteredCustomers.length === 0 && <p className="px-4 py-10 text-center text-sm text-slate-500">No customers match these filters.</p>}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
