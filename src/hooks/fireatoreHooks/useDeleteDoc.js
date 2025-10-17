import { deleteDoc as deleteDocument } from 'firebase/firestore';

const { postColRef } = require('@/firebase/firebaseRefs');
const { useState, useEffect } = require('react');

export const useDeleteDoc = () => {
  const [state, setState] = useState({
    loading: false,
    error: false,
    data: null,
  });

  const deleteDoc = async (ref) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const docref = await deleteDocument(ref);

      setState((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error.message }));
    }
  };

  const deleteAllDoc = async (refArray) => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      let promiseArray = [];

      for (let ref of refArray) {
        promiseArray.push(deleteDocument(ref));
      }

      await Promise.all(promiseArray);
      setState((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      setState((prev) => ({ loading: false, error: error.message }));
    }
  };

  return { ...state, deleteDoc, deleteAllDoc };
};
