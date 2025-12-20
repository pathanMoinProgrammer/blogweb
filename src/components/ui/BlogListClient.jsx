'use client';

import { useEffect, useState } from 'react';
import BlogGrid from './BlogGrid';
import BlogSkeleton from './BlogSkeleton';

export default function BlogListClient({ locale, t }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs?lang=${locale}`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      });
  }, [locale]);

  if (loading) return <BlogSkeleton />;

  return <BlogGrid blogs={blogs} locale={locale} t={t} />;
}
