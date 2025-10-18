import { isArray } from 'jodit/esm/core/helpers';
import { db } from './firebase';
import {
  setDoc,
  addDoc,
  collection,
  doc,
  collectionGroup,
  query,
  where,
  limit,
  Timestamp,
} from 'firebase/firestore';

export const postColRef = collection(db, 'posts');
export const translationsCg = collectionGroup(db, 'translations');

export const timestamp = () => Timestamp.now();
export const postDocRef = (postid, locale) => {
  const parentRef = doc(postColRef, postid);
  const childRef = doc(postColRef, postid, 'translations', locale);
  return { parentRef, childRef };
};

export const delDocRef = (postid, languages) => {
  const langsArray = [doc(postColRef, postid)];

  if (Array.isArray(languages)) {
    languages.forEach((lang) =>
      langsArray.push(doc(postColRef, postid, 'translations', lang)),
    );
  }

  return langsArray;
};
