import { useEffect, useRef, useState, useMemo } from 'react';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { arrayUnion, doc } from 'firebase/firestore';
import {
  postDocRef,
  timestamp,
} from '@/firebase/firebaseRefs';
import { useCreateDoc } from '../fireatoreHooks/useCreateDoc';
import { useReadDoc } from '../fireatoreHooks/useReadDoc';
import { useFormik } from 'formik';
import { blogSchema } from '@/components/yupValidSchema';
import { removeEmptyFields, emptyLanguagedInstance } from '@/lib/emptyInstances';
import { uploadThumbnailToR2 } from '@/app/actions/thumbnail-upload';
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
    timetoread: '5 minute',
    date: getFormattedDateTime('date'),
    hh: getFormattedDateTime('hh-mm').split('-')?.[0],
    mm: getFormattedDateTime('hh-mm').split('-')?.[1],
    ampm: getFormattedDateTime('ampm'),
    language: 'en',
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notifyMessage, setNotifiMessage] = useState({
    type: 'success',
    message: [],
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [type, setType] = useState('');
  const [pendingImages, setPendingImages] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
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
  const lang = params?.locale || 'en';
  const [locale, setLocale] = useState(lang);
  const postidArray = params?.postid;
  const postid = Array.isArray(postidArray) && postidArray.length > 0 ? postidArray[0] : postidArray;
  const url = `${locale}slug`;
 

  useEffect(()=>{
    if(locale === "all"){
      setLocale('en')
    }
  }, [lang])


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

  const getChangedReactions = (original = {}, current = {}) => {
    const changed = {};
    let hasChange = false;

    Object.keys(current).forEach((key) => {
      const prev = original?.[key] ?? 0;
      const now = current[key] ?? 0;

      if (now > 0 && now !== prev) {
        changed[key] = now;
        hasChange = true;
      }
    });

    return hasChange ? changed : null;
  };

  useEffect(() => {
    if (data !== undefined && data?.type) {
      setType(data?.type);
    }
  }, [data?.type]);

  useEffect(() => {
    if (!data || typeof data !== 'object') return;

    const cleanedData = removeEmptyFields(data);

    if (Object.keys(cleanedData).length === 0) return;

    setFormData((prev) => ({
      ...prev,
      ...cleanedData,
    }));

    if (cleanedData.reactions && typeof cleanedData.reactions === 'object') {
      setReactions((prev) => ({
        ...prev,
        ...cleanedData.reactions,
      }));
    }
  }, [data]);

  const AUTO_SAVE_DELAY = 2000;
  const DRAFT_KEY = 'blogDraft';
  const saveTimeout = useRef(null);

  // useEffect(() => {
  //   if (data && data !== undefined && Object.keys(data).length > 0) {
  //     const d = data;
  //     setFormData((prev) => ({
  //       ...prev,
  //       ...d,
  //     }));
  //     if (typeof data?.reactions !== undefined) {
  //       setReactions(data?.reactions);
  //     }
  //   }
  // }, [data]);

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
    let currentParentRef = parentRef;
    let currentChildRef = childRef;
    let currentPostid = postid;
    const changedReactions = getChangedReactions(
      data?.reactions || {},
      reactions,
    );
  

    try {
      await setDataWithLang(currentParentRef, {
        ...values,
        HtmContent: `${values?.content.slice(0, 20)}...`,
        content: `${values?.content?.slice(0, 20)}...`,
        id: postid,
        languages: arrayUnion(locale),
        [url]: values.slug,
        slug: arrayUnion(values.slug),
        lang: locale,
        updatedAt: timestamp(),
        
      });
      await setDataWithLang(currentChildRef, {
        ...values,
        id: postid,
        slug: values.slug,
        lang: locale,
        updatedAt: timestamp(),
          ...(changedReactions ? { reactions: changedReactions } : {}),
        hhmm: `${values.hh}:${values.mm}`,
        ampm: `${values.ampm}`,
        // imgUrl:t
      });

      return currentPostid;
    } catch (err) {
      console.warn('Error creating blog:', err);
      throw err;
    }
  };



  const uploadThumbnail = async (slug) => {
  if (!thumbnailFile) return null;

  try {
    const formDataSend = new FormData();
    formDataSend.append('file', thumbnailFile);
    formDataSend.append('slug', slug);
    formDataSend.append('type', thumbnailFile?.type?.split('/')?.[1]);

    // Call Server Action directly (no fetch!)
    const result = await uploadThumbnailToR2(formDataSend);

    if (!result.success) {
      console.warn('Thumbnail upload failed:', result.error);
      return null;
    }

    if (!result.url) {
      console.warn('No URL returned from upload');
      return null;
    }

    return result.url;
  } catch (err) {
    console.error('Thumbnail upload error:', err);
    return null;
  }
};

  const formik = useFormik({
    initialValues: formData,
    validationSchema: blogSchema,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,

    // onSubmit: async (values) => {
    //   if (!values.type) return;

    //   try {
    //     if (values.type === 'publish') {
    //       setType('publish');


    //       const thumbnailUploadPromise = await uploadThumbnail(values.slug);

    //       const [thumbnailUrl] = await Promise.all([
    //         // imageUploadPromise,
    //         thumbnailUploadPromise,
    //       ]);

    //       const publishedPostid = await handleCreateBlog({
    //         ...values,
    //         type: 'publish',
    //         imagesUploaded: pendingImages?.length || 0,
    //         imgUrl: values?.imgUrl!== "setCloudFlare"?values?.imgUrl : thumbnailUrl ,
    //       });

    //       // clear draft
    //       localStorage.removeItem('blogDraft');

    //       setNotifiMessage({
    //         type: 'success',
    //         message: ['Your Blog was Published ✅ Successfully!!'],
    //       });

    //       setTimeout(() => setShowNotification(true), 0);
    //     }

    //     // ---- SAVE AS DRAFT ----
    //     else if (values.type === 'draft') {
    //       scheduleSaveDraft({ ...values, type: 'draft' });

    //       await handleCreateBlog({ ...values, type: 'draft' });

    //       setNotifiMessage({
    //         type: 'success',
    //         message: ['Your Blog was Saved to Draft ✅ Successfully'],
    //       });

    //       setTimeout(() => setShowNotification(true), 0);
    //     }
    //   } catch (err) {
    //     console.warn('⚠ Serious: Blog submission failed:', err);

    //     setNotifiMessage({
    //       type: 'error',
    //       message: ['⚠ Serious: Failed to publish blog. Check console.'],
    //     });

    //     setTimeout(() => setShowNotification(true), 0);
    //   }
    // },
     onSubmit: async (values) => {
      if (!values.type) return;

      try {
        if (values.type === 'publish') {
          setType('publish');


         const thumbnailUrl = await uploadThumbnail(values.slug);


          const publishedPostid = await handleCreateBlog({
            ...values,
            type: 'publish',
            imagesUploaded: pendingImages?.length || 0,
            imgUrl: values?.imgUrl!== "setCloudFlare"?values?.imgUrl : thumbnailUrl ,
          });

          // clear draft
          localStorage.removeItem(DRAFT_KEY);

          setNotifiMessage({
            type: 'success',
            message: ['Your Blog was Published ✅ Successfully!!'],
          });

          setTimeout(() => setShowNotification(true), 0);
        }

        // ---- SAVE AS DRAFT ----
        else if (values.type === 'draft') {
          scheduleSaveDraft({ ...values, type: 'draft' });

          await handleCreateBlog({ ...values, type: 'draft' });

          setNotifiMessage({
            type: 'success',
            message: ['Your Blog was Saved to Draft ✅ Successfully'],
          });

          setTimeout(() => setShowNotification(true), 0);
        }
      } catch (err) {
        console.warn('⚠ Serious: Blog submission failed:', err);

        setNotifiMessage({
          type: 'error',
          message: ['⚠ Serious: Failed to publish blog. Check console.'],
        });

        setTimeout(() => setShowNotification(true), 0);
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
    setLocale,
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
    thumbnailFile,
    setThumbnailFile,
    thumbPreview,
    setThumbPreview,
    reactions,
    setReactions,
        t,
    notifyT,
    metadataT,
    editorT,
  };
}
