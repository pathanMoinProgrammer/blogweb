'use client';

import { useState, useEffect } from 'react';


export function useGameTranslations({ lang }) {
  
  const [translations, setTranslations] = useState(null);
  const [language, setLanguage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTranslations() {
      try {
        setLoading(true);
        const messages = (await import(`../messages/${lang}.json`)).default;
        if (!messages.client) {
          throw new Error(`No games found in translations for locale "${lang}"`);
        }
        // if (!messages.client.ChimpTest) {
        //   throw new Error(`ChimpTest translations not found in locale "${lang}"`);
        // }
        setTranslations(messages.client);
        setLanguage(messages.language);
      } catch (err) {
        console.error(`[useGameTranslations] Error:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log(`[useGameTranslations] Loading complete, loading: false`);
      }
    }

    if (lang) {
      fetchTranslations();
    } else {
      console.warn(`[useGameTranslations] No lang provided`);
      setError('No language provided');
      setLoading(false);
    }
  }, [lang]);

  return { translations, language, loading, error };
}