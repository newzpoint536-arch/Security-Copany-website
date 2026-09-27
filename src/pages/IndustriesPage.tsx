import React from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  Building2,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const IndustriesPage: React.FC = () => {
  const { industries, navigate } = useSite();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="industries"
        title="Industries Served & Sector Risk Architecture | SafeNet"
        description="Discover how SafeNet protects financial institutions, oil & gas facilities, commercial offices, retail logistics, healthcare environments, and diplomatic missions."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Specialized Sectors</span>
            <span aria-hidden="true">·</span>
            <span>Domain Risk Profiles</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Industries & Sectors Served
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Different operational sectors face radically distinct threat vectors. SafeNet tailors guard post orders, electronic access logic, and surveillance matrices to match specific regulatory and facility demands.
          </p>
        </div>
      </section>

      {/* Industry Catalog */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="space-y-10">
          {industries.filter((i) => i.isPublished).map((industry, index) => (
            <div
              key={industry.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-colors p-6 sm:p-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                    <span>Sector 0{index + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-sky-800 uppercase tracking-wide">
                      Targeted Architecture
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                    {industry.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {industry.summary}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => navigate('quote', encodeURIComponent(industry.name))}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs whitespace-nowrap"
                  >
                    Request Sector Proposal
                  </button>
                </div>
              </div>

              {/* Grid: Challenges vs Solutions */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                {/* Challenges */}
                <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200/80">
                  <div className="flex items-center gap-2 font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sector-Specific Vulnerabilities</span>
                  </div>
                  <ul className="space-y-2 text-slate-600">
                    {industry.keyChallenges.map((ch, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">✕</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SafeNet Countermeasures */}
                <div className="space-y-3 p-4 bg-sky-50/50 rounded-lg border border-sky-100">
                  <div className="flex items-center gap-2 font-bold text-sky-950 uppercase tracking-wider text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
                    <span>SafeNet Tailored Mitigations</span>
                  </div>
                  <ul className="space-y-2 text-slate-700">
                    {industry.safeNetSolutions.map((sol, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Applicable Services Tag strip */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-500">Applicable Services:</span>
                  {industry.applicableServices.map((svc, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-slate-800 font-medium after:content-['·'] last:after:content-[''] after:ml-2"
                    >
                      {svc}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate('services')}
                  className="font-semibold text-slate-900 hover:text-sky-700 flex items-center gap-1 transition-colors"
                >
                  <span>Explore Associated Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
