'use client';
import { useState } from 'react';
import { handleClientDelete } from '@/components/clientDelete';
import { handleServerDelete } from '@/components/adminDelete';
import { handleDeleteWithRef } from '../fireatoreHooks/useDeleteDoc';
import { delDocRef } from '@/firebase/firebaseRefs';
import { refreshBlogsCache } from '@/components/blog/blogpost';

export const useDeleteLogic = ({
  mode,
  postid,
  languages,
  refArray,
  locale,
  router,
  deleteAllDoc
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (mode == 'admin') {
        await handleServerDelete(deleteAllDoc, postid, languages, router);
      } else {
        await handleClientDelete(refArray, postid, locale, router, languages);
      }
      refreshBlogsCache("blogs");
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading };
};
