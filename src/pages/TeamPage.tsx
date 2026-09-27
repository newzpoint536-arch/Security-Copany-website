import React from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import {
  ShieldCheck,
  UserCheck,
  Award,
  Linkedin,
  FileCheck,
  ArrowRight
} from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { team, navigate } = useSite();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="team"
        title="Management, Leadership & Operations Command | SafeNet"
        description="Meet the executive leadership and operational directors governing SafeNet's corporate security standard."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Corporate Governance</span>
            <span aria-hidden="true">·</span>
            <span>Operational Command</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Executive Leadership & Management
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            SafeNet is governed by seasoned professionals spanning corporate risk management, physical protective operations, electronic systems engineering, and statutory legal compliance.
          </p>
        </div>
      </section>

      {/* Team Directory */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.filter((m) => m.isPublished).map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-sky-700 uppercase tracking-wider block mb-1">
                      {member.department} Directorate
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                      {member.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-slate-600">
                      {member.position}
                    </p>
                  </div>

                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-sky-700 hover:bg-slate-50 rounded-lg transition-colors"
                      aria-label={`${member.name} LinkedIn Profile`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {member.bio}
                </p>

                {/* Verified Credentials */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Verified Professional Credentials
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.credentials.map((cred, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-mono font-medium"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>SafeNet Senior Leadership</span>
                <span className="font-mono">Verified Officer</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note on personnel policy */}
        <div className="p-6 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2 max-w-3xl">
          <p className="font-bold text-slate-900 font-display">
            Field Guard Supervision & Chain of Command
          </p>
          <p>
            Beyond executive directors, SafeNet maintains a structured hierarchical field structure: Field Operations Inspectors, Shift Duty Officers, Senior Post Supervisors, and Station Guards. Every post is connected via cellular and radio backhaul to our central 24/7 Operations Command Room.
          </p>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigate('compliance')}
            className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Review Licences, Statutory Compliance & Vetting Protocols →
          </button>
        </div>
      </section>
    </div>
  );
};
