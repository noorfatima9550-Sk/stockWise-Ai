import { useState } from "react";
import { ArrowRight, Clock3, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import backgroundImage from "../images/bg.png";

const contactDetails = [
  { icon: Mail, label: "Email us", value: "hello@stockwise.ai", href: "mailto:hello@stockwise.ai" },
  { icon: Phone, label: "Call our team", value: "+91 1800 123 4567", href: "tel:+9118001234567" },
  { icon: Clock3, label: "Support hours", value: "Mon - Sat, 9:00 AM - 6:00 PM" },
  { icon: MapPin, label: "Our office", value: "Bengaluru, Karnataka, India" }
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <Navbar />
      <main>
        <section className="border-b border-white/10 bg-slate-950/80 py-16 sm:py-24"><div className="container-page"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Contact StockWise AI</p><h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">Let&apos;s make your distribution workflow clearer.</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">Have a question about inventory, wholesale orders, or getting started? Our team is ready to help.</p></div></section>

        <section className="bg-white py-14 text-slate-800 sm:py-20"><div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">Reach out</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">We&apos;re here for your next step.</h2><p className="mt-4 text-sm leading-relaxed text-slate-600">Tell us what you&apos;re working on and we&apos;ll connect you with the right person from our team.</p><div className="mt-8 space-y-5">{contactDetails.map(({ icon: Icon, label, value, href }) => { const content = <><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Icon size={18} /></span><span><span className="block text-xs font-medium text-slate-500">{label}</span><span className="mt-1 block text-sm font-semibold text-slate-800">{value}</span></span></>; return href ? <a key={label} href={href} className="flex items-center gap-3 hover:text-brand-600">{content}</a> : <div key={label} className="flex items-center gap-3">{content}</div>; })}</div></div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-8"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white"><MessageSquare size={19} /></span><div><h2 className="font-bold text-slate-900">Send us a message</h2><p className="mt-1 text-xs text-slate-500">We usually respond within one business day.</p></div></div>{submitted ? <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</div><h3 className="mt-3 font-bold text-emerald-900">Message received</h3><p className="mt-1 text-sm text-emerald-700">Thanks for reaching out. Our team will be in touch soon.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-5 text-sm font-semibold text-emerald-800 underline">Send another message</button></div> : <form onSubmit={handleSubmit} className="mt-6 space-y-4"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium text-slate-700">Full name<input required name="name" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" placeholder="Your name" /></label><label className="text-sm font-medium text-slate-700">Work email<input required type="email" name="email" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" placeholder="you@company.com" /></label></div><label className="block text-sm font-medium text-slate-700">How can we help?<select name="topic" className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"><option>Product enquiry</option><option>Sales and pricing</option><option>Technical support</option><option>Partnership</option></select></label><label className="block text-sm font-medium text-slate-700">Message<textarea required name="message" rows="5" className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" placeholder="Tell us a little about your needs..." /></label><button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"><Send size={17} /> Send message</button></form>}</div>
        </div></section>

        <section className="bg-brand-900 py-12"><div className="container-page flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"><div><h2 className="text-xl font-bold text-white">Ready to see StockWise in action?</h2><p className="mt-1 text-sm text-blue-100">Start with a 14-day free trial.</p></div><Link to="/login" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-blue-50">Get started <ArrowRight size={17} /></Link></div></section>
      </main>
      <Footer />
    </div>
  );
}
