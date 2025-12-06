import { useEffect, useRef, useState, useMemo } from 'react';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { arrayUnion } from 'firebase/firestore';
import { postDocRef, timestamp } from '@/firebase/firebaseRefs';
import { useCreateDoc } from '@/hooks/fireatoreHooks/useCreateDoc';
import { useReadDoc } from '@/hooks/fireatoreHooks/useReadDoc';
import { useFormik } from 'formik';
import { blogSchema } from '../../components/yupValidSchema';
import { useGameTranslations } from '@/components/traslatorclient';

function getFormattedDateTime(type) {
  const now = new Date();

  switch (type) {
    case 'date': {
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);
      return `${day}-${month}-${year}`;
    }
    case 'hh-mm': {
      let hours = now.getHours();
      let minutes = now.getMinutes();
      hours = hours % 12 || 12;

      const hh = String(hours).padStart(2, '0');
      const mm = String(minutes).padStart(2, '0');
      return `${hh}-${mm}`;
    }
    case 'ampm': {
      return now.getHours() >= 12 ? 'PM' : 'AM';
    }
    default: {
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);

      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const hh = String(hours).padStart(2, '0');
      const mm = String(minutes).padStart(2, '0');

      return `${day}-${month}-${year} ${hh}-${mm} ${ampm}`;
    }
  }
}

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
    date: getFormattedDateTime('date'),
    hh: getFormattedDateTime('hh-mm').split('-')?.[0],
    mm: getFormattedDateTime('hh-mm').split('-')?.[1],
    ampm: getFormattedDateTime('ampm'),
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notifyMessage, setNotifiMessage] = useState({
    type: 'success',
    message: [],
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [type, setType] = useState('');
  const [pendingImages, setPendingImages] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [reactions, setReactions] = useState({
    angry: 0,
    fire: 0,
    laugh: 0,
    like: 0,
    love: 0,
  });

  const { loading, error, setDataWithLang } = useCreateDoc();
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale;
  const postid = params?.postid?.[0];
  const url = `${locale}slug`;

  const {
    translations,
    language,
    error: translationError,
  } = useGameTranslations({ lang: locale });

  const t = translations?.createBlogPage;
  const notifyT = t?.notification;
  const metadataT = t?.metadata;
  const editorT = t?.editor;

  const inputRefs = React.useMemo(
    () => ({
      title: [React.createRef(), React.createRef()],
      blogName: [React.createRef()],
      slug: [React.createRef()],
      description: [React.createRef()],
      imgUrl: [React.createRef()],
      editor: [React.createRef()],
    }),
    [],
  );

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
      if (typeof data?.reactions !== undefined) {
        setReactions(data?.reactions);
      }
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
          HtmContent: data.htmContent || '<p>Start Writing New Blog</p>',
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
        HtmContent: `${values?.content?.split(0, 20)}...`,
        content: `${values?.content?.split(0, 20)}...`,
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
        reactions: reactions,
        hhmm: `${values.hh}:${values.mm}`,
        ampm: `${values.ampm}`,
      });
    } catch (err) {
      console.error('Error creating blog:', err);
    }
  };

  const uploadImages = async (slug) => {
    const uploadedUrls = [];

    for (let i = 0; i < pendingImages.length; i++) {
      const f = pendingImages[i];

      const type = f?.type?.split('/')?.[1]?.toLocaleLowerCase();

      const formDataSend = new FormData();
      formDataSend.append('file', f);
      formDataSend.append('slug', slug);
      formDataSend.append('index', i);
      formDataSend.append('type', type);

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formDataSend,
      });

      const data = await res.json();
      uploadedUrls.push(data.url);
      return uploadedUrls;
    }
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: blogSchema,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!values.type) return;
      if (values.type == 'publish') {
        setType('publish');
        const urls = await uploadImages(values.slug);

        await handleCreateBlog({
          ...values,
          type: 'publish',
          imagesUploaded: urls.length >= 0 ? urls.length : 0,
        });

        setType('publish');
        localStorage.removeItem('blogDraft');
        setNotifiMessage({
          type: 'success',
          message: ['Your Blog was Published ✅ Successfully!!'],
        });
        setTimeout(() => {
          setShowNotification(true);
        }, 0);
      } else if (values.type == 'draft') {
        scheduleSaveDraft({ ...values, type: 'draft' });

        setType('draft');
        await handleCreateBlog({ ...values, type: 'draft' });
        setType('draft');
        setNotifiMessage({
          type: 'success',
          message: ['Your Blog was Saved to Draft ✅ Successfully'],
        });
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

  const handleFocusField = (fieldName) => {
    const refs = inputRefs[fieldName];
    if (Array.isArray(refs)) {
      refs.forEach((ref) => ref.current?.focus());
    } else {
      refs?.current?.focus();
    }
  };

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
    inputRefs,
    handleFocusField,
    pendingImages,
    setPendingImages,
    t,
    notifyT,
    metadataT,
    editorT,
  };
}
