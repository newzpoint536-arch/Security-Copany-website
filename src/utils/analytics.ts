export interface AnalyticsEvent {
  eventName: string;
  category: 'Conversion' | 'Navigation' | 'Engagement' | 'Assessment' | 'Contact';
  metadata?: Record<string, any>;
  timestamp: string;
}

const ANALYTICS_STORAGE_KEY = 'safenet_analytics_events';
const UTM_STORAGE_KEY = 'safenet_attribution';

export function captureAttribution(): {
  landingPage: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  deviceCategory: 'mobile' | 'tablet' | 'desktop';
} {
  const urlParams = new URLSearchParams(window.location.search);
  const deviceWidth = window.innerWidth;
  const deviceCategory: 'mobile' | 'tablet' | 'desktop' =
    deviceWidth < 768 ? 'mobile' : deviceWidth < 1024 ? 'tablet' : 'desktop';

  const attribution = {
    landingPage: window.location.pathname + window.location.search,
    referrer: document.referrer || 'Direct Entry',
    utmSource: urlParams.get('utm_source') || undefined,
    utmMedium: urlParams.get('utm_medium') || undefined,
    utmCampaign: urlParams.get('utm_campaign') || undefined,
    deviceCategory
  };

  try {
    const existing = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!existing) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(attribution));
    }
  } catch (e) {
    // Ignore storage quota
  }

  return attribution;
}

export function getStoredAttribution() {
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    // Fallback
  }
  return captureAttribution();
}

export function trackEvent(
  eventName: string,
  category: AnalyticsEvent['category'],
  metadata?: Record<string, any>
) {
  const event: AnalyticsEvent = {
    eventName,
    category,
    metadata,
    timestamp: new Date().toISOString()
  };

  try {
    const existingRaw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    const existing: AnalyticsEvent[] = existingRaw ? JSON.parse(existingRaw) : [];
    // Keep last 150 events
    const updated = [event, ...existing].slice(0, 150);
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    // Ignore
  }

  // Also log cleanly for inspection if debug mode
  if (typeof window !== 'undefined' && (window as any).__SAFENET_DEBUG__) {
    console.info(`[SafeNet Analytics] [${category}] ${eventName}`, metadata);
  }
}

export function getRecordedEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
