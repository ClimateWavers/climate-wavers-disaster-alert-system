import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "Climate Wavers - Disaster Alert & Climate Action Platform",
  description = "Join Climate Wavers, the leading platform for disaster alerts, climate action, and environmental community engagement. Get real-time disaster warnings, connect with climate activists, and make a positive impact on our planet.",
  keywords = "climate change, disaster alerts, environmental action, climate activism, disaster preparedness, environmental community, climate awareness, natural disasters, emergency alerts, climate solutions",
  image = "/assets/og-image.jpg",
  url = "https://climatewavers.org",
  type = "website",
  author = "Climate Wavers",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  structuredData,
  canonical,
  noindex = false,
  nofollow = false
}) => {
  const fullTitle = title.includes("Climate Wavers") ? title : `${title} | Climate Wavers`;
  const fullUrl = url.startsWith('http') ? url : `https://climatewavers.org${url}`;
  const fullImage = image.startsWith('http') ? image : `https://climatewavers.org${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      <link rel="canonical" href={canonical || fullUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Climate Wavers" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags.length > 0 && (
        tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@ClimateWavers" />
      <meta name="twitter:creator" content="@ClimateWavers" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#10B981" />
      <meta name="msapplication-TileColor" content="#10B981" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Climate Wavers" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

