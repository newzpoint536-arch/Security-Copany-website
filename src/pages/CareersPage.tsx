import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import { JobPosting } from '../types';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Upload,
  X,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const CareersPage: React.FC = () => {
  const { jobs, addLead } = useSite();
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  // Application Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('2-4 years');
  const [coverNote, setCoverNote] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [applicantId, setApplicantId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleApplyClick = (job: JobPosting) => {
    setSelectedJob(job);
    setSubmitSuccess(false);
    setErrorMsg('');
    trackEvent(`Career Apply Click: ${job.title}`, 'Engagement', { jobTitle: job.title });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Resume file size must be less than 5MB.');
        return;
      }
      const allowedExts = ['.pdf', '.doc', '.docx'];
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!allowedExts.includes(ext)) {
        setErrorMsg('Invalid file format. Please upload PDF or DOCX.');
        return;
      }
      setErrorMsg('');
      setResumeName(file.name);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent spam drop

    if (!fullName.trim() || !email.trim() || !phone.trim() || !resumeName) {
      setErrorMsg('Please complete all required fields and upload your resume.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const generatedId = await addLead({
        type: 'CAREER',
        fullName: fullName.trim(),
        companyName: `Applicant: ${selectedJob?.title}`,
        email: email.trim(),
        phone: phone.trim(),
        jobTitle: selectedJob?.title,
        resumeFileName: resumeName,
        message: `Years of experience: ${experienceYears}. Note: ${coverNote}`
      });

      setApplicantId(generatedId);
      setSubmitSuccess(true);
      trackEvent('Career Application Submitted', 'Conversion', {
        jobTitle: selectedJob?.title,
        applicantId: generatedId
      });
    } catch {
      setErrorMsg('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="careers"
        title="Careers & Security Recruitment | SafeNet Security Limited"
        description="Join SafeNet's professional security force. Explore career openings for Field Supervisors, Command Center Dispatchers, and HSE Officers."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Join Our Protective Force</span>
            <span aria-hidden="true">·</span>
            <span>Disciplined Careers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Careers & Recruitment
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            SafeNet provides structured career progression, statutory pension contributions, prompt remuneration, and continuous professional training for disciplined security personnel.
          </p>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Active Vacancies
            </h2>
            <p className="text-xs text-slate-500">
              All candidates undergo mandatory criminal record vetting and guarantor checks prior to onboarding.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
            {jobs.filter((j) => j.isOpen).length} Positions Available
          </span>
        </div>

        <div className="space-y-6">
          {jobs.filter((j) => j.isOpen).map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 hover:border-slate-300 transition-colors shadow-xs"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                    <span className="text-sky-700 font-semibold">{job.department}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{job.employmentType}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                    {job.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl pt-1">
                    {job.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs whitespace-nowrap"
                  >
                    Apply for Position
                  </button>
                </div>
              </div>

              {/* Responsibilities and Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                <div className="space-y-2">
                  <span className="font-bold text-slate-900 font-display block">
                    Key Operational Responsibilities:
                  </span>
                  <ul className="space-y-1.5 text-slate-600">
                    {job.responsibilities.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-900 font-display block">
                    Mandatory Qualifications:
                  </span>
                  <ul className="space-y-1.5 text-slate-600">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400 font-bold">·</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Application Deadline: {job.deadline}</span>
                <span>Equal Opportunity Employer</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150 my-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-900 text-white rounded-t-2xl">
              <div>
                <span className="text-xs font-mono text-sky-400 uppercase">
                  Candidate Application Form
                </span>
                <h3 className="text-lg font-bold font-display text-white mt-1">
                  {selectedJob.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              {submitSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-slate-900">
                    Application Submitted Successfully
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Your credentials have been securely stored in our recruitment database. Shortlisted applicants will be contacted by our HR & Vetting Unit for physical document verification.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 max-w-xs mx-auto">
                    Application Ref: {applicantId}
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="mt-4 px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
                  >
                    Close Application Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
                  {/* Honeypot for spam protection */}
                  <input
                    type="text"
                    name="website_url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {errorMsg && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Samuel Adekunle"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="s.adekunle@example.com"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 800 000 0000"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Relevant Security Experience
                    </label>
                    <select
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="1-2 years">1 – 2 years</option>
                      <option value="2-4 years">2 – 4 years</option>
                      <option value="5-8 years">5 – 8 years</option>
                      <option value="8+ years">8+ years (Senior / Supervisory)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Upload Curriculum Vitae / Resume (PDF or DOCX, max 5MB) *
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <p className="text-slate-600 font-medium">
                        {resumeName ? (
                          <span className="text-emerald-700 font-bold">{resumeName}</span>
                        ) : (
                          'Click or drop resume file here'
                        )}
                      </p>
                      <p className="text-[11px] text-slate-400">PDF, DOC, DOCX up to 5MB</p>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Brief Statement or Cover Note (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Outline any specialized certificates, driver licences, or tactical security experience..."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <span>
                      Data Protection: Information submitted will be stored securely and used solely for candidate vetting in compliance with our Privacy Policy.
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Processing Application...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
