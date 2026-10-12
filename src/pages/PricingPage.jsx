import { Check, HelpCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import backgroundImage from "../images/bg.png";

const plans = [
  { name: "Starter", price: "₹1,999", description: "For small teams getting organized.", features: ["Up to 1,000 products", "1 warehouse", "Inventory tracking", "Basic sales reports", "Email support"], featured: false },
  { name: "Business", price: "₹4,999", description: "For growing wholesale businesses.", features: ["Up to 10,000 products", "5 warehouses", "Inventory and order management", "AI demand forecasting", "Smart stock alerts", "Priority support"], featured: true },
  { name: "Enterprise", price: "Custom", description: "For large distribution operations.", features: ["Unlimited products", "Unlimited warehouses", "Advanced analytics", "Custom workflows", "Dedicated onboarding", "24/7 priority support"], featured: false }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <Navbar />
      <main>
        <section className="border-b border-white/10 bg-slate-950/80 py-16 text-center sm:py-24"><div className="container-page"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Simple, flexible pricing</p><h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">Choose the plan that fits your business.</h1><p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">Start free for 14 days, then choose the tools and support your stationery distribution team needs.</p></div></section>

        <section className="bg-slate-50 py-14 text-slate-800 sm:py-20"><div className="container-page"><div className="grid gap-5 lg:grid-cols-3">{plans.map((plan) => <article key={plan.name} className={`relative flex flex-col rounded-2xl border p-6 shadow-sm sm:p-8 ${plan.featured ? "border-brand-600 bg-white ring-2 ring-brand-600/15" : "border-slate-200 bg-white"}`}>{plan.featured && <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white"><Sparkles size={13} /> Most popular</span>}<h2 className="text-xl font-bold text-slate-900">{plan.name}</h2><p className="mt-2 min-h-10 text-sm leading-relaxed text-slate-500">{plan.description}</p><div className="mt-6 flex items-end gap-1"><span className="text-4xl font-extrabold tracking-tight text-slate-900">{plan.price}</span>{plan.price !== "Custom" && <span className="pb-1 text-sm text-slate-500">/month</span>}</div><Link to="/login" className={`mt-6 inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold ${plan.featured ? "bg-brand-600 text-white hover:bg-brand-700" : "border border-brand-600 text-brand-600 hover:bg-brand-50"}`}>{plan.name === "Enterprise" ? "Talk to sales" : "Start free trial"}</Link><div className="my-6 h-px bg-slate-100" /><p className="text-xs font-bold uppercase tracking-wide text-slate-500">Everything included</p><ul className="mt-4 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm text-slate-700"><Check size={17} className="mt-0.5 shrink-0 text-emerald-600" />{feature}</li>)}</ul></article>)}</div></div></section>

        <section className="bg-white py-14 text-slate-800 sm:py-20"><div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">No surprises</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Everything you need to start with confidence.</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">Every plan includes secure access, data export, product updates, and a 14-day free trial. Upgrade as your operation grows.</p></div><div className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6"><div className="flex items-start gap-3"><HelpCircle size={21} className="mt-0.5 text-brand-600" /><div><h3 className="font-bold text-slate-900">Need a custom plan?</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">Talk with our team about warehouses, users, integrations, or support requirements.</p><Link to="/contact" className="mt-4 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700">Contact our team</Link></div></div></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
