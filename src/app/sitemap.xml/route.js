import { langPostQuery } from '@/firebase/firebaseAdminRefs';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://explorethebuzz.com';

export async function GET() {
  try {
    const locales = routing.locales;
    const urls = [];

    for (const locale of locales) {
      urls.push({
        url: `${BASE_URL}/${locale}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '1.0',
      });
      urls.push({
        url: `${BASE_URL}/${locale}/about`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7',
      });
      urls.push({
        url: `${BASE_URL}/${locale}/contact`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7',
      });
      urls.push({
        url: `${BASE_URL}/${locale}/blogpost`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '0.9',
      });
    }

    for (const locale of locales) {
      try {
        const snapshot = await langPostQuery(locale).get();
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.slug) {
            urls.push({
              url: `${BASE_URL}/${locale}/blogpost/${data.slug}`,
              lastmod:
                data.updatedAt?.toDate?.()?.toISOString()?.split('T')[0] ||
                data.createdAt?.toDate?.()?.toISOString()?.split('T')[0] ||
                new Date().toISOString().split('T')[0],
              changefreq: 'monthly',
              priority: '0.8',
            });
          }
        });
      } catch (error) {
        console.error(`Error fetching blogs for locale ${locale}:`, error);
      }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
