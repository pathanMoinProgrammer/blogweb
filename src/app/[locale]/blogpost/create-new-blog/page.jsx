'use client';

import { useState, useEffect, useRef } from 'react';
import Notification from '@/components/blog/Notification';
import { convertHtmlToMarkdown } from '@/lib/markdownConverter';
import dynamic from 'next/dynamic';
import BlogFormSection from '@/components/tabsScreen/BlogMetaData';
import EditorPreviewTabs from '@/components/tabsScreen/EditorPreview';
import FinalReviewSection from '@/components/tabsScreen/FinalPreview';
import { useSetAtom } from 'jotai';
import { isClear } from '@/components/jotai';

const JoditEditor = dynamic(() => import('@/components/blog/joditeditor.jsx'), {
  ssr: false,
});

export default function CreateBlogPage() {
  const [content, setContent] = useState('<p>Start Writing New Blog</p>');
  const [HtmContent, setHtmContent] = useState('<p>Start Writing New Blog</p>');
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
  const setIsclear = useSetAtom(isClear)

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
          setHtmContent(data.HtmContent || '<p>Start Writing New Blog</p>');
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

      // console.log(draft, "draft, draft")

      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch (e) {
        console.error('Draft save failed:', e);
      }
    }, AUTO_SAVE_DELAY);
  };

  useEffect(() => {
    scheduleSaveDraft();
  }, [blogName, enurl, title, description, imgUrl, content, HtmContent]);

  const handleCreateBlog = async () => {
    if (!blogName || !enurl || !title || !description) {
      setNotificationMessage('❌ Please fill all required fields!');
      setShowNotification(true);
      return;
    }

    setIsCreating(true);

    try {
      const markdownContent = convertHtmlToMarkdown(HtmContent);
      const now = new Date();
      const date = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const wordCount = markdownContent.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);

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

${markdownContent}`;

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
        setIsclear(true)

        setBlogName('');
        setEnurl('');
        setTitle('');
        setDescription('');
        setContent('<p>Start Writing New Blog</p>');
        setHtmContent('<p>Start Writing New Blog</p>');
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
    )
  }

  return (
    <div className="dark:bg-gray-800">
      <Notification
        message={notificationMessage}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <div className="max-[1300px]:hidden">
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
      </div>

      <EditorPreviewTabs
        content={content}
        setContent={setContent}
        HtmContent={HtmContent}
        setHtmContent={setHtmContent}
        editor={null} 
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

      <FinalReviewSection
        title={title}
        isCreating={isCreating}
        handleCreateBlog={handleCreateBlog}
      />
    </div>
  );
}