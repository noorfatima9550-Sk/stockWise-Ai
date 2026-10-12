import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { BarChart3, Bell, Boxes, ChevronDown, Download, FileBarChart2, PackageCheck, TrendingUp } from "lucide-react";
import AppSidebar from "../components/common/AppSidebar.jsx";

const revenueData = [
  { month: "Jan", revenue: 18, orders: 82 },
  { month: "Feb", revenue: 22, orders: 96 },
  { month: "Mar", revenue: 21, orders: 91 },
  { month: "Apr", revenue: 28, orders: 112 },
  { month: "May", revenue: 26, orders: 108 },
  { month: "Jun", revenue: 34, orders: 138 },
  { month: "Jul", revenue: 39, orders: 154 },
  { month: "Aug", revenue: 43, orders: 171 }
];

const categoryData = [
  { name: "Notebooks", value: 34, color: "#38bdf8" },
  { name: "Writing", value: 26, color: "#818cf8" },
  { name: "Paper", value: 22, color: "#34d399" },
  { name: "Art Supplies", value: 18, color: "#fbbf24" }
];

const warehouseData = [
  { name: "Main Warehouse", stock: 4820 },
  { name: "Warehouse 2", stock: 2960 },
  { name: "North Hub", stock: 1160 }
];

const topProducts = [
  { name: "Notebook A4", category: "Notebooks", units: "2,450", revenue: "₹2.94 L", change: "+18.2%" },
  { name: "Blue Pen", category: "Pens", units: "1,730", revenue: "₹1.38 L", change: "+12.6%" },
  { name: "A4 Paper", category: "Paper", units: "1,400", revenue: "₹1.12 L", change: "+9.4%" },
  { name: "Marker Set", category: "Art Supplies", units: "990", revenue: "₹94.1 K", change: "+6.8%" }
];

function StatCard({ label, value, detail, icon: Icon, tone }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p><p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600"><TrendingUp size={12} /> {detail}</p></div><span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}><Icon size={18} /></span></div></div>;
}

