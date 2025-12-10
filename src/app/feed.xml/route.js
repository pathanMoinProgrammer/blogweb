import { langPostQuery } from '@/firebase/firebaseAdminRefs';

const BASE_URL = 'https://explorethebuzz.com';
const SITE_TITLE = 'ExploreTheBuzz - Tech & Innovation Blogs';
const SITE_DESCRIPTION =
  'Discover insightful articles about AI, ChatGPT, Gemini, technology, and innovation.';

export async function GET(request) {
  try {
    const locale = request.nextUrl.searchParams.get('locale') || 'en';

    // Get all blog posts for the locale
    const snapshot = await langPostQuery(locale).get();
    const blogs = [];

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      blogs.push({
        title: data.title,
        description: data.description || data.excerpt || '',
        author: data.author || 'explorethebuzz Team',
        pubDate:
          data.createdAt?.toDate?.()?.toUTCString?.() ||
          new Date().toUTCString(),
        link: `${BASE_URL}/${locale}/blogpost/${data.slug}`,
        guid: `${BASE_URL}/${locale}/blogpost/${data.slug}`,
        category: data.category || 'Technology',
        image: data.imgUrl,
      });
    });

    // Sort by date
    blogs.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    // Generate RSS feed
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${BASE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>${locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml?locale=${locale}" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>${SITE_TITLE}</title>
      <link>${BASE_URL}</link>
    </image>
${blogs
  .slice(0, 50)
  .map(
    (blog) => `    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${blog.link}</link>
      <guid isPermaLink="true">${blog.guid}</guid>
      <description>${escapeXml(blog.description)}</description>
      <author>${escapeXml(blog.author)}</author>
      <category>${escapeXml(blog.category)}</category>
      <pubDate>${blog.pubDate}</pubDate>
      ${
        blog.image
          ? `<image:image><image:loc>${
              blog.image
            }</image:loc><image:title>${escapeXml(
              blog.title,
            )}</image:title></image:image>`
          : ''
      }
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>`;

    return new Response(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('RSS feed generation error:', error);
    return new Response('Error generating RSS feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
