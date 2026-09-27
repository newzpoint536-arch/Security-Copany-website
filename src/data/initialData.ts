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
  AssessmentQuestion,
  Lead,
  HeroSlide
} from '../types';

export const initialSiteSettings: SiteSettings = {
  companyName: 'SafeNet Security Limited',
  tagline: 'Enterprise Corporate Security, Risk Advisory & Facility Protection',
  officialEmail: 'info@safenet-security.example.com',
  officialPhone: '+234 1 800 SAFENET',
  emergencyPhone: '+234 1 800 911 000',
  officeAddress: 'SafeNet Corporate Towers, Plot 14 Commercial Boulevard, Victoria Island, Lagos, Nigeria',
  businessHours: 'Monday – Friday: 08:00 – 17:00 WAT | 24/7 Monitoring Operations',
  whatsappNumber: '2348007233638',
  whatsappDefaultMessage: 'Hello SafeNet, I am contacting you regarding your corporate security and risk management services.',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.728637841875!2d3.4245!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5329c323067%3A0x6730db61b8f04176!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng',
  googleMapsDirectionsUrl: 'https://maps.google.com/?q=Victoria+Island,+Lagos,+Nigeria',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/safenet-corporate-security',
    twitter: 'https://x.com/SafeNetSecurity',
    facebook: 'https://facebook.com/SafeNetSecurityCorporate'
  },
  seo: {
    metaTitle: 'SafeNet | Corporate Security, Risk Management & Physical Protection',
    metaDescription: 'SafeNet provides enterprise corporate security solutions, physical asset protection, risk management, and compliance advisory for organizations.',
    keywords: 'corporate security, physical security, risk management, facility protection, executive escort, access control, compliance'
  }
};

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Physical Guarding & Facility Protection',
    slug: 'physical-guarding-facility-protection',
    summary: 'Stationary and mobile guarding deployments conducted by vetted, professionally trained security personnel under rigorous standard operating procedures.',
    description: 'SafeNet physical protection services are structured around tailored post orders, continuous supervision, and site-specific threat modeling. Every deployment integrates rigorous access control, visitor verification, perimeter monitoring, and real-time incident documentation.',
    iconName: 'ShieldCheck',
    benefits: [
      'Strict background vetting and biometrically verified personnel',
      'Site-specific Standard Operating Procedures (SOPs)',
      'Digital shift management and hourly supervisory patrol validation',
      'Direct protocol integration with 24/7 central dispatch'
    ],
    typicalApplications: [
      'Corporate headquarters & administrative towers',
      'Industrial fabrication plants & logistics distribution yards',
      'Data centres & mission-critical technical infrastructure',
      'Gated residential compounds & executive residences'
    ],
    industriesServed: ['Commercial Real Estate', 'Financial Institutions', 'Energy & Industrial', 'Healthcare'],
    methodologySteps: [
      { step: 'Threat Assessment', detail: 'On-site survey of access bottlenecks, perimeter vulnerabilities, and traffic flow.' },
      { step: 'Post Order Formulation', detail: 'Drafting tailored protocols for personnel conduct, visitor verification, and access rights.' },
      { step: 'Vetted Deployment', detail: 'Assignment of certified personnel trained specifically in facility-specific requirements.' },
      { step: 'Supervisory Audits', detail: 'Unannounced shift inspections and electronic checkpoint verification.' }
    ],
    faqs: [
      { question: 'What is the screening process for guard personnel?', answer: 'Personnel undergo three-tiered background verification including criminal history checks, residential verification, and medical fitness examinations prior to deployment.' },
      { question: 'How is guard alertness monitored on night shifts?', answer: 'We utilize digital RFID / GPS patrol wands requiring checkpoint confirmations at predetermined intervals, monitored live by our Operations Control Room.' }
    ],
    isPublished: true,
    order: 1
  },
  {
    id: 'srv-2',
    title: 'Electronic Surveillance & Access Architecture',
    slug: 'electronic-surveillance-access-architecture',
    summary: 'Design, installation, and integration of high-definition CCTV, biometric turnstiles, automated perimeter intrusion detection, and centralized management software.',
    description: 'SafeNet builds cohesive electronic ecosystems that prevent unauthorized entry and maintain clear forensic logs. From IP surveillance matrices to optical turnstiles and intruder barrier beams, our engineering ensures zero-compromise facility visibility.',
    iconName: 'Camera',
    benefits: [
      'Enterprise-grade IP surveillance with smart motion analytics',
      'Multi-factor access control (biometrics, RFID, mobile credentialing)',
      'Perimeter beam break and seismic fence alarm integration',
      'High-availability storage architecture with redundancy'
    ],
    typicalApplications: [
      'High-traffic corporate lobbies and executive elevators',
      'Perimeter perimeters of warehousing and fuel storage depots',
      'Secure server rooms requiring dual-authentication access',
      'Parking management and automated number plate recognition (ANPR)'
    ],
    industriesServed: ['Financial Institutions', 'Commercial Real Estate', 'Energy & Industrial', 'Retail & Logistics'],
    methodologySteps: [
      { step: 'Optical & Angle Survey', detail: 'Calculating focal lengths, camera sightlines, and illumination deadzones.' },
      { step: 'System Architecture', detail: 'Designing isolated VLAN infrastructure and server recording topologies.' },
      { step: 'Professional Installation', detail: 'Conduit laying, hardware mounting, cable testing, and central rack dressing.' },
      { step: 'Calibration & Handover', detail: 'User credential provisioning, motion tripwire tuning, and client staff training.' }
    ],
    faqs: [
      { question: 'Can existing analog cameras be integrated?', answer: 'Yes, our team can deploy hybrid encoders to incorporate legacy feeds while phasing in high-definition IP components.' },
      { question: 'What maintenance SLAs are provided?', answer: 'We provide scheduled preventative maintenance quarterly, alongside 4-hour on-site critical failure response times.' }
    ],
    isPublished: true,
    order: 2
  },
  {
    id: 'srv-3',
    title: 'Executive Protection & Secure Transit Escort',
    slug: 'executive-protection-secure-transit',
    summary: 'Low-profile close protection, threat reconnaissance, and secure vehicular transit for corporate executives, visiting delegations, and high-net-worth personnel.',
    description: 'Our close protection officers combine defensive driving, advance route reconnaissance, emergency medical first response, and discreet situational vigilance to guarantee the safety of principals in dynamic transit environments.',
    iconName: 'UserCheck',
    benefits: [
      'Advance route reconnaissance and safe haven identification',
      'Discreet, low-profile tactical security officers',
      'Armoured and escort vehicle fleet availability',
      'Real-time GPS vehicle tracking and command liaison'
    ],
    typicalApplications: [
      'Airport arrivals and secure transit transfers',
      'Inter-state transit across complex transit corridors',
      'Shareholder meetings and high-profile investor conferences',
      'Expatriate team relocation and daily transit escort'
    ],
    industriesServed: ['Diplomatic & International', 'Financial Institutions', 'Energy & Industrial', 'Commercial Real Estate'],
    methodologySteps: [
      { step: 'Principal Risk Profiling', detail: 'Evaluating threat exposure, itinerary details, and public profile.' },
      { step: 'Advance Route Scouting', detail: 'Physical inspection of primary and secondary transit pathways and medical facilities.' },
      { step: 'Operational Execution', detail: 'Close escort execution with defensive driving and constant command communication.' },
      { step: 'Post-Mission Debrief', detail: 'Review of route timings, unusual sightings, and security log documentation.' }
    ],
    faqs: [
      { question: 'Are close protection officers armed or unarmed?', answer: 'Escort configurations are deployed in strict compliance with statutory regulations and client risk protocols, utilizing licensed tactical partner escorts when authorized.' },
      { question: 'How much notice is required for executive escort?', answer: 'While 48 hours is standard for comprehensive route reconnaissance, our quick-response teams can activate within 4 hours for emergency contingencies.' }
    ],
    isPublished: true,
    order: 3
  },
  {
    id: 'srv-4',
    title: 'Corporate Risk Advisory & Vulnerability Assessment',
    slug: 'corporate-risk-advisory-vulnerability',
    summary: 'Comprehensive physical security audits, crisis management planning, supply chain vulnerability evaluations, and business continuity architecture.',
    description: 'SafeNet risk consultants evaluate your organizational posture against credible threat vectors. We deliver uncompromised, actionable audit reports that identify physical vulnerabilities, procedural lapses, and statutory compliance gaps.',
    iconName: 'FileText',
    benefits: [
      'Detailed risk rating matrix with prioritize-first remediations',
      'Assessment of physical perimeter, access logic, and surveillance gaps',
      'Emergency response and crisis evacuation documentation',
      'Executive board-ready compliance and security briefs'
    ],
    typicalApplications: [
      'Pre-acquisition facility audits for commercial mergers',
      'Annual corporate insurance risk verification reviews',
      'Post-incident forensic evaluations and root-cause analysis',
      'Crisis response table-top exercises for senior management'
    ],
    industriesServed: ['Energy & Industrial', 'Financial Institutions', 'Healthcare', 'Retail & Logistics'],
    methodologySteps: [
      { step: 'Documentation Review', detail: 'Analyzing existing post orders, incident logs, and insurance requirements.' },
      { step: 'On-Site Penetration Audit', detail: 'Physical testing of perimeter weaknesses, badge verification, and visitor policies.' },
      { step: 'Risk Scoring Matrix', detail: 'Quantifying likelihood vs severity across identified operational risks.' },
      { step: 'Remediation Roadmap', detail: 'Phased, cost-effective recommendations with budgetary estimations.' }
    ],
    faqs: [
      { question: 'What standard methodologies do your audits follow?', answer: 'Our assessments align with ASIS International physical security standards and ISO 31000 risk management frameworks.' },
      { question: 'How long does a comprehensive audit take?', answer: 'A single commercial facility assessment typically takes 3 to 5 business days for on-site review followed by 7 days for full report delivery.' }
    ],
    isPublished: true,
    order: 4
  },
  {
    id: 'srv-5',
    title: 'Critical Asset & Industrial Site Protection',
    slug: 'critical-asset-industrial-protection',
    summary: 'Hardened protection programs for manufacturing plants, refineries, pipeline valves, telecom cell sites, and bulk storage distribution facilities.',
    description: 'Industrial assets face unique risks ranging from organized pilferage and vandalism to unauthorized community intrusion. SafeNet designs layered defense zones combining outer perimeter barriers, tactical patrols, and biometric muster points.',
    iconName: 'Building2',
    benefits: [
      'Layered zonal security (outer perimeter, buffer zone, high-security inner sanctum)',
      'Industrial asset inventory verification and loading dock oversight',
      'Community liaison protocols to mitigate host-community friction',
      'Health, Safety & Environment (HSE) compliant guard operations'
    ],
    typicalApplications: [
      'Manufacturing facilities with sensitive raw material stockpiles',
      'Petroleum distribution terminals and tank farms',
      'Power generation stations and high-voltage transmission substations',
      'Remote telecommunications switching hubs'
    ],
    industriesServed: ['Energy & Industrial', 'Retail & Logistics', 'Commercial Real Estate'],
    methodologySteps: [
      { step: 'Zonal Zoning', detail: 'Demarcating public, operational, and restricted hazardous security zones.' },
      { step: 'Logistics Manifest Checks', detail: 'Implementing double-entry verification on all incoming/outgoing transport.' },
      { step: 'Perimeter Hardening', detail: 'Physical barrier inspection and thermal intrusion sensor integration.' },
      { step: 'Emergency Drills', detail: 'Periodic fire, chemical spill, and perimeter breach drills with local first responders.' }
    ],
    faqs: [
      { question: 'Do guards have basic industrial safety and HSE training?', answer: 'Yes, all industrial security personnel hold certified basic fire safety, hazard identification, and first aid credentials before deployment.' }
    ],
    isPublished: true,
    order: 5
  },
  {
    id: 'srv-6',
    title: '24/7 Operations Monitoring & Incident Dispatch',
    slug: 'operations-monitoring-incident-dispatch',
    summary: 'Around-the-clock remote video verification, alarm receiving, panic button monitoring, and rapid mobile intervention coordination.',
    description: 'SafeNet operates a dedicated central command room monitoring client telemetry in real time. In the event of a triggered alarm or distress transmission, dispatchers execute verified response SOPs and mobilize rapid response units.',
    iconName: 'Radio',
    benefits: [
      'Zero-delay alarm signal verification within 30 seconds',
      'Remote video patrol verification during closing hours',
      'Direct coordination with statutory emergency services',
      'Detailed electronic incident logging for forensic records'
    ],
    typicalApplications: [
      'After-hours unattended retail and banking branches',
      'Remote telecommunications and utility enclosures',
      'Executive residential panic alarms and medical alert systems',
      'Fleet GPS route deviations and distress trigger management'
    ],
    industriesServed: ['Financial Institutions', 'Commercial Real Estate', 'Healthcare', 'Energy & Industrial'],
    methodologySteps: [
      { step: 'Telemetry Link', detail: 'Connecting client alarm panels and NVR feeds to SafeNet central receiver.' },
      { step: 'SOP Mapping', detail: 'Defining escalation trees, designated emergency contacts, and authority contacts.' },
      { step: 'Live Supervision', detail: 'Continuous digital handshake monitoring and automated fault notification.' },
      { step: 'Rapid Intervention', detail: 'Immediate deployment of nearest patrol unit and telephone advisory to client.' }
    ],
    faqs: [
      { question: 'What is the average response time for mobile intervention?', answer: 'Within defined metropolitan zones, our mobile response vehicles maintain an operational target response window of 8 to 15 minutes.' }
    ],
    isPublished: true,
    order: 6
  }
];

