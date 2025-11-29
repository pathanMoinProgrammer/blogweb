
import { posts } from '@/firebase/firebaseAdminRefs';
import MyProfile from '@/components/ui/MyProfile';
import { Suspense } from 'react';
import SkeletonLoader from '@/components/ui/adminLoader';

async function getBlogs() {
  const snapshot = await posts.get();
  const blogs = [];
  const ids = [];

  snapshot.forEach((doc) => {
    blogs.push({ ...doc.data(), id: doc.id });
    ids.push(doc.id);
  });

  return { blogs, ids };
}

export default async function AdminBlogPage({ params }) {
  const { locale = 'en' } = await params;

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <ServerBlogTable locale={locale} />
    </Suspense>
  );
}

async function ServerBlogTable({ locale }) {
  const { blogs, ids } = await getBlogs();

  return (
    <div className="w-full h-screen">
      <MyProfile locale={locale} blogs={blogs} ids={ids} />
    </div>
  );
}
