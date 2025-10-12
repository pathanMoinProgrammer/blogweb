// 'use client';
// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useCallback,
//   useMemo,
// } from 'react';
// import dynamic from 'next/dynamic';
// import 'jodit/es5/jodit.min.css';

// const JoditEditorImport = dynamic(() => import('jodit-react'), { ssr: false });

// export default function JoditEditor({
//   storageKey = 'joditContent',
//   initial = '<p>Start writing...</p>',
//   autosaveDelay = 1500,
//   onChange: externalOnChange = () => {},
// }) {
//   const editorRef = useRef(null);
//   const [mounted, setMounted] = useState(false);
//   const [value, setValue] = useState(initial);
//   const saveTimer = useRef(null);
//   // const [isSaving, setIsSaving] = useState(false);
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     if (typeof window !== 'undefined') {
//       const saved = localStorage.getItem(storageKey);
//       if (saved) setValue(saved);
//     }
//     return () => saveTimer.current && clearTimeout(saveTimer.current);
//   }, [storageKey]);

//   const scheduleSave = useCallback(
//     (html) => {
//       if (saveTimer.current) clearTimeout(saveTimer.current);

//       saveTimer.current = setTimeout(() => {
//         try {
//           if (typeof window !== 'undefined')
//             localStorage.setItem(storageKey, html);
//         } catch {}
//         // setIsSaving(false);
//       }, autosaveDelay);
//     },
//     [storageKey, autosaveDelay],
//   );

//   const handleChange = useCallback(
//     (newContent) => {
//       setValue(newContent);
//       scheduleSave(newContent);
//       externalOnChange(newContent);
//     },
//     [scheduleSave, externalOnChange],
//   );

//   const copyHtml = useCallback(async () => {
//     try {
//       await navigator.clipboard.writeText(value || '');
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch (e) {
//       console.error('Copy error', e);
//     }
//   }, [value]);

//   const copyPlainWithHr = useCallback(async () => {
//     try {
//       if (!value) {
//         await navigator.clipboard.writeText('');
//         setCopied(true);
//         setTimeout(() => setCopied(false), 1500);
//         return;
//       }

//       const parser = new DOMParser();
//       const doc = parser.parseFromString(value, 'text/html');

//       function nodeToText(node) {
//         let out = '';
//         node.childNodes.forEach((n) => {
//           if (n.nodeType === Node.TEXT_NODE) {
//             out += n.textContent;
//           } else if (n.nodeType === Node.ELEMENT_NODE) {
//             const tag = n.tagName.toLowerCase();
//             if (tag === 'br') {
//               out += '\n';
//             } else if (tag === 'hr') {
//               out += '\n---\n';
//             } else if (
//               tag === 'p' ||
//               tag.match(/^h[1-6]$/) ||
//               tag === 'li' ||
//               tag === 'div'
//             ) {
//               out += nodeToText(n);
//               out += '\n';
//             } else if (tag === 'ul' || tag === 'ol') {
//               out += nodeToText(n);
//               out += '\n';
//             } else if (tag === 'li') {
//               out += '- ' + nodeToText(n) + '\n';
//             } else {
//               out += nodeToText(n);
//             }
//           }
//         });
//         return out;
//       }

//       const text = nodeToText(doc.body)
//         .replace(/\n\s+\n/g, '\n\n')
//         .trim();
//       await navigator.clipboard.writeText(text);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch (e) {
//       console.error('copy plain error', e);
//     }
//   }, [value]);

//   const config = useMemo(
//     () => ({
//       readonly: false,
//       height: 360,
//       toolbarSticky: true,
//       toolbarAdaptive: false,
//       showXPathInStatusbar: false,
//       removeButtons: null,
//       toolbar: [
//         'source',
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
//         'table',
//         'link',
//         '|',
//         'hr',
//         'eraser',
//         '|',
//         'undo',
//         'redo',
//         '|',
//         'fullsize',
//         'print',
//         // 'about',
//       ],
//     }),
//     [],
//   );

//   return (
//     <div className="jodit-wrapper" style={{ maxWidth: 980, margin: '0 auto' }}>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           gap: 8,
//           alignItems: 'center',
//           marginBottom: 8,
//         }}
//       >
//         <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
//           <strong>Editor</strong>
//           {/* <small style={{ color: '#666' }}>
//             {isSaving ? 'Saving...' : 'Saved'}
//           </small> */}
//         </div>

//         <div style={{ display: 'flex', gap: 8 }}>
//           <button
//             onClick={copyHtml}
//             title="Copy HTML to clipboard"
//             className="btn"
//             style={{
//               padding: '6px 10px',
//               borderRadius: 8,
//               border: '1px solid #ddd',
//               background: copied ? '#10b981' : '#f3f4f6',
//             }}
//           >
//             {copied ? 'Copied' : 'Copy HTML'}
//           </button>

//           <button
//             onClick={copyPlainWithHr}
//             title="Copy plain text (hr → ---)"
//             className="btn"
//             style={{
//               padding: '6px 10px',
//               borderRadius: 8,
//               border: '1px solid #ddd',
//               background: '#fff',
//             }}
//           >
//             Copy Text
//           </button>
//         </div>
//       </div>

//       <div
//         style={{
//           border: '1px solid #e5e7eb',
//           borderRadius: 8,
//           overflow: 'hidden',
//           background: '#fff',
//         }}
//       >
//         {!mounted ? (
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: '#9ca3af',
//             }}
//           >
//             Loading editor...
//           </div>
//         ) : (
//           <JoditEditorImport
//             ref={editorRef}
//             value={value}
//             config={config}
//             onBlur={(newContent) => {
//               // called when editor loses focus
//               handleChange(newContent);
//             }}
//             onChange={(newContent) => {
//               if (newContent !== value) handleChange(newContent);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }






'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  createContext,
} from 'react';
import dynamic from 'next/dynamic';
import 'jodit/es5/jodit.min.css';

const JoditEditorImport = dynamic(() => import('jodit-react'), { ssr: false });

export default function JoditEditor({
  storageKey = 'joditContent',
  initial = '<p>Start writing...</p>',
  autosaveDelay = 1500,
  onChange: externalOnChange = () => {},
}) {
  const editorRef = useRef(null);
  const mountedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [htmlValue, setHtmlValue] = useState(initial);
  const saveTimer = useRef(null);
  const [copied, setCopied] = useState(false);

  const htmlToPlainText = useCallback((html) => {
    if (!html) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    function nodeToText(node) {
      let out = '';
      node.childNodes.forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) {
          out += n.textContent;
        } else if (n.nodeType === Node.ELEMENT_NODE) {
          const tag = n.tagName.toLowerCase();
          if (tag === 'br') {
            out += '\n';
          } else if (tag === 'hr') {
            out += '\n---\n';
          } else if (tag === 'p' || tag.match(/^h[1-6]$/) || tag === 'div') {
            out += nodeToText(n).trim();
            out += '\n\n';
          } else if (tag === 'li') {
            out += '- ' + nodeToText(n).trim() + '\n';
          } else if (tag === 'ul' || tag === 'ol') {
            out += nodeToText(n);
            out += '\n';
          } else {
            out += nodeToText(n);
          }
        }
      });
      return out;
    }

    return nodeToText(doc.body)
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+\n/g, '\n')
      .trim();
  }, []);

  useEffect(() => {
    setMounted(true);
    mountedRef.current = true;

    if (typeof window !== 'undefined') {
      try {
        const savedHtml = localStorage.getItem(`${storageKey}:html`);
        const savedText = localStorage.getItem(storageKey);
        if (savedHtml) {
          setHtmlValue(savedHtml);
        } else if (savedText) {
          setHtmlValue(`<p>${savedText.replace(/\n/g, '<br/>')}</p>`);
        }
      } catch (e) {
        console.warn('localStorage load error', e);
      }
    }

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [storageKey]);

  const scheduleSave = useCallback(
    (html) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        try {
          if (typeof window !== 'undefined') {
            const plain = htmlToPlainText(html);
            localStorage.setItem(storageKey, plain);
            localStorage.setItem(`${storageKey}:html`, html);
          }
        } catch (e) {
          console.warn('localStorage save error', e);
        }
      }, autosaveDelay);
    },
    [storageKey, autosaveDelay, htmlToPlainText],
  );

  const handleChange = useCallback(
    (newHtml) => {
      setHtmlValue(newHtml);
      scheduleSave(newHtml);
      externalOnChange(newHtml);
    },
    [scheduleSave, externalOnChange],
  );

  const copyHtml = useCallback(async () => {
    try {
      const html = htmlValue || '';
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('Copy error', e);
    }
  }, [htmlValue]);

  const copyPlainWithHr = useCallback(async () => {
    try {
      const plain = htmlToPlainText(htmlValue || '');
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('copy plain error', e);
    }
  }, [htmlToPlainText, htmlValue]);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 600,
      color:"black",
      toolbarSticky: true,
      toolbarAdaptive: false,
      showXPathInStatusbar: false,
      removeButtons: null,
      showCharsCounter: false,
      showWordsCounter: false,
      showPoweredBy: false,
      toolbar: [
        'source',
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
        'table',
        'link',
        '|',
        'hr',
        'eraser',
        '|',
        'undo',
        'redo',
        '|',
        'fullsize',
        'print',
      ],
    }),
    [],
  );

  useEffect(() => {
    if (!mountedRef.current) return;
    const joditWrapper = editorRef.current;
    const joditInstance = joditWrapper?.editor;
    if (joditInstance) {
      const currentContent =
        joditInstance.getEditorValue?.() ?? joditInstance.value ?? '';
      if (
        !currentContent ||
        currentContent.trim() === '' ||
        currentContent === '<p><br></p>'
      ) {
        joditInstance.setEditorValue?.(htmlValue);
      } else {
      }
    }
  }, [mounted]);
  return (
    <div className="jodit-wrapper" style={{ maxWidth: 980, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 8,
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <strong>Editor</strong>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={copyHtml}
            title="Copy HTML to clipboard"
            className="btn"
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              border: '1px solid #ddd',
              background: copied ? '#10b981' : '#f3f4f6',
            }}
          >
            {copied ? 'Copied' : 'Copy HTML'}
          </button>

          <button
            onClick={copyPlainWithHr}
            title="Copy plain text (hr → ---)"
            className="btn"
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              border: '1px solid #ddd',
              background: '#fff',
            }}
          >
            Copy Text
          </button>
        </div>
      </div>

      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          overflow: 'hidden',
          background: '#fff',
          color:"black"
        }}
      >
        {!mounted ? (
          <div
            style={{
              padding: 24,
              minHeight: 360,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000ff',
            }}
          >
            Loading editor...
          </div>
        ) : (
          <JoditEditorImport
            ref={editorRef}
            // className="h-[200px]"
            config={config}
            onBlur={(newContent) => {
              const html =
                typeof newContent === 'string'
                  ? newContent
                  : editorRef.current?.editor?.getEditorValue?.() ??
                    editorRef.current?.editor?.value ??
                    htmlValue;
              handleChange(html);
            }}
            onChange={(newContent) => {
              const html =
                typeof newContent === 'string'
                  ? newContent
                  : editorRef.current?.editor?.getEditorValue?.() ?? newContent;
              if (html !== htmlValue) {
                handleChange(html);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
