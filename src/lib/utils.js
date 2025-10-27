import { translationsCg } from '@/firebase/firebaseRefs';
import { clsx } from 'clsx';
import { doc, getDocs, limit, query, where } from 'firebase/firestore';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function checkSlugAvailability(slug) {
  const queried = query(translationsCg, where('slug', '==', slug), limit(1));
  const result = await getDocs(queried);
  const blogPostId = result.docs[0]?.ref.parent.parent.id;
  const blogLang = result.docs[0]?.id
  const [,locale, ...rest] = window.location.pathname.split('/');
  const postId = rest[rest.length - 1];

  if (result.docs.length == 0) {
    return true;
  } else if (blogLang === locale && postId === blogPostId) {
    return true;
  }
  return false
}


// no slug => true
// slug , but posy is same so true
// slug but post same but lang diffrent so false
// slug but lang same post id diff so false