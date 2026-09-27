import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import { Search, ChevronDown, HelpCircle, PhoneCall, MessageSquare } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const FAQPage: React.FC = () => {
  const { faqs, siteSettings, navigate } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const categories = ['All', 'Operations', 'Compliance & Licences', 'Contracting & SLA', 'Technology & Monitoring', 'Emergency Response'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    const next = expandedId === id ? null : id;
    setExpandedId(next);
    if (next) {
      trackEvent('FAQ Expanded', 'Engagement', { faqId: id });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="faq"
        title="Frequently Asked Questions (FAQ) | SafeNet Security"
        description="Find answers to client questions regarding SafeNet guard vetting, post order SLAs, 24/7 command operations, and statutory compliance."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Client Knowledge Base</span>
            <span aria-hidden="true">·</span>
            <span>Clarity & Answers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Direct operational answers regarding deployment lead times, supervisory audit procedures, guard vetting rigor, and contracting SLAs.
          </p>
        </div>
      </section>

      {/* Content & Search */}
      <section className="py-12 px-4 sm:px-8 max-w-5xl mx-auto space-y-8">
        {/* Search Input & Category Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search security topics, vetting procedures, monitoring or licensing..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/60 rounded-lg max-w-full overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-slate-200 space-y-3">
              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="font-semibold text-slate-800 text-sm">No matching questions found.</p>
              <p className="text-xs text-slate-500">
                Have a specific question not addressed here? Contact our corporate advisory desk directly.
              </p>
              <button
                onClick={() => navigate('contact')}
                className="mt-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
              >
                Contact Security Desk
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-sky-700 block">
                        {faq.category}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 font-display">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-slate-900' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-slate-900 text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-lg font-bold font-display text-white">
              Do you have specialized site requirements?
            </h2>
            <p className="text-xs text-slate-400 max-w-md">
              Speak with a SafeNet risk consultant regarding multi-location operations, armed escort coordination, or complex electronic integration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('contact')}
              className="px-4 py-2.5 bg-white text-slate-950 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
            >
              Contact Advisory Desk
            </button>
            <button
              onClick={() => navigate('quote')}
              className="px-4 py-2.5 bg-slate-800 text-white text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors"
            >
              Request Proposal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
