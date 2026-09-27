export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'IN_PROGRESS' | 'CONVERTED' | 'CLOSED' | 'SPAM';

export type LeadType = 'CONTACT' | 'QUOTE' | 'ASSESSMENT' | 'CAREER' | 'CONSULTATION';

export interface Lead {
  id: string;
  type: LeadType;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceInterest?: string;
  industry?: string;
  message?: string;
  projectType?: string;
  location?: string;
  estimatedTimeline?: string;
  assessmentScore?: number;
  assessmentLevel?: string;
  jobTitle?: string;
  resumeFileName?: string;
  source: string;
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  status: LeadStatus;
  notes?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  iconName: string;
  benefits: string[];
  typicalApplications: string[];
  industriesServed: string[];
  methodologySteps: { step: string; detail: string }[];
  faqs: { question: string; answer: string }[];
  isPublished: boolean;
  order: number;
}

export interface IndustryItem {
  id: string;
  name: string;
  slug: string;
  summary: string;
  keyChallenges: string[];
  safeNetSolutions: string[];
  applicableServices: string[];
  isPublished: boolean;
  order: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  clientPlaceholder: string;
  industry: string;
  location: string;
  date: string;
  servicesProvided: string[];
  overview: string;
  challenge: string;
  solution: string;
  implementation: string;
  outcome: string;
  imagePath?: string;
  isAuthorizedForPublicView: boolean;
  isPublished: boolean;
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: 'Executive' | 'Operations' | 'Advisory' | 'Compliance';
  bio: string;
  credentials: string[];
  linkedinUrl?: string;
  isPublished: boolean;
  order: number;
}

export interface ComplianceCredential {
  id: string;
  name: string;
  issuingBody: string;
  referenceNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'IN_RENEWAL' | 'PENDING_AUDIT';
  verificationContact: string;
  description: string;
  category: 'STATUTORY_LICENCE' | 'OPERATIONAL_STANDARD' | 'SAFETY_ACCREDITATION';
  isPublished: boolean;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  organization: string;
  quote: string;
  serviceCategory: string;
  isAuthorized: boolean;
  date: string;
  isPublished: boolean;
}

export interface FAQItem {
  id: string;
  category: 'Operations' | 'Compliance & Licences' | 'Contracting & SLA' | 'Technology & Monitoring' | 'Emergency Response';
  question: string;
  answer: string;
  isFeatured: boolean;
  order: number;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Shift-based';
  description: string;
  responsibilities: string[];
  requirements: string[];
  deadline: string;
  isOpen: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Risk Management' | 'Physical Security' | 'Facility Protection' | 'Corporate Advisory';
  author: string;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  isPublished: boolean;
}

export interface AssessmentQuestion {
  id: number;
  category: string;
  question: string;
  context: string;
  options: {
    label: string;
    points: number;
    description: string;
  }[];
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  officialEmail: string;
  officialPhone: string;
  emergencyPhone: string;
  officeAddress: string;
  businessHours: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

export interface HeroSlide {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO';
  mediaUrl: string;
  posterUrl: string;
  videoSources?: { src: string; type: string }[];
  eyebrow: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaPage: string;
  primaryCtaParam?: string;
  secondaryCtaText: string;
  secondaryCtaPage: string;
  secondaryCtaParam?: string;
  durationMs: number;
  scanEffect: 'radar' | 'horizontal-grid' | 'target-hud' | 'none';
  kenBurnsMovement: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right';
  isActive: boolean;
  order: number;
}

