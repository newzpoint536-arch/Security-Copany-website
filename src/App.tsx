import React, { useEffect } from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CookieBanner } from './components/common/CookieBanner';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TeamPage } from './pages/TeamPage';
import { CompliancePage } from './pages/CompliancePage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { FAQPage } from './pages/FAQPage';
import { CareersPage } from './pages/CareersPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { QuotePage } from './pages/QuotePage';
import { AssessmentPage } from './pages/AssessmentPage';
import { LegalPage } from './pages/LegalPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { captureAttribution } from './utils/analytics';

const AppContent: React.FC = () => {
  const { currentPage } = useSite();

  useEffect(() => {
    // Initial attribution capture
    captureAttribution();
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
      case 'service-detail':
        return <ServicesPage />;
      case 'industries':
        return <IndustriesPage />;
      case 'projects':
      case 'project-detail':
        return <ProjectsPage />;
      case 'team':
        return <TeamPage />;
      case 'compliance':
        return <CompliancePage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'faq':
        return <FAQPage />;
      case 'careers':
        return <CareersPage />;
      case 'blog':
      case 'blog-detail':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case 'quote':
        return <QuotePage />;
      case 'assessment':
        return <AssessmentPage />;
      case 'privacy':
        return <LegalPage type="privacy" />;
      case 'terms':
        return <LegalPage type="terms" />;
      case 'admin':
        return <AdminPage />;
      case 'not-found':
      default:
        return <NotFoundPage />;
    }
  };

  const isAdmin = currentPage === 'admin';

  return (
    <div className="flex flex-col min-h-screen selection:bg-slate-900 selection:text-white">
      {!isAdmin && <Header />}
      <main className="flex-1">{renderCurrentPage()}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <CookieBanner />}
      {!isAdmin && <WhatsAppButton />}
    </div>
  );
};

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}