export const initialIndustries: IndustryItem[] = [
  {
    id: 'ind-1',
    name: 'Financial Institutions & Commercial Banking',
    slug: 'financial-institutions-banking',
    summary: 'Security architectures for cash processing hubs, bank retail branches, ATM vestibules, and corporate financial centres.',
    keyChallenges: [
      'High-threat cash in transit and cash-handling vulnerability',
      'Strict regulatory compliance and continuous audit requirements',
      'Balancing welcoming customer access with impenetrable vault security',
      'Fraudulent identity presentation and unauthorized back-office access'
    ],
    safeNetSolutions: [
      'Biometrically controlled interlock man-traps for cash rooms',
      'Armed escort protocols for bullion transit operations',
      'Vetted guard personnel with specialized banking security certifications',
      '24/7 monitored vault vibration sensors and silent duress triggers'
    ],
    applicableServices: ['Physical Guarding', 'Electronic Surveillance', 'Risk Advisory'],
    isPublished: true,
    order: 1
  },
  {
    id: 'ind-2',
    name: 'Energy, Oil & Industrial Infrastructure',
    slug: 'energy-oil-industrial',
    summary: 'Rigorous protection programs for refineries, chemical plants, offshore support bases, and manufacturing campuses.',
    keyChallenges: [
      'Vast perimeter boundaries difficult to monitor manually',
      'High-risk hazardous environments requiring strict safety protocols',
      'Threat of industrial sabotage, organized equipment pilferage, and community agitation',
      'Heavy vehicular traffic requiring strict cargo manifest inspections'
    ],
    safeNetSolutions: [
      'Layered multi-tiered perimeter intrusion detection systems (PIDS)',
      'HSE-certified security operatives trained in hazardous zone operations',
      'Automated weighbridge and container seal verification workflows',
      'Community liaison conflict resolution frameworks'
    ],
    applicableServices: ['Critical Asset Protection', 'Physical Guarding', 'Risk Advisory'],
    isPublished: true,
    order: 2
  },
  {
    id: 'ind-3',
    name: 'Commercial Real Estate & Grade-A Offices',
    slug: 'commercial-real-estate-offices',
    summary: 'Seamless access control and front-of-house security for multi-tenant towers, executive headquarters, and business parks.',
    keyChallenges: [
      'High-volume pedestrian visitor traffic during morning peak hours',
      'Maintaining an executive corporate aesthetic without visible intimidation',
      'Multi-tenant credential segregation and after-hours tenant protection',
      'Loading bay management and contractor credential validation'
    ],
    safeNetSolutions: [
      'Polite, professionally attired concierge security ambassadors',
      'High-speed optical turnstiles with QR code visitor credentialing',
      'Integrated basement parking barrier and ANPR surveillance systems',
      'Emergency building evacuation and fire-warden coordination'
    ],
    applicableServices: ['Physical Guarding', 'Electronic Surveillance', 'Incident Dispatch'],
    isPublished: true,
    order: 3
  },
  {
    id: 'ind-4',
    name: 'Retail, Warehousing & Supply Chain Logistics',
    slug: 'retail-warehousing-logistics',
    summary: 'Shrinkage reduction, inventory safeguarding, and distribution yard perimeter security.',
    keyChallenges: [
      'Internal theft and organized stock shrinkage in distribution centres',
      'Driver and third-party contractor identity verification',
      'Cargo seal tampering and unrecorded dispatch discrepancies',
      'Large unpartitioned floor spaces with blind spots'
    ],
    safeNetSolutions: [
      'Randomized staff search protocols and metal detection screening',
      'Dock door video analytics and cargo loading supervisory checkpoints',
      'Thermal perimeter surveillance for after-hours yard surveillance',
      'Loss prevention audits and inventory reconciliations'
    ],
    applicableServices: ['Critical Asset Protection', 'Electronic Surveillance', 'Risk Advisory'],
    isPublished: true,
    order: 4
  },
  {
    id: 'ind-5',
    name: 'Healthcare, Hospitals & Pharmaceuticals',
    slug: 'healthcare-hospitals-pharma',
    summary: 'Safe, controlled healthcare environments protecting emergency rooms, pharmacy storage, and pediatric wards.',
    keyChallenges: [
      'Managing aggressive individuals and volatile emergency room crowds',
      'Protecting high-value pharmaceutical inventories from diversion',
      'Strict patient privacy (HIPAA / NDPR) in video monitoring zones',
      'Unrestricted public access points requiring vigilant supervision'
    ],
    safeNetSolutions: [
      'De-escalation trained officers stationed at emergency entry points',
      'Dual-credential biometric locking on pharmaceutical storage units',
      'Targeted non-intrusive surveillance respecting clinical privacy boundaries',
      'Rapid infant abduction prevention protocols'
    ],
    applicableServices: ['Physical Guarding', 'Electronic Surveillance', 'Incident Dispatch'],
    isPublished: true,
    order: 5
  },
  {
    id: 'ind-6',
    name: 'Diplomatic Missions & International Delegations',
    slug: 'diplomatic-international-delegations',
    summary: 'High-protocol security planning and protective details for diplomatic facilities, trade missions, and international non-profits.',
    keyChallenges: [
      'Elevated international threat profiles and geopolitical sensitivity',
      'Strict international security compliance and sovereign boundary standards',
      'Emergency extraction and contingency planning in complex environments',
      'Multi-lingual coordination and cross-cultural protocol adherence'
    ],
    safeNetSolutions: [
      'Thoroughly vetted diplomatic security liaison teams',
      'Armoured convoy planning and diplomatic escort operations',
      'Vulnerability assessments aligned with international mission benchmarks',
      'Direct secure communication lines to national security emergency channels'
    ],
    applicableServices: ['Executive Protection', 'Risk Advisory', 'Operations Monitoring'],
    isPublished: true,
    order: 6
  }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Integrated Access Architecture & Guard Deployment for Commercial Tower',
    clientPlaceholder: '[ENTERPRISE COMMERCIAL REAL ESTATE CLIENT]',
    industry: 'Commercial Real Estate',
    location: 'Victoria Island Commercial District',
    date: '2025 – Present',
    servicesProvided: ['Physical Guarding', 'Electronic Surveillance', 'Access Architecture'],
    overview: 'Deployment of a multi-tiered security program for a 16-storey prime corporate headquarters accommodating over 1,200 daily occupants and international tenants.',
    challenge: 'The facility previously experienced lobby congestion, unrecorded visitor entry, and inconsistent perimeter monitoring during night rotations.',
    solution: 'Engineered an optical speed-gate turnstile system with QR visitor badge pre-registration, accompanied by a 24-officer dedicated guard rotation with automated digital wand patrols.',
    implementation: 'Phased installation executed across 6 weeks with zero downtime for existing corporate tenants. Staff underwent 40 hours of on-site customer service and emergency response simulation.',
    outcome: 'Zero recorded unauthorized entries over 12 consecutive months; average visitor lobby check-in time reduced by 64%; complete digital audit trail established.',
    imagePath: '/src/assets/images/safenet_facility_access_1790488912938.jpg',
    isAuthorizedForPublicView: true,
    isPublished: true,
    order: 1
  },
  {
    id: 'proj-2',
    title: 'Perimeter Hardening & Industrial Yard Monitoring for Logistics Hub',
    clientPlaceholder: '[NATIONAL FMCG LOGISTICS & DISTRIBUTION CLIENT]',
    industry: 'Retail & Warehousing',
    location: 'Ikeja Industrial Zone',
    date: '2024 – Present',
    servicesProvided: ['Critical Asset Protection', '24/7 Operations Monitoring'],
    overview: 'Comprehensive security overhaul of a 4-hectare distribution depot handling high-value packaged consumer goods and heavy transport fleets.',
    challenge: 'Frequent inventory discrepancies during trailer dispatch and vulnerability along an unlit 600-metre southern perimeter wall.',
    solution: 'Installed high-mast infrared thermal cameras with AI tripwires linked to SafeNet 24/7 Command Center, alongside dual-inspector vehicle checkpoint protocols.',
    implementation: 'Civil works and trenching completed over 21 days. Automated license plate recognition (ANPR) integrated with warehouse gate management system.',
    outcome: 'Cargo shrinkage dropped to statistically negligible levels; three attempted perimeter breaches detected and intercepted at fence-line before facility intrusion.',
    imagePath: '/src/assets/images/safenet_operations_center_1790488901201.jpg',
    isAuthorizedForPublicView: true,
    isPublished: true,
    order: 2
  },
  {
    id: 'proj-3',
    title: 'Executive Close Protection & Diplomatic Delegation Escort',
    clientPlaceholder: '[INTERNATIONAL TRADE MISSION & EXECUTIVE DELEGATION]',
    industry: 'Diplomatic & International',
    location: 'Metropolitan Lagos & Abuja Transit Corridor',
    date: '2025',
    servicesProvided: ['Executive Protection & Escort', 'Risk Advisory'],
    overview: 'Full tactical close protection and convoy movement coordination for a 12-person international trade delegation over an 8-day itinerary.',
    challenge: 'Complex multi-point itinerary encompassing high-density industrial sites, government ministries, and interstate airport movements during heightened security advisory.',
    solution: 'Conducted advance security surveys 72 hours prior; coordinated dedicated 3-vehicle low-profile security convoy with real-time GPS telemetry and designated medical evacuation waypoints.',
    implementation: 'Direct operational coordination with statutory transport authorities; round-the-clock principal close protection coverage from arrival to departure.',
    outcome: '100% on-schedule mission execution with zero safety compromises; client commendation received for discretion and operational professionalism.',
    imagePath: '/src/assets/images/safenet_consulting_executive_1790488925021.jpg',
    isAuthorizedForPublicView: true,
    isPublished: true,
    order: 3
  }
];

