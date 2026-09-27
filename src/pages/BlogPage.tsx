import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import { BlogPost } from '../types';
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  X,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const BlogPage: React.FC = () => {
  const { posts, selectedSlug, navigate } = useSite();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(() => {
    if (selectedSlug) {
      return posts.find((p) => p.slug === selectedSlug) || null;
    }
    return null;
  });

  const categories = ['All', 'Facility Protection', 'Risk Management', 'Corporate Advisory'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && post.isPublished;
  });

  const handleOpenArticle = (post: BlogPost) => {
    setActiveArticle(post);
    trackEvent(`Read Article: ${post.title}`, 'Engagement', { slug: post.slug });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="blog"
        title="Security Briefings, News & Industry Insights | SafeNet"
        description="Read technical risk analyses, corporate physical security methodologies, and facility defense insights written by SafeNet security specialists."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Corporate Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Security Insights</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Security Insights & Briefings
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Professional analyses, perimeter protection frameworks, standard operating procedure design, and risk mitigation methodologies.
          </p>
        </div>
      </section>

      {/* Controls & Grid */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/60 rounded-lg w-full md:w-auto">
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

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search security articles..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-all duration-200 space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span className="text-sky-700 font-semibold">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-sky-800 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Key Takeaways preview */}
                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                  <span className="font-semibold text-slate-900 block text-[11px] uppercase tracking-wider">
                    Core Action Item:
                  </span>
                  <p className="text-slate-600 line-clamp-2 italic">
                    "{post.keyTakeaways[0]}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{post.publishedDate}</span>
                <button
                  onClick={() => handleOpenArticle(post)}
                  className="font-semibold text-slate-900 hover:text-sky-700 flex items-center gap-1.5 transition-colors"
                >
                  <span>Read Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150 my-auto">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-900 text-white rounded-t-2xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                  <span>{activeArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-4 border-b border-slate-100 font-mono">
                <span>Authored by: {activeArticle.author}</span>
                <span>Published: {activeArticle.publishedDate}</span>
              </div>

              {/* Body Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="p-5 bg-sky-50/70 border border-sky-100 rounded-xl space-y-3">
                <h4 className="font-bold text-slate-900 text-xs font-display uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-700" />
                  <span>Key Executive Takeaways</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {activeArticle.keyTakeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-sky-700 font-bold">·</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close Briefing
              </button>

              <button
                onClick={() => {
                  setActiveArticle(null);
                  navigate('quote');
                }}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
              >
                Request Security Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
