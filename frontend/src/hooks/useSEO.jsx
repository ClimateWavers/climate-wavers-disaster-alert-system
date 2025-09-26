import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSEOConfig } from '../utils/seoConfig';

// Custom hook for dynamic SEO management
export const useSEO = (pageName, customSEO = {}) => {
  const location = useLocation();
  const seoConfig = getSEOConfig(pageName);
  
  // Merge custom SEO with default config
  const finalSEO = {
    ...seoConfig,
    ...customSEO,
    url: customSEO.url || `${window.location.origin}${location.pathname}`
  };

  useEffect(() => {
    // Update document title
    if (finalSEO.title) {
      document.title = finalSEO.title;
    }

    // Update meta description
    if (finalSEO.description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', finalSEO.description);
      }
    }

    // Update meta keywords
    if (finalSEO.keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', finalSEO.keywords);
      }
    }

    // Update canonical URL
    if (finalSEO.url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', finalSEO.url);
    }

    // Update Open Graph tags
    if (finalSEO.title) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', finalSEO.title);
      }
    }

    if (finalSEO.description) {
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', finalSEO.description);
      }
    }

    if (finalSEO.url) {
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', finalSEO.url);
      }
    }

    if (finalSEO.image) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', finalSEO.image);
      }
    }

    // Update Twitter Card tags
    if (finalSEO.title) {
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', finalSEO.title);
      }
    }

    if (finalSEO.description) {
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', finalSEO.description);
      }
    }

    if (finalSEO.image) {
      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (twitterImage) {
        twitterImage.setAttribute('content', finalSEO.image);
      }
    }

    // Add structured data if provided
    if (finalSEO.structuredData) {
      // Remove existing structured data
      const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
      if (existingStructuredData) {
        existingStructuredData.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(finalSEO.structuredData);
      document.head.appendChild(script);
    }

    // Handle robots meta tag
    if (finalSEO.noindex || finalSEO.nofollow) {
      const robotsContent = [];
      if (finalSEO.noindex) robotsContent.push('noindex');
      else robotsContent.push('index');
      
      if (finalSEO.nofollow) robotsContent.push('nofollow');
      else robotsContent.push('follow');

      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', robotsContent.join(', '));
    }

  }, [finalSEO, location.pathname]);

  return finalSEO;
};

// Hook for dynamic content SEO (e.g., disaster pages, campaign pages)
export const useDynamicSEO = (contentType, contentData) => {
  const location = useLocation();
  
  const generateDynamicSEO = () => {
    switch (contentType) {
      case 'disaster':
        return {
          title: `${contentData.name} - Disaster Alert | Climate Wavers`,
          description: `Get real-time updates and safety information about ${contentData.name}. Stay informed about this ${contentData.type} disaster and learn how to stay safe.`,
          keywords: `${contentData.name}, ${contentData.type}, disaster alert, emergency information, safety tips, natural disaster, climate emergency`,
          url: `/disasters/${contentData.id}`,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": contentData.name,
            "description": `Information about ${contentData.name} disaster`,
            "startDate": contentData.startDate,
            "location": {
              "@type": "Place",
              "name": contentData.location
            },
            "organizer": {
              "@type": "Organization",
              "name": "Climate Wavers"
            }
          }
        };

      case 'campaign':
        return {
          title: `${contentData.title} - Climate Campaign | Climate Wavers`,
          description: `Join the ${contentData.title} campaign and make a difference for our planet. ${contentData.description}`,
          keywords: `${contentData.title}, climate campaign, environmental action, climate activism, ${contentData.tags?.join(', ')}`,
          url: `/campaigns/${contentData.id}`,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "Campaign",
            "name": contentData.title,
            "description": contentData.description,
            "organizer": {
              "@type": "Organization",
              "name": "Climate Wavers"
            },
            "startDate": contentData.startDate,
            "endDate": contentData.endDate
          }
        };

      case 'user':
        return {
          title: `${contentData.name} - Climate Wavers Profile`,
          description: `View ${contentData.name}'s profile on Climate Wavers. See their climate action contributions and environmental impact.`,
          keywords: `${contentData.name}, climate wavers profile, environmental activist, climate action, user profile`,
          url: `/app/${contentData.id}/profile`,
          noindex: true // User profiles should not be indexed
        };

      default:
        return {
          title: "Climate Wavers - Disaster Alert & Climate Action Platform",
          description: "Join Climate Wavers, the leading platform for disaster alerts, climate action, and environmental community engagement.",
          keywords: "climate change, disaster alerts, environmental action, climate activism",
          url: location.pathname
        };
    }
  };

  return generateDynamicSEO();
};
