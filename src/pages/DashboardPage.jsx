import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Boxes,
  ChevronRight,
  LogOut,
  PackagePlus,
  Search,
  Sparkles,
  TrendingUp,
  Truck,
  Users
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Link, useNavigate } from "react-router-dom";
import AppSidebar from "../components/common/AppSidebar.jsx";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const statusStyles = {
  Paid: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Partial: "bg-orange-50 text-orange-700"
};

function StatCard({ label, value, change, icon: Icon, tone }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
          <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <TrendingUp size={13} /> {change} from last month
          </p>
        </div>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}>
          <Icon size={18} />
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    dashboardStats: [
      { label: "Total Revenue", value: "₹24.8L", change: "+12.4%", trend: "up" },
      { label: "Total Orders", value: "1,284", change: "+8.2%", trend: "up" },
      { label: "Total Products", value: "8,940", change: "+4.1%", trend: "up" },
      { label: "Total Profit", value: "₹6.2L", change: "+10.6%", trend: "up" }
    ],
    salesOverview: [],
    aiInsights: [
      { label: "18 items need reorder", type: "reorder" },
      { label: "AI Forecast: next month demand", value: "+21%", type: "forecast" }
    ],
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const stats = await api.getDashboardStats();
        if (stats) {
          setData(stats);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userInitials = user && user.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "AD";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AppSidebar />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-slate-500">Workspace / Overview</p>
              <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-400 sm:flex">
              <Search size={15} /> Search anything...
            </div>
            <button type="button" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
              <Bell size={19} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </button>
            <span className="hidden text-right sm:block">
              <strong className="block text-xs text-slate-800">{user ? user.name : "Admin"}</strong>
              <span className="text-[10px] text-slate-500 capitalize">{user ? user.role : "Administrator"}</span>
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
              {userInitials}
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm text-slate-500">Here is what is happening with your business today.</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Welcome back, {user ? user.name : "Admin"} 👋
              </h2>
            </div>
            <Link to="/inventory" className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700">
              <PackagePlus size={17} /> Manage Inventory
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard {...(data.dashboardStats[0] || { label: "Total Revenue", value: "₹0" })} icon={TrendingUp} tone="bg-emerald-50 text-emerald-600" />
            <StatCard {...(data.dashboardStats[1] || { label: "Total Orders", value: "0" })} icon={Truck} tone="bg-blue-50 text-blue-600" />
            <StatCard {...(data.dashboardStats[2] || { label: "Total Products", value: "0" })} icon={Boxes} tone="bg-violet-50 text-violet-600" />
            <StatCard {...(data.dashboardStats[3] || { label: "Inventory Value", value: "₹0" })} icon={Sparkles} tone="bg-amber-50 text-amber-600" />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div><h3 className="font-bold text-slate-900">Sales Overview</h3><p className="mt-1 text-xs text-slate-500">Revenue performance from database orders</p></div>
                <button type="button" className="hidden items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 sm:flex">This Year <ChevronRight size={14} /></button>
              </div>
              <div className="h-64 w-full">
                {data.salesOverview && data.salesOverview.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.salesOverview} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}>
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}k`} />
                      <Tooltip contentStyle={{ border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
                      <Line type="monotone" dataKey="value" stroke="#2953e0" strokeWidth={3} dot={{ r: 3, fill: "#2953e0" }} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-slate-400">Loading chart data...</div>
                )}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between"><div><h3 className="font-bold text-slate-900">AI Insights</h3><p className="mt-1 text-xs text-slate-500">Recommendations for your business</p></div><Sparkles size={19} className="text-brand-600" /></div>
              <div className="space-y-3">
                <div className="rounded-lg bg-amber-50 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-800"><AlertTriangle size={15} /> Reorder recommendation</div>
                  <p className="mt-2 text-sm font-bold text-slate-800">{data.aiInsights && data.aiInsights[0] ? data.aiInsights[0].label : "Check inventory levels"}</p>
                  <p className="mt-1 text-xs text-slate-500">Review your low-stock products before the next order cycle.</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-800"><TrendingUp size={15} /> Demand forecast</div>
                  <p className="mt-2 text-sm font-bold text-slate-800">Demand predicted {data.aiInsights && data.aiInsights[1] ? data.aiInsights[1].value : "+21%"} next month</p>
                  <p className="mt-1 text-xs text-slate-500">Plan stock levels early to avoid missed wholesale orders.</p>
                </div>
              </div>
              <Link to="/inventory" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">View inventory alerts <ChevronRight size={14} /></Link>
            </section>
          </div>

          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between"><div><h3 className="font-bold text-slate-900">Recent Orders</h3><p className="mt-1 text-xs text-slate-500">Latest wholesale activity from database</p></div><Link to="/sales-orders" className="text-xs font-semibold text-brand-600 hover:text-brand-700">View all</Link></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.recentOrders && data.recentOrders.length > 0 ? (
                    data.recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="py-3.5 font-semibold text-brand-600">{order.id}</td>
                        <td className="py-3.5 text-slate-700">{order.customer}</td>
                        <td className="py-3.5 font-semibold text-slate-800">{order.amount}</td>
                        <td className="py-3.5"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status] || "bg-slate-100 text-slate-700"}`}>{order.status}</span></td>
                        <td className="py-3.5 text-right"><Link to="/sales-orders" className="text-xs font-semibold text-brand-600 hover:text-brand-700">View</Link></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-slate-400">No recent orders found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
