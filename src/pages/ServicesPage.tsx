import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import { ServiceItem } from '../types';
import {
  ShieldCheck,
  Camera,
  UserCheck,
  FileText,
  Building2,
  Radio,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  X,
  ChevronRight
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const ServicesPage: React.FC = () => {
  const { services, selectedSlug, navigate } = useSite();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(() => {
    if (selectedSlug) {
      return services.find((s) => s.slug === selectedSlug) || null;
    }
    return null;
  });

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-sky-400" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-sky-400" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-sky-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-sky-400" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-sky-400" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-sky-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-sky-400" />;
    }
  };

  const handleOpenDetail = (service: ServiceItem) => {
    setSelectedService(service);
    trackEvent(`Service View: ${service.title}`, 'Engagement', { service: service.title });
  };

  const handleRequestQuote = (serviceTitle: string) => {
    setSelectedService(null);
    trackEvent(`Service Quote Triggered: ${serviceTitle}`, 'Conversion', { service: serviceTitle });
    navigate('quote', encodeURIComponent(serviceTitle));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="services"
        title="Corporate Security Services & Capabilities | SafeNet"
        description="Explore SafeNet's full spectrum of corporate security services: physical guarding, access control, CCTV, executive escort, risk audits, and 24/7 command dispatch."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Operational Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Offerings</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Corporate Security Services
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Standardized, scalable security deployments designed to protect physical facilities, corporate leadership, high-value assets, and sensitive infrastructure.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.filter((s) => s.isPublished).map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono text-slate-600 font-medium">
                    0{index + 1}
                  </span>
                </div>

                <h2 className="text-lg font-bold font-display text-slate-900 group-hover:text-sky-800 transition-colors">
                  {service.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {service.summary}
                </p>

                {/* Key Benefits preview */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block">
                    Core Benefits
                  </span>
                  {service.benefits.slice(0, 2).map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleOpenDetail(service)}
                  className="text-xs font-semibold text-slate-900 hover:text-sky-700 flex items-center gap-1.5 transition-colors"
                >
                  <span>Detailed Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => handleRequestQuote(service.title)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-md transition-colors"
                >
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Detailed Specifications Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150 my-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-900 text-white rounded-t-2xl">
              <div className="space-y-1">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                  Service Specification Profile
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2 font-display">
                  Overview & Operational Scope
                </h4>
                <p className="leading-relaxed text-slate-600 text-xs sm:text-sm">
                  {selectedService.description}
                </p>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2 font-display">
                  Operational Advantages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical Applications */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2 font-display">
                  Typical Facility & Environment Applications
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedService.typicalApplications.map((app, i) => (
                    <li key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-md border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deployment Methodology */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-2 font-display">
                  Execution Methodology & Quality Control
                </h4>
                <div className="space-y-2">
                  {selectedService.methodologySteps.map((m, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                      <span className="font-semibold text-slate-900 font-mono">
                        Phase {i + 1}: {m.step}
                      </span>
                      <p className="text-slate-600">{m.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ on service */}
              {selectedService.faqs && selectedService.faqs.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2 font-display flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                    <span>Frequently Asked Questions</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    {selectedService.faqs.map((faq, i) => (
                      <div key={i} className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                        <p className="font-bold text-slate-900 mb-1">{faq.question}</p>
                        <p className="text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close Specifications
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleRequestQuote(selectedService.title)}
                  className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Request a Formal Quotation for this Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
