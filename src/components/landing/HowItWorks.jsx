import { ArrowRight, CheckCircle2, Bot } from "lucide-react";
import { howItWorksSteps, whyChooseUs } from "../../data/landingData.js";

export default function HowItWorks() {
  return (
    <section id="solutions" className="section-glass py-16 sm:py-20">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-10">
        {/* How it works */}
        <div>
          <h2 className="mb-8 text-xl font-bold text-white sm:text-2xl">How It Works</h2>
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start sm:gap-4">
            {howItWorksSteps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === howItWorksSteps.length - 1;
              return (
                <div key={step.title} className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center sm:w-[18%]">
                  <div className="flex items-center gap-2 sm:flex-col">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Icon size={24} />
                    </span>
                    {!isLast && (
                      <ArrowRight
                        size={16}
                        className="hidden shrink-0 text-blue-200 sm:mt-6 lg:block"
                      />
                    )}
                  </div>
                  <div className="sm:mt-2">
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-blue-100">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why choose us */}
        <div>
          <h2 className="mb-6 text-xl font-bold text-white sm:text-2xl">
            Why Choose StockWise AI?
          </h2>
          <ul className="space-y-3">
            {whyChooseUs.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm font-medium text-white">
                <CheckCircle2 size={18} className="shrink-0 text-brand-600" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-center rounded-2xl border border-slate-100 bg-gradient-to-br from-brand-50 to-white p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white">
                <Bot size={30} />
              </span>
              <p className="max-w-[180px] text-sm font-semibold leading-6 text-slate-700">
                Your AI co-pilot for smarter stationery inventory decisions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
