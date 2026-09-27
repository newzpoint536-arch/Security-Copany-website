import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { SEOHead } from '../components/common/SEOHead';
import { Lead, LeadStatus, SiteSettings, ServiceItem, TeamMember, ProjectItem, HeroSlide } from '../types';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Users,
  Briefcase,
  FileText,
  Settings,
  Download,
  Trash2,
  Edit3,
  Check,
  X,
  AlertCircle,
  Plus,
  RefreshCw,
  LogOut,
  Clock,
  PhoneCall,
  Mail,
  ExternalLink,
  Sliders,
  Play,
  Film
} from 'lucide-react';
import { getRecordedEvents } from '../utils/analytics';

export const AdminPage: React.FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    leads,
    updateLeadStatus,
    deleteLead,
    services,
    updateService,
    projects,
    updateProject,
    team,
    updateTeamMember,
    heroSlides,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    resetAllData
  } = useSite();

  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'settings' | 'slider' | 'services' | 'projects' | 'team' | 'audit'>('leads');

  // Filter leads
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('ALL');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState('');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(siteSettings);
  const [settingsSaveMsg, setSettingsSaveMsg] = useState(false);

  // Edit Service State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Edit Hero Slide State
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passcode);
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setPasscode('');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    setSettingsSaveMsg(true);
    setTimeout(() => setSettingsSaveMsg(false), 3000);
  };

  const handleAddNoteToLead = () => {
    if (!selectedLead || !newNote.trim()) return;
    updateLeadStatus(selectedLead.id, selectedLead.status, newNote.trim());
    setSelectedLead({
      ...selectedLead,
      notes: [...(selectedLead.notes || []), `[${new Date().toLocaleDateString()}] ${newNote.trim()}`]
    });
    setNewNote('');
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Type', 'Status', 'FullName', 'Company', 'Email', 'Phone', 'Service', 'Industry', 'Score', 'Created'];
    const rows = leads.map((l) => [
      l.id,
      l.type,
      l.status,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.companyName.replace(/"/g, '""')}"`,
      l.email,
      `"${l.phone}"`,
      `"${(l.serviceInterest || '').replace(/"/g, '""')}"`,
      `"${(l.industry || '').replace(/"/g, '""')}"`,
      l.assessmentScore || '',
      l.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `safenet_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const exportLeadsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `safenet_leads_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const auditEvents = getRecordedEvents();

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <SEOHead page="admin" title="Corporate Admin Portal Authentication | SafeNet" />
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 sm:p-10 max-w-md w-full shadow-2xl space-y-6 text-white text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold font-display text-white">
              SafeNet Administration Portal
            </h1>
            <p className="text-xs text-slate-400">
              Authorized access only for corporate officers, content curators, and lead dispatchers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Administrative Security Passkey
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter corporate passcode..."
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <span className="text-[11px] text-slate-500 block mt-1 font-mono">
                Default authorization passkey: <code className="text-slate-300">safenet-admin-2026</code>
              </span>
            </div>

            {authError && (
              <div className="p-2.5 bg-rose-950/80 border border-rose-800 text-rose-300 rounded-md text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Invalid credentials. Authentication attempt recorded.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition-colors text-xs shadow-xs"
            >
              Authenticate & Open Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredLeads = leadStatusFilter === 'ALL'
    ? leads
    : leads.filter((l) => l.status === leadStatusFilter);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      <SEOHead page="admin" title="Corporate Administration & Lead Management | SafeNet" />

      {/* Admin Top Header */}
      <header className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center text-sky-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold font-display text-white">
              SafeNet Management Console
            </h1>
            <span className="text-[11px] text-slate-400">
              Logged in as Corporate Administrator
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => {
              if (window.confirm('Reset all content, services, settings, and leads to defaults?')) {
                resetAllData();
                setSettingsForm(siteSettings);
              }
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors flex items-center gap-1.5"
            title="Reset to factory baseline data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 bg-rose-900/80 hover:bg-rose-800 text-white rounded-md transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-semibold text-slate-600">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'leads' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Leads & Inquiries ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'settings' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Site Settings & Info</span>
        </button>

        <button
          onClick={() => setActiveTab('slider')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'slider' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>Hero Media Slider ({heroSlides.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'services' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Services ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'projects' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Case Studies ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'team' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Team ({team.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'audit' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Audit Log</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900">
                  Lead Management & Inbound Pipeline
                </h2>
                <p className="text-xs text-slate-500">
                  Manage incoming quotation requests, contact inquiries, security assessments, and career submissions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportLeadsCSV}
                  className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-md hover:bg-slate-50 flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={exportLeadsJSON}
                  className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-md hover:bg-slate-50 flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* Status Filter Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED', 'SPAM'].map((st) => (
                <button
                  key={st}
                  onClick={() => setLeadStatusFilter(st)}
                  className={`px-3 py-1 rounded-md font-mono text-xs transition-colors ${
                    leadStatusFilter === st
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-mono text-[11px] uppercase">
                    <tr>
                      <th className="px-4 py-3">Lead ID / Type</th>
                      <th className="px-4 py-3">Client / Contact</th>
                      <th className="px-4 py-3">Service Scope</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3 font-mono">
                          <span className="font-bold text-slate-900 block">{lead.id}</span>
                          <span className="text-[11px] text-sky-700 font-semibold">{lead.type}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-slate-900 block">{lead.fullName}</span>
                          <span className="text-slate-500 block truncate max-w-[180px]">{lead.companyName}</span>
                          <span className="text-[11px] text-slate-400 block font-mono">{lead.email}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium text-slate-800 block truncate max-w-[200px]">
                            {lead.serviceInterest || lead.jobTitle || 'General Inquiry'}
                          </span>
                          {lead.assessmentScore !== undefined && (
                            <span className="text-[11px] text-amber-700 font-mono block">
                              Assessment Score: {lead.assessmentScore}/100
                            </span>
                          )}
                          {lead.location && (
                            <span className="text-[11px] text-slate-500 block">{lead.location}</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className="text-xs font-mono font-semibold px-2 py-1 rounded bg-slate-100 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="QUALIFIED">QUALIFIED</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="CONVERTED">CONVERTED</option>
                            <option value="CLOSED">CLOSED</option>
                            <option value="SPAM">SPAM</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">
                          {lead.createdAt.slice(0, 10)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium text-xs transition-colors"
                            >
                              Inspect
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete lead ${lead.id}?`)) {
                                  deleteLead(lead.id);
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lead Inspection Modal */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-6 border border-slate-200">
                  <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-mono text-sky-700 font-bold">
                        {selectedLead.type} RECORD #{selectedLead.id}
                      </span>
                      <h3 className="text-lg font-bold font-display text-slate-900">
                        {selectedLead.fullName}
                      </h3>
                      <p className="text-xs text-slate-500">{selectedLead.companyName}</p>
                    </div>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="text-slate-400 hover:text-slate-700 p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block">Email Address:</span>
                      <a href={`mailto:${selectedLead.email}`} className="font-mono text-slate-900 hover:underline">
                        {selectedLead.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone Number:</span>
                      <a href={`tel:${selectedLead.phone}`} className="font-mono text-slate-900 hover:underline">
                        {selectedLead.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Service Interest / Job:</span>
                      <span className="font-semibold text-slate-900">
                        {selectedLead.serviceInterest || selectedLead.jobTitle || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Industry Sector:</span>
                      <span className="text-slate-900">{selectedLead.industry || 'N/A'}</span>
                    </div>
                    {selectedLead.assessmentScore !== undefined && (
                      <div className="col-span-2 p-2.5 bg-sky-50 rounded-lg border border-sky-100">
                        <span className="text-slate-600 block">Diagnostic Assessment Score:</span>
                        <span className="font-bold text-sky-950 font-mono">
                          {selectedLead.assessmentScore} / 100 ({selectedLead.assessmentLevel})
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedLead.message && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                      <span className="font-semibold text-slate-700 block mb-1">Inquiry Message / Notes:</span>
                      <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{selectedLead.message}</p>
                    </div>
                  )}

                  {/* Notes / Activity Log */}
                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-slate-900 block font-display">Operational Activity Notes:</span>
                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {(selectedLead.notes && selectedLead.notes.length > 0) ? (
                        selectedLead.notes.map((n, i) => (
                          <div key={i} className="p-2 bg-slate-50 rounded border border-slate-200 text-slate-700">
                            {n}
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-400 italic">No notes logged yet.</p>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add operational update or call notes..."
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                      <button
                        onClick={handleAddNoteToLead}
                        className="px-3 py-1.5 bg-slate-900 text-white rounded font-medium text-xs hover:bg-slate-800"
                      >
                        Add Note
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-end">
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SITE SETTINGS & PLACEHOLDER CONFIGURATION */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900">
                Corporate Profile & Contact Configuration
              </h2>
              <p className="text-xs text-slate-500">
                Update verified corporate contact numbers, official addresses, WhatsApp numbers, and SEO metadata in real-time without modifying code.
              </p>
            </div>

            {settingsSaveMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Settings successfully saved and synchronized across all views.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={settingsForm.companyName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Corporate Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Official Telephone</label>
                  <input
                    type="text"
                    value={settingsForm.officialPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, officialPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Emergency Dispatch Phone</label>
                  <input
                    type="text"
                    value={settingsForm.emergencyPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, emergencyPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Official Inquiries Email</label>
                  <input
                    type="email"
                    value={settingsForm.officialEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, officialEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Office Physical Address</label>
                  <textarea
                    rows={2}
                    value={settingsForm.officeAddress}
                    onChange={(e) => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Business & Dispatch Hours</label>
                  <textarea
                    rows={2}
                    value={settingsForm.businessHours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* WhatsApp Config */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-display">
                  WhatsApp Business Desk Configuration
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      WhatsApp International Number (e.g. 2348007233638 without +)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Default Initial Message
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappDefaultMessage}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappDefaultMessage: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* SEO Meta Config */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-display">
                  Search Engine Optimization (SEO) Metadata
                </h3>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Global Meta Title</label>
                  <input
                    type="text"
                    value={settingsForm.seo.metaTitle}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        seo: { ...settingsForm.seo, metaTitle: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Global Meta Description</label>
                  <textarea
                    rows={2}
                    value={settingsForm.seo.metaDescription}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        seo: { ...settingsForm.seo, metaDescription: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Save Global Configuration
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB: HERO MEDIA SLIDER CMS */}
        {activeTab === 'slider' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900">
                  Cinematic Hero Media Slider Management
                </h2>
                <p className="text-xs text-slate-500">
                  Configure mixed high-resolution imagery and video sequences, security scan overlays, Ken Burns animations, and slide CTA targets.
                </p>
              </div>

              <button
                onClick={() => {
                  const newSlide: HeroSlide = {
                    id: `slide-${Date.now().toString().slice(-4)}`,
                    mediaType: 'IMAGE',
                    mediaUrl: '/src/assets/images/hero_safenet_corporate_1790488890149.jpg',
                    posterUrl: '/src/assets/images/hero_safenet_corporate_1790488890149.jpg',
                    eyebrow: 'Corporate Security',
                    headline: 'Enterprise Security & Facility Protection',
                    description: 'SafeNet delivers integrated guarding, access control, and rapid response operations.',
                    primaryCtaText: 'Request a Quote',
                    primaryCtaPage: 'quote',
                    secondaryCtaText: 'Explore Services',
                    secondaryCtaPage: 'services',
                    durationMs: 6500,
                    scanEffect: 'horizontal-grid',
                    kenBurnsMovement: 'zoom-in',
                    isActive: true,
                    order: heroSlides.length + 1
                  };
                  addHeroSlide(newSlide);
                  setEditingSlide(newSlide);
                }}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Hero Slide</span>
              </button>
            </div>

            {/* Slides List */}
            <div className="space-y-4">
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Media Thumbnail */}
                    <div className="w-24 h-16 rounded-lg bg-slate-950 overflow-hidden relative shrink-0 border border-slate-200">
                      <img
                        src={slide.posterUrl || slide.mediaUrl}
                        alt={slide.headline}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-slate-900/80 text-[9px] font-mono text-white">
                        {slide.mediaType}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-slate-500 font-bold">Slide 0{idx + 1}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-sky-700 font-semibold">{slide.eyebrow}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500">{slide.durationMs / 1000}s</span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{slide.headline}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">{slide.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                    <button
                      onClick={() => updateHeroSlide({ ...slide, isActive: !slide.isActive })}
                      className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        slide.isActive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {slide.isActive ? 'Active' : 'Inactive'}
                    </button>

                    <button
                      onClick={() => setEditingSlide(slide)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-medium transition-colors"
                    >
                      Configure
                    </button>

                    <button
                      onClick={() => {
                        if (heroSlides.length <= 1) {
                          alert('At least one hero slide must remain in the carousel.');
                          return;
                        }
                        if (window.confirm(`Delete slide "${slide.headline}"?`)) {
                          deleteHeroSlide(slide.id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Edit Modal */}
            {editingSlide && (
              <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto border border-slate-200 my-auto text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4 text-sky-600" />
                      <h3 className="font-bold text-slate-900 text-sm font-display">
                        Configure Hero Slide: {editingSlide.headline}
                      </h3>
                    </div>
                    <button onClick={() => setEditingSlide(null)}>
                      <X className="w-5 h-5 text-slate-400 hover:text-slate-700" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold block mb-1">Media Type</label>
                        <select
                          value={editingSlide.mediaType}
                          onChange={(e) =>
                            setEditingSlide({
                              ...editingSlide,
                              mediaType: e.target.value as 'IMAGE' | 'VIDEO'
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                        >
                          <option value="IMAGE">High-Resolution Image</option>
                          <option value="VIDEO">Cinematic Video Sequence (HTML5)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold block mb-1">Slide Duration (ms)</label>
                        <input
                          type="number"
                          step={500}
                          min={3000}
                          max={15000}
                          value={editingSlide.durationMs}
                          onChange={(e) =>
                            setEditingSlide({
                              ...editingSlide,
                              durationMs: Number(e.target.value) || 6000
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Media File / Stream URL</label>
                      <input
                        type="text"
                        value={editingSlide.mediaUrl}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, mediaUrl: e.target.value })
                        }
                        placeholder="/src/assets/images/... or https://...mp4"
                        className="w-full px-3 py-2 border rounded-lg font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Poster Image / Fallback URL</label>
                      <input
                        type="text"
                        value={editingSlide.posterUrl}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, posterUrl: e.target.value })
                        }
                        placeholder="Image displayed while video loads or as fallback"
                        className="w-full px-3 py-2 border rounded-lg font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold block mb-1">Security Scan Effect Overlay</label>
                        <select
                          value={editingSlide.scanEffect}
                          onChange={(e) =>
                            setEditingSlide({
                              ...editingSlide,
                              scanEffect: e.target.value as HeroSlide['scanEffect']
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg"
                        >
                          <option value="horizontal-grid">Horizontal Coordinate Grid</option>
                          <option value="radar">Perimeter Radar Sweep</option>
                          <option value="target-hud">Field Patrol Target HUD</option>
                          <option value="none">None (Clean Media)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold block mb-1">Ken Burns Camera Movement</label>
                        <select
                          value={editingSlide.kenBurnsMovement}
                          onChange={(e) =>
                            setEditingSlide({
                              ...editingSlide,
                              kenBurnsMovement: e.target.value as HeroSlide['kenBurnsMovement']
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg"
                        >
                          <option value="zoom-in">Slow Cinematic Zoom In</option>
                          <option value="zoom-out">Slow Cinematic Zoom Out</option>
                          <option value="pan-left">Slow Pan Left</option>
                          <option value="pan-right">Slow Pan Right</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Eyebrow Kicker Text</label>
                      <input
                        type="text"
                        value={editingSlide.eyebrow}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, eyebrow: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Main Headline</label>
                      <input
                        type="text"
                        value={editingSlide.headline}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, headline: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Supporting Description</label>
                      <textarea
                        rows={3}
                        value={editingSlide.description}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, description: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold block mb-1">Primary CTA Label</label>
                        <input
                          type="text"
                          value={editingSlide.primaryCtaText}
                          onChange={(e) =>
                            setEditingSlide({ ...editingSlide, primaryCtaText: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Secondary CTA Label</label>
                        <input
                          type="text"
                          value={editingSlide.secondaryCtaText}
                          onChange={(e) =>
                            setEditingSlide({ ...editingSlide, secondaryCtaText: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingSlide.isActive}
                        onChange={(e) =>
                          setEditingSlide({ ...editingSlide, isActive: e.target.checked })
                        }
                        className="rounded text-slate-900"
                      />
                      <span className="font-medium">Slide Active in Carousel</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingSlide(null)}
                        className="px-4 py-2 text-slate-600 hover:text-slate-900"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          updateHeroSlide(editingSlide);
                          setEditingSlide(null);
                        }}
                        className="px-5 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 shadow-xs"
                      >
                        Save Slide Configuration
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SERVICES CMS */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-slate-900">
              Security Services Management
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((svc) => (
                <div key={svc.id} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-sky-700 font-bold">{svc.id}</span>
                    <button
                      onClick={() => updateService({ ...svc, isPublished: !svc.isPublished })}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        svc.isPublished ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {svc.isPublished ? 'Published' : 'Draft / Hidden'}
                    </button>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900">{svc.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{svc.summary}</p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setEditingService(svc)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-medium"
                    >
                      Edit Content
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Edit Modal */}
            {editingService && (
              <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b">
                    <h3 className="font-bold text-slate-900 text-sm">Edit Service: {editingService.title}</h3>
                    <button onClick={() => setEditingService(null)}><X className="w-5 h-5 text-slate-400" /></button>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold block mb-1">Title</label>
                      <input
                        type="text"
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Short Summary</label>
                      <textarea
                        rows={2}
                        value={editingService.summary}
                        onChange={(e) => setEditingService({ ...editingService, summary: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Detailed Description</label>
                      <textarea
                        rows={4}
                        value={editingService.description}
                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>
                  <div className="pt-3 border-t flex justify-end gap-2">
                    <button onClick={() => setEditingService(null)} className="px-3 py-1.5 text-xs text-slate-600">
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        updateService(editingService);
                        setEditingService(null);
                      }}
                      className="px-4 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CASE STUDIES CMS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-slate-900">
              Projects & Case Studies Management
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-mono text-slate-500 font-semibold">{proj.industry} · {proj.location}</span>
                    <h3 className="font-bold text-sm text-slate-900">{proj.title}</h3>
                    <p className="text-slate-600">Client Placeholder: <code className="text-slate-800 bg-slate-100 px-1 py-0.5 rounded">{proj.clientPlaceholder}</code></p>
                    <p className="text-slate-500 line-clamp-1">{proj.overview}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => updateProject({ ...proj, isPublished: !proj.isPublished })}
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        proj.isPublished ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {proj.isPublished ? 'Active' : 'Hidden'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TEAM CMS */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-slate-900">
              Executive & Operational Directory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.map((member) => (
                <div key={member.id} className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <span className="font-mono text-sky-700 font-bold block">{member.department} Directorate</span>
                  <h3 className="font-bold text-sm text-slate-900">{member.name}</h3>
                  <p className="text-slate-600 font-medium">{member.position}</p>
                  <p className="text-slate-500 line-clamp-2">{member.bio}</p>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => updateTeamMember({ ...member, isPublished: !member.isPublished })}
                      className={`px-2.5 py-1 rounded font-medium ${
                        member.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {member.isPublished ? 'Published' : 'Hidden'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT LOG */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs text-xs">
            <h2 className="text-xl font-bold font-display text-slate-900">
              System Audit & Visitor Interaction Telemetry
            </h2>
            <p className="text-slate-500">
              Aggregated, privacy-conscious event logs of user conversion interactions, page requests, and assessment runs.
            </p>

            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto font-mono text-[11px]">
              {auditEvents.length === 0 ? (
                <p className="py-4 text-slate-400 italic">No events recorded yet in current browser session.</p>
              ) : (
                auditEvents.map((evt, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-bold text-slate-900">[{evt.category}]</span>{' '}
                      <span className="text-slate-700">{evt.eventName}</span>
                    </div>
                    <span className="text-slate-400 shrink-0">{evt.timestamp.replace('T', ' ').slice(0, 19)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
