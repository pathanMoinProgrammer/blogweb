import {
  arrayRemove,
  deleteDoc as deleteDocument,
  doc,
  updateDoc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';

const { postColRef } = require('@/firebase/firebaseRefs');
const { useState } = require('react');

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

export const handleDeleteWithRef = async (
  ref,
  postidClient,
  locale,
  router,
) => {
  try {
    await deleteDocument(ref[1]);

    await setDoc(
      ref[0],
      {
        languages: arrayRemove(locale),
      },
      { merge: true },
    );

    const unsubscribe = onSnapshot(ref[0], (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();
      const langs = data?.languages || [];
      // router.push(`/${langs[0]}/create-new-blog/${postidClient}`)
      if (langs.length === 0) {
        const parentRef = doc(postColRef, postidClient);
        deleteDocument(parentRef)
          .then(() => {
            console.log(`Deleted parent post: ${postidClient}`);
          })
          .catch((err) => console.error('Error deleting parent:', err));
      } else {
      }

      unsubscribe();
    });
  } catch (error) {}
};
