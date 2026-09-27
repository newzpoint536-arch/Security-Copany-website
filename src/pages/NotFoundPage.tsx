import React from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useSite();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <SEOHead page="not-found" title="404 - Page Not Found | SafeNet" />
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 max-w-lg w-full text-center space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 mx-auto">
          <ShieldAlert className="w-8 h-8 text-slate-700" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Status Code 404
          </span>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            Resource Unreachable or Restricted
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The page or operational asset you requested does not exist or may have been relocated during protocol revisions.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate('home')}
            className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
          >
            Return to SafeNet Home
          </button>
          <button
            onClick={() => navigate('contact')}
            className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors"
          >
            Contact Support Desk
          </button>
        </div>
      </div>
    </div>
  );
};
