import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import { ProjectItem } from '../types';
import {
  Shield,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  X,
  FileCheck,
  Building2,
  Lock
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const ProjectsPage: React.FC = () => {
  const { projects, selectedSlug, navigate } = useSite();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const [activeProject, setActiveProject] = useState<ProjectItem | null>(() => {
    if (selectedSlug) {
      return projects.find((p) => p.id === selectedSlug) || null;
    }
    return null;
  });

  const industriesList = ['All', ...Array.from(new Set(projects.map((p) => p.industry)))];

  const filteredProjects = selectedFilter === 'All'
    ? projects.filter((p) => p.isPublished)
    : projects.filter((p) => p.isPublished && p.industry === selectedFilter);

  const handleOpenProject = (p: ProjectItem) => {
    setActiveProject(p);
    trackEvent(`Case Study View: ${p.title}`, 'Engagement', { projectId: p.id });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="projects"
        title="Projects & Case Studies | SafeNet Corporate Security"
        description="Review documented corporate security implementations: commercial towers, logistics depots, and executive protective escorts."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Operational Portfolio</span>
            <span aria-hidden="true">·</span>
            <span>Case Studies</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Projects & Case Studies
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Real-world security engineering, physical guard deployments, and crisis mitigation. In accordance with strict non-disclosure obligations, client names are represented by formal organizational classification placeholders.
          </p>
        </div>
      </section>

      {/* Filter and Content */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        {/* Interactive Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-lg max-w-fit">
          {industriesList.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedFilter(ind)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                selectedFilter === ind
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Visual */}
                <div className="aspect-16/9 bg-slate-900 overflow-hidden relative">
                  {project.imagePath ? (
                    <img
                      src={project.imagePath}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <Shield className="w-8 h-8 text-slate-700" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-sm">
                    {project.industry}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{project.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{project.date}</span>
                    </span>
                  </div>

                  <h2 className="font-bold text-base text-slate-900 font-display group-hover:text-sky-800 transition-colors line-clamp-2">
                    {project.title}
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3">
                    {project.overview}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                    <span className="font-bold text-slate-900 block">Verified Outcome:</span>
                    <p className="text-slate-600 line-clamp-2">{project.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleOpenProject(project)}
                  className="text-xs font-semibold text-slate-900 hover:text-sky-700 flex items-center gap-1.5 transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-[11px] text-slate-500 font-mono">
                  {project.clientPlaceholder.length > 25 ? 'Authorized Client' : project.clientPlaceholder}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150 my-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-900 text-white rounded-t-2xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                  <span>{activeProject.industry}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.location}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {activeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Client Profile (Confidential):</span>
                  <span className="font-bold text-slate-900 font-mono">{activeProject.clientPlaceholder}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Engagement Timeline:</span>
                  <span className="font-semibold text-slate-900">{activeProject.date}</span>
                </div>
              </div>

              {/* Challenge */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm font-display flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>The Operational Challenge</span>
                </h4>
                <p className="leading-relaxed text-slate-600 bg-amber-50/40 p-4 rounded-lg border border-amber-100">
                  {activeProject.challenge}
                </p>
              </div>

              {/* Engineered Solution */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm font-display flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-600" />
                  <span>The SafeNet Countermeasure & Engineering</span>
                </h4>
                <p className="leading-relaxed text-slate-600 bg-sky-50/40 p-4 rounded-lg border border-sky-100">
                  {activeProject.solution}
                </p>
              </div>

              {/* Implementation */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm font-display">
                  Implementation & Execution Process
                </h4>
                <p className="leading-relaxed text-slate-600">
                  {activeProject.implementation}
                </p>
              </div>

              {/* Verified Outcome */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Documented Operational Outcomes</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 font-medium leading-relaxed">
                  {activeProject.outcome}
                </p>
              </div>

              {/* Services Provided */}
              <div className="pt-2">
                <span className="font-semibold text-slate-700 block mb-2 text-xs">
                  Services Integrated in this Deployment:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {activeProject.servicesProvided.map((svc, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md font-medium"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setActiveProject(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close Case Study
              </button>

              <button
                onClick={() => {
                  setActiveProject(null);
                  navigate('quote', encodeURIComponent(activeProject.industry));
                }}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
              >
                Request Similar Deployment Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
