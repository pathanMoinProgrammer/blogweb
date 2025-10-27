'use client';

import useCreateBlogPage from '@/hooks/costumHooks/useCreateBlogPage';
import CreateBlogPage from '@/components/ui/createBlogPage';

export default function CreateBlogContx() {
  const {
    error,
    isMounted,
    showNotification,
    setShowNotification,
    loading,
    formData,
    postid,
    formik,
    refArray,
    locale,
    notifyMessage,
    setNotifiMessage,
    languages,
    isFullscreen,
    setIsFullscreen,
    type
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
      setShowNotification={setShowNotification}
      showNotification={showNotification}
      formData={formData}
      formik={formik}
      postid={postid}
      refArray={refArray}
      locale={locale}
      notifyMessage={notifyMessage}
      setNotifiMessage={setNotifiMessage}
      languages={languages}
      isFullscreen={isFullscreen}
      setIsFullscreen={setIsFullscreen}
      type={type}
    />
  );
}
