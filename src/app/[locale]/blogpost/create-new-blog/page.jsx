'use client';

import { useState, useEffect, useRef } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import HardBreak from '@tiptap/extension-hard-break';
import CustomHorizontalRule from '@/components/blog/extensions/CustomHorizontalRule';
import BlogMetadataForm from '@/components/blog/BlogMetadataForm';
import BlogPreview from '@/components/blog/BlogPreview';
import Notification from '@/components/blog/Notification';
import { convertHtmlToMarkdown } from '@/lib/markdownConverter';
import ImageUploader from '@/components/blog/imageupload';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('@/components/blog/joditeditor.jsx'), {
  ssr: false,
});

export default function CreateBlogPage() {
  const [content, setContent] = useState('<p>Start Writing New Blog</p>');
  const [HtmContent, setHtmContent] = useState('Start Writing New Blog');
  const [isMounted, setIsMounted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [blogName, setBlogName] = useState('');
  const [author] = useState('Admin User');
  const [enurl, setEnurl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8kgiZG844gI5C6oNFnEmZtI1XIPEkMvxelQ&s',
  );
  const [isCreating, setIsCreating] = useState(false);

  const AUTO_SAVE_DELAY = 2000;
  const DRAFT_KEY = 'blogDraft';
  const saveTimeout = useRef(null);
  
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setBlogName(data.blogName || '');
          setEnurl(data.enurl || '');
          setTitle(data.title || '');
          setDescription(data.description || '');
          setImgUrl(data.imgUrl || '');
          setContent(data.content || '<p>Start Writing New Blog</p>');
        } catch (e) {
          console.warn('Error restoring draft', e);
        }
      }
    }
  }, []);

  const scheduleSaveDraft = (updatedData = {}) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      if (typeof window === 'undefined') return;

      const draft = {
        blogName,
        enurl,
        title,
        description,
        imgUrl,
        content,
        HtmContent,
        author,
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch (e) {
        console.error('Draft save failed:', e);
      }
    }, AUTO_SAVE_DELAY);
  };

  useEffect(() => {
    scheduleSaveDraft();
  }, [blogName, enurl, title, description, imgUrl, content]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, TextStyle, HardBreak, CustomHorizontalRule],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      scheduleSaveDraft({ content: html });
    },
    editorProps: {
      attributes: {
        class:
          'outline-none focus:outline-none focus:ring-0 whitespace-pre-wrap cursor-text min-h-[400px]',
      },
    },
  });

  const handleCreateBlog = async () => {
    if (!blogName || !enurl || !title || !description) {
      setNotificationMessage('❌ Please fill all required fields!');
      setShowNotification(true);
      return;
    }

    setIsCreating(true);

    try {
      const htmlContent = editor?.getHTML() || '';
      const markdownContent = convertHtmlToMarkdown(htmlContent);
      const now = new Date();
      const date = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const wordCount = markdownContent.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);
      const contee =
        markdownContent == ''
          ? content
          : markdownContent == ' '
          ? content
          : markdownContent;

      const fullMarkdown = `---
name: '${blogName}'
author: '${author}'
date: '${date}'
time: '${readTime} min read'
enurl: "${enurl}"
hiurl: null
title: "${title}"
img: '${imgUrl}'
description: "${description}"
---

${contee}`;

      const res = await fetch('/api/create-blog-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale: 'en',
          slug: enurl,
          content: fullMarkdown,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setNotificationMessage('✅ Blog created successfully!');
        setShowNotification(true);
        localStorage.removeItem(DRAFT_KEY);

        setBlogName('');
        setEnurl('');
        setTitle('');
        setDescription('');
        editor?.commands.setContent('<p>Start Writing New Blog</p>');
      } else {
        setNotificationMessage(`❌ Error: ${result.error}`);
        setShowNotification(true);
      }
    } catch (error) {
      setNotificationMessage(`❌ Failed: ${error.message}`);
      setShowNotification(true);
    } finally {
      setIsCreating(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-4 text-gray-500 dark:text-gray-400">
        Loading editor...
      </div>
    );
  }

  return (
    <>
      <Notification
        message={notificationMessage}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />

      {/* Main Layout */}
      <section className="w-full flex flex-col md:flex-row overflow-hidden bg-white dark:bg-gray-900">
        <div className="w-full md:flex-1 p-4 md:p-6 overflow-auto">
          <BlogMetadataForm
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
        </div>

        <div className="w-full md:w-1/3 p-4 md:p-6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <ImageUploader imgUrl={imgUrl} setImgUrl={setImgUrl} />
        </div>
      </section>

      {/* Editor Section */}
      <section className="w-screen min-h-[100px] flex flex-col lg:flex-row overflow-hidden bg-gray-50 dark:bg-gray-800">
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          <JoditEditor
            storageKey="myBlogPost"
            setHtmContent={setHtmContent}
            HtmContent={HtmContent}
            setContent={setContent}
            content={content}
          />
        </div>
      </section>

      {/* Preview Section */}
      <div className="w-full h-[600px] p-4 lg:p-6 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <BlogPreview content={content} editor={editor} />
      </div>

      {/* Final Review Section */}
      <section className="w-full flex flex-col justify-end p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">✅ Final Review</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Title</p>
                <p className="font-semibold text-gray-900 dark:text-white">{title || 'Untitled'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Status</p>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-sm">
                  Ready to Publish
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateBlog}
            disabled={isCreating}
            className="w-full px-8 py-4 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold text-lg rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-xl fixed bottom-2 left-1/2 transform -translate-x-1/2 md:w-auto md:bottom-8 z-10 border border-green-600 dark:border-green-500"
          >
            {isCreating ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Publishing...
              </>
            ) : (
              <>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                🚀 Publish Blog Post
              </>
            )}
          </button>
        </div>
      </section>
    </>
  );
}