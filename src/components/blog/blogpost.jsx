'use server';
import { revalidateTag } from 'next/cache';
import { unstable_cache } from 'next/cache';
import { langPostQuery } from '@/firebase/firebaseAdminRefs';

// export const getCachedLangPosts = unstable_cache(
//   async (locale) => {
//     const snapshot = await langPostQuery(locale).get();

//     return snapshot.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.ref.parent.parent.id,
//     }));
//   },
//   ['langPosts'],
//   {
//     revalidate: 300,
//     tags: ['blogs'],
//   },
// );

export const getCachedLangPosts = unstable_cache(
  async (locale) => {
    const queried = await langPostQuery(locale).get();

    return queried.docs.map((doc) => ({
      id: doc.ref.parent.parent.id,
      ...doc.data(),
    }));
  },
  ['langPosts'],
  {
    revalidate: 40,
    tags: ['blogs'],
  },
);


export async function refreshBlogsCache() {
  revalidateTag('blogs');
}
