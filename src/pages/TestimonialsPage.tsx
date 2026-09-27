import React from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import { ShieldCheck, Lock, CheckCircle2, MessageSquare } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { testimonials, navigate } = useSite();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="testimonials"
        title="Client Feedback & Endorsements | SafeNet Corporate Security"
        description="Read verified client feedback from facility managers, corporate heads of security, and logistics directors partnering with SafeNet."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Corporate Trust</span>
            <span aria-hidden="true">·</span>
            <span>Client Commendations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Client Testimonials & Feedback
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            In the corporate security industry, confidentiality is paramount. In strict compliance with non-disclosure covenants, client feedback is published with verified operational titles and anonymized institutional identifiers.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        {/* Verification policy banner */}
        <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-900">Confidentiality Notice:</strong> To safeguard our clients against targeted intelligence gathering or physical security reconnaissance, full corporate names are withheld from public indexing. Verifiable client contact references can be provided under reciprocal non-disclosure agreements during enterprise procurement tenders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.filter((t) => t.isPublished).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>{item.serviceCategory}</span>
                  <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Authorized</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1 text-xs">
                <p className="font-bold text-slate-900">{item.clientName}</p>
                <p className="text-slate-600">{item.clientRole}</p>
                <p className="text-[11px] text-slate-500 font-mono">{item.organization}</p>
                <p className="text-[11px] text-slate-500 pt-1">Documented: {item.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 bg-slate-900 rounded-2xl text-white text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Request Institutional Client References
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Are you an enterprise procurement team or facility director evaluating SafeNet for a high-volume guard deployment? Request direct peer references under NDA.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('contact')}
              className="px-6 py-2.5 bg-white text-slate-950 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
            >
              Contact Corporate Procurement Liaison
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
