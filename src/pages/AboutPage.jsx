import { BrainCircuit, Boxes, CheckCircle2, LineChart, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import backgroundImage from "../images/bg.png";

const principles = [
  { icon: BrainCircuit, title: "Decisions powered by data", text: "Turn everyday sales and inventory activity into clear actions with practical AI insights." },
  { icon: Boxes, title: "Built for distribution", text: "Keep products, warehouses, orders, and customers connected in one focused workspace." },
  { icon: ShieldCheck, title: "Reliable by design", text: "Give your team dependable visibility and controls as the business grows." }
];

const metrics = [
  { value: "8,940+", label: "Products managed" },
  { value: "126", label: "Wholesale customers" },
  { value: "24/7", label: "Business visibility" },
  { value: "14 days", label: "Free trial" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <Navbar />
      <main>
        <section className="border-b border-white/10 bg-slate-950/75 py-20 sm:py-28">
          <div className="container-page max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">About StockWise AI</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">The clearer way to run wholesale distribution.</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">StockWise AI helps stationery wholesalers bring inventory, orders, and business decisions into one calm, connected workspace.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/login" className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">Start your free trial</Link><Link to="/" className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Explore the platform</Link></div>
          </div>
        </section>

        <section className="bg-white py-16 text-slate-800 sm:py-20">
          <div className="container-page grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">Why we exist</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Wholesale businesses deserve better visibility.</h2><p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">Stationery distribution moves quickly. A missed reorder, a hidden stockout, or a delayed customer update can affect the whole operation. We created StockWise AI to make those moments easier to see and easier to act on.</p><p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">Our platform combines simple operational tools with intelligent forecasting, so teams can spend less time searching through spreadsheets and more time serving customers.</p></div>
            <div className="rounded-2xl bg-slate-50 p-6 sm:p-8"><div className="grid grid-cols-2 gap-4">{metrics.map((metric) => <div key={metric.label} className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-2xl font-extrabold text-brand-600">{metric.value}</p><p className="mt-1 text-xs text-slate-500">{metric.label}</p></div>)}</div><div className="mt-5 flex items-center gap-3 rounded-xl bg-brand-900 p-4 text-white"><LineChart size={22} className="text-blue-300" /><p className="text-sm font-medium">One connected view from stock movement to business growth.</p></div></div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20"><div className="container-page"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">What guides us</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Useful technology, grounded in real work.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{principles.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Icon size={21} /></span><h3 className="mt-5 font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-500">{text}</p></article>)}</div></div></section>

        <section className="bg-brand-900 py-16 sm:py-20"><div className="container-page flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><div className="flex items-center gap-2 text-blue-200"><Users size={19} /><span className="text-sm font-semibold">Made for growing teams</span></div><h2 className="mt-3 max-w-xl text-3xl font-bold text-white sm:text-4xl">Make every inventory decision count.</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100">Bring your team into a shared operating rhythm with StockWise AI.</p></div><Link to="/login" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-blue-50">Get started <CheckCircle2 size={17} /></Link></div></section>
      </main>
      <Footer />
    </div>
  );
}
