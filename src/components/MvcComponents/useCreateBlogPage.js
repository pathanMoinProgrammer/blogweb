import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { arrayUnion } from 'firebase/firestore';
import { postDocRef } from '@/firebase/firebaseRefs';
import { useCreateDoc } from '@/hooks/fireatoreHooks/useCreateDoc';
import { useReadDoc } from '@/hooks/fireatoreHooks/useReadDoc';
import { useMemo } from 'react';
import { useFormik } from 'formik';
import { blogSchema } from '../yupValidSchema';
import { arrayAtom } from '../jotai';
import { useAtomValue } from 'jotai';

export default function useCreateBlogPage() {
  const [formData, setFormData] = useState({
    blogName: '',
    enurl: '',
    title: '',
    description: '',
    imgUrl: '',
    content: '',
    HtmContent: '',
    author: '',
    type: '',
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notifyMessage, setNotifiMessage] = useState(null);

  const [isMounted, setIsMounted] = useState(false);
  const { loading, error, setDataWithLang } = useCreateDoc();
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale;
  const postid = params?.postid?.[0];
  const url = `${locale}slug`;

  const { parentRef, childRef } = useMemo(() => {
    if (!postid || !locale) return { parentRef: null, childRef: null };
    return postDocRef(postid, locale);
  }, [postid, locale]);
  const refArray = [parentRef, childRef];

  const state = useReadDoc(parentRef, postid, locale);

  const AUTO_SAVE_DELAY = 2000;
  const DRAFT_KEY = 'blogDraft';
  const saveTimeout = useRef(null);

  useEffect(() => {
    if (state?.data && Object.keys(state.data).length > 0) {
      const d = state.data;
      setFormData((prev) => ({
        ...prev,
        blogName: d.slug || '',
        enurl: d.slug || '',
        title: d.title || '',
        description: d.description || '',
        imgUrl: d.imgUrl || '',
        content: d.content || '<p>Start Writing New Blog</p>',
        HtmContent: d.content || '<p>Start Writing New Blog</p>',
        author: d.author || 'Admin User',
      }));
    }
    // console.log(localStorage.getItem('blogDraft'));
  }, [state?.data]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          blogName: data.blogName || '',
          enurl: data.enurl || '',
          title: data.title || '',
          description: data.description || '',
          imgUrl: data.imgUrl || '',
          content: data.content || '<p>Start Writing New Blog</p>',
          HtmContent: data.htmlContent || '<p>Start Writing New Blog</p>',
          author: data.author || prev.author,
        }));
      } catch (e) {
        console.warn('Error restoring draft', e);
      }
    }
    return () => {
      setIsMounted(false);
    };
  }, []);

  const scheduleSaveDraft = (updatedData = {}) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      const draft = {
        ...updatedData,
        author: formData.author,
        content: formData.content,
        HtmContent: formData.HtmContent,
        description: formData.description,
        imgUrl: formData.imgUrl,
        lang: locale,
        slug: formData.enurl,
        status: 'draft',
        title: formData.title,
      };

      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }, AUTO_SAVE_DELAY);
  };

  const handleCreateBlog = async (values) => {
    try {
      await setDataWithLang(parentRef, {
        ...values,
        languages: arrayUnion(locale),
        [url]: values.enurl,
      });
      await setDataWithLang(childRef, values);
    } catch (err) {
      console.error('Error creating blog:', err);
    }
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: blogSchema,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values, 'checking value and type');
      if (values.type == 'publish') {
        await handleCreateBlog(values);
        setShowNotification(true);
      } else if (values.type == 'draft') {
        scheduleSaveDraft(values);
      }
    },
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    loading,
    formData,
    error,
    scheduleSaveDraft,
    setIsMounted,
    isMounted,
    showNotification,
    setShowNotification,
    postid,
    state,
    formik,
    refArray,
    locale,
    notifyMessage,
    setNotifiMessage,
  };
}
