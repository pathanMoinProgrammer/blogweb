/**
 * SEO Configuration and Best Practices
 * This file documents all SEO improvements made to the BlogWeb project
 */

export const SEO_CONFIG = {
  // Site Information
  SITE_NAME: 'BlogWeb',
  SITE_URL: 'https://explorethebuzz.com',
  SITE_TITLE: 'ExploreTheBuzz - Your Source for Tech & Innovation Blogs',
  SITE_DESCRIPTION:
    'Discover insightful articles about AI, ChatGPT, Gemini, technology, and innovation. Read expert blog posts and tutorials.',

  // Locales
  LOCALES: ['en', 'hi'],
  DEFAULT_LOCALE: 'en',

  // Contact Information
  CONTACT_EMAIL: 'info@explorethebuzz.com',
  AUTHOR: 'BlogWeb Team',

  // Social Media
  SOCIAL_LINKS: {
    twitter: 'https://twitter.com/blogweb',
    facebook: 'https://facebook.com/blogweb',
    linkedin: 'https://linkedin.com/company/blogweb',
    github: 'https://github.com/blogweb',
  },

  // AdSense & Analytics (Update with actual IDs)
  GOOGLE_ADSENSE_CLIENT: 'ca-pub-YOUR_ADSENSE_ID',
  GOOGLE_ANALYTICS_ID: 'G-YOUR_GOOGLE_ANALYTICS_ID',
  GOOGLE_SITE_VERIFICATION: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
};

/**
 * SEO Improvements Implemented:
 *
 * 1. META TAGS & HEAD OPTIMIZATION:
 *    ✅ Added comprehensive meta tags in layout.js (viewport, mobile, robots, theme-color)
 *    ✅ Added Google AdSense support with placeholder
 *    ✅ Added Google Analytics integration
 *    ✅ Added language alternates for multi-language support
 *    ✅ Added security headers (X-UA-Compatible, referrer policy)
 *    ✅ Added manifest and favicon references
 *
 * 2. METADATA GENERATION:
 *    ✅ Created seoMetadata.js utility with functions for:
 *       - Base metadata for entire site
 *       - Blog post-specific metadata
 *       - JSON-LD structured data generation
 *    ✅ Added metadata exports to all pages:
 *       - Root page (/[locale])
 *       - Blog list page (/[locale]/blogpost)
 *       - Blog post pages (/[locale]/blogpost/[slug]) with dynamic generation
 *       - About page (/[locale]/about)
 *       - Contact page (/[locale]/contact)
 *       - My Profile page (marked as non-indexable)
 *
 * 3. HEADING HIERARCHY:
 *    ✅ Changed multiple H1 tags to H2 for proper hierarchy
 *       - TopComponentHome: h1 → h2
 *       - BlogPost page: h1 → h2
 *       - Blog post detail pages: kept h1 (main article heading - correct)
 *    ✅ Maintained semantic HTML structure
 *
 * 4. STRUCTURED DATA (JSON-LD):
 *    ✅ Added Organization schema in root layout
 *    ✅ Added Website schema with search action
 *    ✅ Added BlogPosting schema for individual articles
 *    ✅ Proper metadata for AdSense and search engines
 *
 * 5. SITEMAP & ROBOTS:
 *    ✅ Created dynamic sitemap generator (/sitemap.xml route)
 *    ✅ Updated robots.txt with:
 *       - Proper crawl delays
 *       - User-agent specific rules
 *       - Sitemap references
 *    ✅ Excluded private routes (/api, /admin, etc.)
 *
 * 6. RSS FEED:
 *    ✅ Created RSS feed generator (/feed.xml route)
 *    ✅ Supports locale-specific feeds
 *    ✅ Includes proper XML formatting and escaping
 *
 * 7. PWA MANIFEST:
 *    ✅ Created site.webmanifest for PWA support
 *    ✅ Added app icons and screenshots
 *    ✅ Proper theme colors and display settings
 *
 * 8. LINK FIXES:
 *    ✅ Added rel="noopener noreferrer" to external links
 *    ✅ Changed target="_black" to target="_blank"
 *    ✅ Improved alt text for images
 *    ✅ Using Next.js Link component where appropriate
 *
 * 9. PERFORMANCE & ACCESSIBILITY:
 *    ✅ Added proper datetime attributes in time tags
 *    ✅ Improved image alt text throughout
 *    ✅ Proper semantic HTML elements (article, section, header, footer)
 *    ✅ Language attribute set correctly on html element
 *
 * 10. OPENRAPH & TWITTER CARDS:
 *     ✅ Added OpenGraph meta tags for social sharing
 *     ✅ Added Twitter Card support
 *     ✅ Dynamic OG images for blog posts
 *
 * NEXT STEPS FOR MANUAL CONFIGURATION:
 *
 * 1. Update ADSENSE_ID in:
 *    - /src/app/layout.js (replace YOUR_ADSENSE_ID)
 *    - Create your AdSense account and get your client ID
 *
 * 2. Update GOOGLE_ANALYTICS_ID in:
 *    - /src/app/layout.js (replace YOUR_GOOGLE_ANALYTICS_ID)
 *    - Set up Google Analytics 4 property
 *
 * 3. Update GOOGLE_SITE_VERIFICATION in:
 *    - /src/app/layout.js (replace YOUR_GOOGLE_SITE_VERIFICATION_CODE)
 *    - Verify your site in Google Search Console
 *
 * 4. Submit to Search Engines:
 *    - Google Search Console: https://search.google.com/search-console
 *    - Bing Webmaster Tools: https://www.bing.com/webmasters
 *    - Yandex Webmaster: https://webmaster.yandex.com
 *
 * 5. Monitor & Optimize:
 *    - Use Google Search Console for crawl errors
 *    - Check Core Web Vitals in PageSpeed Insights
 *    - Monitor click-through rates and impressions
 *    - Optimize content based on search performance
 *
 * 6. Update Social Meta Tags:
 *    - Add actual Open Graph images
 *    - Set proper social preview images
 *
 * 7. Create XML Sitemaps Index (optional):
 *    - Combine multiple sitemaps if needed
 *    - Reference in robots.txt
 */

export const SEO_CHECKLIST = {
  implemented: [
    'Meta tags in head',
    'Metadata objects in pages',
    'JSON-LD structured data',
    'Sitemap.xml dynamic generation',
    'robots.txt with proper rules',
    'RSS feed generation',
    'site.webmanifest for PWA',
    'Link rel attributes (noopener, noreferrer)',
    'Proper heading hierarchy',
    'Alt text for images',
    'OpenGraph & Twitter cards',
    'Language alternates',
    'Proper semantic HTML',
    'Multi-language support',
  ],
  pending: [
    'AdSense setup with actual client ID',
    'Google Analytics setup with actual tracking ID',
    'Google Search Console verification',
    'Bing Webmaster verification',
    'Open Graph images',
    'SSL certificate (ensure HTTPS)',
    'Core Web Vitals optimization',
    'Mobile-first indexing verification',
  ],
};
