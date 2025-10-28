'use client';
import { useState, useCallback } from 'react';
import leoProfanity from 'leo-profanity';
import { formatSlug } from '@/lib/slugchecker';

leoProfanity.loadDictionary();

export const useSafeInputHandler = (setFieldValue) => {
  const [slugError, setSlugError] = useState('');
  const [fieldOffensiveWords, setFieldOffensiveWords] = useState({});

  leoProfanity.removeWord('tit');
  leoProfanity.add(['tits']);

  const handleSafeChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      console.log('if errors');

      const words = value.split(/[^a-zA-Z0-9]+/).filter(Boolean);
      const detectedWords = words.filter((word) =>
        leoProfanity.check(word.toLowerCase()),
      );

      const hasProfanity = detectedWords.length > 0;

      let cleanedValue = value;
      while (leoProfanity.check(cleanedValue)) {
        cleanedValue = leoProfanity.clean(cleanedValue);
      }

      setFieldOffensiveWords((prev) => ({
        ...prev,
        [name]: detectedWords,
      }));

      if (name === 'slug') {
        if (hasProfanity) {
          setSlugError(
            `⚠️ Please remove inappropriate words from slug: ${detectedWords.join(
              ', ',
            )}`,
          );
          return;
        }

        const { value: formattedSlug, error } = formatSlug(cleanedValue);
        setFieldValue(name, formattedSlug);
        setSlugError(error || '');
      } else {
        setFieldValue(name, cleanedValue);
        setSlugError('');
      }
    },
    [setFieldValue],
  );

  const renderWarning = useCallback(
    (fieldName) => {
      const badWords = fieldOffensiveWords[fieldName] || [];
      if (badWords.length > 0) {
        return (
          <p className="text-yellow-500 text-sm mt-1">
            ⚠️ Warning: replaced words — {badWords.join(', ')}
          </p>
        );
      }
      return null;
    },
    [fieldOffensiveWords],
  );

  return { handleSafeChange, slugError, renderWarning };
};

export const getOffensiveWords = (text) => {
  if (!text) return [];
  const badWords = leoProfanity.list();
  const pattern = new RegExp(
    `\\b(${badWords
      .map((w) => w.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'))
      .join('|')})\\b`,
    'gi',
  );
  const matches = text.match(pattern);
  return matches ? [...new Set(matches.map((w) => w.toLowerCase()))] : [];
};

export const maskOffensiveWords = (text) => {
  if (!text) return text;
  return leoProfanity.clean(text, '*');
};

export const highlightOffensiveWordsInHtml = (html) => {
  if (!html) return html;
  const badWords = leoProfanity.list();
  const pattern = new RegExp(
    `\\b(${badWords
      .map((w) => w.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'))
      .join('|')})\\b`,
    'gi',
  );
  return html.replace(pattern, (match) => {
    const masked = '*'.repeat(match.length);
    return `<span style="background-color: rgb(212, 204, 161); color: black;">${masked}</span>`;
  });
};
