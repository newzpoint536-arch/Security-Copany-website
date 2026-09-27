import React from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSlider } from '../components/home/HeroSlider';
import {
  Shield,
  ShieldCheck,
  Building2,
  Lock,
  Camera,
  UserCheck,
  Radio,
  FileText,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  PhoneCall,
  Clock,
  ExternalLink,
  Award
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const HomePage: React.FC = () => {
  const { navigate, services, industries, projects, posts, testimonials, faqs, siteSettings } = useSite();

  const handleServiceClick = (slug: string) => {
    navigate('service-detail', slug);
  };

  const handleProjectClick = (id: string) => {
    navigate('project-detail', id);
  };

  const handlePostClick = (slug: string) => {
    navigate('blog-detail', slug);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="home"
        title="SafeNet | Corporate Security & Risk Management"
        description="SafeNet delivers enterprise corporate security solutions, physical asset protection, risk management, and compliance advisory for organizations."
      />

      {/* Cinematic Animated Security Media Hero Slider */}
      <HeroSlider />

      {/* Trust & Credibility Strip (Strictly Verified Content) */}
      <section className="bg-white border-y border-slate-200 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-900" />
            <span className="font-semibold text-slate-900 uppercase tracking-wide">
              Compliance Credentials:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Private Guard Companies Act Compliance</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Corporate Affairs Commission (CAC) Incorporated</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Standard Operating Procedures (ISO 9001 Aligned)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>HSE Occupational Safety Guidelines (ISO 45001 Aligned)</span>
            </span>
          </div>

          <button
            onClick={() => navigate('compliance')}
            className="text-xs font-medium text-slate-900 hover:text-sky-700 flex items-center gap-1 transition-colors"
          >
            <span>Verify Credentials</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Corporate Summary & Mission */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
              <span>Corporate Overview</span>
              <span aria-hidden="true">·</span>
              <span>Enterprise Guarding & Risk</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight leading-tight">
              A Disciplined Digital & Physical Security Platform
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              SafeNet operates as a disciplined security partner to commercial enterprises, financial facilities, industrial operations, and executive leadership. We bridge the gap between human vigilance and modern electronic surveillance.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Unlike informal security contractors, every SafeNet detachment functions under verified Post Orders, continuous biometric supervision, digital RFID checkpoint logging, and instant escalation protocols to our central 24/7 Operations Monitoring Room.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                <span className="block font-bold text-slate-900 font-mono text-sm">Zero Guesswork</span>
                <span className="text-slate-600">Standardized guard shift checklists and digital patrol verification.</span>
              </div>
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                <span className="block font-bold text-slate-900 font-mono text-sm">Audit Preparedness</span>
                <span className="text-slate-600">Complete incident chain-of-custody documentation for insurance.</span>
              </div>
            </div>

            <div>
              <button
                onClick={() => navigate('about')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-sky-700 transition-colors"
              >
                <span>Read Full Company Profile & Leadership Philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 aspect-4/3">
              <img
                src="/src/assets/images/safenet_operations_center_1790488901201.jpg"
                alt="SafeNet Operations and Command Center"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>SafeNet Operations Command & Telemetry Desk</span>
              <span>24/7 Real-Time Video & Incident Verification</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview (Asymmetric Grid / Numbered Editorial) */}
      <section className="bg-slate-900 text-white py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
                <span>Core Capabilities</span>
                <span aria-hidden="true">·</span>
                <span>Operational Offerings</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white font-display tracking-tight mt-1">
                Enterprise Security Solutions
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              Configurable security services built around statutory standards, rigorous supervisory protocols, and measurable operational outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter((s) => s.isPublished).map((service, index) => {
              return (
                <div
                  key={service.id}
                  className="bg-slate-950/60 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-sky-400 font-semibold">
                        0{index + 1}. Capability
                      </span>
                      <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center text-sky-400">
                        <Shield className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display group-hover:text-sky-300 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {service.summary}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      {service.benefits.slice(0, 2).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handleServiceClick(service.slug)}
                      className="text-xs font-semibold text-sky-400 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => navigate('quote')}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => navigate('services')}
              className="px-6 py-3 bg-white text-slate-950 text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors"
            >
              View Detailed Service Directory & Methodologies
            </button>
          </div>
        </div>
      </section>

      {/* Industries Directory Preview */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
              <span>Sectors & Expertise</span>
              <span aria-hidden="true">·</span>
              <span>Targeted Security Frameworks</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight mt-1">
              Industries Served
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md">
            Security architectures tailored to specific regulatory standards, physical topologies, and commercial operational workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.filter((i) => i.isPublished).map((industry) => (
            <div
              key={industry.id}
              className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-900">{industry.name}</span>
                <Building2 className="w-4 h-4 text-slate-400" />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {industry.summary}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                <p className="font-semibold text-slate-800">Primary Risk Mitigations:</p>
                {industry.safeNetSolutions.slice(0, 2).map((sol, idx) => (
                  <p key={idx} className="text-slate-600 flex items-start gap-1.5">
                    <span className="text-sky-700 font-bold">·</span>
                    <span className="line-clamp-1">{sol}</span>
                  </p>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('industries')}
                  className="text-xs font-medium text-slate-900 hover:text-sky-700 flex items-center gap-1 transition-colors"
                >
                  <span>View Sector Analysis</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects & Case Studies */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
                <span>Field Execution</span>
                <span aria-hidden="true">·</span>
                <span>Authorized Implementations</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight mt-1">
                Projects & Case Studies
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-md">
              Documented security deployments detailing client challenges, technical architectures, and verified operational outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.filter((p) => p.isPublished).map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {project.imagePath && (
                    <div className="aspect-16/9 bg-slate-900 overflow-hidden">
                      <img
                        src={project.imagePath}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{project.industry}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 font-display line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3">
                      {project.overview}
                    </p>

                    <div className="pt-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                      <span className="font-semibold text-slate-900">Documented Result:</span>
                      <p className="text-slate-700 line-clamp-2">{project.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleProjectClick(project.id)}
                    className="text-xs font-semibold text-slate-900 hover:text-sky-700 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Authorized Record
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('projects')}
              className="px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Browse Complete Case Study Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Assessment Teaser Banner */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-2xl text-white p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-5 relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
              <span>Interactive Evaluation Tool</span>
              <span aria-hidden="true">·</span>
              <span>Self-Service</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Evaluate Your Facility Security Readiness
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Identify potential perimeter bottlenecks, access vulnerabilities, and surveillance gaps with our structured security questionnaire. Receive instant score breakdowns and practical initial recommendations.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  trackEvent('Assessment Banner Start', 'Assessment');
                  navigate('assessment');
                }}
                className="px-5 py-3 bg-white text-slate-950 text-xs sm:text-sm font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
              >
                Launch 3-Minute Assessment
              </button>
              <button
                onClick={() => navigate('contact')}
                className="px-4 py-3 bg-slate-800 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
              >
                Speak Directly with an Advisor
              </button>
            </div>

            <p className="text-[11px] text-slate-400 pt-2">
              Note: This questionnaire serves as an initial self-evaluation framework and does not replace an on-site physical security audit.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials (Strictly Authorized Placeholders) */}
      <section className="bg-white border-y border-slate-200 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
              <span>Client Endorsements</span>
              <span aria-hidden="true">·</span>
              <span>Verified Feedback</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Trusted by Facility & Risk Directors
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              All published client feedback is strictly authorized in compliance with non-disclosure and client confidentiality agreements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.filter((t) => t.isPublished).map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="text-2xl font-serif">“</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 text-xs space-y-1">
                  <p className="font-bold text-slate-900">{item.clientName}</p>
                  <p className="text-slate-500">{item.clientRole}</p>
                  <p className="text-[11px] text-slate-500 font-mono">{item.organization}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('testimonials')}
              className="text-xs font-semibold text-slate-900 hover:text-sky-700 transition-colors"
            >
              View Client Verification Guidelines & Feedback Policy →
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 px-4 sm:px-8 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
            <span>Corporate FAQ</span>
            <span aria-hidden="true">·</span>
            <span>Clarity & Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Answers regarding deployment lead times, supervisory auditing, guard vetting, and emergency protocols.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.filter((f) => f.isFeatured).map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg border border-slate-200 p-5 space-y-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 font-display">
                  {faq.question}
                </h3>
                <span className="text-[11px] text-slate-600 font-mono">
                  {faq.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('faq')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
          >
            Explore Complete Knowledge Base & FAQ
          </button>
        </div>
      </section>

      {/* Latest Security Insights & Articles */}
      <section className="bg-slate-100/50 border-t border-slate-200 py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
                <span>Thought Leadership</span>
                <span aria-hidden="true">·</span>
                <span>Security Briefings</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
                Latest Insights & Advisory
              </h2>
            </div>
            <button
              onClick={() => navigate('blog')}
              className="text-xs font-semibold text-slate-900 hover:text-sky-700 flex items-center gap-1"
            >
              <span>View All Briefings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.filter((p) => p.isPublished).slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 font-display line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-600">{post.publishedDate}</span>
                  <button
                    onClick={() => handlePostClick(post.slug)}
                    className="text-xs font-semibold text-slate-900 hover:text-sky-700 flex items-center gap-1"
                  >
                    <span>Read Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Lead Generation CTA Block */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight">
            Consult with SafeNet Corporate Risk Specialists
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Whether preparing for a new facility opening, reviewing guard detachment SLAs, or establishing biometric access control, our advisory team is prepared to conduct a discreet initial review.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('quote')}
              className="px-6 py-3 bg-white text-slate-950 font-bold text-sm rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
            >
              Request a Corporate Quotation
            </button>
            <button
              onClick={() => navigate('contact')}
              className="px-6 py-3 bg-slate-800 border border-slate-700 text-white font-semibold text-sm rounded-lg hover:bg-slate-700 transition-colors"
            >
              Contact Operational Headquarters
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
