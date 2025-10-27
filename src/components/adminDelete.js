import { delDocRef } from '@/firebase/firebaseRefs';

export const handleServerDelete = async (
  deleteAllDoc,
  postid,
  languages,
  router,
) => {
  try {
    const refs = delDocRef(postid, languages);
    await deleteAllDoc(refs);

    router.refresh();
  } catch (error) {
    console.error("its error" ,error)
  }
};
