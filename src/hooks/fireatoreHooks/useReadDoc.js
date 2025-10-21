import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";

export const useReadDoc = (ref, postid, locale) => {
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

    let unsub;
    try {
      unsub = onSnapshot(
        ref,
        (docSnap) => {
          if (!docSnap.exists()) {
            setState({
              loading: false,
              error: `No data found for post: ${postid}`,
              data: undefined,
              languages: undefined,
              ids: [],
            });
            return;
          }

          const parentData = docSnap.data() || {};

          const languages =
            Array.isArray(parentData.languages) && parentData.languages.length > 0
              ? parentData.languages
              : undefined;

          const selectedLocaleData =
            locale && parentData.translations?.[locale]
              ? parentData.translations[locale]
              : {};

          setState({
            loading: false,
            error: false,
            data: { ...parentData, ...selectedLocaleData },
            languages,
            ids: [],
          });
        },
        (error) => {
          setState({
            loading: false,
            error: error?.message || "Unknown error",
            data: undefined,
            languages: undefined,
            ids: [],
          });
        }
      );
    } catch (err) {
      setState({
        loading: false,
        error: err?.message || "Unknown error",
        data: undefined,
        languages: undefined,
        ids: [],
      });
    }

    // Cleanup
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, [ref, postid, locale]);

  return { ...state };
};
