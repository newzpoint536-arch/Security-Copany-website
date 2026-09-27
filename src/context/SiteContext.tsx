import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteSettings,
  ServiceItem,
  IndustryItem,
  ProjectItem,
  TeamMember,
  ComplianceCredential,
  TestimonialItem,
  FAQItem,
  JobPosting,
  BlogPost,
  Lead,
  LeadStatus,
  HeroSlide
} from '../types';
import {
  initialSiteSettings,
  initialServices,
  initialIndustries,
  initialProjects,
  initialTeam,
  initialLicences,
  initialTestimonials,
  initialFAQs,
  initialJobs,
  initialBlogPosts,
  initialLeads,
  initialHeroSlides
} from '../data/initialData';
import { trackEvent, getStoredAttribution } from '../utils/analytics';

export type PageRoute =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'industries'
  | 'projects'
  | 'project-detail'
  | 'team'
  | 'compliance'
  | 'testimonials'
  | 'faq'
  | 'careers'
  | 'blog'
  | 'blog-detail'
  | 'contact'
  | 'quote'
  | 'assessment'
  | 'privacy'
  | 'terms'
  | 'admin'
  | 'not-found';

interface CookiePreferences {
  answered: boolean;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface SiteContextType {
  currentPage: PageRoute;
  selectedSlug?: string;
  navigate: (page: PageRoute, slug?: string) => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: SiteSettings) => void;
  services: ServiceItem[];
  industries: IndustryItem[];
  projects: ProjectItem[];
  team: TeamMember[];
  licences: ComplianceCredential[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  jobs: JobPosting[];
  posts: BlogPost[];
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'source'>) => Promise<string>;
  updateLeadStatus: (leadId: string, status: LeadStatus, note?: string) => void;
  deleteLead: (leadId: string) => void;
  updateService: (service: ServiceItem) => void;
  updateProject: (project: ProjectItem) => void;
  updateTeamMember: (member: TeamMember) => void;
  updatePost: (post: BlogPost) => void;
  heroSlides: HeroSlide[];
  updateHeroSlide: (slide: HeroSlide) => void;
  addHeroSlide: (slide: HeroSlide) => void;
  deleteHeroSlide: (id: string) => void;
  reorderHeroSlides: (slides: HeroSlide[]) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  cookiePrefs: CookiePreferences;
  saveCookiePreferences: (prefs: Partial<CookiePreferences>) => void;
  resetAllData: () => void;
  activeJobApplication: JobPosting | null;
  setActiveJobApplication: (job: JobPosting | null) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'safenet_settings_v1',
  SERVICES: 'safenet_services_v1',
  PROJECTS: 'safenet_projects_v1',
  TEAM: 'safenet_team_v1',
  POSTS: 'safenet_posts_v1',
  LEADS: 'safenet_leads_v1',
  AUTH: 'safenet_admin_auth_v1',
  COOKIES: 'safenet_cookies_v1',
  HERO_SLIDES: 'safenet_hero_slides_v1'
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page routing
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(undefined);