export const initialTeam: TeamMember[] = [
  {
    id: 'team-1',
    name: '[EXECUTIVE DIRECTOR - CHIEF EXECUTIVE OFFICER]',
    position: 'Chief Executive Officer & Principal Risk Consultant',
    department: 'Executive',
    bio: 'Over 20 years of strategic leadership across corporate risk management, physical asset protection, and executive security governance. Directs operational standards and enterprise client strategy.',
    credentials: ['Certified Protection Professional (CPP®)', 'Fellow, Institute of Security Practitioners', 'MSc Security & Strategic Studies'],
    linkedinUrl: 'https://linkedin.com',
    isPublished: true,
    order: 1
  },
  {
    id: 'team-2',
    name: '[DIRECTOR OF SECURITY OPERATIONS]',
    position: 'Head of Field Operations & Guard Services',
    department: 'Operations',
    bio: 'Oversees day-to-day deployment of over 450 security officers, mobile patrol units, and quick-intervention teams. Specializes in tactical deployment, SOP enforcement, and crisis management.',
    credentials: ['Physical Security Professional (PSP®)', 'Certified Lead Auditor, ISO 18788', 'Former Senior Law Enforcement Operations Officer'],
    linkedinUrl: 'https://linkedin.com',
    isPublished: true,
    order: 2
  },
  {
    id: 'team-3',
    name: '[CHIEF TECHNICAL OFFICER - ELECTRONIC SYSTEMS]',
    position: 'Head of Electronic Security & Surveillance Systems',
    department: 'Operations',
    bio: 'Directs the engineering and integration of enterprise IP surveillance, biometric access matrices, automated intrusion detection, and central monitoring command infrastructure.',
    credentials: ['Certified Information Systems Security Professional (CISSP)', 'BEng Electrical & Electronics Engineering', 'Factory Certified Enterprise VMS Architect'],
    linkedinUrl: 'https://linkedin.com',
    isPublished: true,
    order: 3
  },
  {
    id: 'team-4',
    name: '[HEAD OF STATUTORY COMPLIANCE & HSE]',
    position: 'Director of Legal Compliance, Licensing & HSE',
    department: 'Compliance',
    bio: 'Guarantees uncompromised adherence to private security regulatory statutes, guard vetting protocols, and international occupational health and safety benchmarks.',
    credentials: ['NEBOSH International Diploma in HSE', 'BL, LL.B (Hons)', 'Member, International Security Governance Council'],
    linkedinUrl: 'https://linkedin.com',
    isPublished: true,
    order: 4
  }
];

