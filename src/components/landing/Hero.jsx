import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";
import DashboardPreview from "./DashboardPreview.jsx";
import { heroBadge, heroTrustPoints } from "../../data/landingData.js";

export default function Hero() {
  const BadgeIcon = heroBadge.icon;

  return (
    <section className="relative overflow-hidden bg-transparent py-14 sm:py-20 lg:py-24">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        {/* Left: copy */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
            <BadgeIcon size={14} />
            {heroBadge.label}
          </span>

          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            Smart Wholesale Distribution
            <br />
            &amp; Inventory Management
            <br />
            <span className="inline-flex items-center gap-2 text-blue-300">
              Powered by AI
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
            Manage stationery inventory, track wholesale orders, predict demand
            and make smarter business decisions with AI.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button as={Link} to="/login" variant="primary" size="lg" icon={ArrowRight}>
              Get Started Free
            </Button>
            <Button as="a" href="#demo" variant="outline" size="lg" icon={PlayCircle}>
              View Live Demo
            </Button>
          </div>

          <ul className="mt-7 flex flex-col flex-wrap gap-x-6 gap-y-2 sm:flex-row">
            {heroTrustPoints.map((point) => (
              <li key={point} className="flex items-center gap-1.5 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-brand-600" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: dashboard preview */}
        <div>
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
