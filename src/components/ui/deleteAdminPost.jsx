'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash, Loader2 } from 'lucide-react';
import { useDeleteDoc } from '@/hooks/fireatoreHooks/useDeleteDoc';
import { delDocRef } from '@/firebase/firebaseRefs';
import { deleteDoc } from 'firebase/firestore';
import { isArray } from 'jodit/esm/core/helpers';
    import { useRouter } from 'next/navigation';

const DeleteAdminPost = ({ postid, languages }) => {
  const [confirm, setConfirm] = useState(false);

  const { loading, error, deleteAllDoc } = useDeleteDoc();
      const router = useRouter();

  const handleDelete = async () => {
    const arrayOfRefs = delDocRef(postid, languages);
    await deleteAllDoc(arrayOfRefs);
    setConfirm(false)
    router.refresh()
  };
  const deleteFunction = ()=>{
    setConfirm(true)
  }


  const handleCancel = () => {
    setConfirm(false);
  };

  return (
    <div className="relative">
      <Button
        variant="destructive"
        size="sm"
        onClick={deleteFunction}
        disabled={loading}
        className={`${
          loading ? 'rounded-full' : 'rounded-md'
        } bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white transition-all duration-300 flex items-center gap-2 `}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">Delete</span>
      </Button>

      {confirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this post?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500  hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
              >
                {loading ? (
                  <Loader2 className=" h-4 animate-spin mr-2" />
                ) : null}
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAdminPost;
