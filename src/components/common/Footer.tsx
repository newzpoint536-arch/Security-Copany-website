import React from 'react';
import { useSite, PageRoute } from '../../context/SiteContext';
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Lock,
  MessageSquare
} from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

export const Footer: React.FC = () => {
  const { navigate, siteSettings, saveCookiePreferences } = useSite();

  const handleNav = (page: PageRoute) => {
    navigate(page);
  };

  const handleWhatsApp = () => {
    trackEvent('Footer WhatsApp Click', 'Contact');
    const url = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
      siteSettings.whatsappDefaultMessage
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900">
      {/* Top CTA Strip */}
      <div className="border-b border-slate-900/80 bg-slate-900/40 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Ready to Strengthen Your Corporate Security Posture?
            </h2>
            <p className="text-slate-400 mt-1 max-w-xl text-sm">
              Schedule a comprehensive on-site vulnerability consultation or request a formal commercial guard detachment proposal.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleNav('quote')}
              className="px-5 py-2.5 bg-white text-slate-950 font-semibold rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shadow-xs"
            >
              Request a Quote
            </button>
            <button
              onClick={handleWhatsApp}
              className="px-4 py-2.5 bg-emerald-600/90 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquiries</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Column 1: Brand & Identity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-white">
              <Shield className="w-4 h-4 text-sky-400" />
            </div>
            <span className="text-lg font-bold text-white font-display tracking-tight">SafeNet</span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            SafeNet provides corporate physical security deployments, electronic access surveillance architecture, executive protection, and risk advisory services for enterprise facilities and critical operations.
          </p>

          <div className="pt-2 text-xs text-slate-500 space-y-1">
            <p className="text-slate-400 font-medium">Statutory Compliance Status:</p>
            <p>Operates under Private Guard Companies Act authorization.</p>
            <p>Certified Corporate Entity under the Corporate Affairs Commission.</p>
          </div>

          {/* Social links */}
          <div className="pt-2 flex items-center gap-3 text-xs">
            <a
              href={siteSettings.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-slate-700">·</span>
            <a
              href={siteSettings.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              X (Twitter)
            </a>
            <span className="text-slate-700">·</span>
            <a
              href={siteSettings.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Column 2: Security Services */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Capabilities
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => handleNav('services')} className="hover:text-white transition-colors text-left">
                Physical Guarding & Patrols
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('services')} className="hover:text-white transition-colors text-left">
                Electronic Access & CCTV
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('services')} className="hover:text-white transition-colors text-left">
                Executive Transit Escort
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('services')} className="hover:text-white transition-colors text-left">
                Corporate Risk Advisory
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('services')} className="hover:text-white transition-colors text-left">
                Critical Asset Protection
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('services')} className="hover:text-white transition-colors text-left">
                24/7 Operations Monitoring
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Corporate Directory */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Organization
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => handleNav('about')} className="hover:text-white transition-colors text-left">
                About SafeNet
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('industries')} className="hover:text-white transition-colors text-left">
                Industries Served
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('projects')} className="hover:text-white transition-colors text-left">
                Projects & Case Studies
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('team')} className="hover:text-white transition-colors text-left">
                Leadership & Governance
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('compliance')} className="hover:text-white transition-colors text-left">
                Licences & Compliance
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('careers')} className="hover:text-white transition-colors text-left">
                Careers & Guard Recruitment
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('blog')} className="hover:text-white transition-colors text-left">
                Security Insights
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Verified Contact */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Operational Headquarters
          </h3>
          <div className="space-y-2.5 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{siteSettings.officeAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <a
                href={`tel:${siteSettings.officialPhone.replace(/\s+/g, '')}`}
                onClick={() => trackEvent('Footer Phone Click', 'Contact')}
                className="hover:text-white transition-colors"
              >
                {siteSettings.officialPhone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <a
                href={`mailto:${siteSettings.officialEmail}`}
                onClick={() => trackEvent('Footer Email Click', 'Contact')}
                className="hover:text-white transition-colors truncate"
              >
                {siteSettings.officialEmail}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{siteSettings.businessHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Legal & Attribution */}
      <div className="border-t border-slate-900 bg-slate-950 px-4 sm:px-8 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SafeNet Security Limited. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button onClick={() => handleNav('privacy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => handleNav('terms')} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => saveCookiePreferences({ answered: false })}
              className="hover:text-slate-300 transition-colors"
            >
              Cookie Preferences
            </button>
            <span>·</span>
            <button onClick={() => handleNav('admin')} className="flex items-center gap-1 hover:text-slate-300 transition-colors">
              <Lock className="w-3 h-3" />
              <span>CMS Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
