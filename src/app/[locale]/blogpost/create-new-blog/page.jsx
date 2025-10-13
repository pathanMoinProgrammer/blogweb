// TODO: Solved Problem that automatic localStorage not give data at mount and give localStorage is not defined error (but working at screen just error faces) and solved by adding coopy button and on the top show start new blog

// TODO:  jaise main content ke liye after page leave (locastorage save system 2 sec me) banaya tha waise pure content ke liye karo (pura persistant forgat nahi hona chahiye)

// TODO:  live api banao check karne ke liye ki blog file exist hai ya nahi, agar hai to block karo ki nahi ho sakta aur nahi hai tab hi aage jane do

// 'use client';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import TextStyle from '@tiptap/extension-text-style';
// import HardBreak from '@tiptap/extension-hard-break';
// import { Extension } from '@tiptap/core';
// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import Lottie from 'lottie-react';
// import checkmarkAnim from '../../../../components/Checkmark.json';

// const CustomHorizontalRule = Extension.create({
//   name: 'horizontalRule',
//   addAttributes() {
//     return {
//       width: { default: '100%' },
//       thickness: { default: '2px' },
//       color: { default: '#cbd5e1' },
//     };
//   },
//   renderHTML({ HTMLAttributes }) {
//     const { width, thickness, color } = HTMLAttributes;
//     return [
//       'hr',
//       {
//         style: `width:${width};border:0;border-top:${thickness} solid ${color};margin:1rem auto;`,
//       },
//     ];
//   },
// });

// const MenuBar = ({ editor }) => {
//   const [, setTick] = useState(0);

//   useEffect(() => {
//     if (!editor) return;
//     const update = () => setTick((t) => t + 1);
//     editor.on('transaction', update);
//     return () => editor.off('transaction', update);
//   }, [editor]);

//   if (!editor) return null;

//   const handleInsertTab = () =>
//     editor.chain().focus().insertContent('      ').run();

//   const isActive = (name, attrs = {}) => {
//     try {
//       return editor.isActive(name, attrs);
//     } catch {
//       return false;
//     }
//   };

