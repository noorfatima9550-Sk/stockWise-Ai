import { Search, Bell, TrendingUp, AlertTriangle, Sparkles } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import {
  dashboardStats,
  salesOverview,
  aiInsights,
  recentOrders,
  sidebarNavItems,
  brand
} from "../../data/landingData.js";
import logo from "../../images/smart-stationery-logo.png";

const STATUS_STYLES = {
  Paid: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Partial: "bg-orange-50 text-orange-600"
};

export default function DashboardPreview() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-panel">
      <div className="flex">
        {/* Sidebar - hidden on small screens to keep the preview readable */}
        <aside className="hidden w-40 shrink-0 border-r border-slate-100 bg-slate-50/60 p-3 sm:block md:w-44">
          <div className="mb-4 flex items-center gap-1.5 px-1">
            <img src={logo} alt={brand.name} className="h-6 w-6 rounded object-contain" />
            <span className="text-[11px] font-bold text-slate-900">{brand.name}</span>
          </div>
          <ul className="space-y-0.5">
            {sidebarNavItems.map((item, idx) => (
              <li
                key={item}
                className={`truncate rounded-md px-2 py-1.5 text-[11px] font-medium ${
                  idx === 0
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main dashboard content */}
        <div className="min-w-0 flex-1 p-3 sm:p-4">
          {/* Top bar */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-900">Dashboard</h3>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-slate-400 sm:flex">
                <Search size={12} />
                <span className="text-[10px]">Search...</span>
              </div>
              <Bell size={14} className="text-slate-400" />
              <span className="h-5 w-5 rounded-full bg-brand-100" aria-hidden="true" />
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {dashboardStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-slate-100 bg-white p-2.5 shadow-sm"
              >
                <p className="truncate text-[9px] font-medium text-slate-500">{stat.label}</p>
                <p className="mt-1 text-[13px] font-bold text-slate-900">{stat.value}</p>
                <p className="mt-0.5 flex items-center gap-0.5 text-[9px] font-semibold text-emerald-600">
                  <TrendingUp size={10} /> {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* Chart + AI Insights */}
          <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="rounded-lg border border-slate-100 bg-white p-3 md:col-span-2">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-[11px] font-semibold text-slate-800">Sales Overview</p>
                <span className="rounded border border-slate-200 px-1.5 py-0.5 text-[9px] text-slate-500">
                  This Year
                </span>
              </div>
              <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesOverview} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 8, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                      interval={1}
                    />
                    <Tooltip
                      contentStyle={{ fontSize: "10px", borderRadius: "6px" }}
                      labelStyle={{ fontSize: "10px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2953e0"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-lg border border-slate-100 bg-white p-3">
              <p className="mb-2 flex items-center gap-1 text-[11px] font-semibold text-slate-800">
                <Sparkles size={11} className="text-brand-600" /> AI Insights
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 rounded-md bg-amber-50 p-1.5">
                  <AlertTriangle size={12} className="shrink-0 text-amber-600" />
                  <p className="text-[9px] font-medium text-amber-700">{aiInsights[0].label}</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-emerald-50 p-1.5">
                  <TrendingUp size={12} className="shrink-0 text-emerald-600" />
                  <p className="text-[9px] font-medium text-emerald-700">
                    Forecast demand {aiInsights[1].value}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent orders */}
          <div className="mt-2 rounded-lg border border-slate-100 bg-white p-3">
            <p className="mb-2 text-[11px] font-semibold text-slate-800">Recent Orders</p>
            <ul className="space-y-1.5">
              {recentOrders.map((order) => (
                <li key={order.id} className="flex items-center justify-between gap-2 text-[9px]">
                  <span className="font-medium text-brand-600">{order.id}</span>
                  <span className="flex-1 truncate text-slate-500">{order.customer}</span>
                  <span className="font-semibold text-slate-800">{order.amount}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-semibold ${STATUS_STYLES[order.status]}`}
                  >
                    {order.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
