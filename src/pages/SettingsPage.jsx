import { useState } from "react";
import { Bell, Check, LockKeyhole, Save, Settings as SettingsIcon, UserRound } from "lucide-react";
import AppSidebar from "../components/common/AppSidebar.jsx";

function SettingSection({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start gap-3 border-b border-slate-100 p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Icon size={18} /></span>
        <div><h2 className="font-bold text-slate-900">{title}</h2><p className="mt-1 text-xs text-slate-500">{description}</p></div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Field({ label, type = "text", defaultValue, placeholder }) {
  return <label className="block text-sm font-medium text-slate-700">{label}<input type={type} defaultValue={defaultValue} placeholder={placeholder} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100" /></label>;
}

function Toggle({ label, description, checked, onChange }) {
  return <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-0"><span><span className="block text-sm font-medium text-slate-700">{label}</span><span className="mt-0.5 block text-xs text-slate-500">{description}</span></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="peer sr-only" /><span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-brand-600" : "bg-slate-200"}`}><span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} /></span></label>;
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(false);

  function handleSave(event) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AppSidebar footerTitle="Account settings" footerText="Keep your StockWise workspace configured." />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div><p className="text-xs text-slate-500">Workspace / Settings</p><h1 className="text-lg font-bold text-slate-900">Settings</h1></div>
          <div className="flex items-center gap-3"><button type="button" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications"><Bell size={19} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" /></button><span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">AD</span></div>
        </header>

        <main className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
          <div className="mb-6"><p className="text-sm text-slate-500">Manage your account and workspace preferences.</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Account Settings</h2></div>
          <form onSubmit={handleSave} className="space-y-6">
            <SettingSection icon={UserRound} title="Profile Information" description="Update the details associated with your administrator account.">
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Full name" defaultValue="Admin" /><Field label="Email address" type="email" defaultValue="admin@stockwise.ai" /><Field label="Phone number" defaultValue="+91 98765 43210" /><Field label="Role" defaultValue="Administrator" /></div>
            </SettingSection>

            <SettingSection icon={SettingsIcon} title="Business Preferences" description="Configure how StockWise works for your stationery business.">
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Business name" defaultValue="StockWise Stationery Distribution" /><Field label="Currency" defaultValue="Indian Rupee (₹)" /><Field label="Default warehouse" defaultValue="Main Warehouse" /><Field label="Low stock threshold" type="number" defaultValue="100" /></div>
            </SettingSection>

            <SettingSection icon={Bell} title="Notifications" description="Choose which updates you want to receive.">
              <Toggle label="Email notifications" description="Receive important account and system updates by email." checked={emailAlerts} onChange={setEmailAlerts} /><Toggle label="Low stock alerts" description="Get notified when products reach their minimum stock level." checked={lowStockAlerts} onChange={setLowStockAlerts} /><Toggle label="New order alerts" description="Receive an alert whenever a wholesale order is created." checked={orderAlerts} onChange={setOrderAlerts} />
            </SettingSection>

            <SettingSection icon={LockKeyhole} title="Security" description="Keep your administrator account protected.">
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Current password" type="password" placeholder="Enter current password" /><Field label="New password" type="password" placeholder="Enter new password" /></div>
              <p className="mt-3 text-xs text-slate-500">Use at least 8 characters with a mix of letters and numbers.</p>
            </SettingSection>

            <div className="flex flex-col-reverse items-stretch justify-end gap-3 sm:flex-row sm:items-center"><span className={`flex items-center justify-center gap-1 text-sm font-medium text-emerald-600 transition-opacity ${saved ? "opacity-100" : "opacity-0"}`}><Check size={16} /> Settings saved</span><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"><Save size={17} /> Save Changes</button></div>
          </form>
        </main>
      </div>
    </div>
  );
}
