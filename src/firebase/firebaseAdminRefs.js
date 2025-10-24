import { db } from './firebaseAdmin.js';
import admin from 'firebase-admin';

export const posts = db.collection('posts');
export const translationsCg = db.collectionGroup('translations');
export const translations = (id) => db.collection(`posts/${id}/translations`);
export const timestamp = () => admin.firestore.Timestamp.now();
export const langPostQuery = (lang) =>
  translationsCg.where('lang', '==', lang).orderBy('updatedAt', 'desc');

export const slugReadRef = (slug) =>
  translationsCg.where('slug', '==', slug).limit(1);
export const delTranslationRef = (postid, locale) =>
  posts.doc(postid).collection('translations').doc(locale);
export const deletePostRef = (postid) => posts.doc(postid);


