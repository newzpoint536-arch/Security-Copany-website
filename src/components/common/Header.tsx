import React, { useState, useEffect, useRef } from 'react';
import { useSite, PageRoute } from '../../context/SiteContext';
import {
  Shield,
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  Lock,
  ArrowRight,
  Search,
  BookOpen,
  HelpCircle,
  Building2,
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

interface SearchResultItem {
  id: string;
  type: 'service' | 'post' | 'faq' | 'industry' | 'project';
  title: string;
  subtitle: string;
  category?: string;
  badge: string;
  action: () => void;
}

export const Header: React.FC = () => {
  const {
    currentPage,
    navigate,
    siteSettings,
    isAdminAuthenticated,
    services,
    posts,
    faqs,
    industries,
    projects
  } = useSite();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (page: PageRoute, slug?: string) => {
    navigate(page, slug);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        if (!searchOpen) {
          setTimeout(() => searchInputRef.current?.focus(), 50);
        }
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // Compute live search results across services, blog posts, FAQs, industries, projects
  const query = searchQuery.trim().toLowerCase();

  const searchResults: SearchResultItem[] = React.useMemo(() => {
    if (!query) return [];

    const results: SearchResultItem[] = [];

    // 1. Services
    services
      .filter((s) => s.isPublished)
      .forEach((s) => {
        const matchesTitle = s.title.toLowerCase().includes(query);
        const matchesSummary = s.summary.toLowerCase().includes(query);
        const matchesBenefits = s.benefits.some((b) => b.toLowerCase().includes(query));
        const matchesApps = s.typicalApplications.some((a) => a.toLowerCase().includes(query));

        if (matchesTitle || matchesSummary || matchesBenefits || matchesApps) {
          results.push({
            id: `service-${s.id}`,
            type: 'service',
            title: s.title,
            subtitle: s.summary,
            category: 'Operational Capability',
            badge: 'Service',
            action: () => handleNavClick('service-detail', s.slug)
          });
        }
      });

    // 2. Blog Posts / Briefings
    posts
      .filter((p) => p.isPublished)
      .forEach((p) => {
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesExcerpt = p.excerpt.toLowerCase().includes(query);
        const matchesTakeaway = p.keyTakeaways.some((t) => t.toLowerCase().includes(query));

        if (matchesTitle || matchesExcerpt || matchesTakeaway) {
          results.push({
            id: `post-${p.id}`,
            type: 'post',
            title: p.title,
            subtitle: p.excerpt,
            category: p.category,
            badge: 'Briefing',
            action: () => handleNavClick('blog-detail', p.slug)
          });
        }
      });

    // 3. FAQs
    faqs.forEach((f) => {
      const matchesQ = f.question.toLowerCase().includes(query);
      const matchesA = f.answer.toLowerCase().includes(query);

      if (matchesQ || matchesA) {
        results.push({
          id: `faq-${f.id}`,
          type: 'faq',
          title: f.question,
          subtitle: f.answer,
          category: f.category,
          badge: 'FAQ',
          action: () => handleNavClick('faq')
        });
      }
    });

    // 4. Industries
    industries
      .filter((i) => i.isPublished)
      .forEach((ind) => {
        const matchesName = ind.name.toLowerCase().includes(query);
        const matchesSummary = ind.summary.toLowerCase().includes(query);
        const matchesSol = ind.safeNetSolutions.some((sol) => sol.toLowerCase().includes(query));

        if (matchesName || matchesSummary || matchesSol) {
          results.push({
            id: `ind-${ind.id}`,
            type: 'industry',
            title: ind.name,
            subtitle: ind.summary,
            category: 'Sector Profile',
            badge: 'Industry',
            action: () => handleNavClick('industries')
          });
        }
      });

    // 5. Projects & Case Studies
    projects
      .filter((p) => p.isPublished)
      .forEach((proj) => {
        const matchesTitle = proj.title.toLowerCase().includes(query);
        const matchesOverview = proj.overview.toLowerCase().includes(query);
        const matchesOutcome = proj.outcome.toLowerCase().includes(query);

        if (matchesTitle || matchesOverview || matchesOutcome) {
          results.push({
            id: `proj-${proj.id}`,
            type: 'project',
            title: proj.title,
            subtitle: proj.outcome,
            category: proj.industry,
            badge: 'Case Study',
            action: () => handleNavClick('project-detail', proj.id)
          });
        }
      });

    return results;
  }, [query, services, posts, faqs, industries, projects]);

  const handleKeyDownInSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        searchResults[selectedIndex].action();
      } else if (searchResults.length > 0) {
        searchResults[0].action();
      }
    }
  };

  const getResultIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'service':
        return <Shield className="w-4 h-4 text-sky-600" />;
      case 'post':
        return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'faq':
        return <HelpCircle className="w-4 h-4 text-amber-600" />;
      case 'industry':
        return <Building2 className="w-4 h-4 text-purple-600" />;
      case 'project':
        return <FileCheck className="w-4 h-4 text-indigo-600" />;
      default:
        return <Shield className="w-4 h-4 text-slate-500" />;
    }
  };

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Industries', page: 'industries' },
    { label: 'Projects', page: 'projects' },
    { label: 'About', page: 'about' },
    { label: 'Assessment', page: 'assessment' },
    { label: 'Contact', page: 'contact' }
  ];

  const moreLinks: { label: string; page: PageRoute; desc: string }[] = [
    { label: 'Leadership & Team', page: 'team', desc: 'Executive directors and operational command' },
    { label: 'Licences & Compliance', page: 'compliance', desc: 'Statutory verification and standards' },
    { label: 'Client Testimonials', page: 'testimonials', desc: 'Authorized client feedback and verifications' },
    { label: 'Careers', page: 'careers', desc: 'Join our professional security detachments' },
    { label: 'Insights & News', page: 'blog', desc: 'Security briefings and risk analysis' },
    { label: 'FAQ', page: 'faq', desc: 'Answers to corporate client questions' }
  ];

  return (
    <>
      {/* Quiet top utility banner for corporate contact & emergency dispatch */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs px-4 sm:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              24/7 Operations Command & Rapid Dispatch
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a
              href={`tel:${siteSettings.officialPhone.replace(/\s+/g, '')}`}
              onClick={() => trackEvent('Header Phone Click', 'Contact')}
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
              <span>{siteSettings.officialPhone}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline text-slate-400">
              {siteSettings.businessHours.split('|')[0]}
            </span>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              title="Corporate Administration Portal"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminAuthenticated ? 'Admin CMS (Logged In)' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Zone 1: Single text wordmark with subtle brand shield */}
          <div className="flex items-center shrink-0">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-sm"
              aria-label="SafeNet Corporate Security Home"
            >
              <div className="w-9 h-9 rounded-md bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:bg-slate-800 transition-colors">
                <Shield className="w-5 h-5 text-sky-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
                SafeNet
              </span>
            </a>
          </div>

          {/* Zone 2: Clean text navigation links with dropdown */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`relative py-1 hover:text-slate-900 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    isActive ? 'text-slate-900 font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Corporate Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="flex items-center gap-1 py-1 hover:text-slate-900 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                aria-expanded={dropdownOpen}
              >
                <span>Company</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-slate-200 p-2 z-50 text-left animate-in fade-in slide-in-from-top-1 duration-150">
                  {moreLinks.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => handleNavClick(item.page)}
                      className="w-full text-left p-2.5 rounded-md hover:bg-slate-50 transition-colors group"
                    >
                      <div className="text-sm font-medium text-slate-900 group-hover:text-sky-700 flex items-center justify-between">
                        <span>{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-700 transition-colors" />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.desc}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Search Bar Affordance + Primary Action + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3" ref={searchContainerRef}>
            {/* Integrated Header Search Bar */}
            <div className="relative">
              <div
                className={`flex items-center bg-slate-100 hover:bg-slate-200/80 rounded-lg px-2.5 py-1.5 transition-all duration-200 border ${
                  searchOpen
                    ? 'border-slate-400 bg-white ring-2 ring-slate-900/10 w-48 sm:w-64 lg:w-72'
                    : 'border-transparent w-9 sm:w-44 lg:w-56'
                }`}
              >
                <Search
                  className="w-4 h-4 text-slate-500 shrink-0 cursor-pointer"
                  onClick={() => {
                    setSearchOpen(true);
                    setTimeout(() => searchInputRef.current?.focus(), 50);
                  }}
                />

                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onFocus={() => setSearchOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(-1);
                    if (!searchOpen) setSearchOpen(true);
                  }}
                  onKeyDown={handleKeyDownInSearch}
                  placeholder="Search services, posts, FAQs..."
                  className={`bg-transparent text-xs text-slate-900 placeholder-slate-500 focus:outline-none ml-2 w-full ${
                    searchOpen ? 'inline-block' : 'hidden sm:inline-block'
                  }`}
                  aria-label="Search SafeNet security services, articles, and FAQs"
                />

                {/* Keyboard Shortcut Indicator */}
                {!searchQuery && (
                  <span className="hidden lg:inline-flex items-center text-[10px] font-mono text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs shrink-0 select-none">
                    ⌘K
                  </span>
                )}

                {/* Clear search button */}
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="text-slate-400 hover:text-slate-700 ml-1 p-0.5"
                    aria-label="Clear search query"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Real-time Search Dropdown Menu */}
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 md:w-[480px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Results Header */}
                  <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      {query
                        ? `Found ${searchResults.length} resource${searchResults.length === 1 ? '' : 's'}`
                        : 'Quick Suggestions & Popular Searches'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-600">
                      Esc to close
                    </span>
                  </div>

                  {/* Empty Query Default Suggestions */}
                  {!query && (
                    <div className="p-4 space-y-3">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Explore Topics
                      </p>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        {[
                          'Physical Guarding',
                          'Biometric Access',
                          'Executive Escort',
                          'Vetting Standards',
                          'Perimeter CCTV',
                          'Emergency Action Plan'
                        ].map((term) => (
                          <button
                            key={term}
                            onClick={() => {
                              setSearchQuery(term);
                              searchInputRef.current?.focus();
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Tip: Press Enter to open top result</span>
                        <button
                          onClick={() => handleNavClick('assessment')}
                          className="text-sky-700 font-semibold hover:underline"
                        >
                          Launch Security Assessment →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Query results list */}
                  {query && (
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {searchResults.length === 0 ? (
                        <div className="p-8 text-center space-y-2">
                          <p className="text-sm font-semibold text-slate-800">
                            No matches found for "{searchQuery}"
                          </p>
                          <p className="text-xs text-slate-500 max-w-xs mx-auto">
                            Try searching for terms such as "guarding", "surveillance", "escort", "licence", or "audit".
                          </p>
                          <button
                            onClick={() => handleNavClick('contact')}
                            className="mt-2 text-xs font-semibold text-sky-700 hover:underline"
                          >
                            Inquire with Corporate Advisory Desk →
                          </button>
                        </div>
                      ) : (
                        searchResults.map((res, idx) => {
                          const isHighlighted = selectedIndex === idx;
                          return (
                            <button
                              key={res.id}
                              onClick={res.action}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors ${
                                isHighlighted ? 'bg-slate-100/90' : 'hover:bg-slate-50'
                              }`}
                            >
                              <div className="p-2 rounded-md bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                                {getResultIcon(res.type)}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                  <h4 className="text-xs font-bold text-slate-900 truncate font-display">
                                    {res.title}
                                  </h4>
                                  <span className="text-[10px] font-mono font-medium text-slate-500 shrink-0">
                                    {res.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-600 line-clamp-1">
                                  {res.subtitle}
                                </p>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('quote')}
              className="px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 shrink-0"
            >
              Request a Quote
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center text-white">
                  <Shield className="w-4 h-4 text-sky-400" />
                </div>
                <span className="text-lg font-bold text-slate-900 font-display">SafeNet</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile In-Drawer Search Input */}
            <div className="py-4 border-b border-slate-100">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services, posts, FAQs..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-100 rounded-lg text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {/* In-drawer live search list */}
              {searchQuery && (
                <div className="mt-2 max-h-48 overflow-y-auto space-y-1 text-xs">
                  {searchResults.slice(0, 4).map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        r.action();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-md hover:bg-slate-50 flex items-center justify-between gap-2"
                    >
                      <span className="font-medium text-slate-900 truncate">{r.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">{r.badge}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="py-4 space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
                Main Navigation
              </p>
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    currentPage === link.page
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-4 border-t border-slate-100 mt-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
                  Company & Credentials
                </p>
                {moreLinks.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-200 space-y-3">
              <button
                onClick={() => handleNavClick('quote')}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Request a Quote
              </button>

              <button
                onClick={() => handleNavClick('assessment')}
                className="w-full py-2.5 text-center text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Security Assessment
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                <p>24/7 Operations Command:</p>
                <a
                  href={`tel:${siteSettings.officialPhone.replace(/\s+/g, '')}`}
                  className="font-medium text-slate-800"
                >
                  {siteSettings.officialPhone}
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
};
