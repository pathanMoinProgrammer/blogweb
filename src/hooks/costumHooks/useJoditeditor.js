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
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [initialValue, setInitialValue] = useState(initial);
  const [offensiveList, setOffensiveList] = useState([]);
  const clear = useAtomValue(isClear);
  const setClear = useSetAtom(isClear);
  const { setFieldValue } = formik;

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
          setFieldValue('content', savedHtml);
          setFieldValue('HtmContent', savedHtml);
        }
      } catch (e) {
        console.warn('localStorage load error', e);
      }
    }
  }, [storageKey, setFieldValue]);

  const scheduleSave = useCallback(
    (html) => {
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
