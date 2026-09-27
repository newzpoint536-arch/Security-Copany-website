import { useEffect } from 'react';
import { useSite, PageRoute } from '../../context/SiteContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  page: PageRoute;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description, page }) => {
  const { siteSettings, faqs, services } = useSite();

  const finalTitle = title
    ? `${title} | SafeNet Corporate Security`
    : `${siteSettings.seo.metaTitle}`;

  const finalDescription = description || siteSettings.seo.metaDescription;

  useEffect(() => {
    // 1. Update Document Title
    document.title = finalTitle;

    // 2. Update Meta Tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', finalDescription);
    updateMeta('og:title', finalTitle, true);
    updateMeta('og:description', finalDescription, true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:site_name', siteSettings.companyName, true);
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', finalTitle);
    updateMeta('twitter:description', finalDescription);

    // 3. Inject Structured Data JSON-LD
    const existingScript = document.getElementById('safenet-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'safenet-structured-data';
    script.type = 'application/ld+json';

    const baseSchema: Record<string, any> = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SecurityService',
          '@id': 'https://safenet.example.com/#organization',
          name: siteSettings.companyName,
          description: siteSettings.tagline,
          telephone: siteSettings.officialPhone,
          email: siteSettings.officialEmail,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'SafeNet Corporate Towers, Plot 14 Commercial Boulevard, Victoria Island',
            addressLocality: 'Lagos',
            addressCountry: 'NG'
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '17:00'
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '00:00',
              closes: '23:59',
              description: '24/7 Operations Monitoring & Emergency Response Dispatch'
            }
          ]
        },
        {
          '@type': 'WebSite',
          '@id': 'https://safenet.example.com/#website',
          url: 'https://safenet.example.com',
          name: siteSettings.companyName,
          publisher: {
            '@id': 'https://safenet.example.com/#organization'
          }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://safenet.example.com/'
            },
            ...(page !== 'home'
              ? [
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' '),
                    item: `https://safenet.example.com/#${page}`
                  }
                ]
              : [])
          ]
        }
      ]
    };

    // If on FAQ page, add FAQPage schema
    if (page === 'faq' && faqs.length > 0) {
      baseSchema['@graph'].push({
        '@type': 'FAQPage',
        mainEntity: faqs.slice(0, 5).map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      });
    }

    // If on Services page, list primary services
    if (page === 'services' && services.length > 0) {
      services.slice(0, 4).forEach((service) => {
        baseSchema['@graph'].push({
          '@type': 'Service',
          name: service.title,
          description: service.summary,
          provider: {
            '@id': 'https://safenet.example.com/#organization'
          }
        });
      });
    }

    script.textContent = JSON.stringify(baseSchema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('safenet-structured-data');
      if (el) el.remove();
    };
  }, [finalTitle, finalDescription, page, siteSettings, faqs, services]);

  return null;
};
