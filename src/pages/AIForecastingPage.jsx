import { useMemo, useState } from "react";
import { AlertTriangle, Bell, Boxes, ChevronDown, ChevronRight, LayoutDashboard, PackagePlus, Settings, Sparkles, TrendingUp, Truck, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";
import AppSidebar from "../components/common/AppSidebar.jsx";

const forecastData = [
  { month: "Aug", actual: 820, forecast: 820 },
  { month: "Sep", actual: 940, forecast: 940 },
  { month: "Oct", actual: 1050, forecast: 1050 },
  { month: "Nov", actual: 1120, forecast: 1120 },
  { month: "Dec", actual: null, forecast: 1280 },
  { month: "Jan", actual: null, forecast: 1360 },
  { month: "Feb", actual: null, forecast: 1450 }
];

const products = [
  { name: "Notebook A4", category: "Notebooks", current: 450, demand: 620, recommendation: "Order 250 units", confidence: "94%" },
  { name: "Blue Pen", category: "Pens", current: 1200, demand: 980, recommendation: "Stock healthy", confidence: "91%" },
  { name: "A4 Paper", category: "Paper", current: 90, demand: 340, recommendation: "Order 300 units", confidence: "97%" },
  { name: "Marker Set", category: "Art Supplies", current: 210, demand: 280, recommendation: "Order 100 units", confidence: "88%" },
  { name: "Pencil", category: "Writing", current: 780, demand: 600, recommendation: "Stock healthy", confidence: "86%" }
];

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Inventory", icon: Boxes, href: "/inventory" },
  { label: "Sales Orders", icon: Truck, href: "/sales-orders" },
  { label: "Products", icon: PackagePlus, href: "/inventory" },
  { label: "Customers", icon: Users, href: "/customers" },
  { label: "Settings", icon: Settings, href: "/settings" }
];

function StatCard({ label, value, detail, icon: Icon, tone }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div><span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}><Icon size={18} /></span></div></div>;
}

export default function AIForecastingPage() {
  const [period, setPeriod] = useState("Next 6 months");
  const [category, setCategory] = useState("All Categories");

  const filteredProducts = useMemo(() => category === "All Categories" ? products : products.filter((product) => product.category === category), [category]);

  return <div className="min-h-screen bg-slate-50 text-slate-800">
    <AppSidebar footerTitle="AI Forecasting" footerText="Plan stock with confidence using demand insights." />
    <div className="lg:pl-64">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8"><div><p className="text-xs text-slate-500">Workspace / AI Insights</p><h1 className="text-lg font-bold text-slate-900">AI Forecasting</h1></div><div className="flex items-center gap-3"><button type="button" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications"><Bell size={19} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" /></button><span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">AD</span></div></header>
      <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Use your sales history to prepare for what comes next.</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Demand Forecast</h2></div><Link to="/inventory" className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"><Boxes size={17} /> Review Inventory</Link></div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Forecast Accuracy" value="92%" detail="Based on recent sales" icon={Sparkles} tone="bg-violet-50 text-violet-600" /><StatCard label="Expected Demand" value="+18.4%" detail="Compared with last period" icon={TrendingUp} tone="bg-emerald-50 text-emerald-600" /><StatCard label="Reorder Recommendations" value="12" detail="Products need attention" icon={AlertTriangle} tone="bg-amber-50 text-amber-600" /><StatCard label="Forecast Horizon" value="6 months" detail="Updated today" icon={ChevronRight} tone="bg-blue-50 text-blue-600" /></div>
        <div className="mt-6 grid gap-6 xl:grid-cols-3"><section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2"><div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h3 className="font-bold text-slate-900">Demand Trend</h3><p className="mt-1 text-xs text-slate-500">Actual sales and AI-predicted demand</p></div><label className="relative"><span className="sr-only">Forecast period</span><select value={period} onChange={(event) => setPeriod(event.target.value)} className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs text-slate-600 outline-none focus:border-brand-500"><option>Next 6 months</option><option>Next 3 months</option><option>Next 12 months</option></select><ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" /></label></div><div className="h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={forecastData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}><defs><linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2953e0" stopOpacity={0.25} /><stop offset="95%" stopColor="#2953e0" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} /><Area type="monotone" dataKey="forecast" stroke="#2953e0" strokeWidth={3} fill="url(#forecastFill)" connectNulls /></AreaChart></ResponsiveContainer></div><div className="mt-2 flex items-center gap-4 text-xs text-slate-500"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-600" />AI forecast</span><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-300" />Historical sales</span></div></section>
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Sparkles size={18} /></span><div><h3 className="font-bold text-slate-900">AI Summary</h3><p className="mt-1 text-xs text-slate-500">What the model sees</p></div></div><div className="mt-5 space-y-4"><div><p className="text-sm font-semibold text-slate-800">Seasonal demand is rising</p><p className="mt-1 text-xs leading-relaxed text-slate-500">Notebook and paper demand is expected to increase over the next two months.</p></div><div><p className="text-sm font-semibold text-slate-800">Reorder before the peak</p><p className="mt-1 text-xs leading-relaxed text-slate-500">12 products may fall below minimum stock if current demand continues.</p></div><div className="rounded-lg bg-blue-50 p-3"><p className="text-xs font-semibold text-blue-800">Suggested action</p><p className="mt-1 text-sm font-bold text-slate-800">Review reorder recommendations today.</p></div></div><Link to="/inventory" className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">Open inventory <ChevronRight size={14} /></Link></section></div>
        <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-bold text-slate-900">Product Recommendations</h3><p className="mt-1 text-xs text-slate-500">AI-generated stock planning suggestions</p></div><label className="relative"><span className="sr-only">Filter by category</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-600 outline-none focus:border-brand-500"><option>All Categories</option><option>Notebooks</option><option>Pens</option><option>Paper</option><option>Art Supplies</option><option>Writing</option></select><ChevronDown size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" /></label></div><div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3 font-semibold">Product</th><th className="px-4 py-3 font-semibold">Current Stock</th><th className="px-4 py-3 font-semibold">Predicted Demand</th><th className="px-4 py-3 font-semibold">Recommendation</th><th className="px-4 py-3 font-semibold">Confidence</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredProducts.map((product) => <tr key={product.name} className="hover:bg-slate-50/70"><td className="px-4 py-3.5"><span className="block font-semibold text-slate-800">{product.name}</span><span className="mt-0.5 block text-xs text-slate-400">{product.category}</span></td><td className="px-4 py-3.5 text-slate-700">{product.current}</td><td className="px-4 py-3.5 font-semibold text-slate-800">{product.demand}</td><td className="px-4 py-3.5"><span className={product.recommendation === "Stock healthy" ? "text-emerald-700" : "text-amber-700"}>{product.recommendation}</span></td><td className="px-4 py-3.5 font-semibold text-brand-600">{product.confidence}</td></tr>)}</tbody></table></div></section>
      </main>
    </div>
  </div>;
}