export const initialLicences: ComplianceCredential[] = [
  {
    id: 'lic-1',
    name: 'Private Guard Company (PGC) Operating Licence',
    issuingBody: 'Ministry of Interior / NSCDC Regulatory Authority',
    referenceNumber: '[LICENCE NO: NSCDC/PGC/CERT/VERIFIED]',
    issueDate: 'Renewed Annually',
    expiryDate: 'Current Active Operational Validity',
    status: 'ACTIVE',
    verificationContact: 'compliance@safenet-security.example.com',
    description: 'Statutory government licence authorizing corporate guarding, facility protection, and security patrol operations nationwide under the Private Guard Companies Act.',
    category: 'STATUTORY_LICENCE',
    isPublished: true
  },
  {
    id: 'lic-2',
    name: 'Corporate Affairs Commission Incorporation',
    issuingBody: 'Federal Republic of Nigeria - CAC',
    referenceNumber: '[RC NUMBER: RC-SAFENET-CORPORATE-VERIFIED]',
    issueDate: 'Incorporated Entity',
    expiryDate: 'Perpetual Corporate Standing',
    status: 'ACTIVE',
    verificationContact: 'legal@safenet-security.example.com',
    description: 'Official corporate registration as a certified limited liability security enterprise in full statutory compliance with corporate governance regulations.',
    category: 'STATUTORY_LICENCE',
    isPublished: true
  },
  {
    id: 'lic-3',
    name: 'Standard Operating Procedures & Quality Standard (ISO 9001 Alignment)',
    issuingBody: 'Quality Management Framework Advisory',
    referenceNumber: '[QMS AUDIT REF: ISO-9001-COMPLIANT-SOP]',
    issueDate: 'Operational Audit Valid',
    expiryDate: 'Subject to Annual External Audit',
    status: 'ACTIVE',
    verificationContact: 'audit@safenet-security.example.com',
    description: 'Standardized operational workflows covering client onboarding, guard shift handovers, incident reporting, and continuous customer feedback management.',
    category: 'OPERATIONAL_STANDARD',
    isPublished: true
  },
  {
    id: 'lic-4',
    name: 'Occupational Health & Safety Guidelines (ISO 45001 Alignment)',
    issuingBody: 'Industrial Safety & Environment Directorate',
    referenceNumber: '[HSE POLICY REG: SAFENET-HSE-45001]',
    issueDate: 'Active Workplace Directive',
    expiryDate: 'Continuous Workplace Certification',
    status: 'ACTIVE',
    verificationContact: 'hse@safenet-security.example.com',
    description: 'Rigorous safety policies covering guard welfare, hazard identification, emergency first-aid readiness, and chemical/fire hazard response at industrial client sites.',
    category: 'SAFETY_ACCREDITATION',
    isPublished: true
  }
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: '[CONFIDENTIAL CLIENT HEAD OF CORPORATE SERVICES]',
    clientRole: 'Head of Facility Services',
    organization: '[PREMIER COMMERCIAL TOWER - VICTORIA ISLAND]',
    quote: 'SafeNet introduced an unprecedented standard of discipline to our building access management. Their guard force is punctual, immaculately turned out, and their automated post-shift reporting gives our facilities committee total visibility.',
    serviceCategory: 'Physical Guarding & Access Architecture',
    isAuthorized: true,
    date: 'February 2025',
    isPublished: true
  },
  {
    id: 'test-2',
    clientName: '[CONFIDENTIAL CLIENT LOGISTICS DIRECTOR]',
    clientRole: 'Supply Chain Operations Director',
    organization: '[REGIONAL INDUSTRIAL DISTRIBUTION DEPOT]',
    quote: 'Before contracting SafeNet, our logistics depot struggled with unexplained inventory variance during night shifts. The combination of thermal perimeter surveillance and rigorous checkpoint searches resolved our shrinkage issues within sixty days.',
    serviceCategory: 'Critical Asset & Industrial Protection',
    isAuthorized: true,
    date: 'November 2024',
    isPublished: true
  },
  {
    id: 'test-3',
    clientName: '[CONFIDENTIAL CLIENT COUNTRY SECURITY MANAGER]',
    clientRole: 'Country Risk & Safety Director',
    organization: '[MULTINATIONAL ENERGY CONSULTANCY]',
    quote: 'The executive escort and reconnaissance work provided by SafeNet for our foreign delegation was seamless. Their team arrived on time, possessed intimate knowledge of emergency routing, and demonstrated outstanding discretion.',
    serviceCategory: 'Executive Protection & Escort',
    isAuthorized: true,
    date: 'January 2025',
    isPublished: true
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Operations',
    question: 'How does SafeNet ensure guard alertness and reliability during night shifts?',
    answer: 'We deploy an integrated supervisory protocol combining digital RFID / GPS patrol wands requiring checkpoint confirmations at scheduled intervals, live 24/7 Operations Control Room monitoring, and unannounced physical visits by roving Field Inspectors.',
    isFeatured: true,
    order: 1
  },
  {
    id: 'faq-2',
    category: 'Compliance & Licences',
    question: 'Is SafeNet fully licensed to provide commercial security services?',
    answer: 'Yes. SafeNet is registered with the Corporate Affairs Commission and operates under statutory licence issued by the relevant regulatory authority (Private Guard Companies Act). Copies of regulatory credentials and tax compliance can be verified upon formal corporate inquiry.',
    isFeatured: true,
    order: 2
  },
  {
    id: 'faq-3',
    category: 'Operations',
    question: 'What is the background vetting process for security personnel before deployment?',
    answer: 'Every candidate undergoes a mandatory 3-tiered vetting process: (1) Criminal history checks, (2) Physical home address verification with verified community guarantors, and (3) Medical and psychological fitness evaluation followed by rigorous pre-deployment drills.',
    isFeatured: true,
    order: 3
  },
  {
    id: 'faq-4',
    category: 'Contracting & SLA',
    question: 'What is the lead time to deploy security officers to a new corporate site?',
    answer: 'Standard permanent deployment takes 5 to 7 business days following contract execution to complete site-specific risk assessment, draft tailor-made Post Orders, and conduct on-site orientation. Emergency interim protection can be arranged within 24 hours.',
    isFeatured: false,
    order: 4
  },
  {
    id: 'faq-5',
    category: 'Technology & Monitoring',
    question: 'Can SafeNet monitor existing CCTV and alarm systems installed at our facility?',
    answer: 'Yes. Our 24/7 Operations Command Center is equipped with universal protocol receivers capable of integrating with most standard IP camera systems (ONVIF compliant) and electronic alarm panels via secure broadband or cellular uplinks.',
    isFeatured: true,
    order: 5
  },
  {
    id: 'faq-6',
    category: 'Emergency Response',
    question: 'How are emergency situations handled on client premises?',
    answer: 'Each client site operates under dedicated Emergency Action Plans (EAPs). Security officers are trained in initial containment, evacuation marshaling, and simultaneous distress signal transmission to our 24/7 Command Center, which immediately dispatches mobile support and liaises with state emergency services.',
    isFeatured: true,
    order: 6
  }
];

