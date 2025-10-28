// 'use client';

// import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
// import { useAtomValue, useSetAtom } from 'jotai';
// import { isClear } from '@/components/jotai';
// import { getOffensiveWords, highlightOffensiveWordsInHtml } from './blogMetaDataChecker';

// export function useJoditEditor({
//   formik,
//   storageKey = 'joditContent',
//   initial = '<p>Start writing...</p>',
//   autosaveDelay = 1500,
//   onChange = () => {},
// }) {
//   const editorRef = useRef(null);
//   const saveTimer = useRef(null);
//   const [mounted, setMounted] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [initialValue, setInitialValue] = useState(initial);
//   const [offensiveList, setOffensiveList] = useState([]);
//   const clear = useAtomValue(isClear);
//   const setClear = useSetAtom(isClear);
//   const { setFieldValue } = formik;

//   const htmlToPlainText = useCallback((html) => {
//     if (!html) return '';
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     return doc.body.textContent || '';
//   }, []);

//   useEffect(() => {
//     if (clear) {
//       localStorage.removeItem(`${storageKey}:html`);
//       setClear(false);
//     }
//   }, [clear]);

//   useEffect(() => {
//     setMounted(true);
//     if (typeof window !== 'undefined') {
//       try {
//         const savedHtml = localStorage.getItem(`${storageKey}:html`);
//         if (savedHtml) {
//           setInitialValue(savedHtml);
//           setFieldValue('content', savedHtml);
//           setFieldValue('HtmContent', savedHtml);
//         }
//       } catch (e) {
//         console.warn('localStorage load error', e);
//       }
//     }
//   }, [storageKey, setFieldValue]);

//   const scheduleSave = useCallback(
//     (html) => {
//       if (saveTimer.current) clearTimeout(saveTimer.current);
//       saveTimer.current = setTimeout(() => {
//         if (typeof window === 'undefined') return;
//         try {
//           const cleanedHtml = highlightOffensiveWordsInHtml(html);
//           const plain = htmlToPlainText(cleanedHtml);
//           const detected = getOffensiveWords(plain);

//           setOffensiveList(detected);

//           localStorage.setItem(`${storageKey}:html`, cleanedHtml);
//           localStorage.setItem(storageKey, plain);

//           setFieldValue('content', cleanedHtml);
//           setFieldValue('HtmContent', cleanedHtml);
//           onChange(cleanedHtml);
//         } catch (e) {
//           console.warn('Save error', e);
//         }
//       }, autosaveDelay);
//     },
//     [autosaveDelay, htmlToPlainText, storageKey, setFieldValue, onChange],
//   );

//   const copyHtml = useCallback(async () => {
//     try {
//       const html = editorRef.current?.value || '';
//       await navigator.clipboard.writeText(html);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch (e) {
//       console.error('Copy error', e);
//     }
//   }, []);

//   const copyPlain = useCallback(async () => {
//     try {
//       const html = editorRef.current?.value || '';
//       const plain = htmlToPlainText(html);
//       await navigator.clipboard.writeText(plain);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch (e) {
//       console.error('Copy error', e);
//     }
//   }, [htmlToPlainText]);

//   const config = useMemo(
//     () => ({
//       readonly: false,
//       height: '100%',
//       minHeight: 800,
//       toolbarSticky: true,
//       toolbarAdaptive: false,
//       showCharsCounter: false,
//       showWordsCounter: false,
//       showPoweredBy: false,
//       removeButtons: ['about'],
//       askBeforePasteHTML: false,
//       askBeforePasteFromWord: false,
//       spellcheck: true,
//       toolbar: [
//         'undo',
//         'redo',
//         '|',
//         'bold',
//         'italic',
//         'underline',
//         'strikethrough',
//         '|',
//         'ul',
//         'ol',
//         '|',
//         'outdent',
//         'indent',
//         '|',
//         'align',
//         'font',
//         'fontsize',
//         '|',
//         'image',
//         'link',
//         '|',
//         'hr',
//         'fullsize',
//       ],
//     }),
//     [],
//   );

