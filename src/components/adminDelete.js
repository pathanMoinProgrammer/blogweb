import { delDocRef } from '@/firebase/firebaseRefs';

export const handleServerDelete = async (
  deleteAllDoc,
  postid,
  languages,
  router,
) => {
  try {
    console.log(postid, languages, "languages")
    const refs = delDocRef(postid, languages);
    await deleteAllDoc(refs);

    router.refresh();
  } catch (error) {
    console.log("its error" ,error)
  }
};
