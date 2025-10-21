'use client';

import useCreateBlogPage from '@/components/MvcComponents/useCreateBlogPage';
import CreateBlogPage from '@/components/ui/createBlogPage';

export default function CreateBlogContx() {
  const {
    error,
    isMounted,
    showNotification,
    setShowNotification,
    handleDelete,
    loading,
    formData,
    setFormData,
    handleCreateBlog,
    postid,
    formik,
  } = useCreateBlogPage();

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-4 text-gray-500 dark:text-gray-400">
        Loading editor...
      </div>
    );
  }

  return (
    <CreateBlogPage
      loading={loading}
      error={error}
      handleDelete={handleDelete}
      setShowNotification={setShowNotification}
      showNotification={showNotification}
      formData={formData}
      setFormData={setFormData}
      handleCreateBlog={handleCreateBlog}
      formik={formik}
      postid={postid}
    />
  );
}
