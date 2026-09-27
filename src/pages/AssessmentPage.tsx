import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import { assessmentQuestions } from '../data/initialData';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  FileText,
  Building2,
  Lock
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const AssessmentPage: React.FC = () => {
  const { addLead, navigate } = useSite();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Lead capture upon completion
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [leadSaved, setLeadSaved] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const activeQuestion = assessmentQuestions[currentQuestionIndex];

  const handleSelectOption = (points: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [activeQuestion.id]: points
    });
  };

  const handleNext = () => {
    if (selectedAnswers[activeQuestion.id] === undefined) return;

    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
      trackEvent('Security Assessment Completed', 'Assessment', {
        score: calculateTotalScore()
      });
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setLeadSaved(false);
  };

  const calculateTotalScore = (): number => {
    const values = Object.values(selectedAnswers);
    if (values.length === 0) return 0;
    return values.reduce((acc, curr) => acc + curr, 0);
  };

  const getScoreClassification = (score: number) => {
    if (score >= 80) {
      return {
        level: 'High Operational Resilience',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        summary: 'Your facility possesses commendable physical security safeguards and documented post orders.',
        recommendations: [
          'Conduct unannounced penetration testing to verify shift vigilance during off-hours.',
          'Implement annual red-team audit reviews to test duress alarm dispatch latency.',
          'Consider upgrading standard analog CCTV feeds to automated perimeter AI tripwires.'
        ]
      };
    } else if (score >= 50) {
      return {
        level: 'Moderate Readiness (Vulnerabilities Present)',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        summary: 'Your organization has established basic security measures, but noticeable blind spots exist in access logging, supervision, or emergency response.',
        recommendations: [
          'Replace manual paper visitor registries with digital QR pre-registration credentials.',
          'Institute digital RFID patrol checkpoint wands to eliminate sleeping guards during night shifts.',
          'Establish a contractual emergency escalation protocol linked to a 24/7 Operations Control Room.'
        ]
      };
    } else {
      return {
        level: 'Critical Security Vulnerability',
        color: 'text-rose-800 bg-rose-50 border-rose-200',
        summary: 'Significant exposure identified. Perimeter access is largely uncontrolled, personnel vetting is inconsistent, or surveillance logging is absent.',
        recommendations: [
          'Deploy vetted, licensed security guards operating under formal site-specific post orders immediately.',
          'Secure perimeter bottlenecks and install biometric/optical access gates to prevent tailgating.',
          'Commission a professional on-site physical security vulnerability survey to establish a baseline.'
        ]
      };
    }
  };

  const handleSaveAssessmentLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setIsSubmittingLead(true);
    const score = calculateTotalScore();
    const classification = getScoreClassification(score);

    try {
      await addLead({
        type: 'ASSESSMENT',
        fullName: fullName.trim(),
        companyName: companyName.trim() || 'Undisclosed Facility',
        email: email.trim(),
        phone: phone.trim(),
        assessmentScore: score,
        assessmentLevel: classification.level,
        serviceInterest: 'Corporate Risk Advisory & Vulnerability Assessment',
        message: `Self-Assessment Score: ${score}/100 (${classification.level}). Requesting formal advisory consultation.`
      });

      setLeadSaved(true);
      trackEvent('Assessment Lead Saved', 'Conversion', { score });
    } catch {
      // Ignore
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const totalScore = calculateTotalScore();
  const classification = getScoreClassification(totalScore);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEOHead
        page="assessment"
        title="Interactive Corporate Security Assessment | SafeNet"
        description="Evaluate your facility's physical access, guard post supervision, CCTV coverage, and emergency response readiness in 3 minutes."
      />

      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>Diagnostic Tool</span>
            <span aria-hidden="true">·</span>
            <span>Self-Service Evaluation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
            Interactive Security Readiness Assessment
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            Answer four core operational questions regarding your perimeter, surveillance, personnel vetting, and crisis preparedness to calculate an immediate baseline security rating.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-12 px-4 sm:px-8 max-w-4xl mx-auto">
        {/* MANDATORY LEGAL & PROFESSIONAL DISCLAIMER */}
        <div className="mb-8 p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-900">Important Disclaimer:</strong> This interactive questionnaire provides a general high-level self-assessment for organizational awareness only. It does not constitute a certified physical security audit, forensic penetration test, or statutory compliance guarantee. SafeNet recommends an on-site physical inspection conducted by certified risk practitioners.
          </p>
        </div>

        {!isCompleted ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>
                  Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
                </span>
                <span>{activeQuestion.category}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-900 transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / assessmentQuestions.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Question Heading */}
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900 leading-snug">
                {activeQuestion.question}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {activeQuestion.context}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {activeQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[activeQuestion.id] === option.points;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option.points)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-white bg-sky-400 text-slate-950 font-bold'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <span className="text-xs">✓</span>}
                    </div>

                    <div className="space-y-1 flex-1">
                      <p className="text-xs sm:text-sm font-semibold">{option.label}</p>
                      <p
                        className={`text-xs ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {option.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Nav controls */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none"
              >
                ← Previous
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[activeQuestion.id] === undefined}
                className="px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:pointer-events-none shadow-xs flex items-center gap-1.5"
              >
                <span>
                  {currentQuestionIndex === assessmentQuestions.length - 1
                    ? 'Calculate Results'
                    : 'Next Question'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* RESULT SCREEN */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8 animate-in zoom-in-95 duration-150">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="space-y-1">
                <span className="text-xs font-mono text-sky-700 uppercase font-semibold">
                  Assessment Diagnostic Scorecard
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
                  Calculated Security Posture Score
                </h2>
              </div>

              <div className="flex items-baseline gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xs">
                <span className="text-4xl font-extrabold font-mono text-sky-400">
                  {totalScore}
                </span>
                <span className="text-slate-400 text-xs font-mono">/ 100</span>
              </div>
            </div>

            {/* Score Band Banner */}
            <div className={`p-5 rounded-xl border ${classification.color} space-y-2`}>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-sm sm:text-base font-display">
                  Rating: {classification.level}
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {classification.summary}
              </p>
            </div>

            {/* Actionable Recommendations */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm font-display uppercase tracking-wider">
                Prioritized Action Items for Your Facility:
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-700">
                {classification.recommendations.map((rec, rIdx) => (
                  <li key={rIdx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lead capture / Send report to email */}
            <div className="p-6 bg-slate-900 rounded-xl text-white space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold text-base font-display text-white">
                  Receive Detailed Recommendations & Consultation
                </h4>
                <p className="text-xs text-slate-300">
                  Submit your contact details to save this diagnostic scorecard and request a preliminary discussion with a SafeNet risk consultant.
                </p>
              </div>

              {leadSaved ? (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Scorecard successfully recorded. A SafeNet security specialist will contact you with specific facility guidelines.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSaveAssessmentLead} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name *"
                    className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Facility / Company Name"
                    className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Corporate Email Address *"
                    className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                  />
                  <div className="sm:col-span-2 pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Assessment</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="px-5 py-2 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      {isSubmittingLead ? 'Recording...' : 'Save & Request Consultation'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <button
                onClick={handleRestart}
                className="text-slate-600 hover:text-slate-900 font-medium"
              >
                Reset Diagnostic
              </button>

              <button
                onClick={() => navigate('quote', 'Vulnerability Assessment')}
                className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
              >
                Request On-Site Physical Security Survey →
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
