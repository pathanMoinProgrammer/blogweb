/**
 * Sitemap generation for SEO
 * This generates XML sitemaps for search engines
 */

import { langPostQuery } from '@/firebase/firebaseAdminRefs';

const BASE_URL = 'https://explorethebuzz.com';

export async function GET() {
  try {
    // Get all locales
    const locales = ['en', 'hi'];

    let staticPages = [];

    // Add main pages
    for (const locale of locales) {
      staticPages.push(`${BASE_URL}/${locale}`);
      staticPages.push(`${BASE_URL}/${locale}/about`);
      staticPages.push(`${BASE_URL}/${locale}/contact`);
      staticPages.push(`${BASE_URL}/${locale}/my-profile`);
    }

    // Get all blog posts
    let blogSlugs = [];
    for (const locale of locales) {
      const snapshot = await langPostQuery(locale).get();
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        blogSlugs.push({
          slug: data.slug,
          locale: locale,
          lastmod:
            data.updatedAt?.toDate?.()?.toISOString() ||
            new Date().toISOString(),
        });
      });
    }

    // Generate XML
    const xml = generateSitemapXml([
      ...staticPages.map((page) => ({
        url: page,
        lastmod: new Date().toISOString(),
      })),
      ...blogSlugs.map((blog) => ({
        url: `${BASE_URL}/${blog.locale}/blogpost/${blog.slug}`,
        lastmod: blog.lastmod,
      })),
    ]);

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}

function generateSitemapXml(pages) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq || 'weekly'}</changefreq>
    <priority>${page.priority || '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return sitemap;
}