export const initialJobs: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Security Operations Field Supervisor',
    department: 'Field Operations',
    location: 'Lagos Metropolitan Area',
    employmentType: 'Full-time',
    description: 'We are seeking an experienced, disciplined Security Field Supervisor to oversee guard detachments across commercial and industrial client sites in Lagos.',
    responsibilities: [
      'Conduct scheduled and unannounced night/day supervisory inspections across client posts',
      'Verify strict adherence to site-specific Post Orders, turn-out standards, and guard logs',
      'Serve as primary on-the-ground liaison for client facility managers during operational shifts',
      'Lead immediate on-site response during operational incidents and compile detailed debrief reports'
    ],
    requirements: [
      'Minimum of 4 years supervisory experience in a reputable private security organization',
      'Valid driving licence with clean record',
      'Strong verbal and written English communication skills',
      'Demonstrated crisis de-escalation and personnel leadership capability'
    ],
    deadline: '2026-11-30',
    isOpen: true
  },
  {
    id: 'job-2',
    title: 'Operations Command Center Dispatcher',
    department: 'Technical & Monitoring',
    location: 'Victoria Island Command Center',
    employmentType: 'Shift-based',
    description: 'Responsible for real-time monitoring of remote video streams, electronic alarm triggers, GPS fleet tracking, and incident escalation protocols.',
    responsibilities: [
      'Monitor multi-screen video feeds and electronic alarm panels continuously',
      'Execute immediate verification calls and dispatch closest mobile patrol units upon alert',
      'Maintain an accurate, chronological digital log of all incidents and incoming telephone reports',
      'Perform hourly digital radio checks with all active field posts'
    ],
    requirements: [
      'Diploma or Degree in Computer Science, Security Studies, or related technical field',
      'Proficiency in enterprise Video Management Software (Milestone, HikCentral, or equivalent)',
      'Calm, analytical composure under emergency pressure',
      'Willingness to work flexible 12-hour rotating day/night shift schedules'
    ],
    deadline: '2026-12-15',
    isOpen: true
  },
  {
    id: 'job-3',
    title: 'Health, Safety & Environment (HSE) Security Officer',
    department: 'Industrial & Safety',
    location: 'Ikeja Industrial Hub',
    employmentType: 'Full-time',
    description: 'Dedicated safety and security professional to coordinate safety compliance, visitor PPE enforcement, and perimeter access at industrial client facilities.',
    responsibilities: [
      'Enforce occupational health and safety regulations at vehicle and pedestrian access gates',
      'Inspect site fire extinguishers, emergency exits, and muster point clearings weekly',
      'Conduct safety orientations for third-party logistics contractors and plant visitors',
      'Log and report unsafe physical conditions to plant management and SafeNet command'
    ],
    requirements: [
      'Certified safety qualification (HSE Level 2/3 or NEBOSH General Certificate preferred)',
      'Minimum 2 years experience in manufacturing, oil & gas, or warehousing site security',
      'Strong attention to detail and zero-compromise safety mindset'
    ],
    deadline: '2026-11-15',
    isOpen: true
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Mitigating Perimeter Vulnerabilities in Multi-Tenant Corporate Facilities',
    slug: 'mitigating-perimeter-vulnerabilities-corporate-facilities',
    category: 'Facility Protection',
    author: 'SafeNet Corporate Risk Practice',
    publishedDate: '2026-08-14',
    readTime: '6 min read',
    excerpt: 'How modern commercial properties can balance frictionless tenant movement with ironclad access control against tailgating and unauthorized floor traversal.',
    content: [
      'Multi-tenant office buildings present a unique security conundrum: hundreds of employees and visitors must enter rapidly between 07:45 and 09:15 every morning, yet a single unverified entrant can compromise proprietary corporate assets or executive safety.',
      'The traditional reliance on manual visitor sign-in books is fundamentally obsolete. Forensic analysis indicates that handwritten logs suffer from over 78% illegibility and zero real-time verification capability against watchlist registries.',
      'Modern facilities should deploy an integrated access model: pre-issued digital visitor QR credentials, automated optical speed gates that restrict access to designated elevator banks, and supervisory guard personnel positioned as concierge security professionals rather than passive observers.',
      'Furthermore, perimeter surveillance must not merely record historical video; intelligent edge analytics detecting dwell time along perimeter boundary walls allow security dispatchers to intervene prior to an intrusion rather than reviewing footage post-incident.'
    ],
    keyTakeaways: [
      'Replace manual visitor registers with pre-registered digital credentials',
      'Implement elevator destination control to prevent cross-floor wandering',
      'Position trained front-of-house security personnel as proactive access arbiters',
      'Utilize perimeter tripwire analytics to preempt boundary breaches'
    ],
    isPublished: true
  },
  {
    id: 'post-2',
    title: 'Developing an Effective Corporate Security Standard Operating Procedure (SOP)',
    slug: 'developing-corporate-security-sop',
    category: 'Corporate Advisory',
    author: 'SafeNet Compliance Directorate',
    publishedDate: '2026-07-28',
    readTime: '8 min read',
    excerpt: 'A comprehensive operational framework for security managers seeking to eliminate operational ambiguities and establish verifiable duty standards.',
    content: [
      'A corporate security detachment is only as effective as the post orders governing its daily routine. Without clear, unambiguous, and continuously audited Standard Operating Procedures, even the most rigorously trained guard force will default to subjective interpretation during crises.',
      'An enterprise SOP must be constructed around five core operational pillars: Access Control & Identification Verification, Incident Documentation & Chain of Custody, Crisis De-escalation & Restraint Guidelines, Emergency Evacuation Coordination, and Shift Handover Protocols.',
      'Each post order must clearly answer three questions for the guard: What constitutes an anomalous condition? Whom must I notify immediately? What physical actions am I authorized to execute while awaiting supervisor arrival?',
      'SafeNet recommends bi-monthly scenario reviews and unannounced compliance drills to ensure that written guidelines translate directly into muscle memory across all operational shifts.'
    ],
    keyTakeaways: [
      'Structure post orders into clear, executable action trees',
      'Define precise escalation thresholds between guard and supervisor',
      'Mandate formal electronic checklists during shift handovers',
      'Conduct regular simulation drills to test protocol adherence'
    ],
    isPublished: true
  },
  {
    id: 'post-3',
    title: 'The Role of 24/7 Operations Monitoring in Preventing Industrial Asset Pilferage',
    slug: 'operations-monitoring-industrial-asset-protection',
    category: 'Risk Management',
    author: 'SafeNet Technology Systems Group',
    publishedDate: '2026-06-19',
    readTime: '5 min read',
    excerpt: 'Why physical fencing alone fails to safeguard sprawling industrial sites, and how centralized video verification transforms security efficiency.',
    content: [
      'Industrial fabrication yards, bulk petroleum distribution hubs, and warehousing complexes face relentless pressure from organized internal pilferage and after-hours external perimeter probes. Physical guard patrols, while essential, cannot maintain simultaneous eyes on a 5-hectare perimeter.',
      'Centralized remote operations monitoring closes this operational blind spot. By pairing high-definition thermal optics with central monitoring command consoles, automated alerts trigger the moment a human heat signature pauses along an external fence line.',
      'Once verified by command dispatchers within seconds, remote two-way audio talkdown can warn off intruders before damage occurs, while the closest mobile intervention unit is routed directly to the exact GPS coordinates.',
      'This synchronized model creates an unbreachable defense matrix, providing commercial clients with documented proof of security vigilance and significant insurance risk reductions.'
    ],
    keyTakeaways: [
      'Complement physical patrols with continuous remote video verification',
      'Utilize thermal optics to eliminate nighttime illumination dead zones',
      'Deploy remote audio interventions to deter trespassers prior to fence breach',
      'Establish guaranteed response time SLAs with designated mobile units'
    ],
    isPublished: true
  }
];

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    category: 'Perimeter & Physical Access',
    question: 'How is physical access controlled at your primary facility entrances?',
    context: 'Perimeter and entry point control constitutes the first line of defense against unauthorized intrusions.',
    options: [
      {
        label: 'Automated biometric or smart-card turnstiles paired with vetted security guards',
        points: 25,
        description: 'Comprehensive physical access architecture with verified identity tracking.'
      },
      {
        label: 'Uniformed security guards conducting manual checks and paper visitor logs',
        points: 15,
        description: 'Human-monitored checkpoint without digital access audit trails.'
      },
      {
        label: 'Unattended unlocked doors during standard business hours; locked manually at night',
        points: 5,
        description: 'Vulnerable open posture with potential for unmonitored tailgating.'
      },
      {
        label: 'No dedicated access control; public has unrestricted building entry',
        points: 0,
        description: 'Severe operational vulnerability requiring immediate perimeter intervention.'
      }
    ]
  },
  {
    id: 2,
    category: 'Electronic Surveillance & Recording',
    question: 'What is the operational status and coverage of your video surveillance (CCTV) system?',
    context: 'Video surveillance must provide clear coverage, tamper protection, and continuous recording.',
    options: [
      {
        label: 'Full HD IP cameras covering all perimeters, entries, and cash/asset zones, linked to 24/7 central monitoring with 30+ day archive',
        points: 25,
        description: 'High-assurance surveillance standard with forensic redundancy.'
      },
      {
        label: 'Working cameras covering primary entryways recorded to a local NVR/DVR, checked only after incidents',
        points: 15,
        description: 'Reactive video posture with potential camera blind spots.'
      },
      {
        label: 'Partial camera setup with known non-functional units or limited storage (< 7 days)',
        points: 8,
        description: 'Sub-standard coverage with high risk of evidence loss.'
      },
      {
        label: 'No operational camera system installed at the premises',
        points: 0,
        description: 'Critical gap in situational visibility.'
      }
    ]
  },
  {
    id: 3,
    category: 'Personnel Vetting & Guard Post Orders',
    question: 'How are on-site security personnel vetted, trained, and supervised?',
    context: 'Untrained or un-vetted security personnel create liability and false senses of security.',
    options: [
      {
        label: 'Contracted through a licensed security company with verified criminal background checks, written SOPs, and regular supervisory audits',
        points: 25,
        description: 'Rigorous corporate compliance posture with documented accountability.'
      },
      {
        label: 'Guards have basic uniforms and general instructions, but lack formal written post orders and regular supervisory visits',
        points: 12,
        description: 'Moderate risk of operational inconsistency during unexpected occurrences.'
      },
      {
        label: 'Informal or in-house personnel recruited without formal criminal checks or structured security training',
        points: 5,
        description: 'High liability and vetting deficiency.'
      },
      {
        label: 'No dedicated security personnel on site',
        points: 0,
        description: 'Absence of physical protective deterrent.'
      }
    ]
  },
  {
    id: 4,
    category: 'Emergency Preparedness & Incident Response',
    question: 'Does your organization possess an active Emergency Action Plan and rapid response capability?',
    context: 'The ability to respond swiftly to fire, medical emergencies, or physical breaches minimizes harm.',
    options: [
      {
        label: 'Documented emergency plan with annual staff evacuation drills, panic alarms linked to central dispatch, and first-aid kits',
        points: 25,
        description: 'Robust preparedness standard safeguarding human life and business continuity.'
      },
      {
        label: 'Basic fire extinguishers on site and informal understanding of exits, but no recent drills or dedicated panic buttons',
        points: 12,
        description: 'Partial readiness requiring structured crisis procedural documentation.'
      },
      {
        label: 'Emergency response relies entirely on calling public phone lines (police/fire) with no on-site panic system',
        points: 5,
        description: 'High risk of delayed response during acute emergencies.'
      },
      {
        label: 'No emergency plans or safety equipment established',
        points: 0,
        description: 'Severe compliance and life-safety exposure.'
      }
    ]
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'lead-1001',
    type: 'QUOTE',
    fullName: 'David Adeleke',
    companyName: 'Apex Commercial Properties Ltd',
    email: 'd.adeleke@apexproperties.example.com',
    phone: '+234 802 334 5566',
    serviceInterest: 'Physical Guarding & Facility Protection',
    industry: 'Commercial Real Estate',
    message: 'We require a 24-officer rotation for our newly completed 12-storey office plaza in Victoria Island, including access control turnstile integration.',
    projectType: 'Permanent Facility Protection',
    location: 'Victoria Island, Lagos',
    estimatedTimeline: 'Immediate (Within 30 Days)',
    source: 'Website Quote Form',
    status: 'QUALIFIED',
    notes: ['Initial facility floor plans received. Site survey scheduled for Thursday at 10:00 AM.'],
    createdAt: '2026-09-24T14:32:00Z',
    updatedAt: '2026-09-25T09:15:00Z'
  },
  {
    id: 'lead-1002',
    type: 'ASSESSMENT',
    fullName: 'Engr. Folake Balogun',
    companyName: 'Sterling Marine Logistics',
    email: 'f.balogun@sterlingmarine.example.com',
    phone: '+234 803 778 9900',
    serviceInterest: 'Critical Asset & Industrial Protection',
    industry: 'Energy, Oil & Industrial',
    message: 'Completed online assessment (Score: 45/100). Requesting corporate security audit for our coastal depot.',
    assessmentScore: 45,
    assessmentLevel: 'Moderate Vulnerability (Audit Recommended)',
    source: 'Interactive Security Assessment Tool',
    status: 'NEW',
    notes: ['Automated score generated. Client flagged vulnerability on perimeter boundary walls.'],
    createdAt: '2026-09-26T11:20:00Z',
    updatedAt: '2026-09-26T11:20:00Z'
  },
  {
    id: 'lead-1003',
    type: 'CONTACT',
    fullName: 'Chinedu Eze',
    companyName: 'Zenith Logistics Global',
    email: 'c.eze@zenithlogistics.example.com',
    phone: '+234 809 112 3344',
    serviceInterest: 'Executive Protection & Secure Transit Escort',
    message: 'Seeking corporate close protection details and route escort for our visiting international trade delegation for 5 days next month.',
    source: 'Contact Page Inquiry',
    status: 'CONTACTED',
    notes: ['Followed up via telephone. Sent NDA and itinerary specification template.'],
    createdAt: '2026-09-25T16:45:00Z',
    updatedAt: '2026-09-26T08:30:00Z'
  }
];

