import React from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import { ShieldCheck, Lock, FileText, ArrowRight } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { siteSettings, navigate } = useSite();
  const isPrivacy = type === 'privacy';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page={type}
        title={isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms & Conditions of Service'}
        description={
          isPrivacy
            ? 'SafeNet Security Limited corporate privacy policy, NDPR compliance, data collection minimization, and client confidentiality standards.'
            : 'SafeNet standard terms and conditions governing corporate security proposals, guard post orders, and website usage.'
        }
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Corporate Governance</span>
            <span aria-hidden="true">·</span>
            <span>Legal Framework</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms & Conditions of Engagement'}
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Effective Date: September 2026. Governing all electronic interactions, corporate quotation inquiries, and candidate recruitment submissions with {siteSettings.companyName}.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {isPrivacy ? (
            <>
              <div className="space-y-3">
                <h2 className="text-lg font-bold font-display text-slate-900">
                  1. Corporate Commitment to Privacy & NDPR Compliance
                </h2>
                <p>
                  {siteSettings.companyName} ("SafeNet", "we", "our", or "us") recognizes that physical security inquiries and facility parameters constitute sensitive commercial intelligence. We treat all client identities, facility floor plans, guard deployment requirements, and candidate records with the highest standard of physical and electronic safeguards in compliance with the Nigeria Data Protection Act (NDPA) and applicable international standards.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold font-display text-slate-900">
                  2. Categories of Information Collected
                </h2>
                <p>
                  We collect information strictly for legitimate commercial and recruitment purposes:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li><strong>Commercial Inquiry Data:</strong> Contact person name, official corporate email, telephone number, organization name, and facility parameters submitted via quotation or contact forms.</li>
                  <li><strong>Candidate Recruitment Data:</strong> Curriculum vitae, qualifications, residential verification history, and national identification details submitted for guard and supervisory vacancies.</li>
                  <li><strong>Technical & Analytical Logs:</strong> Non-personally identifiable diagnostic telemetry (browser type, referring domain, timestamp, and device category) utilized solely to maintain site stability.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold font-display text-slate-900">
                  3. Use and Non-Disclosure of Information
                </h2>
                <p>
                  We will never sell, rent, commercialize, or share client inquiries or candidate records with third-party advertising brokers. Information provided is accessible only to authorized SafeNet commercial risk practitioners, HR vetting personnel, and designated operations directors bound by confidentiality covenants.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold font-display text-slate-900">
                  4. Data Retention & Secure Deletion
                </h2>
                <p>
                  Commercial quotation data is retained for the duration of the proposal validity term and subsequently archived in encrypted storage. Unsuccessful candidate applications are retained for six (6) months for potential future detachment openings, after which files are permanently purged.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold font-display text-slate-900">
                  5. Contact Our Data Protection Officer
                </h2>
                <p>
                  To request data access, correction, or deletion of your records from our systems, contact our compliance directorate:
                </p>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs">
                  <p>Data Protection Officer: legal@safenet-security.example.com</p>
                  <p>Postal Address: {siteSettings.officeAddress}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h2 className="text-lg font-bold font-display text-slate-900">
                  1. Scope of Application
                </h2>
                <p>
                  These Terms and Conditions govern the use of the SafeNet corporate web portal and any initial commercial quotations, requests for information, or diagnostic assessments initiated through it. Formal physical security contracts are executed under separate master service agreements (MSAs) and site-specific Service Level Agreements (SLAs).
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold font-display text-slate-900">
                  2. Quotations and Service Estimates
                </h2>
                <p>
                  Electronic quotation estimates generated through this platform represent indicative commercial scopes based on parameters provided by the prospect. Final commercial proposals are subject to physical site surveys, verified perimeter measurements, and formal execution of Post Orders.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold font-display text-slate-900">
                  3. Intellectual Property
                </h2>
                <p>
                  All proprietary assessment methodologies, standard operating procedures, architectural schematics, articles, and corporate logos published on this website are the intellectual property of {siteSettings.companyName}. Unauthorized reproduction, scraping, or automated extraction is strictly prohibited.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold font-display text-slate-900">
                  4. Limitation of Online Assessment Liability
                </h2>
                <p>
                  The interactive security self-assessment tool is provided strictly for educational and preliminary diagnostic evaluation. SafeNet disclaims any liability for losses, breaches, or regulatory fines resulting from reliance on the self-assessment tool in lieu of a certified on-site physical security audit.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-bold font-display text-slate-900">
                  5. Governing Law and Dispute Jurisdiction
                </h2>
                <p>
                  These terms and all commercial interactions originating from this digital platform are governed exclusively by the laws of the Federal Republic of Nigeria.
                </p>
              </div>
            </>
          )}

          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => navigate(isPrivacy ? 'terms' : 'privacy')}
              className="font-semibold text-slate-900 hover:text-sky-700 flex items-center gap-1.5 transition-colors"
            >
              <span>View {isPrivacy ? 'Terms & Conditions' : 'Privacy Policy'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('contact')}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Contact Legal & Compliance
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
