import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  Building2,
  PhoneCall
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const QuotePage: React.FC = () => {
  const { services, industries, addLead, selectedSlug, navigate } = useSite();

  const preselectedService = selectedSlug ? decodeURIComponent(selectedSlug) : services[0]?.title || '';

  // Multi-step quotation workflow
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [serviceRequired, setServiceRequired] = useState(preselectedService || services[0]?.title);
  const [industry, setIndustry] = useState(industries[0]?.name || 'Commercial Real Estate');
  const [projectType, setProjectType] = useState('Permanent Guard Detachment');
  const [location, setLocation] = useState('');
  const [estimatedTimeline, setEstimatedTimeline] = useState('Within 30 Days');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [preferredContact, setPreferredContact] = useState('Email');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteReference, setQuoteReference] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !companyName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please complete all contact identity fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid corporate email address.');
      return;
    }
    setErrorMsg('');
    setStep(2);
    trackEvent('Quote Workflow: Step 1 Completed', 'Engagement');
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      setErrorMsg('Please specify the approximate site or facility location.');
      return;
    }
    setErrorMsg('');
    setStep(3);
    trackEvent('Quote Workflow: Step 2 Completed', 'Engagement');
  };

  const handleSubmitQuote = async () => {
    if (honeypot) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const generatedId = await addLead({
        type: 'QUOTE',
        fullName: fullName.trim(),
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        serviceInterest: serviceRequired,
        industry,
        projectType,
        location: location.trim(),
        estimatedTimeline,
        message: `Timeline: ${estimatedTimeline}. Contact Preference: ${preferredContact}. Scope & Needs: ${additionalRequirements}`
      });

      setQuoteReference(generatedId);
      trackEvent('Quote Request Submitted', 'Conversion', {
        quoteId: generatedId,
        service: serviceRequired,
        industry
      });
    } catch {
      setErrorMsg('Failed to process quotation request. Please reach our telephone desk.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="quote"
        title="Request a Commercial Security Quotation | SafeNet"
        description="Submit a structured specification for corporate guard forces, access control turnstiles, executive escorts, or industrial facility security."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Commercial Proposals</span>
            <span aria-hidden="true">·</span>
            <span>Formal Quotation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Request a Corporate Quotation
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Provide your facility parameters and operational scope. Our commercial directorate compiles formal, audit-ready proposals detailing guard shift costs, equipment SLAs, and mobilization lead times.
          </p>
        </div>
      </section>

      {/* Main Form Container */}
      <section className="py-12 px-4 sm:px-8 max-w-4xl mx-auto">
        {quoteReference ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-lg space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display text-slate-900">
                Corporate Quotation Request Formally Logged
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your parameters have been assigned to an Operational Account Director. A tailored commercial proposal and mobilization schedule will be prepared within 24 business hours.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-sm mx-auto text-xs space-y-1 font-mono text-slate-700">
              <div className="flex justify-between">
                <span>Quotation Ref:</span>
                <span className="font-bold text-slate-900">{quoteReference}</span>
              </div>
              <div className="flex justify-between">
                <span>Target Service:</span>
                <span className="truncate max-w-[180px]">{serviceRequired}</span>
              </div>
              <div className="flex justify-between">
                <span>Facility Sector:</span>
                <span>{industry}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigate('home')}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Return to SafeNet Home
              </button>
              <button
                onClick={() => navigate('services')}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors"
              >
                Browse Other Capabilities
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            {/* Progress Stepper */}
            <div className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                  1
                </span>
                <span>Identity & Organization</span>
              </span>
              <span className="text-slate-600">→</span>
              <span className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                  2
                </span>
                <span>Facility & Scope</span>
              </span>
              <span className="text-slate-600">→</span>
              <span className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${step === 3 ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                  3
                </span>
                <span>Review & Submit</span>
              </span>
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              {/* Honeypot for spam */}
              <input
                type="text"
                name="quote_verification_code"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: IDENTITY */}
              {step === 1 && (
                <form onSubmit={handleStep1Next} className="space-y-4 text-xs">
                  <div>
                    <h2 className="text-base font-bold font-display text-slate-900">
                      Step 1: Client & Organization Details
                    </h2>
                    <p className="text-slate-500">Provide official contact information for proposal issuance.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Full Name & Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Chief Adeleke Johnson"
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Organization / Corporate Entity *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Zenith Infrastructure Ltd"
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Official Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="a.johnson@zenith.example.com"
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Official Telephone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 800 000 0000"
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <span>Continue to Facility Scope</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: SCOPE */}
              {step === 2 && (
                <form onSubmit={handleStep2Next} className="space-y-4 text-xs">
                  <div>
                    <h2 className="text-base font-bold font-display text-slate-900">
                      Step 2: Operational Scope & Facility Parameters
                    </h2>
                    <p className="text-slate-500">Configure the security configuration required.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Required Security Service *
                      </label>
                      <select
                        value={serviceRequired}
                        onChange={(e) => setServiceRequired(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Industry / Facility Type *
                      </label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        {industries.map((ind) => (
                          <option key={ind.id} value={ind.name}>
                            {ind.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Deployment Type
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="Permanent Guard Detachment">Permanent Guard Detachment (Annual Contract)</option>
                        <option value="Short-Term Transit Escort">Short-Term Executive / Convoy Escort</option>
                        <option value="Electronic Access Turnstiles & CCTV">Electronic Access Turnstiles & CCTV Overhaul</option>
                        <option value="Comprehensive Physical Security Audit">Comprehensive Physical Security Audit</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Approximate Facility Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Victoria Island, Lagos / Port Harcourt"
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Desired Deployment Timeline
                      </label>
                      <select
                        value={estimatedTimeline}
                        onChange={(e) => setEstimatedTimeline(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="Immediate (Within 7-14 Days)">Immediate (Within 7 – 14 Days)</option>
                        <option value="Within 30 Days">Within 30 Days</option>
                        <option value="Quarterly Budgeting / Next Quarter">Quarterly Budgeting / Next Quarter</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Preferred Proposal Channel
                      </label>
                      <select
                        value={preferredContact}
                        onChange={(e) => setPreferredContact(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="Email">Formal Email Tender Document</option>
                        <option value="In-Person Presentation">In-Person Boardroom Presentation</option>
                        <option value="WhatsApp Draft">Quick WhatsApp Overview + Email</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Specific Requirements / Guard Count / Facility Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={additionalRequirements}
                      onChange={(e) => setAdditionalRequirements(e.target.value)}
                      placeholder="Indicate estimated number of guard posts, shift rotations, or specialized equipment needed..."
                      className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
                    >
                      ← Back to Identity
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <span>Review Specification</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: REVIEW & SUBMIT */}
              {step === 3 && (
                <div className="space-y-6 text-xs">
                  <div>
                    <h2 className="text-base font-bold font-display text-slate-900">
                      Step 3: Review Specification & Confirm Submission
                    </h2>
                    <p className="text-slate-500">Verify your information before transmitting to commercial dispatch.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-200 space-y-3">
                    <div className="grid grid-cols-2 gap-2 pb-2">
                      <div>
                        <span className="text-slate-500 block">Contact Name:</span>
                        <span className="font-bold text-slate-900">{fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Corporate Entity:</span>
                        <span className="font-bold text-slate-900">{companyName}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 pb-2">
                      <div>
                        <span className="text-slate-500 block">Email Address:</span>
                        <span className="font-mono text-slate-900">{email}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Phone Contact:</span>
                        <span className="font-mono text-slate-900">{phone}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 pb-2">
                      <div>
                        <span className="text-slate-500 block">Capability Requested:</span>
                        <span className="font-bold text-sky-900">{serviceRequired}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Industry Sector:</span>
                        <span className="font-medium text-slate-900">{industry}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 pb-2">
                      <div>
                        <span className="text-slate-500 block">Location:</span>
                        <span className="text-slate-900">{location}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Target Timeline:</span>
                        <span className="text-slate-900">{estimatedTimeline}</span>
                      </div>
                    </div>

                    {additionalRequirements && (
                      <div className="pt-2">
                        <span className="text-slate-500 block">Scope Notes:</span>
                        <p className="text-slate-700 italic">{additionalRequirements}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-sky-50 rounded-lg border border-sky-100 text-[11px] text-slate-600 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>
                      Formal Corporate Guarantee: SafeNet will never disclose your site location, guard deployment parameters, or security posture to third parties.
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
                    >
                      ← Edit Parameters
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmitQuote}
                      className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? 'Transmitting Specification...' : 'Confirm & Transmit Quotation Request'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