//   return {
//     editorRef,
//     mounted,
//     copied,
//     offensiveList,
//     initialValue,
//     config,
//     scheduleSave,
//     copyHtml,
//     copyPlain,
//   };
// }



'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { isClear } from '@/components/jotai';
import { getOffensiveWords, highlightOffensiveWordsInHtml } from './blogMetaDataChecker';

export function useJoditEditor({
  formik,
  storageKey = 'joditContent',
  initial = '<p>Start writing...</p>',
  autosaveDelay = 1500,
  onChange = () => {},
}) {
  const editorRef = useRef(null);
  const saveTimer = useRef(null);
  const lastSavedContent = useRef(''); // Track last saved content to prevent redundant saves
  
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [initialValue, setInitialValue] = useState(initial);
  const [offensiveList, setOffensiveList] = useState([]);
  
  const clear = useAtomValue(isClear);
  const setClear = useSetAtom(isClear);
  const { setFieldValue } = formik;

  // Memoized utility function
  const htmlToPlainText = useCallback((html) => {
    if (!html) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }, []);

  // Handle clear action
  useEffect(() => {
    if (clear) {
      localStorage.removeItem(`${storageKey}:html`);
      lastSavedContent.current = '';
      setClear(false);
    }
  }, [clear, setClear, storageKey]);

  // Initial load - only once
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      try {
        const savedHtml = localStorage.getItem(`${storageKey}:html`);
        if (savedHtml) {
          setInitialValue(savedHtml);
          setFieldValue('content', savedHtml);
          setFieldValue('HtmContent', savedHtml);
          lastSavedContent.current = savedHtml;
        }
      } catch (e) {
        console.warn('localStorage load error', e);
      }
    }
  }, []); // Empty deps - only run once

  // Optimized save function with debouncing and change detection
  const scheduleSave = useCallback(
    (html) => {
      // Skip if content hasn't changed
      if (html === lastSavedContent.current) return;
      
      if (saveTimer.current) clearTimeout(saveTimer.current);
      
      saveTimer.current = setTimeout(() => {
        if (typeof window === 'undefined') return;
        
        try {
          const cleanedHtml = highlightOffensiveWordsInHtml(html);
          const plain = htmlToPlainText(cleanedHtml);
          const detected = getOffensiveWords(plain);

          setOffensiveList(detected);

          localStorage.setItem(`${storageKey}:html`, cleanedHtml);
          localStorage.setItem(storageKey, plain);
          
          lastSavedContent.current = cleanedHtml;

          // Batch formik updates
          setFieldValue('content', cleanedHtml);
          setFieldValue('HtmContent', cleanedHtml);
          
          onChange(cleanedHtml);
        } catch (e) {
          console.warn('Save error', e);
        }
      }, autosaveDelay);
    },
    [autosaveDelay, htmlToPlainText, storageKey, setFieldValue, onChange],
  );

  // Copy functions with proper cleanup
  const copyHtml = useCallback(async () => {
    try {
      const html = editorRef.current?.value || '';
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('Copy error', e);
    }
  }, []);

  const copyPlain = useCallback(async () => {
    try {
      const html = editorRef.current?.value || '';
      const plain = htmlToPlainText(html);
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('Copy error', e);
    }
  }, [htmlToPlainText]);

  // Memoized config - never changes
  const config = useMemo(
    () => ({
      readonly: false,
      height: '100%',
      minHeight: 730,
      toolbarSticky: false, // Disabled for better performance
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showPoweredBy: false,
      removeButtons: ['about'],
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      spellcheck: true,
      toolbar: [
        'undo',
        'redo',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'ul',
        'ol',
        '|',
        'outdent',
        'indent',
        '|',
        'align',
        'font',
        'fontsize',
        '|',
        'image',
        'link',
        '|',
        'hr',
        'fullsize',
      ],
    }),
    [],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  return {
    editorRef,
    mounted,
    copied,
    offensiveList,
    initialValue,
    config,
    scheduleSave,
    copyHtml,
    copyPlain,
  };
}







