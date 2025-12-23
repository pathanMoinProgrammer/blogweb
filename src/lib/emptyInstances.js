import { addDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { postColRef,postDocRef } from '@/firebase/firebaseRefs';

const emptyPostsInstance = {
  HtmContent: '',
  ampm: '',
  author: '',
  blogName: '',
  content: '',
  date: '',
  description: '',
  enslug: '',
  hh: '',
  id: '',
  imagesUploaded: 0,
  imgUrl: '',
  lang: '',
  language: '',
  languages: [],
  mm: '',
  slug: [],
  thumbnailUrl: null,
  timetoread: '',
  title: '',
  type: '',
  updatedAt: null,
};

 const emptyLanguagedInstance = {
  HtmContent: '',
  ampm: '',
  author: '',
  blogName: '',
  content: '',
  date: '',
  description: '',
  hh: '',
  hhmm: '',
  id: '',
  imagesUploaded: 0,
  imgUrl: '',
  lang: '',
  language: '',
  mm: '',
  reactions: {
    angry: 0,
    fire: 0,
    laugh: 0,
    like: 0,
    love: 0,
  },
  slug: '',
  thumbnailUrl: null,
  timetoread: '',
  title: '',
  type: '',
  updatedAt: null,
};
function getFormattedDateTime(type) {
  const now = new Date();

  switch (type) {
    case 'date': {
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);
      return `${day}-${month}-${year}`;
    }
    case 'hh-mm': {
      let hours = now.getHours();
      let minutes = now.getMinutes();
      hours = hours % 12 || 12;

      const hh = String(hours).padStart(2, '0');
      const mm = String(minutes).padStart(2, '0');
      return `${hh}-${mm}`;
    }
    
    case 'ampm': {
      return now.getHours() >= 12 ? 'PM' : 'AM';
    }
    default: {
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);

      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const hh = String(hours).padStart(2, '0');
      const mm = String(minutes).padStart(2, '0');

      return `${day}-${month}-${year} ${hh}-${mm} ${ampm}`;
    }
  }
}

async function createPost(locale) {
  const docRef = await addDoc(postColRef, {
    ...emptyPostsInstance,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
     date: getFormattedDateTime('date'),
    hh: getFormattedDateTime('hh-mm').split('-')?.[0],
    mm: getFormattedDateTime('hh-mm').split('-')?.[1],
    ampm: getFormattedDateTime('ampm'),
  });
  const {childRef}= postDocRef(docRef.id, locale)

  await setDoc(childRef, {
    ...emptyLanguagedInstance,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
     date: getFormattedDateTime('date'),
    hh: getFormattedDateTime('hh-mm').split('-')?.[0],
    mm: getFormattedDateTime('hh-mm').split('-')?.[1],
    ampm: getFormattedDateTime('ampm'),
  });

  return docRef.id;
}

function removeEmptyFields(obj) {
  if (!obj || typeof obj !== "object") return {};

  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== null &&
        value !== undefined &&
        !(typeof value === "string" && value.trim() === "")
    )
  );
}


export { emptyPostsInstance, emptyLanguagedInstance ,createPost, removeEmptyFields};
