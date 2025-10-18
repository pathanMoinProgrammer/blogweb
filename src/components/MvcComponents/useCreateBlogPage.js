import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { arrayUnion } from 'firebase/firestore';
import { postDocRef, timestamp } from '@/firebase/firebaseRefs';
import { useCreateDoc } from '@/hooks/fireatoreHooks/useCreateDoc';
import { useReadDoc } from '@/hooks/fireatoreHooks/useReadDoc';
import { useBlogContext } from '@/hooks/costumHooks/blogMetadataContext';

export default function useCreateBlogPage() {
  const {
    blogName, setBlogName,
    enurl, setEnurl,
    title, setTitle,
    description, setDescription,
    imgUrl, setImgUrl,
    content, setContent,
    HtmContent, setHtmContent,
    author, setAuthor,
    clickable, setClickable,
  } = useBlogContext();

  const [isMounted, setIsMounted] = useState(false);
  const { loading, error, setDataWithLang } = useCreateDoc();
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale;
  const postid = params?.postid?.[0];
  const url = `${locale}slug`;

  const { parentRef, childRef } = postDocRef(postid, locale);
  const readedData = useReadDoc(postid ? childRef : null);
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
    if (typeof window === 'undefined') return;
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
        setHtmContent(data.htmlContent || '<p>Start Writing New Blog</p>');
      } catch (e) {
        console.warn('Error restoring draft', e);
      }
    }
  }, []);

  const objForData = {
    author,
    content,
    HtmContent,
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
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
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
      setClickable(false);
    } catch (err) {
      console.error('Error creating blog:', err);
    }
  };

  return {
    loading,
    error,
    handleCreateBlog,
    scheduleSaveDraft,
    setIsMounted,
    isMounted,

    blogName, setBlogName,
    enurl, setEnurl,
    title, setTitle,
    description, setDescription,
    imgUrl, setImgUrl,
    content, setContent,
    HtmContent, setHtmContent,
    author, setAuthor,
    clickable, setClickable,
  };
}