// 'use client';

// import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
// import { useAtomValue, useSetAtom } from 'jotai';
// import { isClear } from '@/components/jotai';
// import {
//   getOffensiveWords,
//   highlightOffensiveWordsInHtml,
// } from './blogMetaDataChecker';

// export function useJoditEditor({
//   formik,
//   storageKey = 'joditContent',
//   initial = '<p>Start writing...</p>',
//   autosaveDelay = 1500,
//   onChange = () => {},
// }) {
//   const editorRef = useRef(null);
//   const saveTimer = useRef(null);
//   const lastSavedContent = useRef('');

//   const [mounted, setMounted] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [initialValue, setInitialValue] = useState(initial);
//   const [offensiveList, setOffensiveList] = useState([]);

//   const clear = useAtomValue(isClear);
//   const setClear = useSetAtom(isClear);
//   const { setFieldValue } = formik;

//   const htmlToPlainText = useCallback((html) => {
//     if (!html) return '';
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     return doc.body.textContent || '';
//   }, []);

//   // 🧹 Clear
//   useEffect(() => {
//     if (clear) {
//       localStorage.removeItem(`${storageKey}:html`);
//       lastSavedContent.current = '';
//       setClear(false);
//     }
//   }, [clear, setClear, storageKey]);

//   // 📦 Load from localStorage
//   useEffect(() => {
//     setMounted(true);
//     if (typeof window !== 'undefined') {
//       try {
//         const savedHtml = localStorage.getItem(`${storageKey}:html`);
//         if (savedHtml) {
//           setInitialValue(savedHtml);
//           setFieldValue('content', savedHtml);
//           setFieldValue('HtmContent', savedHtml);
//           lastSavedContent.current = savedHtml;
//         }
//       } catch (e) {
//         console.warn('localStorage load error', e);
//       }
//     }
//   }, []);

//   // 💾 Autosave logic
//   const scheduleSave = useCallback(
//     (html) => {
//       if (html === lastSavedContent.current) return;
//       if (saveTimer.current) clearTimeout(saveTimer.current);

//       saveTimer.current = setTimeout(() => {
//         try {
//           const cleanedHtml = highlightOffensiveWordsInHtml(html);
//           const plain = htmlToPlainText(cleanedHtml);
//           const detected = getOffensiveWords(plain);
//           setOffensiveList(detected);

//           localStorage.setItem(`${storageKey}:html`, cleanedHtml);
//           localStorage.setItem(storageKey, plain);
//           lastSavedContent.current = cleanedHtml;

//           setFieldValue('content', cleanedHtml);
//           setFieldValue('HtmContent', cleanedHtml);
//           onChange(cleanedHtml);
//         } catch (e) {
//           console.warn('Save error', e);
//         }
//       }, autosaveDelay);
//     },
//     [autosaveDelay, htmlToPlainText, storageKey, setFieldValue, onChange],
//   );

//   const copyHtml = useCallback(async () => {
//     try {
//       const html = editorRef.current?.value || '';
//       await navigator.clipboard.writeText(html);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch (e) {
//       console.error('Copy error', e);
//     }
//   }, []);

//   const copyPlain = useCallback(async () => {
//     try {
//       const html = editorRef.current?.value || '';
//       const plain = htmlToPlainText(html);
//       await navigator.clipboard.writeText(plain);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch (e) {
//       console.error('Copy error', e);
//     }
//   }, [htmlToPlainText]);

