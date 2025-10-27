'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeleteDoc } from '@/hooks/fireatoreHooks/useDeleteDoc';
import { useDeleteLogic } from '@/hooks/costumHooks/useDeleteBoth';

const DeleteButton = ({
  mode = 'client', 
  postid,
  languages,
  refArray,
  locale,
}) => {
  const [confirm, setConfirm] = useState(false);
  const { deleteAllDoc } = useDeleteDoc();
  const router = useRouter();

  const { handleDelete, loading } = useDeleteLogic({
    mode,
    postid,
    languages,
    refArray,
    locale,
    router,
    deleteAllDoc,
  });

  return (
    <div className='w-[100%]'>
      <Button
        variant={mode === 'admin' ? 'destructive' : 'outline'}
        size={mode === 'admin' ? 'sm' : 'lg'}
        className={`${
          loading ? 'opacity-70 cursor-wait' : 'cursor-pointer'
        } bg-red-500/80 text-white hover:bg-red-600 dark:bg-red-500/60 transition-all py-5.4 duration-300  w-full  flex items-center gap-2 rounded-md`}
        onClick={() => setConfirm(true)}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash className="w-4 h-4" />
        )}
        <span className=" sm:inline">Delete</span>
      </Button>

      {confirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this post?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setConfirm(false)}
                className="text-gray-600 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={async () => {
                  await handleDelete();
                  setConfirm(false);
                }}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
