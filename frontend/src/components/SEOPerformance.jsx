import { useEffect } from 'react';

// SEO Performance Monitoring Component
const SEOPerformance = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            // Send to analytics if needed
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
          // Send to analytics if needed
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log('CLS:', clsValue);
        // Send to analytics if needed
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    };

    // Check if PerformanceObserver is supported
    if ('PerformanceObserver' in window) {
      measureWebVitals();
    }

    // Monitor page load performance
    const measurePageLoad = () => {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart);
          console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
          console.log('Time to First Byte:', navigation.responseStart - navigation.requestStart);
        }
      });
    };

    measurePageLoad();

    // Monitor image loading performance
    const measureImagePerformance = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        img.addEventListener('load', () => {
          console.log(`Image ${index + 1} loaded in:`, performance.now());
        });
      });
    };

    measureImagePerformance();

    // Monitor resource loading
    const measureResourceLoading = () => {
      const resources = performance.getEntriesByType('resource');
      resources.forEach((resource) => {
        if (resource.duration > 1000) { // Log resources taking more than 1 second
          console.warn('Slow resource:', resource.name, 'Duration:', resource.duration);
        }
      });
    };

    // Run resource analysis after page load
    setTimeout(measureResourceLoading, 2000);

  }, []);

  return null; // This component doesn't render anything
};

export default SEOPerformance;

