import { setDoc } from 'firebase/firestore';

const { postColRef } = require('@/firebase/firebaseRefs');
const { useState, useEffect } = require('react');

export const useCreateDoc = () => {
  const [state, setState] = useState({
    loading: false,
    error: false,
    data: null,
  });

  const setData = async (ref, data) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const docref = await addDoc(ref, data);

      setState((prev) => ({ ...prev, loading: false, data: docref.id }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error.message }));
    }
  };

  const setDataWithLang = async (ref, data) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));

      await setDoc(ref, data, { merge: true });

      setState((prev) => ({ ...prev, loading: false, data: ref.id }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error.message }));
    }
  };

  return { ...state, setData, setDataWithLang };
};