//   const config = useMemo(
//     () => ({
//       readonly: false,
//       height: '100%',
//       minHeight: 730,
//       toolbarSticky: false,
//       toolbarAdaptive: false,
//       showCharsCounter: true,
//       showWordsCounter: true,
//       showPoweredBy: false,
//       removeButtons: ['about'],
//       askBeforePasteHTML: false,
//       askBeforePasteFromWord: false,
//       spellcheck: true,
//       language: 'en',
//       toolbarButtonSize: 'middle',
//       allowResizeY: true,
//       allowResizeX: true,
//       iframe: false,
//       useIframeSandbox: false,
//       defaultActionOnPaste: 'insert_clear_html',
//       allowDragAndDropFiles: true,
//       style: {
//         fontFamily: 'Inter, Arial, sans-serif',
//         fontSize: '16px',
//         lineHeight: '1.6',
//       },
//       iframeStyle: `
//         body { position: relative; }
//         img, video {
//           position: absolute;
//           cursor: grab;
//         }
//       `,

//       buttons: [
//         'undo', 'redo', '|',
//         'bold', 'italic', 'underline', 'strikethrough', '|',
//         'font', 'fontsize', 'brush', 'paragraph', '|',
//         'ul', 'ol', 'outdent', 'indent', '|',
//         'align', 'left', 'center', 'right', 'justify', '|',
//         'cut', 'copy', 'paste', '|',
//         'hr', 'table', 'link', 'unlink', 'image', 'video', 'file', '|',
//         'emoji', 'symbols', 'find', 'preview', 'print', '|',
//         'source', 'fullsize',
//       ],

//       // === EVENT HANDLERS ===
//       events: {
//         afterInit: (editor) => {
//           // 🧩 Drag-drop image placement
//           editor.workplace.addEventListener('dragover', (e) => e.preventDefault());
//           editor.workplace.addEventListener('drop', async (e) => {
//             e.preventDefault();
//             const files = e.dataTransfer?.files;
//             if (files && files[0] && files[0].type.startsWith('image/')) {
//               // === YOU MUST IMPLEMENT === upload logic
//               const file = files[0];
//               const reader = new FileReader();
//               reader.onload = () => {
//                 const imgHtml = `<img src="${reader.result}" style="max-width:100%;" />`;
//                 editor.selection.insertHTML(imgHtml);
//               };
//               reader.readAsDataURL(file);
//             }
//           });

//           // 😊 Emoji popup
//           const emojiBtn = editor.toolbar?.getButton('emoji');
//           if (emojiBtn) {
//             const emojis = [
//               '😀','😁','😂','🤣','😊','😍','😎','😢','😡','👍',
//               '🙏','🎉','🔥','🌟','💖','💡','🚀','🎂','⚡','☀️'
//             ];
//             const popup = editor.createPopup('emoji-picker', {
//               template: `<div class="emoji-popup" style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;padding:8px;">
//                 ${emojis.map(e => `<button style="font-size:20px;border:none;background:none;cursor:pointer;">${e}</button>`).join('')}
//               </div>`,
//               width: 180,
//             });

//             popup.container.querySelectorAll('button').forEach((btn) => {
//               btn.addEventListener('click', () => {
//                 editor.selection.insertHTML(btn.textContent);
//                 popup.hide();
//               });
//             });

//             emojiBtn.container.addEventListener('click', (e) => {
//               e.preventDefault();
//               popup.show(emojiBtn.container);
//             });
//           }
//         },

//         blur: (editor) => {
//           const html = editor.value;
//           if (html) scheduleSave(html);
//         },

//         paste: (e) => {
//           const pastedText = e.clipboardData?.getData('text/plain');
//           if (pastedText && pastedText.match(/^https?:\/\/.*\.(mp4|webm)$/i)) {
//             const videoHtml = `<video controls src="${pastedText}" style="max-width:100%;display:block;margin:auto;"></video>`;
//             editorRef.current?.selection?.insertHTML(videoHtml);
//             e.preventDefault();
//           }
//         },
//       },
//     }),
//     [scheduleSave],
//   );

//   useEffect(() => {
//     return () => saveTimer.current && clearTimeout(saveTimer.current);
//   }, []);

//   return {
//     editorRef,
//     mounted,
//     copied,
//     offensiveList,
//     initialValue,
//     config,
//     scheduleSave,
//     copyHtml,
//     copyPlain,
//   };
// }
