import { useMemo, useState } from "react";
import {
  Bell,
  Boxes,
  ChevronDown,
  ChevronRight,
  ClipboardList,
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
import { brand } from "../data/landingData.js";
import AppSidebar from "../components/common/AppSidebar.jsx";
import ActionModal from "../components/common/ActionModal.jsx";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Inventory", icon: Boxes, href: "/inventory" },
  { label: "Sales Orders", icon: Truck, href: "/sales-orders", active: true },
  { label: "Products", icon: PackagePlus, href: "/inventory" },
  { label: "Customers", icon: Users, href: "/inventory" },
  { label: "Settings", icon: Settings, href: "/inventory" }
];

const orders = [
  { id: "#SO-1024", customer: "Sharma Stationers", items: 12, amount: "₹18,500", date: "18 Aug 2026", status: "Paid" },
  { id: "#SO-1023", customer: "Bright Book Depot", items: 8, amount: "₹12,200", date: "17 Aug 2026", status: "Pending" },
  { id: "#SO-1022", customer: "Om Traders", items: 15, amount: "₹15,900", date: "16 Aug 2026", status: "Partial" },
  { id: "#SO-1021", customer: "ABC Stationery", items: 6, amount: "₹8,750", date: "15 Aug 2026", status: "Paid" },
  { id: "#SO-1020", customer: "PQR Retail", items: 21, amount: "₹24,600", date: "14 Aug 2026", status: "Cancelled" },
  { id: "#SO-1019", customer: "MNO Mart", items: 10, amount: "₹9,850", date: "13 Aug 2026", status: "Paid" }
];

const statusStyles = {
  Paid: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Partial: "bg-blue-50 text-blue-700",
  Cancelled: "bg-rose-50 text-rose-700"
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

export default function SalesOrdersPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [showOrderForm, setShowOrderForm] = useState(false);

  const filteredOrders = useMemo(() => {
    const query = search.toLowerCase().trim();
    return orders.filter((order) => {
      const matchesSearch = !query || `${order.id} ${order.customer}`.toLowerCase().includes(query);
      const matchesStatus = status === "All Statuses" || order.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AppSidebar footerTitle="Order workspace" footerText="Track wholesale orders from one place." />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div><p className="text-xs text-slate-500">Workspace / Sales</p><h1 className="text-lg font-bold text-slate-900">Sales Orders</h1></div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications"><Bell size={19} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" /></button>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">AD</span>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-sm text-slate-500">Manage customer orders and keep deliveries moving.</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Order Overview</h2></div>
            <button type="button" onClick={() => setShowOrderForm(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"><ClipboardList size={17} /> Create New Order</button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total Orders" value="1,284" detail="+8.2% from last month" tone="bg-brand-600" />
            <StatCard label="Pending Orders" value="86" detail="Awaiting processing" tone="bg-amber-500" />
            <StatCard label="Completed Orders" value="1,164" detail="90.7% completion rate" tone="bg-emerald-500" />
            <StatCard label="Total Sales" value="₹24.8 Lakh" detail="+12.4% from last month" tone="bg-violet-500" />
          </div>

          <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div><h3 className="font-bold text-slate-900">All Sales Orders</h3><p className="mt-1 text-xs text-slate-500">{filteredOrders.length} orders shown</p></div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="relative block"><span className="sr-only">Search orders</span><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search orders..." className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 sm:w-52" /></label>
                <label className="relative"><span className="sr-only">Filter by status</span><select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-600 outline-none focus:border-brand-500 sm:w-36"><option>All Statuses</option><option>Paid</option><option>Pending</option><option>Partial</option><option>Cancelled</option></select><ChevronDown size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" /></label>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3 font-semibold">Order ID</th><th className="px-4 py-3 font-semibold">Customer</th><th className="px-4 py-3 font-semibold">Items</th><th className="px-4 py-3 font-semibold">Amount</th><th className="px-4 py-3 font-semibold">Order Date</th><th className="px-4 py-3 font-semibold">Status</th><th className="px-4 py-3 text-right font-semibold">Action</th></tr></thead>
                <tbody className="divide-y divide-slate-100">{filteredOrders.map((order) => <tr key={order.id} className="hover:bg-slate-50/70"><td className="px-4 py-3.5 font-semibold text-brand-600">{order.id}</td><td className="px-4 py-3.5 font-medium text-slate-800">{order.customer}</td><td className="px-4 py-3.5 text-slate-600">{order.items} products</td><td className="px-4 py-3.5 font-semibold text-slate-800">{order.amount}</td><td className="px-4 py-3.5 text-slate-600">{order.date}</td><td className="px-4 py-3.5"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>{order.status}</span></td><td className="px-4 py-3.5 text-right"><button type="button" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">View <ChevronRight size={14} /></button></td></tr>)}</tbody>
              </table>
              {filteredOrders.length === 0 && <p className="px-4 py-10 text-center text-sm text-slate-500">No orders match these filters.</p>}
            </div>
          </section>
        </main>
      </div>
      {showOrderForm && <ActionModal type="order" onClose={() => setShowOrderForm(false)} />}
    </div>
  );
}
