import { featureCards } from "../../data/landingData.js";
import { Link } from "react-router-dom";

function FeatureCard({ icon: Icon, color, title, description, href }) {
  const content = (
    <div className="flex h-full flex-col rounded-xl border border-white/70 bg-white/95 p-6 text-center shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-panel">
      <span
        className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={22} />
      </span>
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{description}</p>
    </div>
  );

  return href ? <Link to={href} className="block h-full">{content}</Link> : content;
}

export default function FeaturesGrid() {
  return (
    <section id="features" className="bg-slate-50/95 py-14 sm:py-16">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {featureCards.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
