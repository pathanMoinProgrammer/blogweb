import { setDoc, doc, arrayRemove, onSnapshot, deleteDoc } from 'firebase/firestore';
import { postColRef } from '@/firebase/firebaseRefs';


export const handleClientDelete = async (refArray, postidClient, locale, router) => {
  try {
    await deleteDoc(refArray[1]);

    await setDoc(
      refArray[0],
      { languages: arrayRemove(locale) },
      { merge: true }
    );

    const unsubscribe = onSnapshot(refArray[0], (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      const langs = data?.languages || [];

      if (langs.length > 0) {
        const randomIndex = Math.floor(Math.random() * langs.length);
        router.push(`/${langs[randomIndex]}/blogpost/create-new-blog/${postidClient}`);
      } else {
        const parentRef = doc(postColRef, postidClient);
        deleteDoc(parentRef)
          .then(() => router.push(`/${locale}/my-profile`))
          .catch(console.error);
      }

      unsubscribe();
    });
  } catch (error) {
    console.error('Client delete error:', error);
  }
};
