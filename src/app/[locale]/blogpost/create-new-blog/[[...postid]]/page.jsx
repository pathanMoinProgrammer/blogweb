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
import { Button } from '@/components/ui/button';
import { postDocRef, timestamp, translationsCg } from '@/firebase/firebaseRefs';
import { setDoc, addDoc, collection, doc, arrayUnion } from 'firebase/firestore';
import { useCreateDoc } from '@/hooks/fireatoreHooks/useCreateDoc';
import { useReadDoc } from '@/hooks/fireatoreHooks/useReadDoc';
import { useParams } from 'next/navigation';

const JoditEditor = dynamic(() => import('@/components/blog/joditeditor.jsx'), {
  ssr: false,
});

export default function CreateBlogPage() {
  const { loading, error, data, setData, setDataWithLang } = useCreateDoc();
  const [content, setContent] = useState('<p>Start Writing New Blog</p>');
  const [HtmContent, setHtmContent] = useState('<p>Start Writing New Blog</p>');
  const [isMounted, setIsMounted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [blogName, setBlogName] = useState('');
  const [author, setAuthor] = useState('Admin User');
  const [enurl, setEnurl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8kgiZG844gI5C6oNFnEmZtI1XIPEkMvxelQ&s',);
  const setIsclear = useSetAtom(isClear);
  const params = useParams();
  const locale = params?.locale;
  const postidarray = params?.postid;
  const postid = postidarray?.[0];
  let url = `${locale}slug`;
  const objForData = {
    author: author,
    content: content,
    htmlContent: HtmContent,
    createdAt: timestamp(),
    description: description,
    imgUrl: imgUrl,
    lang: locale,
    slug: enurl,
    status: 'draft',
    title: title,
    updatedAt: timestamp(),
  };

  const state =
    postid != undefined ? useReadDoc(postDocRef(postid, locale)[1]) : null;

  useEffect(() => {
    if (state && state?.data && Object.keys(state.data).length > 0) {
      const d = state.data;
      setBlogName(d.slug || '');
      setTitle(d.title || '');
      setDescription(d.description || '');
      setImgUrl(d.imgUrl || '');
      setEnurl(d.slug || '');
      setContent(d.content || '<p>Start Writing New Blog</p>');
      setHtmContent(d.content || '<p>Start Writing New Blog</p>');
    }
  }, [state ? state.data : enurl]);

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

  // const scheduleSaveDraft = (updatedData = {}) => {
  //   if (saveTimeout.current) clearTimeout(saveTimeout.current);
  //   saveTimeout.current = setTimeout(() => {
  //     if (typeof window === 'undefined') return;

  //     const draft = {
  //       blogName,
  //       enurl,
  //       title,
  //       description,
  //       imgUrl,
  //       content,
  //       HtmContent,
  //       author,
  //       ...updatedData,
  //       updatedAt: new Date().toISOString(),
  //     };

  //     // console.log(draft, "draft, draft")

  //     try {
  //       localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  //     } catch (e) {
  //       console.error('Draft save failed:', e);
  //     }
  //   }, AUTO_SAVE_DELAY);
  // };

  // useEffect(() => {
  //   scheduleSaveDraft();
  // }, [blogName, enurl, title, description, imgUrl, content, HtmContent]);

  const handleCreateBlog = async () => {
    const [parentRef, childRef] = postDocRef(postid, locale);

    try {
      await setDataWithLang(parentRef, {
        ...objForData,
        languages: arrayUnion(locale),
        [url]: enurl,
      });

      await setDataWithLang(childRef, objForData);
      console.log('its called');
    } catch (error) {
      console.error('error', error);
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
    <div className="dark:bg-gray-800 relative">
      <Notification
        message={notificationMessage}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />

      <EditorPreviewTabs
        content={content}
        setContent={setContent}
        HtmContent={HtmContent}
        setHtmContent={setHtmContent}
        editor={null}
        blogName={blogName}
        setBlogName={(v) => {
          setBlogName(v);
          // scheduleSaveDraft({ blogName: v });
        }}
        author={author}
        enurl={enurl}
        setEnurl={(v) => {
          setEnurl(v);
          // scheduleSaveDraft({ enurl: v });
        }}
        title={title}
        setTitle={(v) => {
          setTitle(v);
          // scheduleSaveDraft({ title: v });
        }}
        description={description}
        setDescription={(v) => {
          setDescription(v);
          // scheduleSaveDraft({ description: v });
        }}
        imgUrl={imgUrl}
        setImgUrl={setImgUrl}
      />

      <div className="max-[1300px]:hidden">
        <BlogFormSection
          blogName={blogName}
          setBlogName={(v) => {
            setBlogName(v);
            // scheduleSaveDraft({ blogName: v });
          }}
          author={author}
          enurl={enurl}
          setEnurl={(v) => {
            setEnurl(v);
            // scheduleSaveDraft({ enurl: v });
          }}
          title={title}
          setTitle={(v) => {
            setTitle(v);
            // scheduleSaveDraft({ title: v });
          }}
          description={description}
          setDescription={(v) => {
            setDescription(v);
            // scheduleSaveDraft({ description: v });
          }}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
        />
      </div>
      {/* <FinalReviewSection
        title={title}
        isCreating={isCreating}
        handleCreateBlog={handleCreateBlog}
      /> */}
      <div className="absolute top-0 right-2 gap-5 z-5 [&>*]:rounded [&>*]:min-w-[100px] [&>*]:mx-3 [&>*]:cursor-pointer [&>*]:min-h-10 ">
        <button className="bg-yellow-500/60" onClick={handleCreateBlog}>
          Save Draft
        </button>
        <button className=" bg-green-500/80">Publish</button>
        {/* <button className=" bg-red-500/60">Delete</button> */}
      </div>
    </div>
  );
}
