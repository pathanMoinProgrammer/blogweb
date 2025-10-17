'use client';
import * as Tabs from '@radix-ui/react-tabs';
import JoditEditor from '@/components/blog/joditeditor';
import BlogPreview from '@/components/blog/BlogPreview';
import BlogFormSection from './BlogMetaData';

export default function EditorPreviewTabs({
  content,
  setContent,
  HtmContent,
  setHtmContent,
  editor,
  blogName,
  setBlogName,
  author,
  enurl,
  setEnurl,
  title,
  setTitle,
  description,
  setDescription,
  imgUrl,
  setImgUrl,
}) {
  return (
    <section className="w-full min-h-[400px] mt-5 max-[1300px]:mt-10 dark:bg-gray-800">
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
            setHtmContent={setHtmContent}
            HtmContent={HtmContent}
            setContent={setContent}
            content={content}
          />
        </Tabs.Content>
        <Tabs.Content value="metadata" className="p-4 lg:p-6 overflow-auto min-[1300px]:hidden">
          <BlogFormSection
            blogName={blogName}
            setBlogName={setBlogName}
            author={author}
            enurl={enurl}
            setEnurl={setEnurl}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            imgUrl={imgUrl}
            setImgUrl={setImgUrl}
          />
        </Tabs.Content>
        <Tabs.Content value="preview" className="p-4 lg:p-6 overflow-auto">
          <BlogPreview HtmContent={HtmContent} editor={editor} />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}

