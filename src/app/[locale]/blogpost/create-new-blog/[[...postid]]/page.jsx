'use client';
import Notification from '@/components/blog/Notification';
import dynamic from 'next/dynamic';
import BlogFormSection from '@/components/tabsScreen/BlogMetaData';
import EditorPreviewTabs from '@/components/tabsScreen/EditorPreview';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';
import useCreateBlogPage from '@/components/MvcComponents/useCreateBlogPage';
import { BlogProvider } from '@/hooks/costumHooks/blogMetadataContext';
import { useEffect } from 'react';

const JoditEditor = dynamic(() => import('@/components/blog/joditeditor.jsx'), {
  ssr: false,
});

export function CreateBlogContx() {
  const params = useParams();
  const locale = params.locale;
  const {
    loading,
    error,
    content,
    HtmContent,
    setIsMounted,
    isMounted,

    showNotification,
    notificationMessage,
    blogName,
    author,
    enurl,
    title,
    description,
    imgUrl,
    clickable,

    setContent,
    setHtmContent,
    setShowNotification,
    setNotificationMessage,
    setBlogName,
    setAuthor,
    setEnurl,
    setTitle,
    setDescription,
    setImgUrl,

    handleCreateBlog,
    scheduleSaveDraft,
  } = useCreateBlogPage(locale);

  // console.log('loading:', loading);
  // console.log('loading:', loading);
  console.log('error:', error);
  // console.log('content:', content);
  // console.log('HtmContent:', HtmContent);
  // console.log('isMounted:', isMounted);
  // console.log('showNotification:', showNotification);
  // console.log('notificationMessage:', notificationMessage);
  // console.log('blogName:', blogName);
  // console.log('author:', author);
  // console.log('enurl:', enurl);
  // console.log('title:', title);
  // console.log('description:', description);
  // console.log('imgUrl:', imgUrl);
  // console.log('clickable:', clickable);

  // console.log('setIsMounted:', setIsMounted);
  // console.log('setContent:', setContent);
  // console.log('setHtmContent:', setHtmContent);
  // console.log('setShowNotification:', setShowNotification);
  // console.log('setNotificationMessage:', setNotificationMessage);
  // console.log('setBlogName:', setBlogName);
  // console.log('setAuthor:', setAuthor);
  // console.log('setEnurl:', setEnurl);
  // console.log('setTitle:', setTitle);
  // console.log('setDescription:', setDescription);
  // console.log('setImgUrl:', setImgUrl);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-4 text-gray-500 dark:text-gray-400">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-800 relative">
      <Notification
        message={notificationMessage}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />

      <EditorPreviewTabs editor={null} />

      <div className="max-[1300px]:hidden">
        <BlogFormSection />
      </div>

      <div className="absolute top-0 right-3 flex gap-4 z-10">
        <Button
          variant="outline"
          size="lg"
          className={`bg-yellow-400/80 text-gray-900  ${
            clickable ? 'cursor-pointer' : ''
          } dark:text-white hover:bg-yellow-500/90 border-yellow-500 dark:border-yellow-400 transition-colors duration-300 flex items-center gap-2 rounded-lg min-w-[120px]`}
          onClick={() => {}}
        >
          <Save className="w-5 h-5" />
          <span>Save Draft</span>
        </Button>

        {loading ? (
          <Button
            variant="default"
            size="lg"
            disabled
            className={`bg-green-400/90 text-white ${
              clickable ? 'cursor-crosshair' : ''
            }  rounded-lg min-w-[120px] flex items-center gap-2`}
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Publishing...</span>
          </Button>
        ) : (
          <Button
            variant="default"
            size="lg"
            onClick={handleCreateBlog}
            className={`bg-green-500 hover:bg-green-600 ${
              clickable ? 'cursor-pointer' : ''
            } cursor-pointer dark:bg-green-600 dark:hover:bg-green-700 text-white transition-colors duration-300 flex items-center gap-2 rounded-lg min-w-[120px]`}
          >
            <span>Publish</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export const CreateBlogPage = () => {
  return (
    <BlogProvider>
      <CreateBlogContx />
    </BlogProvider>
  );
};
export default CreateBlogPage;
