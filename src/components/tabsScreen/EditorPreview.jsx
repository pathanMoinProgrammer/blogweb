'use client';
import * as Tabs from '@radix-ui/react-tabs';
import JoditEditor from '@/components/blog/joditeditor';
import BlogPreview from '@/components/blog/BlogPreview';
import BlogMetadataForm from '../blog/BlogMetadataForm';
import ActionButton from '../ui/actionButton';

export default function EditorPreviewTabs({
  formData,//
  editor = null,//
  formik,//
  isFullscreen,//
  setIsFullscreen,//
  loading,//
  postid,//
  refArray, //
  locale,//
  setNotifiMessage,//
  languages,//
  type, //
  setShowNotification,//
  showNotification, //
  inputRefs,//
  metadataT,//
  editorT, //
  pendingImages, //
  setPendingImages,//
}) {
  const { HtmContent } = formik.values;


  return (
    <>
      <section className="w-full min-h-[400px] mt-5 max-[1300px]:mt-10 dark:bg-gray-800 ">
        <div className="absolute top-2 right-0 w-[30%] max-[1200px]:w-[35%] max-[1100px]:w-[30%] max-[1000px]:w-[40%] max-[575px]:w-[50%] max-[400px]:w-[60%] px-5">
          <ActionButton
            loading={loading}
            formik={formik}
            postid={postid}
            refArray={refArray}
            locale={locale}
            setNotifiMessage={setNotifiMessage}
            languages={languages}
            type={type}
            setShowNotification={setShowNotification}
            showNotification={showNotification}
          />
        </div>
        <Tabs.Root defaultValue="editor" className="flex flex-col">
          <Tabs.List className="flex border-b gap-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 px-4 [&>*]:cursor-pointer dark:[&>*]:hover:bg-gray-100/10 [&>*]:hover:bg-black/10">
            <Tabs.Trigger
              value="editor"
              className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300
    border-[1px] border-transparent rounded-t-md
    data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800
    data-[state=active]:border-gray-200 dark:data-[state=active]:border-gray-700
    data-[state=active]:border-b-white dark:data-[state=active]:border-b-gray-800
    focus:outline-none focus:ring-0 transition-colors"
            >
              Post
            </Tabs.Trigger>

            <Tabs.Trigger
              value="metadata"
              className="min-[1300px]:hidden px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300
    border border-transparent rounded-t-md
    data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800
    data-[state=active]:border-gray-200 dark:data-[state=active]:border-gray-700
    data-[state=active]:border-b-white dark:data-[state=active]:border-b-gray-800
    focus:outline-none focus:ring-0 transition-colors"
            >
              Meta-Data
            </Tabs.Trigger>

            <Tabs.Trigger
              value="preview"
              className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300
    border border-transparent rounded-t-md
    data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800
    data-[state=active]:border-gray-200 dark:data-[state=active]:border-gray-700
    data-[state=active]:border-b-white dark:data-[state=active]:border-b-gray-800
    focus:outline-none focus:ring-0 transition-colors"
            >
              Preview
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="editor" className="lg:p-1 overflow-auto">
            <JoditEditor
              storageKey="myBlogPost"
              formData={formData}
              formik={formik}
              editorT={editorT}
              name="editor"
              pendingImages={pendingImages}
              setPendingImages={setPendingImages}
              setNotifiMessage={setNotifiMessage}
              setShowNotification={setShowNotification}
            />
          </Tabs.Content>
          <Tabs.Content
            value="metadata"
            className="p-4 lg:p-6 overflow-auto min-[1300px]:hidden"
          >
            <BlogMetadataForm
              formData={formData}
              formik={formik}
              isFullscreen={isFullscreen}
              setIsFullscreen={setIsFullscreen}
              inputRefs={inputRefs}
              metadataT={metadataT}
            />
          </Tabs.Content>
          <Tabs.Content value="preview" className="p-4 lg:p-6 overflow-auto">
            <BlogPreview HtmContent={HtmContent} editor={editor} />
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </>
  );
}
