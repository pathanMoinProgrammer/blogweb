// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Notification from '@/components/blog/Notification';
// import { convertHtmlToMarkdown } from '@/lib/markdownConverter';
// import dynamic from 'next/dynamic';
// import BlogFormSection from '@/components/tabsScreen/BlogMetaData';
// import EditorPreviewTabs from '@/components/tabsScreen/EditorPreview';
// import FinalReviewSection from '@/components/tabsScreen/FinalPreview';
// import { useSetAtom } from 'jotai';
// import { isClear } from '@/components/jotai';
// import { Button } from '@/components/ui/button';
// import { postDocRef, timestamp, translationsCg } from '@/firebase/firebaseRefs';
// import {
//   setDoc,
//   addDoc,
//   collection,
//   doc,
//   arrayUnion,
// } from 'firebase/firestore';
// import { useCreateDoc } from '@/hooks/fireatoreHooks/useCreateDoc';
// import { useReadDoc } from '@/hooks/fireatoreHooks/useReadDoc';
// import { useParams, useRouter } from 'next/navigation';
// import { Loader2 } from 'lucide-react';

// const JoditEditor = dynamic(() => import('@/components/blog/joditeditor.jsx'), {
//   ssr: false,
// });

// export default function CreateBlogPage() {
//   const { loading, error, data, setData, setDataWithLang } = useCreateDoc();
//   const [content, setContent] = useState('<p>Start Writing New Blog</p>');
//   const [HtmContent, setHtmContent] = useState('<p>Start Writing New Blog</p>');
//   const [isMounted, setIsMounted] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);
//   const [notificationMessage, setNotificationMessage] = useState('');
//   const [blogName, setBlogName] = useState('');
//   const [author, setAuthor] = useState('Admin User');
//   const [enurl, setEnurl] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [imgUrl, setImgUrl] = useState(
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8kgiZG844gI5C6oNFnEmZtI1XIPEkMvxelQ&s',
//   );
//   const setIsclear = useSetAtom(isClear);
//   const params = useParams();
//   const router = useRouter();
//   const locale = params?.locale;
//   const postidarray = params?.postid;
//   const postid = postidarray?.[0];
//   let url = `${locale}slug`;
//   const objForData = {
//     author: author,
//     content: content,
//     htmlContent: HtmContent,
//     createdAt: timestamp(),
//     description: description,
//     imgUrl: imgUrl,
//     lang: locale,
//     slug: enurl,
//     status: 'draft',
//     title: title,
//     updatedAt: timestamp(),
//   };

//   const state =
//     postid != undefined ? useReadDoc(postDocRef(postid, locale)[1]) : null;

//   useEffect(() => {
//     if (state && state?.data && Object.keys(state.data).length > 0) {
//       const d = state.data;
//       setBlogName(d.slug || '');
//       setTitle(d.title || '');
//       setDescription(d.description || '');
//       setImgUrl(d.imgUrl || '');
//       setEnurl(d.slug || '');
//       setContent(d.content || '<p>Start Writing New Blog</p>');
//       setHtmContent(d.content || '<p>Start Writing New Blog</p>');
//     }
//   }, [state ? state.data : enurl]);

//   const AUTO_SAVE_DELAY = 2000;
//   const DRAFT_KEY = 'blogDraft';
//   const saveTimeout = useRef(null);

//   useEffect(() => {
//     setIsMounted(true);
//     if (typeof window !== 'undefined') {
//       const saved = localStorage.getItem(DRAFT_KEY);
//       if (saved) {
//         try {
//           const data = JSON.parse(saved);
//           setBlogName(data.blogName || '');
//           setEnurl(data.enurl || '');
//           setTitle(data.title || '');
//           setDescription(data.description || '');
//           setImgUrl(data.imgUrl || '');
//           setContent(data.content || '<p>Start Writing New Blog</p>');
//           setHtmContent(data.HtmContent || '<p>Start Writing New Blog</p>');
//         } catch (e) {
//           console.warn('Error restoring draft', e);
//         }
//       }
//     }
//   }, []);

//   // const scheduleSaveDraft = (updatedData = {}) => {
//   //   if (saveTimeout.current) clearTimeout(saveTimeout.current);
//   //   saveTimeout.current = setTimeout(() => {
//   //     if (typeof window === 'undefined') return;

//   //     const draft = {
//   //       blogName,
//   //       enurl,
//   //       title,
//   //       description,
//   //       imgUrl,
//   //       content,
//   //       HtmContent,
//   //       author,
//   //       ...updatedData,
//   //       updatedAt: new Date().toISOString(),
//   //     };

//   //     // console.log(draft, "draft, draft")

//   //     try {
//   //       localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
//   //     } catch (e) {
//   //       console.error('Draft save failed:', e);
//   //     }
//   //   }, AUTO_SAVE_DELAY);
//   // };

//   // useEffect(() => {
//   //   scheduleSaveDraft();
//   // }, [blogName, enurl, title, description, imgUrl, content, HtmContent]);

//   const handleCreateBlog = async () => {
//     const [parentRef, childRef] = postDocRef(postid, locale);

//     try {
//       await setDataWithLang(parentRef, {
//         ...objForData,
//         languages: arrayUnion(locale),
//         [url]: enurl,
//       });

//       await setDataWithLang(childRef, objForData);
//       // console.log('its called');
//       router.push(`/${locale}/my-profile`);
//     } catch (error) {
//       console.error('error', error);
//     }
//   };

