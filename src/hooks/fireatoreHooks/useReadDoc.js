import { postColRef } from '@/firebase/firebaseRefs';
import { useState, useEffect } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';

export const useReadDoc = (ref) => {
  const [state, setState] = useState({
    loading: false,
    error: false,
    data: undefined,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        
        const docref = await getDoc(ref)


        if (!docref.data()) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: 'error while get Data!',
          }));
          return;
        }
        setState((prev) => ({
          ...prev,
          loading: false,
          data: docref.data(),
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
          data: ['not any vlaue fount'],
        }));
      }
    };
    // return () => getData();
    getData();
  }, []);

  return { ...state };
};
