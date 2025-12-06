/**
 * SEO Metadata Generator
 * Provides consistent metadata generation across the site
 */

const SITE_URL = 'https://explorethebuzz.com';
const SITE_NAME = 'ExploretheBuzz';

export const baseMetadata = {
  title: {
    default: 'ExploretheBuzz - Your Source for Tech & Innovation Blogs',
    template: '%s | ExploretheBuzz',
  },
  description:
    'Discover insightful articles about AI, ChatGPT, Gemini, technology, and innovation. Read expert blog posts and tutorials.',
  keywords:
    'blog, AI, ChatGPT, Gemini, technology, tutorials, innovation, web development',
  authors: [{ name: 'ExploretheBuzz Team' }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'ExploretheBuzz - Your Source for Tech & Innovation Blogs',
    description:
      'Discover insightful articles about AI, ChatGPT, Gemini, technology, and innovation.',
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'ExploretheBuzz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExploretheBuzz - Tech & Innovation Blogs',
    description:
      'Discover insightful articles about AI, ChatGPT, Gemini, technology, and innovation.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      hi: `${SITE_URL}/hi`,
      pt: `${SITE_URL}/pt`,
      zh: `${SITE_URL}/zh`,
      'pt-BR': `${SITE_URL}/pt-BR`,
      es: `${SITE_URL}/es`,
    },
  },
};

/**
 * Generate metadata for blog post pages
 */
export const generateBlogMetadata = (blog, locale = 'en') => {
  const url = `${SITE_URL}/${locale}/blogpost/${blog.slug}`;

  return {
    title: blog.title,
    description:
      blog.excerpt || blog.description || blog.title.substring(0, 155),
    keywords: `${blog.title}, blog, tutorial, ${blog.category || 'technology'}`,
    authors: [{ name: blog.author || 'ExploretheBuzz Team' }],
    openGraph: {
      type: 'article',
      url,
      title: blog.title,
      description: blog.excerpt || blog.description,
      siteName: SITE_NAME,
      images: blog.imgUrl
        ? [{ url: blog.imgUrl, width: 1200, height: 630, alt: blog.title }]
        : [`${SITE_URL}/og-image.png`],
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author || 'ExploretheBuzz Team'],
      locale: locale === 'hi' ? 'hi_IN' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt || blog.description,
      images: blog.imgUrl ? [blog.imgUrl] : [`${SITE_URL}/og-image.png`],
    },
    alternates: {
      canonical: url,
    },
  };
};

/**
 * Generate JSON-LD structured data for blog articles
 */
export const generateArticleJsonLd = (blog, locale = 'en') => {
  const url = `${SITE_URL}/${locale}/blogpost/${blog.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || blog.description,
    image: blog.imgUrl || `${SITE_URL}/og-image.png`,
    author: {
      '@type': 'Person',
      name: blog.author || 'ExploretheBuzz Team',
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    inLanguage: locale,
  };
};

/**
 * Generate JSON-LD for Organization
 */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  description: 'Your source for tech and innovation blogs',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
};

/**
 * Generate JSON-LD for WebSite (with search action)
 */
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ['en', 'hi', 'pt', 'zh', 'pt-BR', 'es'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/en/blogpost?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};
