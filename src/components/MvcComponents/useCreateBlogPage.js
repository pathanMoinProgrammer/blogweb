'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { arrayUnion } from 'firebase/firestore';
import { postDocRef, timestamp } from '@/firebase/firebaseRefs';
import { useCreateDoc } from '@/hooks/fireatoreHooks/useCreateDoc';
import { useReadDoc } from '@/hooks/fireatoreHooks/useReadDoc';

export default function useCreateBlogPage() {
  const { loading, error, data, setDataWithLang } = useCreateDoc();
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
  const [imgUrl, setImgUrl] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8kgiZG844gI5C6oNFnEmZtI1XIPEkMvxelQ&s',
  );
  const [clickable, setClickAble] = useState(true);

  const params = useParams();
  const router = useRouter();
  const locale = params?.locale;
  const postidarray = params?.postid;
  const postid = postidarray?.[0];
  const url = `${locale}slug`;

  const { parentRef, childRef } = postDocRef(postid, locale);
  let readedData = useReadDoc(childRef);
  const state = postid ? readedData : null;

  const AUTO_SAVE_DELAY = 2000;
  const DRAFT_KEY = 'blogDraft';
  const saveTimeout = useRef(null);

  useEffect(() => {
    if (state?.data && Object.keys(state.data).length > 0) {
      const d = state.data;
      setBlogName(d.slug || '');
      setTitle(d.title || '');
      setDescription(d.description || '');
      setImgUrl(d.imgUrl || '');
      setEnurl(d.slug || '');
      setContent(d.content || '<p>Start Writing New Blog</p>');
      setHtmContent(d.content || '<p>Start Writing New Blog</p>');
    }
  }, [state?.data]);

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

  const objForData = {
    author,
    content,
    htmlContent: HtmContent,
    createdAt: timestamp(),
    description,
    imgUrl,
    lang: locale,
    slug: enurl,
    status: 'draft',
    title,
    updatedAt: timestamp(),
  };

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

  const handleCreateBlog = async () => {
    try {
      await setDataWithLang(parentRef, {
        ...objForData,
        languages: arrayUnion(locale),
        [url]: enurl,
      });

      await setDataWithLang(childRef, objForData);
      router.push(`/${locale}/my-profile`);
      setClickAble(false);
    } catch (err) {
      console.error('Error creating blog:', err);
      setNotificationMessage('Failed to publish blog.');
      setShowNotification(true);
    }
  };

  return {
    // states
    loading,
    error,
    content,
    HtmContent,
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

    // setters
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

    // handlers
    handleCreateBlog,
    scheduleSaveDraft,
  };
}