export default function ReportsPage() {
  const [period, setPeriod] = useState("Last 8 months");
  const [warehouse, setWarehouse] = useState("All warehouses");
  const [reportType, setReportType] = useState("Sales & revenue");
  const [exported, setExported] = useState(false);

  function handleExport() {
    setExported(true);
    window.setTimeout(() => setExported(false), 2200);
  }

  return <div className="min-h-screen bg-slate-50 text-slate-800"><AppSidebar footerTitle="Power Reports" footerText="Turn daily operations into decisions your team can act on." /><div className="lg:pl-64"><header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8"><div><p className="text-xs text-slate-500">Workspace / Analytics</p><h1 className="text-lg font-bold text-slate-900">Power Reports</h1></div><div className="flex items-center gap-3"><button type="button" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications"><Bell size={19} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" /></button><span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">AD</span></div></header><main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8"><div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><p className="text-sm text-slate-500">See the signals behind your stationery business.</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Business Performance</h2></div><div className="flex flex-col gap-2 sm:flex-row"><label className="relative"><span className="sr-only">Report type</span><select value={reportType} onChange={(event) => setReportType(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-8 text-sm text-slate-600 outline-none focus:border-brand-500 sm:w-40"><option>Sales &amp; revenue</option><option>Inventory health</option><option>Warehouse performance</option></select><ChevronDown size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" /></label><button type="button" onClick={handleExport} className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"><Download size={16} /> {exported ? "Report ready" : "Export report"}</button></div></div><div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Total Revenue" value="₹2.31 Cr" detail="18.4% vs last period" icon={TrendingUp} tone="bg-emerald-50 text-emerald-600" /><StatCard label="Wholesale Orders" value="1,284" detail="12.8% vs last period" icon={BarChart3} tone="bg-blue-50 text-blue-600" /><StatCard label="Average Order Value" value="₹18,002" detail="6.2% vs last period" icon={FileBarChart2} tone="bg-violet-50 text-violet-600" /><StatCard label="Stock Turnover" value="4.8x" detail="0.6x vs last period" icon={PackageCheck} tone="bg-amber-50 text-amber-600" /></div><div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-bold text-slate-900">Report filters</p><p className="mt-1 text-xs text-slate-500">Adjust the reporting window and location.</p></div><div className="flex flex-col gap-2 sm:flex-row"><label className="relative"><span className="sr-only">Reporting period</span><select value={period} onChange={(event) => setPeriod(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-600 outline-none focus:border-brand-500 sm:w-40"><option>Last 8 months</option><option>Last 30 days</option><option>Last 12 months</option></select><ChevronDown size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" /></label><label className="relative"><span className="sr-only">Warehouse filter</span><select value={warehouse} onChange={(event) => setWarehouse(event.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-600 outline-none focus:border-brand-500 sm:w-44"><option>All warehouses</option><option>Main Warehouse</option><option>Warehouse 2</option><option>North Hub</option></select><ChevronDown size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" /></label></div></div><div className="grid gap-6 xl:grid-cols-3"><section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2"><div className="mb-4 flex items-center justify-between"><div><h3 className="font-bold text-slate-900">Revenue &amp; orders</h3><p className="mt-1 text-xs text-slate-500">{reportType} for {warehouse.toLowerCase()} · {period.toLowerCase()}</p></div><span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">+18.4%</span></div><div className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={revenueData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}><CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}L`} /><Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} /><Legend wrapperStyle={{ fontSize: "11px" }} /><Line type="monotone" dataKey="revenue" name="Revenue (Lakh)" stroke="#2953e0" strokeWidth={3} dot={{ r: 3, fill: "#2953e0" }} /><Line type="monotone" dataKey="orders" name="Orders" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={false} /></LineChart></ResponsiveContainer></div></section><section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-2"><h3 className="font-bold text-slate-900">Sales by category</h3><p className="mt-1 text-xs text-slate-500">Share of total revenue</p></div><div className="h-56"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={82} paddingAngle={3}>{categoryData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} /></PieChart></ResponsiveContainer></div><div className="grid grid-cols-2 gap-2">{categoryData.map((category) => <div key={category.name} className="flex items-center gap-2 text-xs text-slate-600"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: category.color }} />{category.name}<strong className="ml-auto text-slate-900">{category.value}%</strong></div>)}</div></section></div><div className="mt-6 grid gap-6 xl:grid-cols-5"><section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2"><div className="mb-4"><h3 className="font-bold text-slate-900">Warehouse performance</h3><p className="mt-1 text-xs text-slate-500">Stock units by location</p></div><div className="h-56"><ResponsiveContainer width="100%" height="100%"><BarChart data={warehouseData} layout="vertical" margin={{ top: 0, right: 12, left: 18, bottom: 0 }}><CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" horizontal={false} /><XAxis type="number" hide /><YAxis type="category" dataKey="name" width={105} tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} /><Bar dataKey="stock" name="Stock units" fill="#38bdf8" radius={[0, 5, 5, 0]} barSize={18} /></BarChart></ResponsiveContainer></div></section><section className="rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-3"><div className="flex items-center justify-between border-b border-slate-100 p-5"><div><h3 className="font-bold text-slate-900">Top performing products</h3><p className="mt-1 text-xs text-slate-500">Best sellers by revenue contribution</p></div><Boxes size={19} className="text-brand-600" /></div><div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Product</th><th className="px-5 py-3 font-semibold">Units sold</th><th className="px-5 py-3 font-semibold">Revenue</th><th className="px-5 py-3 font-semibold">Growth</th></tr></thead><tbody className="divide-y divide-slate-100">{topProducts.map((product) => <tr key={product.name} className="hover:bg-slate-50/70"><td className="px-5 py-3.5"><span className="block font-semibold text-slate-800">{product.name}</span><span className="mt-0.5 block text-xs text-slate-400">{product.category}</span></td><td className="px-5 py-3.5 font-medium text-slate-700">{product.units}</td><td className="px-5 py-3.5 font-semibold text-slate-800">{product.revenue}</td><td className="px-5 py-3.5 font-semibold text-emerald-600">{product.change}</td></tr>)}</tbody></table></div></section></div></main></div></div>;
}
