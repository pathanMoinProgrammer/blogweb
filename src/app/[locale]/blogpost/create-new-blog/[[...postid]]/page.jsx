'use client';

import useCreateBlogPage from '@/hooks/costumHooks/useCreateBlogPage';
import CreateBlogPage from '@/components/ui/createBlogPage';

export default function CreateBlogContx() {
  const { isMounted, editorT } = useCreateBlogPage();

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-4 text-gray-500 dark:text-gray-400">
        {editorT?.loading}
      </div>
    );
  }

  return <CreateBlogPage editorT={editorT} />;
}
