import { useState } from "react";
import { PackagePlus, ShoppingCart, X } from "lucide-react";

export default function ActionModal({ type, onClose }) {
  const isProduct = type === "product";
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-labelledby="action-modal-title">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              {isProduct ? <PackagePlus size={20} /> : <ShoppingCart size={20} />}
            </span>
            <div>
              <h2 id="action-modal-title" className="text-lg font-bold text-slate-900">{isProduct ? "Add New Product" : "Create New Order"}</h2>
              <p className="mt-1 text-xs text-slate-500">{isProduct ? "Add an item to your stationery inventory." : "Create a wholesale order for a customer."}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close form"><X size={19} /></button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">✓</div>
            <h3 className="mt-4 font-bold text-slate-900">{isProduct ? "Product added" : "Order created"}</h3>
            <p className="mt-1 text-sm text-slate-500">The form was submitted successfully.</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700 sm:col-span-2">{isProduct ? "Product name" : "Customer name"}<input required placeholder={isProduct ? "e.g. Hardcover Notebook" : "e.g. Sharma Stationers"} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" /></label>
              <label className="text-sm font-medium text-slate-700">{isProduct ? "SKU" : "Order date"}<input required type={isProduct ? "text" : "date"} placeholder={isProduct ? "e.g. NB-A4-007" : undefined} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" /></label>
              <label className="text-sm font-medium text-slate-700">{isProduct ? "Category" : "Payment status"}<select className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"><option>{isProduct ? "Notebooks" : "Pending"}</option><option>{isProduct ? "Pens" : "Paid"}</option><option>{isProduct ? "Paper" : "Partial"}</option><option>{isProduct ? "Writing" : "Cancelled"}</option></select></label>
              <label className="text-sm font-medium text-slate-700">{isProduct ? "Opening stock" : "Items"}<input required type="number" min="1" placeholder={isProduct ? "0" : "1"} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" /></label>
              <label className="text-sm font-medium text-slate-700">{isProduct ? "Price" : "Total amount"}<input required type="number" min="0" step="0.01" placeholder="0.00" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" /></label>
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button><button type="submit" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">{isProduct ? "Add Product" : "Create Order"}</button></div>
          </form>
        )}
      </div>
    </div>
  );
}
