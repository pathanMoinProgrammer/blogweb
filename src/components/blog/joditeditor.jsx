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
import { useAtomValue, useSetAtom } from 'jotai';
import { isClear } from '../jotai';

const JoditEditorImport = dynamic(() => import('jodit-react'), { ssr: false });

export default function JoditEditor({
  storageKey = 'joditContent',
  initial = '<p>Start writing...</p>',
  autosaveDelay = 1500,
  onChange = () => {},
  content,
  HtmContent,
  formData,
  formik,
}) {
  const editorRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [initialValue, setInitialValue] = useState(initial);
  const [copied, setCopied] = useState(false);
  const saveTimer = useRef(null);
  const clear = useAtomValue(isClear);
  const setClear = useSetAtom(isClear);
  const { values, handleSubmit, errors, touched, setFieldValue } = formik;

  const htmlToPlainText = useCallback((html) => {
    if (!html) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }, []);
  useEffect(() => {
    if (clear) {
      localStorage.removeItem(`${storageKey}:html`);
      setClear(false);
    }
  }, [clear]);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      try {
        const savedHtml = localStorage.getItem(`${storageKey}:html`);
        if (savedHtml) {
          setInitialValue(savedHtml);
          // setFormData((prev) => ({ ...prev, HtmContent: savedHtml }));
          setFieldValue('content', savedHtml);
          setFieldValue('HtmContent', savedHtml);
        }
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

          // setFormData((prev) => ({ ...prev, HtmContent: html, content: html }));
          setFieldValue('content', html);
          setFieldValue('HtmContent', html);
          onChange(html);
        } catch (e) {
          console.warn('localStorage save error', e);
        }
      }, autosaveDelay);
    },
    [autosaveDelay, htmlToPlainText, onChange, storageKey],
  );

  const config = useMemo(
    () => ({
      readonly: false,
      height: '100%',
      minHeight: 900,
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
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between items-center p-4 bg-white dark:text-black dark:bg-gray-900 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          📝 Editor
        </h2>
        <div className="flex gap-2">
          <button
            onClick={copyHtml}
            className={`px-3 py-2 rounded-lg border transition-colors text-sm font-medium ${
              copied
                ? 'bg-green-500 dark:bg-green-600 text-white border-green-500 dark:border-green-500'
                : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white'
            }`}
          >
            {copied ? 'Copied' : 'Copy HTML'}
          </button>
          <button
            onClick={copyPlain}
            className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-white"
          >
            Copy Text
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white dark:text-black dark:bg-gray-900 border-none rounded-lg">
        {!mounted ? (
          <div className="h-full flex items-center justify-center text-gray-600 dark:text-gray-300">
            Loading editor...
          </div>
        ) : (
          <JoditEditorImport
            ref={editorRef}
            config={config}
            value={formData.content || initialValue}
            onBlur={(newContent) => scheduleSave(newContent)}
            onChange={(newContent) => scheduleSave(newContent)}
          />
        )}
      </div>
    </div>
  );
}
