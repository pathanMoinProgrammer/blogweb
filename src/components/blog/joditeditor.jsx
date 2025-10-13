
'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import dynamic from 'next/dynamic';
import 'jodit/es5/jodit.min.css';

const JoditEditorImport = dynamic(() => import('jodit-react'), { ssr: false });

export default function JoditEditor({
  storageKey = 'joditContent',
  initial = '<p>Start writing...</p>',
  autosaveDelay = 1500,
  onChange = () => {},
  setHtmlContent = () => {},
  setContent = () => {},
}) {
  const editorRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [initialValue, setInitialValue] = useState(initial);
  const [copied, setCopied] = useState(false);
  const saveTimer = useRef(null);

  const htmlToPlainText = useCallback((html) => {
    if (!html) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }, []);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      try {
        const savedHtml = localStorage.getItem(`${storageKey}:html`);
        if (savedHtml) setInitialValue(savedHtml);
      } catch (e) {
        console.warn('localStorage load error', e);
      }
    }
  }, [storageKey]);

  const scheduleSave = useCallback(
    (html) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        if (typeof window === 'undefined') return;
        try {
          const plain = htmlToPlainText(html);
          localStorage.setItem(`${storageKey}:html`, html);
          localStorage.setItem(storageKey, plain);
          setHtmlContent(html);
          setContent(plain);
          onChange(html);
        } catch (e) {
          console.warn('localStorage save error', e);
        }
      }, autosaveDelay);
    },
    [
      autosaveDelay,
      htmlToPlainText,
      onChange,
      setHtmlContent,
      setContent,
      storageKey,
    ],
  );

  const config = useMemo(
    () => ({
      readonly: false,
      height: '100%',
      minHeight: 400,
      toolbarSticky: true,
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
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

  return (
    <div className="h-full flex flex-col ">
      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 sticky top-0 z-10 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          📝 Editor
        </h2>
        <div className="flex gap-2">
          <button
            onClick={copyHtml}
            className={`px-3 py-2 rounded-lg border-none transition-colors text-sm font-medium ${
              copied
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
            }`}
          >
            {copied ? 'Copied' : 'Copy HTML'}
          </button>
          <button
            onClick={copyPlain}
            className="px-3 py-2 rounded-lg border-none bg-white border-gray-200 hover:bg-gray-200 text-sm font-medium"
          >
            Copy Text
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white dark:bg-gray-900 border-none rounded-lg">
        {!mounted ? (
          <div className="h-full flex items-center justify-center text-gray-600 dark:text-gray-300">
            Loading editor...
          </div>
        ) : (
          <JoditEditorImport
            ref={editorRef}
            config={config}
            value={initialValue}
            onBlur={(newContent) => scheduleSave(newContent)}
            onChange={(newContent) => scheduleSave(newContent)}
          />
        )}
      </div>
    </div>
  );
}
