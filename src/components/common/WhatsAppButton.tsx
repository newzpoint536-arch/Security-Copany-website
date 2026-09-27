import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { MessageSquare, X } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

export const WhatsAppButton: React.FC = () => {
  const { siteSettings } = useSite();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleOpenWhatsApp = () => {
    trackEvent('Floating WhatsApp Triggered', 'Contact', {
      phone: siteSettings.whatsappNumber
    });

    const url = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
      siteSettings.whatsappDefaultMessage
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip hint */}
      {showTooltip && (
        <div className="mb-2 bg-slate-900 text-white text-xs px-3.5 py-2 rounded-lg shadow-lg border border-slate-800 max-w-xs animate-in fade-in duration-150 flex items-center gap-2">
          <span>Direct corporate security desk assistance via WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleOpenWhatsApp}
        onMouseEnter={() => setShowTooltip(true)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-95"
        aria-label="Direct corporate inquiry via WhatsApp"
      >
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide whitespace-nowrap">
          WhatsApp Desk
        </span>
      </button>
    </div>
  );
};
