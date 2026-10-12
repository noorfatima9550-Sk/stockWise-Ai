import { Rocket, ArrowRight, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";

export default function CTABanner() {
  return (
    <section className="pb-14 sm:pb-20">
      <div className="container-page">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/80 bg-white/95 p-8 shadow-panel sm:p-10 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <Rocket size={22} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Ready to transform your business?
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Join thousands of stationery businesses using StockWise AI to manage
                inventory and grow faster.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button as={Link} to="/login" variant="primary" size="md" icon={ArrowRight}>
              Get Started Free
            </Button>
            <Button as="a" href="#demo" variant="white" size="md" icon={CalendarClock}>
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
