import React from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Mail,
  AlertCircle,
  ExternalLink,
  Lock,
  Building
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const CompliancePage: React.FC = () => {
  const { licences, siteSettings, navigate } = useSite();

  const handleVerificationRequest = (licenceName: string) => {
    trackEvent(`Licence Verification Inquiry: ${licenceName}`, 'Contact');
    navigate('contact');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="compliance"
        title="Licences, Statutory Compliance & Vetting | SafeNet"
        description="Verify SafeNet's corporate statutory licences, Private Guard Companies Act regulatory status, guard vetting protocols, and HSE guidelines."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Regulatory Assurance</span>
            <span aria-hidden="true">·</span>
            <span>Statutory Credentials</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Licences & Compliance Framework
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Statutory legitimacy is the foundation of institutional security. SafeNet operates in strict compliance with the Private Guard Companies Act, statutory tax obligations, and international quality management standards.
          </p>
        </div>
      </section>

      {/* Compliance Registry */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        {/* Notice on Verification */}
        <div className="p-4 sm:p-5 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-3.5 text-xs text-slate-700">
          <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <h2 className="font-bold text-slate-900 text-sm">
              Official Corporate Credential Verification Protocol
            </h2>
            <p>
              To protect proprietary licensing documents from unauthorized electronic duplication and fraud, high-resolution certified true copies of all operating licences, tax clearance certificates, and audited financial statements are issued directly to verified corporate procurement committees upon formal request.
            </p>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold font-display text-slate-900">
            Official Statutory & Operational Credentials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {licences.filter((l) => l.isPublished).map((licence) => (
              <div
                key={licence.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 font-medium">
                      {licence.category.replace('_', ' ')}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-sm font-semibold text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{licence.status}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 font-display">
                    {licence.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {licence.description}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Issuing Authority:</span>
                      <span className="font-semibold text-slate-900 text-right">{licence.issuingBody}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Ref Identifier:</span>
                      <span className="text-slate-800">{licence.referenceNumber}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Validity Term:</span>
                      <span className="text-emerald-700 font-semibold">{licence.expiryDate}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 truncate max-w-[200px]">
                    Verify via: {licence.verificationContact}
                  </span>
                  <button
                    onClick={() => handleVerificationRequest(licence.name)}
                    className="font-semibold text-slate-900 hover:text-sky-700 transition-colors"
                  >
                    Request Certified Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Tier Guard Vetting & Standards Protocol */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-sky-700 uppercase tracking-wider font-semibold">
              Quality Assurance
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              The SafeNet 3-Tier Guard Vetting Standard
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Our vetting procedure eliminates risk before an officer ever wears a SafeNet uniform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
              <span className="font-mono text-sky-700 font-bold block text-sm">Tier 01</span>
              <h4 className="font-bold text-slate-900 text-sm">Criminal & Civil Record Screening</h4>
              <p className="text-slate-600 leading-relaxed">
                Biometric fingerprint verification checked against criminal registries, previous employer character references, and formal police clearance certificates.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
              <span className="font-mono text-sky-700 font-bold block text-sm">Tier 02</span>
              <h4 className="font-bold text-slate-900 text-sm">Residential & Guarantor Physical Verification</h4>
              <p className="text-slate-600 leading-relaxed">
                Our internal compliance investigators physically visit the recruit’s confirmed residence and obtain attested affidavits from two verifiable property-owning guarantors.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
              <span className="font-mono text-sky-700 font-bold block text-sm">Tier 03</span>
              <h4 className="font-bold text-slate-900 text-sm">Medical & Psychological Fitness Evaluation</h4>
              <p className="text-slate-600 leading-relaxed">
                Comprehensive toxicology screening, visual acuity tests, cardio endurance evaluation, and psychological composure assessments under stress.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 bg-slate-900 rounded-xl text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-base sm:text-lg font-display">
              Conducting a Vendor Due Diligence Audit on SafeNet?
            </h3>
            <p className="text-xs text-slate-400">
              Our legal and compliance directorate can supply our comprehensive Corporate Vendor Pack directly to your procurement department.
            </p>
          </div>
          <button
            onClick={() => navigate('contact')}
            className="px-5 py-2.5 bg-white text-slate-950 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shadow-xs"
          >
            Contact Compliance Directorate
          </button>
        </div>
      </section>
    </div>
  );
};
