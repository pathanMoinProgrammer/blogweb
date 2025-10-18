import Link from 'next/link';
import { CreateNewAdminBlog } from '../../../components/ui/createNewAdminBlog';
import { posts } from '@/firebase/firebaseAdminRefs';
import { Plus } from 'lucide-react';
// import {} from '@/components/ui/button';
import DeleteAdminPost from '@/components/ui/deleteAdminPost';

export default async function AdminBlogPage({ params }) {
  const param = await params;
  const locale = param.locale || 'en';
  let blogs = [];

  const allPost = await posts.get();

  if (allPost.docs.length > 0) {
    allPost.docs.forEach((rowData) => {
      blogs.push({ ...rowData.data(), id: rowData.id });
    });
  }

  return (
    <section className="py-12 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Blog Admin Dashboard
          </h1>

          <CreateNewAdminBlog locale={locale} />
        </div>
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-800">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs font-semibold tracking-wider">
                <th className="py-4 px-6">Title</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6 text-center">Languages</th>

                <th className="py-4 px-6 text-center">Updated At</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-300 text-sm divide-y divide-gray-200 dark:divide-gray-700">
              {blogs?.map((blog, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {blog.title || 'Blog Post'}
                  </td>
                  <td className="py-4 px-6">
                    <p className="line-clamp-2 text-gray-600 dark:text-gray-300">
                      {blog.description}
                    </p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center gap-2 flex-wrap">
                      {blog.languages?.map((lang, langIndex) => (
                        <Link
                          href={`/${lang}/blogpost/create-new-blog/${blog.id}`}
                          key={langIndex}
                        >
                          <span
                            key={langIndex}
                            className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {lang}
                          </span>
                        </Link>
                      )) || (
                        <span className="text-gray-500 dark:text-gray-400">
                          {locale}
                        </span>
                      )}
                      <Link
                        href={`/${locale}/blogpost/create-new-blog/${blog.id}`}
                      >
                        <Plus className="w-5 h-5" />
                      </Link>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center text-gray-500 dark:text-gray-400">
                    {blog.updatedAt?.toDate().toLocaleString('en-IN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                  <td className="flex justify-center items-center">
                    <span className="">
                      <DeleteAdminPost
                        postid={blog.id}
                        languages={blog.languages}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