//   return (
//     <div className="border-b border-gray-300 p-2 flex flex-wrap gap-2 bg-gray-50">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={`px-3 py-1 rounded border ${
//           isActive('bold')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Bold"
//       >
//         <strong>B</strong>
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={`px-3 py-1 rounded border ${
//           isActive('italic')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Italic"
//       >
//         <em>I</em>
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleUnderline?.()?.run()}
//         className={`px-3 py-1 rounded border ${
//           isActive('underline')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Underline"
//       >
//         <u>U</u>
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={`px-3 py-1 rounded border ${
//           isActive('strike')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Strikethrough"
//       >
//         <s>S</s>
//       </button>

//       <div className="border-l border-gray-300 mx-1"></div>

//       <button
//         onClick={() =>
//           editor.chain().focus().toggleList('bulletList', 'listItem').run()
//         }
//         className={`px-3 py-1 rounded border ${
//           isActive('bulletList')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Bullet List"
//       >
//         •
//       </button>

//       <button
//         onClick={() =>
//           editor
//             .chain()
//             .focus()
//             .toggleList('orderedList', 'listItem', false, { order: 1 })
//             .run()
//         }
//         className={`px-3 py-1 rounded border ${
//           isActive('orderedList')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Numbered List"
//       >
//         1.
//       </button>

//       <div className="border-l border-gray-300 mx-1"></div>

//       <button
//         onClick={() =>
//           editor.chain().focus().insertContent({ type: 'horizontalRule' }).run()
//         }
//         className="px-3 py-1 rounded border bg-white border-gray-300"
//         title="Insert Horizontal Rule"
//       >
//         — HR —
//       </button>

//       <button
//         onClick={handleInsertTab}
//         className="px-3 py-1 rounded border bg-white border-gray-300"
//         title="Insert Tab (6 spaces)"
//       >
//         ↦ Tab
//       </button>

//       <button
//         onClick={() => editor.chain().focus().undo().run()}
//         disabled={!editor.can().undo()}
//         className="px-3 py-1 rounded border bg-white border-gray-300 disabled:opacity-50"
//         title="Undo"
//       >
//         ↶
//       </button>

//       <button
//         onClick={() => editor.chain().focus().redo().run()}
//         disabled={!editor.can().redo()}
//         className="px-3 py-1 rounded border bg-white border-gray-300 disabled:opacity-50"
//         title="Redo"
//       >
//         ↷
//       </button>
//     </div>
//   );
// };

// const Notification = ({ message, isVisible, onClose }) => {
//   useEffect(() => {
//     if (isVisible) {
//       const timer = setTimeout(() => {
//         onClose();
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible, onClose]);

//   if (!isVisible) return null;

//   return (
//     <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
//       <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 text-sm text-gray-700">
//         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//         {message}
//       </div>
//     </div>
//   );
// };

// // COMMENTED OUT - ORIGINAL NOTIFICATION (for future use)
// // const Notification = ({ message, isVisible, onClose }) => {
// //   useEffect(() => {
// //     if (isVisible) {
// //       const timer = setTimeout(() => {
// //         onClose();
// //       }, 3000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [isVisible, onClose]);

// //   if (!isVisible) return null;

// //   return (
// //     <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-2 duration-300">
// //       <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 text-sm text-gray-700">
// //         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
// //         {message}
// //       </div>
// //     </div>
// //   );
// // };

// export default function TipTapEditor() {
//   const [content, setContent] = useState('<p>Start Writing New Blog</p>');
//   const [isMounted, setIsMounted] = useState(false);
//   const [isCopying, setIsCopying] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);
//   const [notificationMessage, setNotificationMessage] = useState('');
//   const AUTO_SAVE_DELAY = 2000;
//   let saveTimeout = null;

//   useEffect(() => {
//     setIsMounted(true);

//     if (typeof window !== 'undefined') {
//       const saved = localStorage.getItem('blogContent');
//       if (saved) setContent(saved);
//     }
//   }, []);

//   const editor = useEditor({
//     immediatelyRender: false,
//     extensions: [StarterKit, TextStyle, HardBreak, CustomHorizontalRule],
//     content,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       setContent(html);

//       if (saveTimeout) clearTimeout(saveTimeout);
//       saveTimeout = setTimeout(() => {
//         if (typeof window !== 'undefined') {
//           localStorage.setItem('blogContent', html);
//           console.log('Autosaved!');
//         }
//       }, AUTO_SAVE_DELAY);
//     },
//     editorProps: {
//       handleKeyDown(view, event) {
//         const { state, dispatch, schema } = view;

//         // Tab
//         if (event.key === 'Tab' && !event.shiftKey) {
//           event.preventDefault();
//           dispatch(
//             state.tr.insertText(
//               '      ',
//               state.selection.from,
//               state.selection.to,
//             ),
//           );
//           return true;
//         }

//         // Shift+Enter → hard break
//         if (event.key === 'Enter' && event.shiftKey) {
//           event.preventDefault();
//           const hardBreak = schema.nodes.hardBreak;
//           if (hardBreak) {
//             dispatch(
//               state.tr
//                 .replaceSelectionWith(hardBreak.create())
//                 .scrollIntoView(),
//             );
//             return true;
//           }
//           dispatch(
//             state.tr.insertText('\n', state.selection.from, state.selection.to),
//           );
//           return true;
//         }

//         return false; // Plain Enter handled by TipTap (list continuation)
//       },
//       attributes: {
//         class:
//           'outline-none focus:outline-none focus:ring-0 whitespace-pre-wrap cursor-text min-h-[400px]',
//       },
//     },
//   });

//   const handleCopy = async () => {
//     if (!editor) return;

//     try {
//       let htmlContent = editor.getHTML();

//       let textWithHR = htmlContent
//         .replace(/<hr\s*\/?>/gi, '\n--------------------------\n')
//         .replace(/<[^>]+>/g, '')
//         .replace(/&nbsp;/g, ' ')
//         .replace(/\u00a0/g, '');

//       await navigator.clipboard.writeText(textWithHR);

//       setNotificationMessage('✅ Copied to clipboard!');
//       setShowNotification(true);
//       setIsCopying(true);
//       setTimeout(() => setIsCopying(false), 1000);
//     } catch (error) {
//       console.error('Copy failed:', error);
//       setNotificationMessage('❌ Failed to copy!');
//       setShowNotification(true);
//     }
//   };

//   if (!isMounted)
//     return (
//       <div className="max-w-4xl mx-auto my-8 p-4 text-gray-500">
//         Loading editor...
//       </div>
//     );

//   return (
//     <>
//       <Notification
//         message={notificationMessage}
//         isVisible={showNotification}
//         onClose={() => setShowNotification(false)}
//       />

//       <div className="max-w-4xl mx-auto my-3 p-4 font-sans ">
//         <h1 className="text-3xl font-bold mb-4">📝 Write Your Blog</h1>

//         <div
//           className="outline-none rounded-lg overflow-hidden border-[0.5px] bg-white"
//           onClick={() => editor?.commands.focus()}
//         >
//           <MenuBar editor={editor} />
//           <EditorContent editor={editor} className="px-5 py-3" />
//         </div>

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">🖋️ Live Preview</h2>

//           <div className="relative">
//             <button
//               onClick={handleCopy}
//               disabled={isCopying}
//               className={`absolute top-3 right-3 w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-all duration-500 transform ${
//                 isCopying
//                   ? 'bg-green-500 text-white scale-110 '
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
//               } disabled:opacity-70`}
//             >
//               {isCopying ? (
//                 <Lottie
//                   animationData={checkmarkAnim}
//                   loop={false}
//                   autoplay
//                   className="w-7 h-7"
//                 />
//               ) : (
//                 <svg
//                   className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[-5deg]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.8}
//                     d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
//                   />
//                 </svg>
//               )}
//             </button>

//             <pre
//               className="p-4 border min-h-95 rounded bg-gray-50 whitespace-pre-wrap"
//               dangerouslySetInnerHTML={{ __html: content }}
//             />

//             {/* <div className="p-4 border min-h-95 rounded bg-gray-50 whitespace-pre-wrap">
//               {editor?.getText()}
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// 'use client';

// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import TextStyle from '@tiptap/extension-text-style';
// import HardBreak from '@tiptap/extension-hard-break';
// import { Extension } from '@tiptap/core';
// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import Lottie from 'lottie-react';
// import checkmarkAnim from '../../../../components/Checkmark.json';

// const CustomHorizontalRule = Extension.create({
//   name: 'horizontalRule',
//   addAttributes() {
//     return {
//       width: { default: '100%' },
//       thickness: { default: '2px' },
//       color: { default: '#cbd5e1' },
//     };
//   },
//   renderHTML({ HTMLAttributes }) {
//     const { width, thickness, color } = HTMLAttributes;
//     return [
//       'hr',
//       {
//         style: `width:${width};border:0;border-top:${thickness} solid ${color};margin:1rem auto;`,
//       },
//     ];
//   },
// });

// const MenuBar = ({ editor }) => {
//   const [, setTick] = useState(0);

//   useEffect(() => {
//     if (!editor) return;
//     const update = () => setTick((t) => t + 1);
//     editor.on('transaction', update);
//     return () => editor.off('transaction', update);
//   }, [editor]);

//   if (!editor) return null;

//   const handleInsertTab = () =>
//     editor.chain().focus().insertContent('      ').run();

//   const isActive = (name, attrs = {}) => {
//     try {
//       return editor.isActive(name, attrs);
//     } catch {
//       return false;
//     }
//   };

//   return (
//     <div className="border-b border-gray-300 p-2 flex flex-wrap gap-2 bg-gray-50">
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={`px-3 py-1 rounded border ${
//           isActive('bold')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Bold"
//       >
//         <strong>B</strong>
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={`px-3 py-1 rounded border ${
//           isActive('italic')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Italic"
//       >
//         <em>I</em>
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleUnderline?.()?.run()}
//         className={`px-3 py-1 rounded border ${
//           isActive('underline')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Underline"
//       >
//         <u>U</u>
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={`px-3 py-1 rounded border ${
//           isActive('strike')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Strikethrough"
//       >
//         <s>S</s>
//       </button>

//       <div className="border-l border-gray-300 mx-1"></div>

//       <button
//         onClick={() =>
//           editor.chain().focus().toggleList('bulletList', 'listItem').run()
//         }
//         className={`px-3 py-1 rounded border ${
//           isActive('bulletList')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Bullet List"
//       >
//         •
//       </button>

//       <button
//         onClick={() =>
//           editor
//             .chain()
//             .focus()
//             .toggleList('orderedList', 'listItem', false, { order: 1 })
//             .run()
//         }
//         className={`px-3 py-1 rounded border ${
//           isActive('orderedList')
//             ? 'bg-blue-500 text-white border-blue-600'
//             : 'bg-white border-gray-300'
//         }`}
//         title="Numbered List"
//       >
//         1.
//       </button>

//       <div className="border-l border-gray-300 mx-1"></div>

//       <button
//         onClick={() =>
//           editor.chain().focus().insertContent({ type: 'horizontalRule' }).run()
//         }
//         className="px-3 py-1 rounded border bg-white border-gray-300"
//         title="Insert Horizontal Rule"
//       >
//         — HR —
//       </button>

//       <button
//         onClick={handleInsertTab}
//         className="px-3 py-1 rounded border bg-white border-gray-300"
//         title="Insert Tab (6 spaces)"
//       >
//         ↦ Tab
//       </button>

//       <button
//         onClick={() => editor.chain().focus().undo().run()}
//         disabled={!editor.can().undo()}
//         className="px-3 py-1 rounded border bg-white border-gray-300 disabled:opacity-50"
//         title="Undo"
//       >
//         ↶
//       </button>

//       <button
//         onClick={() => editor.chain().focus().redo().run()}
//         disabled={!editor.can().redo()}
//         className="px-3 py-1 rounded border bg-white border-gray-300 disabled:opacity-50"
//         title="Redo"
//       >
//         ↷
//       </button>
//     </div>
//   );
// };

// const Notification = ({ message, isVisible, onClose }) => {
//   useEffect(() => {
//     if (isVisible) {
//       const timer = setTimeout(() => {
//         onClose();
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [isVisible, onClose]);

//   if (!isVisible) return null;

//   return (
//     <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
//       <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 text-sm text-gray-700">
//         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//         {message}
//       </div>
//     </div>
//   );
// };

// export default function TipTapEditor() {
//   const [content, setContent] = useState('<p>Start Writing New Blog</p>');
//   const [isMounted, setIsMounted] = useState(false);
//   const [isCopying, setIsCopying] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);
//   const [notificationMessage, setNotificationMessage] = useState('');

//   const [blogName, setBlogName] = useState('');
//   const [author] = useState('Admin User');
//   const [enurl, setEnurl] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [imgUrl, setImgUrl] = useState(
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8kgiZG844gI5C6oNFnEmZtI1XIPEkMvxelQ&s',
//   );

//   const [isCheckingUrl, setIsCheckingUrl] = useState(false);
//   const [urlExists, setUrlExists] = useState(false);
//   const [urlMessage, setUrlMessage] = useState('');

//   const [isCreating, setIsCreating] = useState(false);

//   const AUTO_SAVE_DELAY = 2000;
//   let saveTimeout = null;
//   useEffect(() => {
//     if (!enurl) {
//       setUrlExists(false);
//       setUrlMessage('');
//       return;
//     }

//     const delay = setTimeout(async () => {
//       setIsCheckingUrl(true);
//       try {
//         const res = await fetch('/api/available-blog-sync', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ locale: 'en', slug: enurl }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           if (data.exists) {
//             setUrlExists(true);
//             setUrlMessage('❌ This URL already exists');
//             console.log('logged', data);
//           } else {
//             setUrlExists(false);
//             setUrlMessage('✅ URL is available');
//             console.log('logged 2', data);
//           }
//         } else {
//           setUrlExists(false);
//           setUrlMessage('⚠️ Failed to check URL');
//           console.log('logged3 ', data);
//         }
//       } catch (err) {
//         console.error('Error checking URL:', err);
//         setUrlExists(false);
//         setUrlMessage('⚠️ Network error');
//       } finally {
//         setIsCheckingUrl(false);
//       }
//     }, 500);

//     return () => clearTimeout(delay);
//   }, [enurl]);

//   useEffect(() => {
//     setIsMounted(true);

//     if (typeof window !== 'undefined') {
//       const saved = localStorage.getItem('blogContent');
//       if (saved) setContent(saved);
//     }
//   }, []);

//   const editor = useEditor({
//     immediatelyRender: false,
//     extensions: [StarterKit, TextStyle, HardBreak, CustomHorizontalRule],
//     content,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       setContent(html);

//       if (saveTimeout) clearTimeout(saveTimeout);
//       saveTimeout = setTimeout(() => {
//         if (typeof window !== 'undefined') {
//           localStorage.setItem('blogContent', html);
//           console.log('Autosaved!');
//         }
//       }, AUTO_SAVE_DELAY);
//     },
//     editorProps: {
//       handleKeyDown(view, event) {
//         const { state, dispatch, schema } = view;

//         if (event.key === 'Tab' && !event.shiftKey) {
//           event.preventDefault();
//           dispatch(
//             state.tr.insertText(
//               '      ',
//               state.selection.from,
//               state.selection.to,
//             ),
//           );
//           return true;
//         }

//         if (event.key === 'Enter' && event.shiftKey) {
//           event.preventDefault();
//           const hardBreak = schema.nodes.hardBreak;
//           if (hardBreak) {
//             dispatch(
//               state.tr
//                 .replaceSelectionWith(hardBreak.create())
//                 .scrollIntoView(),
//             );
//             return true;
//           }
//           dispatch(
//             state.tr.insertText('\n', state.selection.from, state.selection.to),
//           );
//           return true;
//         }

//         return false;
//       },
//       attributes: {
//         class:
//           'outline-none focus:outline-none focus:ring-0 whitespace-pre-wrap cursor-text min-h-[400px]',
//       },
//     },
//   });

//   const handleCopy = async () => {
//     if (!editor) return;

//     try {
//       let htmlContent = editor.getHTML();
//       let textWithHR = htmlContent
//         .replace(/<hr\s*\/?>/gi, '\n--------------------------\n')
//         .replace(/<[^>]+>/g, '')
//         .replace(/&nbsp;/g, ' ')
//         .replace(/\u00a0/g, '');

//       await navigator.clipboard.writeText(textWithHR);
//       setNotificationMessage('✅ Copied to clipboard!');
//       setShowNotification(true);
//       setIsCopying(true);
//       setTimeout(() => setIsCopying(false), 1000);
//     } catch (error) {
//       console.error('Copy failed:', error);
//       setNotificationMessage('❌ Failed to copy!');
//       setShowNotification(true);
//     }
//   };

//   const handleCreateBlog = async () => {
//     if (!blogName || !enurl || !title || !description) {
//       setNotificationMessage('❌ Please fill all required fields!');
//       setShowNotification(true);
//       return;
//     }

//     setIsCreating(true);

//     try {
//       let textContent = editor?.getText() || '';

//       let htmlContent = editor?.getHTML() || '';
//       let markdownContent = htmlContent
//         .replace(/<hr\s*\/?>/gi, '\n\n----------------------------------\n\n')
//         .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
//         .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
//         .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
//         .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
//         .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
//         .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
//         .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
//         .replace(/<u[^>]*>(.*?)<\/u>/gi, '_$1_')
//         .replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~')
//         .replace(/<strike[^>]*>(.*?)<\/strike>/gi, '~~$1~~')
//         .replace(/<ul[^>]*>/gi, '\n')
//         .replace(/<\/ul>/gi, '\n')
//         .replace(/<ol[^>]*>/gi, '\n')
//         .replace(/<\/ol>/gi, '\n')
//         .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
//         .replace(/<br\s*\/?>/gi, '\n')
//         .replace(/<p[^>]*>/gi, '')
//         .replace(/<\/p>/gi, '\n\n')
//         .replace(/<[^>]+>/g, '')
//         .replace(/&nbsp;/g, ' ')
//         .replace(/\u00a0/g, ' ')
//         .replace(/\n{3,}/g, '\n\n')
//         .trim();

//       const now = new Date();
//       const date = now.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//       });
//       const wordCount = markdownContent.split(/\s+/).length;
//       const readTime = Math.ceil(wordCount / 200);

//       const fullMarkdown = `---
// name: '${blogName}'
// author: '${author}'
// date: '${date}'
// time: '${readTime} min read'
// enurl: "${enurl}"
// hiurl: null
// title: "${title}"
// img: '${imgUrl}'
// description: "${description}"
// ---

// ${markdownContent}`;

//       const res = await fetch('/api/create-blog-sync', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           locale: 'en',
//           slug: enurl,
//           content: fullMarkdown,
//         }),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         setNotificationMessage('✅ Blog created successfully!');
//         setShowNotification(true);

//         // Reset form
//         setBlogName('');
//         setEnurl('');
//         setTitle('');
//         setDescription('');
//         editor?.commands.setContent('<p>Start Writing New Blog</p>');

//         if (typeof window !== 'undefined') {
//           localStorage.removeItem('blogContent');
//         }
//       } else {
//         setNotificationMessage(`❌ Error: ${result.error}`);
//         setShowNotification(true);
//       }
//     } catch (error) {
//       console.error('Blog creation failed:', error);
//       setNotificationMessage(`❌ Failed: ${error.message}`);
//       setShowNotification(true);
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   if (!isMounted)
//     return (
//       <div className="max-w-4xl mx-auto my-8 p-4 text-gray-500">
//         Loading editor...
//       </div>
//     );

//   return (
//     <>
//       <Notification
//         message={notificationMessage}
//         isVisible={showNotification}
//         onClose={() => setShowNotification(false)}
//       />

//       <div className="max-w-4xl mx-auto my-3 p-4 font-sans">
//         <h1 className="text-3xl font-bold mb-6">📝 Create New Blog Post</h1>

//         <div className="mb-6 space-y-4 bg-gray-50 p-6 rounded-lg border">
//           <h2 className="text-xl font-semibold mb-4">Blog Information</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-semibold mb-2 text-gray-700">
//                 Blog Name *
//               </label>
//               <input
//                 type="text"
//                 value={blogName}
//                 onChange={(e) => setBlogName(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="e.g., AI Frontier Blog"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block text-sm font-semibold mb-2 text-gray-700">
//                 URL for *
//               </label>

//               <div className="relative flex items-center">
//                 <input
//                   type="text"
//                   value={enurl}
//                   onChange={(e) =>
//                     setEnurl(e.target.value.toLowerCase().replace(/\s+/g, '-'))
//                   }
//                   placeholder="gemini-multimodal-edge"
//                   className={`w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 text-gray-800 ${
//                     isCheckingUrl
//                       ? 'border-blue-400 focus:ring-blue-400'
//                       : urlExists
//                       ? 'border-red-400 focus:ring-red-500'
//                       : enurl
//                       ? 'border-green-400 focus:ring-green-500'
//                       : 'border-gray-300 focus:ring-blue-500'
//                   }`}
//                 />

//                 {/* Right Icon Section */}
//                 <div className="absolute right-3 flex items-center">
//                   {/* Spinner (Checking) */}
//                   {isCheckingUrl && (
//                     <div className="animate-spin w-5 h-5 text-blue-500">
//                       <svg
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                         ></path>
//                       </svg>
//                     </div>
//                   )}

//                   {/* Success (Available) */}
//                   {!isCheckingUrl && enurl && !urlExists && (
//                     <div className="text-green-500 animate-pulse scale-100 transition-transform duration-300">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                     </div>
//                   )}

//                   {/* Error (Taken) */}
//                   {!isCheckingUrl && enurl && urlExists && (
//                     <div className="text-red-500 animate-shake">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Message Section */}
//               <div className="mt-2 min-h-[1.25rem]">
//                 {isCheckingUrl && (
//                   <p className="text-sm text-blue-600 animate-fade-in">
//                     Checking availability...
//                   </p>
//                 )}
//                 {!isCheckingUrl && enurl && !urlExists && (
//                   <p className="text-sm text-green-600 font-medium animate-fade-in flex items-center gap-1">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 text-green-500 animate-pop"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     This URL is available!
//                   </p>
//                 )}
//                 {!isCheckingUrl && enurl && urlExists && (
//                   <p className="text-sm text-red-600 font-medium animate-fade-in flex items-center gap-1">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4 text-red-500 animate-pop"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm0 6a1 1 0 10-2 0 1 1 0 002 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     This URL is already taken.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold mb-2 text-gray-700">
//               Blog Title *
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Gemini's Edge in Multimodal AI"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold mb-2 text-gray-700">
//               Description *
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Brief description of your blog post..."
//               rows={3}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold mb-2 text-gray-700">
//               Image URL
//             </label>
//             <input
//               type="url"
//               value={imgUrl}
//               onChange={(e) => setImgUrl(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="https://..."
//             />
//             {imgUrl && (
//               <img
//                 src={imgUrl}
//                 alt="Preview"
//                 className="mt-2 max-h-40 rounded-lg border"
//               />
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-semibold mb-2 text-gray-700">
//               Author
//             </label>
//             <input
//               type="text"
//               value={author}
//               disabled
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
//             />
//           </div>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-4">✍️ Write Your Blog</h2>
//           <div
//             className="outline-none rounded-lg overflow-hidden border-[0.5px] bg-white"
//             onClick={() => editor?.commands.focus()}
//           >
//             <MenuBar editor={editor} />
//             <EditorContent editor={editor} className="px-5 py-3" />
//           </div>
//         </div>

//         <div className="mb-6">
//           <button
//             onClick={handleCreateBlog}
//             disabled={isCreating}
//             className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//           >
//             {isCreating ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Creating Blog...
//               </>
//             ) : (
//               <>
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 4v16m8-8H4"
//                   />
//                 </svg>
//                 Create Blog Post
//               </>
//             )}
//           </button>
//         </div>

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">🖋️ Live Preview</h2>
//           <div className="relative">
//             <button
//               onClick={handleCopy}
//               disabled={isCopying}
//               className={`absolute top-3 right-3 w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-all duration-500 transform ${
//                 isCopying
//                   ? 'bg-green-500 text-white scale-110'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
//               } disabled:opacity-70`}
//             >
//               {isCopying ? (
//                 <Lottie
//                   animationData={checkmarkAnim}
//                   loop={false}
//                   autoplay
//                   className="w-7 h-7"
//                 />
//               ) : (
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.8}
//                     d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
//                   />
//                 </svg>
//               )}
//             </button>

//             <pre
//               className="p-4 border min-h-95 rounded bg-gray-50 whitespace-pre-wrap"
//               dangerouslySetInnerHTML={{ __html: content }}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }







'use client';

import { useState, useEffect } from 'react';
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


// const JoditEditor = dynamic(() => import('@/components/blog/joditeditor.jsx'), {
//   ssr: false,
// });


const TipTapEditorFull = dynamic(() => import('@/components/blog/BlogEditor'), { ssr: false });

export default function CreateBlogPage() {
  const [content, setContent] = useState('<p>Start Writing New Blog</p>');
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
  let saveTimeout = null;

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('joditContent');
      if (saved) setContent(saved);
    }
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, TextStyle, HardBreak, CustomHorizontalRule],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);

      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('blogContent', html);
        }
      }, AUTO_SAVE_DELAY);
    },
    editorProps: {
      handleKeyDown(view, event) {
        const { state, dispatch, schema } = view;

        if (event.key === 'Tab' && !event.shiftKey) {
          event.preventDefault();
          dispatch(
            state.tr.insertText(
              '      ',
              state.selection.from,
              state.selection.to,
            ),
          );
          return true;
        }

        if (event.key === 'Enter' && event.shiftKey) {
          event.preventDefault();
          const hardBreak = schema.nodes.hardBreak;
          if (hardBreak) {
            dispatch(
              state.tr
                .replaceSelectionWith(hardBreak.create())
                .scrollIntoView(),
            );
            return true;
          }
          dispatch(
            state.tr.insertText('\n', state.selection.from, state.selection.to),
          );
          return true;
        }

        return false;
      },
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

        setBlogName('');
        setEnurl('');
        setTitle('');
        setDescription('');
        editor?.commands.setContent('<p>Start Writing New Blog</p>');

        if (typeof window !== 'undefined') {
          localStorage.removeItem('blogContent');
        }
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
      <div className="max-w-4xl mx-auto my-8 p-4 text-gray-500">
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

      <div className="max-w-4xl mx-auto my-3 p-4 font-sans ">
        <h1 className="text-3xl font-bold mb-6">📝 Create New Blog Post</h1>

        <BlogMetadataForm
          blogName={blogName}
          setBlogName={setBlogName}
          author={author}
          enurl={enurl}
          setEnurl={setEnurl}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
        />

        <ImageUploader imgUrl={imgUrl} setImgUrl={setImgUrl} />
        {/* <JoditEditor storageKey="myBlogPost" /> */}
        <TipTapEditorFull editor={editor} />
        

        <div className="my-10">
          <button
            onClick={handleCreateBlog}
            disabled={isCreating}
            className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isCreating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Blog...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
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
                Create Blog Post
              </>
            )}
          </button>
        </div>

        <BlogPreview content={content} editor={editor} />
      </div>
    </>
  );
}
