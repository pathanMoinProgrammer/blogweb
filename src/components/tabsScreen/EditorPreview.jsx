'use client';

import * as Tabs from '@radix-ui/react-tabs';
import JoditEditor from '@/components/blog/joditeditor';
import BlogPreview from '@/components/blog/BlogPreview';
import BlogMetadataForm from '../blog/BlogMetadataForm';
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
    <section className="w-full min-h-[400px] max-[700px]:mt-10  bg-gray-50   dark:bg-gray-800">
      <Tabs.Root defaultValue="editor" className="flex flex-col">
        <Tabs.List className="flex border-b gap-[4px]  border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4">
          <Tabs.Trigger
            value="editor"
            className=" border-t-[0.5px]  rounded-t-[4px] border-r-[0.5px] border-l-[0.5px] border-black px-6 cursor-pointer py-2 text-sm font-medium  text-gray-700 dark:text-gray-300 data-[state=active]:text-blue-500 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 dark:data-[state=active]:border-blue-400 transition-all"
          >
            Post
          </Tabs.Trigger>

          <Tabs.Trigger
            value="metadata"
            className="px-4 min-[700px]:hidden  border-t-[0.5px] rounded-t-[4px]  border-r-[0.5px] border-l-[0.5px] border-black cursor-pointer py-2 text-sm font-medium text-gray-700 dark:text-gray-300 data-[state=active]:text-blue-500 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 dark:data-[state=active]:border-blue-400 transition-all"
          >
            Meta Data
          </Tabs.Trigger>

          <Tabs.Trigger
            value="preview"
            className="px-4  border-t-[0.5px] rounded-t-[4px]  border-r-[0.5px] border-l-[0.5px] border-black cursor-pointer py-2 text-sm font-medium text-gray-700 dark:text-gray-300 data-[state=active]:text-blue-500 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 dark:data-[state=active]:border-blue-400 transition-all"
          >
            Preview
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="editor" className=" lg:p-1  overflow-auto">
          <JoditEditor
            storageKey="myBlogPost"
            setHtmContent={setHtmContent}
            HtmContent={HtmContent}
            setContent={setContent}
            content={content} 

          />
        </Tabs.Content>
        <Tabs.Content value="metadata" className="p-4 lg:p-6 overflow-auto">
          <BlogFormSection
                  blogName={blogName}
                  setBlogName={(v) => {
                    setBlogName(v);
                    scheduleSaveDraft({ blogName: v });
                  }}
                  author={author}
                  enurl={enurl}
                  setEnurl={(v) => {
                    setEnurl(v);
                    scheduleSaveDraft({ enurl: v });
                  }}
                  title={title}
                  setTitle={(v) => {
                    setTitle(v);
                    scheduleSaveDraft({ title: v });
                  }}
                  description={description}
                  setDescription={(v) => {
                    setDescription(v);
                    scheduleSaveDraft({ description: v });
                  }}
                  imgUrl={imgUrl}
                  setImgUrl={setImgUrl}
                />
        </Tabs.Content>
        <Tabs.Content value="preview" className="p-4 lg:p-6 overflow-auto">
          <BlogPreview content={content} editor={editor} />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
