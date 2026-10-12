import { useMemo, useState, useEffect } from "react";
import {
  Bell,
  Boxes,
  ChevronDown,
  CircleAlert,
  LayoutDashboard,
  Menu,
  PackagePlus,
  Search,
  Settings,
  SlidersHorizontal,
  Truck,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import AppSidebar from "../components/common/AppSidebar.jsx";
import ActionModal from "../components/common/ActionModal.jsx";
import { api } from "../services/api.js";

const statusStyles = {
  Healthy: "bg-emerald-50 text-emerald-700",
  "Low Stock": "bg-amber-50 text-amber-700",
  "Out of Stock": "bg-rose-50 text-rose-700"
};

function StatCard({ label, value, detail, icon: Icon, tone }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{detail}</p>
        </div>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}>
          <Icon size={18} />
        </span>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      const data = await api.getInventory();
      if (Array.isArray(data)) {
        setItems(data);
      }
    } catch (err) {
      console.error("Failed to load inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        categoryFilter === "All Categories" || item.category === categoryFilter;
      const matchStatus =
        statusFilter === "All Status" || item.status === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [items, search, categoryFilter, statusFilter]);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["All Categories", ...Array.from(set)];
  }, [items]);

  const stats = useMemo(() => {
    const totalItems = items.reduce((acc, curr) => acc + (curr.stock || 0), 0);
    const lowStock = items.filter((i) => i.status === "Low Stock").length;
    const outOfStock = items.filter((i) => i.status === "Out of Stock").length;
    return {
      totalProducts: items.length,
      totalStock: totalItems,
      lowStock,
      outOfStock
    };
  }, [items]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AppSidebar />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div>
            <p className="text-xs text-slate-500">Inventory Management / Products</p>
            <h1 className="text-lg font-bold text-slate-900">Stationery Stock Inventory</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
              onClick={() => setActiveModal({ title: "Add New Stationery Product", actionName: "Add Product" })}
            >
              <PackagePlus size={16} /> Add Product
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total Unique Products" value={stats.totalProducts} detail="Active SKUs in DB" icon={Boxes} tone="bg-blue-50 text-blue-600" />
            <StatCard label="Total Units in Stock" value={stats.totalStock.toLocaleString()} detail="Across all warehouses" icon={Truck} tone="bg-emerald-50 text-emerald-600" />
            <StatCard label="Low Stock Items" value={stats.lowStock} detail="Requires replenishment" icon={CircleAlert} tone="bg-amber-50 text-amber-600" />
            <StatCard label="Out of Stock Items" value={stats.outOfStock} detail="Immediate action required" icon={Bell} tone="bg-rose-50 text-rose-600" />
          </div>

          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search product name or SKU..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="All Status">All Status</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Product Name</th>
                    <th className="py-3 px-4 font-semibold">SKU</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">Warehouse</th>
                    <th className="py-3 px-4 font-semibold">Current Stock</th>
                    <th className="py-3 px-4 font-semibold">Price</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">Loading inventory data from backend database...</td>
                    </tr>
                  ) : filteredItems.length > 0 ? (
                    filteredItems.map((item, idx) => (
                      <tr key={item._id || idx} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">{item.name}</td>
                        <td className="py-3.5 px-4 text-xs font-mono text-slate-500">{item.sku}</td>
                        <td className="py-3.5 px-4 text-slate-600">{item.category}</td>
                        <td className="py-3.5 px-4 text-slate-600">{item.warehouse}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-900">{item.stock} units</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{item.price}</td>
                        <td className="py-3.5 px-4">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[item.status] || "bg-slate-100 text-slate-700"}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">No inventory matching criteria found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {activeModal && (
        <ActionModal
          title={activeModal.title}
          actionName={activeModal.actionName}
          onClose={() => setActiveModal(null)}
          onSubmit={() => {
            alert("Product create functionality active on backend API!");
            setActiveModal(null);
            fetchInventoryData();
          }}
        />
      )}
    </div>
  );
}
