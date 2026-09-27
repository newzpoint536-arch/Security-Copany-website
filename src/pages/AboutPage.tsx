import React from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  ShieldCheck,
  Target,
  Eye,
  Award,
  CheckCircle2,
  FileCheck,
  Building,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useSite();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="about"
        title="About SafeNet | Corporate Profile & Security Philosophy"
        description="Learn about SafeNet's corporate mission, operational governance, statutory compliance, and leadership philosophy in enterprise security."
      />

      {/* Header Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Corporate Profile</span>
            <span aria-hidden="true">·</span>
            <span>Governance & Structure</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            About SafeNet Security Limited
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Delivering structured, compliant, and accountable corporate security services to protect business personnel, critical infrastructure, and enterprise facilities.
          </p>
        </div>
      </section>

      {/* Corporate Overview & Capabilities */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Institutional Security Grounded in Statutory Accountability
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              SafeNet was established to provide organizations with a level of physical security and risk management that matches the rigorous corporate governance expected of modern enterprises.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              In an environment where physical security vulnerabilities can immediately affect business continuity, insurer terms, and corporate reputation, we replace informal guarding practices with strict standard operating procedures, electronic patrol audit logs, and vetted officer rotations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 text-sm font-display block">Vetting Standards</span>
                <p className="text-slate-600">Three-stage background screening including criminal, residential, and guarantor verification.</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 text-sm font-display block">Continuous Supervision</span>
                <p className="text-slate-600">Roving Field Inspectors and digital RFID wand logging backed by 24/7 central dispatch.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md aspect-4/3 bg-slate-900">
              <img
                src="/src/assets/images/safenet_consulting_executive_1790488925021.jpg"
                alt="SafeNet Corporate Governance Board"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 text-right">
              SafeNet Corporate Advisory & Executive Management
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Core Values */}
      <section className="bg-white border-y border-slate-200 py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Target className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To safeguard our clients’ personnel, commercial premises, and critical assets through disciplined human guarding, robust electronic surveillance architectures, and uncompromised regulatory compliance.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Eye className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To serve as the most trusted, dependable, and operationally rigorous corporate security partner for institutions requiring zero-tolerance protective reliability across West Africa.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold font-display text-slate-900 text-center mb-8">
              Guiding Principles & Corporate Values
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm font-display">Integrity & Vetting</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We never compromise on character verification, officer background checks, or honest reporting of facility vulnerabilities.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm font-display">Operational Vigilance</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Security is maintained through continuous discipline, active post monitoring, and zero tolerance for sleeping or post abandonment.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm font-display">Statutory Compliance</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Strict obedience to national security acts, labor standards, guard minimum compensation, and statutory licensing obligations.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm font-display">Client Responsiveness</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Immediate 24/7 command center escalation and assigned account managers providing rapid issue resolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Verification Philosophy */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
            <span>Regulatory Rigor</span>
            <span aria-hidden="true">·</span>
            <span>Compliance Philosophy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Why Compliance Protects Your Organization
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Contracting an unlicensed or unvetted security company exposes your company to severe vicarious liability, voided corporate insurance policies, and criminal penalties under national private security legislation. SafeNet ensures every deployment is legally compliant and fully documented.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
            <FileCheck className="w-6 h-6 text-sky-700" />
            <h3 className="font-bold text-slate-900 text-sm font-display">Licence Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              SafeNet maintains active licensing with the Ministry of Interior / NSCDC. Documentation is readily available for client compliance and vendor audit files.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
            <Building className="w-6 h-6 text-sky-700" />
            <h3 className="font-bold text-slate-900 text-sm font-display">Guard Welfare & Remuneration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We uphold fair wage standards, prompt remuneration, and pension provisions, directly resulting in higher morale, superior retention, and reduced internal pilferage risk.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
            <ShieldCheck className="w-6 h-6 text-sky-700" />
            <h3 className="font-bold text-slate-900 text-sm font-display">HSE & Risk Alignment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All guard posts at industrial and manufacturing client facilities operate under formal Health, Safety & Environment checklists and fire safety protocols.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => navigate('compliance')}
            className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Review Licences & Statutory Details
          </button>
          <button
            onClick={() => navigate('team')}
            className="px-5 py-2.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors"
          >
            Meet Management & Leadership Team
          </button>
        </div>
      </section>
    </div>
  );
};
