import { useState, useEffect } from 'react';
import { getDoc } from 'firebase/firestore';

export const useReadDoc = ({
  ref,
  ref2,
  postid,
  locale,
  parentRead = false,
}) => {
  const [state, setState] = useState({
    loading: false,
    error: false,
    data: undefined,
    languages: undefined,
    ids: [],
  });

  useEffect(() => {
    if (!ref || !postid) {
      setState({
        loading: false,
        error: false,
        data: undefined,
        languages: undefined,
        ids: [],
      });
      return;
    }
    

    setState((prev) => ({ ...prev, loading: true }));

    const fetchDoc = async () => {
      try {
        
        const result = await getDoc(ref);

        if (!result.exists()) {
          console.warn(`⚠️ No data found for post: ${postid}`);
          setState({
            loading: false,
            error: `No data found for post: ${postid}`,
            data: undefined,
            languages: undefined,
            ids: [],
          });
          return;
        }
        const childResult = result.data() || {};

        setState({
          loading: false,
          error: false,
          data: { ...childResult },
        });
        if (parentRead) {
          const rowParent = await getDoc(ref2);
          if (!rowParent.exists()) {
            setState({
              loading: false,
              error: `No data found for post: ${postid}`,
              data: undefined,
              languages: undefined,
              ids: [],
            });
          }
          const parentData = rowParent.data() || {};

          const languages =
            Array.isArray(parentData.languages) &&
            parentData.languages.length > 0
              ? parentData.languages
              : undefined;

          setState({
            loading: false,
            error: false,
            languages: languages,
          });
        }
      } catch (err) {
        console.error('❌ Firestore error:', err);
        setState({
          loading: false,
          error: err?.message || 'Unknown error',
          data: undefined,
          languages: undefined,
          ids: [],
        });
      }
    };

    fetchDoc();

    return () => {};
  }, [ref, postid, locale]);

  return { ...state };
};
