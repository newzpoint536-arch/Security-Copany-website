import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const ContactPage: React.FC = () => {
  const { siteSettings, addLead, services, navigate } = useSite();

  // Form State
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceInterest, setServiceInterest] = useState(services[0]?.title || 'Physical Guarding & Facility Protection');
  const [preferredContact, setPreferredContact] = useState('Email');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bot spam

    if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please provide a valid corporate email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const newLeadId = await addLead({
        type: 'CONTACT',
        fullName: fullName.trim(),
        companyName: companyName.trim() || 'Undisclosed Entity',
        email: email.trim(),
        phone: phone.trim(),
        serviceInterest,
        message: `Preferred Contact: ${preferredContact}. Inquiry: ${message}`
      });

      setSubmittedId(newLeadId);
      trackEvent('Contact Form Submitted', 'Contact', { leadId: newLeadId });
    } catch {
      setErrorMsg('Failed to dispatch inquiry. Please reach our direct telephone desk.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    trackEvent('Contact Page WhatsApp Click', 'Contact');
    const url = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
      siteSettings.whatsappDefaultMessage
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="contact"
        title="Contact Operational Headquarters & Inquiries | SafeNet"
        description="Contact SafeNet Security Limited. Reach our 24/7 operations control desk, commercial guard licensing advisory, or schedule an on-site security survey."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Operational Communications</span>
            <span aria-hidden="true">·</span>
            <span>Direct Access</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Contact SafeNet Security Limited
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Reach our central operations command, client relations officers, or commercial risk advisory desk.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Verified Contact Information & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-lg font-bold font-display text-slate-900">
                Operational Headquarters
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                    <MapPin className="w-4 h-4 text-sky-700" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Physical Address:</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{siteSettings.officeAddress}</p>
                    <a
                      href={siteSettings.googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sky-700 font-semibold mt-1 text-xs hover:underline"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                    <Phone className="w-4 h-4 text-sky-700" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Telephone & Emergency Dispatch:</span>
                    <a
                      href={`tel:${siteSettings.officialPhone.replace(/\s+/g, '')}`}
                      className="text-slate-700 hover:text-slate-950 font-mono"
                    >
                      {siteSettings.officialPhone}
                    </a>
                    <span className="block text-slate-500 text-xs mt-0.5">24/7 Operations Monitoring Dispatch</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                    <Mail className="w-4 h-4 text-sky-700" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Official Inquiries:</span>
                    <a
                      href={`mailto:${siteSettings.officialEmail}`}
                      className="text-slate-700 hover:text-slate-950 font-mono"
                    >
                      {siteSettings.officialEmail}
                    </a>
                    <span className="block text-slate-500 text-xs mt-0.5">Response SLA: Within 4 business hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
                    <Clock className="w-4 h-4 text-sky-700" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Operating Hours:</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{siteSettings.businessHours}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct Communication via WhatsApp Desk</span>
                </button>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white rounded-xl border border-slate-200 p-2 overflow-hidden shadow-xs">
              <div className="aspect-16/9 w-full rounded-lg overflow-hidden bg-slate-100">
                <iframe
                  title="SafeNet Operational Headquarters Location"
                  src={siteSettings.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-3 text-[11px] text-slate-500 flex items-center justify-between">
                <span>SafeNet Corporate Towers, Victoria Island</span>
                <a
                  href={siteSettings.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Secure Inquiries Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-mono text-sky-700 uppercase font-semibold">
                  Structured Lead Dispatch
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-1">
                  Send a Formal Corporate Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Inquiries are logged directly into our secure CRM and assigned to an operational account director.
                </p>
              </div>

              {submittedId ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-900">
                    Inquiry Received & Logged
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you. Your inquiry has been routed to our corporate client desk. An assigned risk consultant will respond within 4 business hours.
                  </p>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs font-mono text-slate-700 max-w-xs mx-auto">
                    Tracking Ref: {submittedId}
                  </div>
                  <button
                    onClick={() => {
                      setSubmittedId(null);
                      setMessage('');
                    }}
                    className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="phone_number_website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Babatunde Williams"
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
                        placeholder="e.g. Sterling Holdings Plc"
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="b.williams@sterling.example.com"
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Phone Number *
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Primary Capability of Interest
                      </label>
                      <select
                        value={serviceInterest}
                        onChange={(e) => setServiceInterest(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        {services.map((svc) => (
                          <option key={svc.id} value={svc.title}>
                            {svc.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Preferred Contact Channel
                      </label>
                      <select
                        value={preferredContact}
                        onChange={(e) => setPreferredContact(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="Email">Email Communication</option>
                        <option value="Telephone">Direct Telephone Call</option>
                        <option value="WhatsApp">WhatsApp Message</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Inquiry Details / Facility Specification *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline facility location, approximate guard count required, electronic surveillance requirements, or timeline..."
                      className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <span>
                      Data Privacy Commitment: All corporate and site data is held strictly confidential under NDPR and internal security protocols.
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs disabled:opacity-50"
                    >
                      {isSubmitting ? 'Transmitting to Dispatch Desk...' : 'Transmit Corporate Inquiry'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
