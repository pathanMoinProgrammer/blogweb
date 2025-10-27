import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { arrayUnion } from 'firebase/firestore';
import { postDocRef, timestamp } from '@/firebase/firebaseRefs';
import { useCreateDoc } from '@/hooks/fireatoreHooks/useCreateDoc';
import { useReadDoc } from '@/hooks/fireatoreHooks/useReadDoc';
import { useMemo } from 'react';
import { useFormik } from 'formik';
import { blogSchema } from '../../components/yupValidSchema';

export default function useCreateBlogPage() {
  const [formData, setFormData] = useState({
    blogName: '',
    slug: '',
    title: '',
    description: '',
    imgUrl: '',
    content: '',
    HtmContent: '',
    author: 'admin',
    type: '',
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notifyMessage, setNotifiMessage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [type, setType] = useState('');

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

  const {
    loading: relativeLoad,
    error: relativeErr,
    data,
    languages: relateLangs,
    ids,
  } = useReadDoc({
    ref: childRef,
    ref2: parentRef,
    postid: postid,
    locale: locale,
    parentRead: true,
  });

  useEffect(() => {
    if (data !== undefined && data?.type) {
      setType(data?.type);
    }
  }, [data?.type]);

  const AUTO_SAVE_DELAY = 2000;
  const DRAFT_KEY = 'blogDraft';
  const saveTimeout = useRef(null);

  useEffect(() => {
    if (data && data !== undefined && Object.keys(data).length > 0) {
      const d = data;
      setFormData((prev) => ({
        ...prev,
        ...d,
      }));
    }
  }, [data]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window == 'undefined') return;
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          blogName: data.blogName || '',
          slug: data.slug || '',
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
        slug: formData.slug,
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
        [url]: values.slug,
        slug: arrayUnion(values.slug),
        lang: locale,
        updatedAt: timestamp(),
      });
      await setDataWithLang(childRef, {
        ...values,
        slug: values.slug,
        lang: locale,
        updatedAt: timestamp(),
      });
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
      if (values.type == 'publish') {
        await handleCreateBlog({ ...values, type: 'publish' });
        setType('publish');
        localStorage.removeItem('blogDraft');
        setNotifiMessage('Your Blog was Published ✅ Successfully!!');
        setTimeout(() => {
          setShowNotification(true);
        }, 0);
      } else if (values.type == 'draft') {
        scheduleSaveDraft({ ...values, type: 'draft' });
        await handleCreateBlog({ ...values, type: 'draft' });
        setType('draft');
        setNotifiMessage('Your Blog was Saved to Draft ✅ Successfully');
        setTimeout(() => {
          setShowNotification(true);
        }, 0);
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
    formik,
    refArray,
    locale,
    notifyMessage,
    setNotifiMessage,
    languages: relateLangs,
    isFullscreen,
    setIsFullscreen,
    type,
  };
}