export const initialHeroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    mediaType: 'IMAGE',
    mediaUrl: '/src/assets/images/hero_safenet_corporate_1790488890149.jpg',
    posterUrl: '/src/assets/images/hero_safenet_corporate_1790488890149.jpg',
    eyebrow: 'Institutional Corporate Protection',
    headline: 'Protecting Critical Assets & Corporate Facilities',
    description: 'SafeNet engineers disciplined physical guarding detachments, biometric perimeter control, and continuous supervisory auditing for commercial enterprises.',
    primaryCtaText: 'Request a Corporate Quote',
    primaryCtaPage: 'quote',
    secondaryCtaText: 'Explore Services',
    secondaryCtaPage: 'services',
    durationMs: 6500,
    scanEffect: 'horizontal-grid',
    kenBurnsMovement: 'zoom-in',
    isActive: true,
    order: 1
  },
  {
    id: 'slide-2',
    mediaType: 'VIDEO',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-security-camera-screens-in-a-control-room-41875-large.mp4',
    posterUrl: '/src/assets/images/safenet_operations_center_1790488901201.jpg',
    videoSources: [
      { src: 'https://assets.mixkit.co/videos/preview/mixkit-security-camera-screens-in-a-control-room-41875-large.mp4', type: 'video/mp4' }
    ],
    eyebrow: '24/7 Command & Live Telemetry',
    headline: 'Intelligent Surveillance & Operations Monitoring',
    description: 'Continuous CCTV video verification, duress trigger telemetry, and direct emergency dispatch from our centralized security command center.',
    primaryCtaText: 'Explore Surveillance Architecture',
    primaryCtaPage: 'services',
    primaryCtaParam: 'electronic-surveillance-access-architecture',
    secondaryCtaText: 'Start Security Assessment',
    secondaryCtaPage: 'assessment',
    durationMs: 7000,
    scanEffect: 'radar',
    kenBurnsMovement: 'pan-left',
    isActive: true,
    order: 2
  },
  {
    id: 'slide-3',
    mediaType: 'IMAGE',
    mediaUrl: '/src/assets/images/safenet_tactical_patrol_1790490516077.jpg',
    posterUrl: '/src/assets/images/safenet_tactical_patrol_1790490516077.jpg',
    eyebrow: 'Rapid Response & Mobile Patrols',
    headline: 'Vigilant Field Detachments & Night Checkpoint Patrols',
    description: 'Vetted security officers, RFID patrol wands, and rapid mobile intervention vehicles providing uninterrupted perimeter vigilance around the clock.',
    primaryCtaText: 'Request Patrol Proposal',
    primaryCtaPage: 'quote',
    secondaryCtaText: 'Review Guard Vetting Standards',
    secondaryCtaPage: 'compliance',
    durationMs: 6000,
    scanEffect: 'target-hud',
    kenBurnsMovement: 'zoom-out',
    isActive: true,
    order: 3
  },
  {
    id: 'slide-4',
    mediaType: 'VIDEO',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-turnstiles-at-the-entrance-of-an-office-building-44335-large.mp4',
    posterUrl: '/src/assets/images/safenet_facility_access_1790488912938.jpg',
    videoSources: [
      { src: 'https://assets.mixkit.co/videos/preview/mixkit-turnstiles-at-the-entrance-of-an-office-building-44335-large.mp4', type: 'video/mp4' }
    ],
    eyebrow: 'Biometric Access Control',
    headline: 'Frictionless Turnstiles & Multi-Factor Access Architecture',
    description: 'Optical speed gates, QR visitor pre-credentialing, and multi-factor biometric interlocks engineered for corporate headquarters and high-density commercial towers.',
    primaryCtaText: 'View Facility Case Study',
    primaryCtaPage: 'projects',
    secondaryCtaText: 'Request Access Quote',
    secondaryCtaPage: 'quote',
    durationMs: 6500,
    scanEffect: 'horizontal-grid',
    kenBurnsMovement: 'pan-right',
    isActive: true,
    order: 4
  },
  {
    id: 'slide-5',
    mediaType: 'IMAGE',
    mediaUrl: '/src/assets/images/safenet_consulting_executive_1790488925021.jpg',
    posterUrl: '/src/assets/images/safenet_consulting_executive_1790488925021.jpg',
    eyebrow: 'Risk Advisory & Executive Escort',
    headline: 'Strategic Threat Modeling & Board-Level Risk Governance',
    description: 'Close protection for traveling executives, advance route reconnaissance, and institutional vulnerability audits compliant with international security standards.',
    primaryCtaText: 'Schedule Risk Consultation',
    primaryCtaPage: 'contact',
    secondaryCtaText: 'Explore Advisory Services',
    secondaryCtaPage: 'services',
    durationMs: 6000,
    scanEffect: 'none',
    kenBurnsMovement: 'zoom-in',
    isActive: true,
    order: 5
  }
];

