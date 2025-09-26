// Sitemap Generator for Climate Wavers Platform

export const generateSitemap = () => {
  const baseUrl = 'https://climatewavers.org';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages = [
    {
      url: '/',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: '/landing',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/about',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/impact',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/disasters',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: '/campaigns',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: '/bot',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: '/login',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: '/signup',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    }
  ];

  const generateXML = (pages) => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
    xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
    xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n';

    pages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n\n';
    });

    xml += '</urlset>';
    return xml;
  };

  return {
    staticPages,
    generateXML: () => generateXML(staticPages),
    addDynamicPages: (dynamicPages) => generateXML([...staticPages, ...dynamicPages])
  };
};

// Function to generate robots.txt content
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://climatewavers.org/sitemap.xml

# Disallow admin and private areas
Disallow: /app/
Disallow: /api/
Disallow: /admin/
Disallow: /onboarding/
Disallow: /uploadphoto
Disallow: /uploadcover

# Allow important pages
Allow: /
Allow: /about
Allow: /impact
Allow: /landing
Allow: /disasters
Allow: /campaigns
Allow: /bot

# Crawl delay (optional)
Crawl-delay: 1`;
};

// Function to generate manifest.json content
export const generateManifest = () => {
  return {
    "name": "Climate Wavers",
    "short_name": "ClimateWavers",
    "description": "Disaster Alert & Climate Action Platform",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#10B981",
    "orientation": "portrait-primary",
    "icons": [
      {
        "src": "/favicon-16x16.png",
        "sizes": "16x16",
        "type": "image/png"
      },
      {
        "src": "/favicon-32x32.png",
        "sizes": "32x32",
        "type": "image/png"
      },
      {
        "src": "/apple-touch-icon.png",
        "sizes": "180x180",
        "type": "image/png"
      },
      {
        "src": "/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any maskable"
      }
    ],
    "categories": ["environment", "weather", "social", "productivity"],
    "lang": "en",
    "dir": "ltr"
  };
};