  // Dynamic entities from localStorage or defaults
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : initialServices;
    } catch {
      return initialServices;
    }
  });

  const [industries] = useState<IndustryItem[]>(initialIndustries);

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEAM);
      return saved ? JSON.parse(saved) : initialTeam;
    } catch {
      return initialTeam;
    }
  });

  const [licences] = useState<ComplianceCredential[]>(initialLicences);
  const [testimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [faqs] = useState<FAQItem[]>(initialFAQs);
  const [jobs] = useState<JobPosting[]>(initialJobs);

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
      return saved ? JSON.parse(saved) : initialBlogPosts;
    } catch {
      return initialBlogPosts;
    }
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      return saved ? JSON.parse(saved) : initialLeads;
    } catch {
      return initialLeads;
    }
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
      return saved ? JSON.parse(saved) : initialHeroSlides;
    } catch {
      return initialHeroSlides;
    }
  });

  // Admin Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Cookie preferences
  const [cookiePrefs, setCookiePrefs] = useState<CookiePreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COOKIES);
      return saved ? JSON.parse(saved) : { answered: false, necessary: true, analytics: false, marketing: false };
    } catch {
      return { answered: false, necessary: true, analytics: false, marketing: false };
    }
  });

  // Modal for job applications
  const [activeJobApplication, setActiveJobApplication] = useState<JobPosting | null>(null);

  // Sync route on hash changes or back/forward
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setCurrentPage('home');
        setSelectedSlug(undefined);
        return;
      }
      const parts = hash.split('/');
      const page = parts[0] as PageRoute;
      const slug = parts[1];

      const validPages: PageRoute[] = [
        'home', 'about', 'services', 'service-detail', 'industries',
        'projects', 'project-detail', 'team', 'compliance', 'testimonials',
        'faq', 'careers', 'blog', 'blog-detail', 'contact', 'quote',
        'assessment', 'privacy', 'terms', 'admin'
      ];

      if (validPages.includes(page)) {
        setCurrentPage(page);
        setSelectedSlug(slug);
      } else {
        setCurrentPage('not-found');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (page: PageRoute, slug?: string) => {
    setCurrentPage(page);
    setSelectedSlug(slug);
    const targetHash = slug ? `#${page}/${slug}` : `#${page}`;
    if (page === 'home' && !slug) {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track analytics page view
    trackEvent(`Pageview: ${page}${slug ? `/${slug}` : ''}`, 'Navigation', { page, slug });
  };

  const updateSiteSettings = (settings: SiteSettings) => {
    setSiteSettings(settings);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  };

  const updateService = (service: ServiceItem) => {
    const updated = services.map((s) => (s.id === service.id ? service : s));
    setServices(updated);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
  };

  const updateProject = (project: ProjectItem) => {
    const updated = projects.map((p) => (p.id === project.id ? project : p));
    setProjects(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
  };

  const updateTeamMember = (member: TeamMember) => {
    const updated = team.map((t) => (t.id === member.id ? member : t));
    setTeam(updated);
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(updated));
  };

  const updatePost = (post: BlogPost) => {
    const updated = posts.map((p) => (p.id === post.id ? post : p));
    setPosts(updated);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updated));
  };

  const updateHeroSlide = (slide: HeroSlide) => {
    const updated = heroSlides.map((s) => (s.id === slide.id ? slide : s));
    setHeroSlides(updated);
    localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(updated));
  };

  const addHeroSlide = (slide: HeroSlide) => {
    const updated = [...heroSlides, slide];
    setHeroSlides(updated);
    localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(updated));
  };

  const deleteHeroSlide = (id: string) => {
    const updated = heroSlides.filter((s) => s.id !== id);
    setHeroSlides(updated);
    localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(updated));
  };

  const reorderHeroSlides = (slides: HeroSlide[]) => {
    setHeroSlides(slides);
    localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(slides));
  };

  const addLead = async (leadData: Omit<Lead, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'source'>): Promise<string> => {
    const attribution = getStoredAttribution();
    const newId = `lead-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();

    const newLead: Lead = {
      ...leadData,
      id: newId,
      source: attribution.landingPage || 'Direct Website Entry',
      utmParams: {
        source: attribution.utmSource,
        medium: attribution.utmMedium,
        campaign: attribution.utmCampaign
      },
      status: 'NEW',
      notes: [],
      createdAt: now,
      updatedAt: now
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated));

    trackEvent(`Lead Generated: ${leadData.type}`, 'Conversion', {
      leadId: newId,
      type: leadData.type,
      service: leadData.serviceInterest,
      industry: leadData.industry
    });

    return newId;
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus, note?: string) => {
    const now = new Date().toISOString();
    const updated = leads.map((l) => {
      if (l.id === leadId) {
        const notes = l.notes || [];
        if (note) {
          notes.push(`[${new Date().toLocaleDateString()}] ${note}`);
        }
        return {
          ...l,
          status,
          notes,
          updatedAt: now
        };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated));
  };

  const deleteLead = (leadId: string) => {
    const updated = leads.filter((l) => l.id !== leadId);
    setLeads(updated);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(updated));
  };

  const loginAdmin = (passcode: string): boolean => {
    // Default authorized passcode for SafeNet corporate admin
    if (passcode.trim() === 'safenet-admin-2026' || passcode.trim() === 'safenet2026') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      trackEvent('Admin Login Success', 'Engagement');
      return true;
    }
    trackEvent('Admin Login Failed', 'Engagement');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const saveCookiePreferences = (prefs: Partial<CookiePreferences>) => {
    const updated: CookiePreferences = {
      ...cookiePrefs,
      ...prefs,
      answered: true
    };
    setCookiePrefs(updated);
    localStorage.setItem(STORAGE_KEYS.COOKIES, JSON.stringify(updated));
    trackEvent('Cookie Preferences Saved', 'Engagement', updated);
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.TEAM);
    localStorage.removeItem(STORAGE_KEYS.POSTS);
    localStorage.removeItem(STORAGE_KEYS.LEADS);
    localStorage.removeItem(STORAGE_KEYS.HERO_SLIDES);

    setSiteSettings(initialSiteSettings);
    setServices(initialServices);
    setProjects(initialProjects);
    setTeam(initialTeam);
    setPosts(initialBlogPosts);
    setLeads(initialLeads);
    setHeroSlides(initialHeroSlides);
  };

  return (
    <SiteContext.Provider
      value={{
        currentPage,
        selectedSlug,
        navigate,
        siteSettings,
        updateSiteSettings,
        services,
        industries,
        projects,
        team,
        licences,
        testimonials,
        faqs,
        jobs,
        posts,
        leads,
        heroSlides,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        reorderHeroSlides,
        addLead,
        updateLeadStatus,
        deleteLead,
        updateService,
        updateProject,
        updateTeamMember,
        updatePost,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        cookiePrefs,
        saveCookiePreferences,
        resetAllData,
        activeJobApplication,
        setActiveJobApplication
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
