import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { ShieldCheck, Settings, X, Check } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { cookiePrefs, saveCookiePreferences, navigate } = useSite();
  const [modalOpen, setModalOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(cookiePrefs.analytics);

  if (cookiePrefs.answered && !modalOpen) {
    return null;
  }

  const handleAcceptAll = () => {
    saveCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true
    });
    setModalOpen(false);
  };

  const handleRejectNonEssential = () => {
    saveCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false
    });
    setModalOpen(false);
  };

  const handleSaveCustom = () => {
    saveCookiePreferences({
      necessary: true,
      analytics: analyticsConsent,
      marketing: false
    });
    setModalOpen(false);
  };

  return (
    <>
      {/* Floating Quiet Banner */}
      {!cookiePrefs.answered && (
        <aside
          aria-label="Privacy & Cookie Preferences"
          className="fixed bottom-4 left-4 right-4 md:left-8 md:max-w-xl z-50 bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg p-5 shadow-xl text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="text-sm font-bold text-slate-900 font-display">
                Privacy & Operational Data Notice
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                SafeNet utilizes essential session storage for form security and optional aggregated telemetry to analyze corporate visitor engagement. We do not sell corporate or personal inquiries.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={handleRejectNonEssential}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-md hover:bg-slate-200 transition-colors"
                >
                  Strictly Necessary Only
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-slate-900" />
                <h3 className="font-bold text-slate-900 text-base font-display">
                  Cookie & Privacy Preferences
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Configure which cookies and client storage mechanisms SafeNet may use during your browsing session. You may update these settings anytime.
            </p>

            <div className="space-y-4 divide-y divide-slate-100 text-xs">
              <div className="pt-2 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    <span>Strictly Necessary Storage</span>
                    <span className="text-[11px] text-slate-500">(Mandatory)</span>
                  </div>
                  <p className="text-slate-500 mt-1">
                    Enables CSRF protection, quotation form progress, authentication state, and lead validation.
                  </p>
                </div>
                <div className="shrink-0 pt-1">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-sm font-medium text-[11px]">
                    Always Active
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-slate-900">
                    Aggregate Performance & Analytics
                  </div>
                  <p className="text-slate-500 mt-1">
                    Helps us understand which security services, industries, and case studies are most frequently reviewed to improve site ergonomics.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 pt-1">
                  <input
                    type="checkbox"
                    checked={analyticsConsent}
                    onChange={(e) => setAnalyticsConsent(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-900"></div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setModalOpen(false);
                  navigate('privacy');
                }}
                className="text-xs text-slate-500 hover:text-slate-900 underline"
              >
                Read Privacy Policy
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