//   if (!isMounted) {
//     return (
//       <div className="max-w-4xl mx-auto my-8 p-4 text-gray-500 dark:text-gray-400">
//         Loading editor...
//       </div>
//     );
//   }

//   return (
//     <div className="dark:bg-gray-800 relative">
//       <Notification
//         message={notificationMessage}
//         isVisible={showNotification}
//         onClose={() => setShowNotification(false)}
//       />

//       <EditorPreviewTabs
//         content={content}
//         setContent={setContent}
//         HtmContent={HtmContent}
//         setHtmContent={setHtmContent}
//         editor={null}
//         blogName={blogName}
//         setBlogName={(v) => {
//           setBlogName(v);
//           // scheduleSaveDraft({ blogName: v });
//         }}
//         author={author}
//         enurl={enurl}
//         setEnurl={(v) => {
//           setEnurl(v);
//           // scheduleSaveDraft({ enurl: v });
//         }}
//         title={title}
//         setTitle={(v) => {
//           setTitle(v);
//           // scheduleSaveDraft({ title: v });
//         }}
//         description={description}
//         setDescription={(v) => {
//           setDescription(v);
//           // scheduleSaveDraft({ description: v });
//         }}
//         imgUrl={imgUrl}
//         setImgUrl={setImgUrl}
//       />

//       <div className="max-[1300px]:hidden">
//         <BlogFormSection
//           blogName={blogName}
//           setBlogName={(v) => {
//             setBlogName(v);
//             // scheduleSaveDraft({ blogName: v });
//           }}
//           author={author}
//           enurl={enurl}
//           setEnurl={(v) => {
//             setEnurl(v);
//             // scheduleSaveDraft({ enurl: v });
//           }}
//           title={title}
//           setTitle={(v) => {
//             setTitle(v);
//             // scheduleSaveDraft({ title: v });
//           }}
//           description={description}
//           setDescription={(v) => {
//             setDescription(v);
//             // scheduleSaveDraft({ description: v });
//           }}
//           imgUrl={imgUrl}
//           setImgUrl={setImgUrl}
//         />
//       </div>
      
//       <div className="absolute top-0 right-2 gap-5 z-5 [&>*]:rounded [&>*]:min-w-[100px] [&>*]:mx-3 [&>*]:cursor-pointer [&>*]:min-h-10 ">
//         <button className="bg-yellow-400/60">Save Draft</button>

//         {loading ? (
//           <div className=" justify-center flex items-center gap-1">
//             <Loader2 className=" animate-spin" />
//             <span>Loading...</span>
//           </div>
//         ) : (
//           <button className="bg-green-400/90" onClick={handleCreateBlog}>
//             Publish
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }




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
import { useParams, useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';

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
  const [imgUrl, setImgUrl] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8kgiZG844gI5C6oNFnEmZtI1XIPEkMvxelQ&s',
  );
  const setIsclear = useSetAtom(isClear);
  const [clickable, setClickAble ]= useState(true)
  const params = useParams();
  const router = useRouter();
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

  const handleCreateBlog = async () => {
    const [parentRef, childRef] = postDocRef(postid, locale);

    try {
      await setDataWithLang(parentRef, {
        ...objForData,
        languages: arrayUnion(locale),
        [url]: enurl,
      });

      await setDataWithLang(childRef, objForData);
      router.push(`/${locale}/my-profile`);
      setClickAble(false)
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
        }}
        author={author}
        enurl={enurl}
        setEnurl={(v) => {
          setEnurl(v);
        }}
        title={title}
        setTitle={(v) => {
          setTitle(v);
        }}
        description={description}
        setDescription={(v) => {
          setDescription(v);
        }}
        imgUrl={imgUrl}
        setImgUrl={setImgUrl}
      />

      <div className="max-[1300px]:hidden">
        <BlogFormSection
          blogName={blogName}
          setBlogName={(v) => {
            setBlogName(v);
          }}
          author={author}
          enurl={enurl}
          setEnurl={(v) => {
            setEnurl(v);
          }}
          title={title}
          setTitle={(v) => {
            setTitle(v);
          }}
          description={description}
          setDescription={(v) => {
            setDescription(v);
          }}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
        />
      </div>

      <div className="absolute top-0 right-3 flex gap-4 z-10">
        <Button
          variant="outline"
          size="lg"
          className={`bg-yellow-400/80 text-gray-900  ${clickable ? "cursor-pointer" : "" } dark:text-white hover:bg-yellow-500/90 border-yellow-500 dark:border-yellow-400 transition-colors duration-300 flex items-center gap-2 rounded-lg min-w-[120px]`}
          onClick={() => {}}
        >
          <Save className="w-5 h-5" />
          <span>Save Draft</span>
        </Button>

        {loading ? (
          <Button
            variant="default"
            size="lg"
            disabled
            className={`bg-green-400/90 text-white ${clickable ? "cursor-crosshair" : "" }  rounded-lg min-w-[120px] flex items-center gap-2`}
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Publishing...</span>
          </Button>
        ) : (
          <Button
            variant="default"
            size="lg"
            onClick={handleCreateBlog}
            className={`bg-green-500 hover:bg-green-600 ${clickable ? "cursor-pointer" : "" } cursor-pointer dark:bg-green-600 dark:hover:bg-green-700 text-white transition-colors duration-300 flex items-center gap-2 rounded-lg min-w-[120px]`}
          >
            <span>Publish</span>
          </Button>
        )}
      </div>
    </div>
  );
}