'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDeleteDoc } from '@/hooks/fireatoreHooks/useDeleteDoc';
import { useDeleteLogic } from '@/hooks/costumHooks/useDeleteBoth';
import { refreshBlogsCache } from '../blog/blogpost';

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
    refreshBlogsCache,
  });

  return (
    <div className={`w-[100%] `}>
      <button
        variant={mode == 'client' ? 'outline' : 'destructive'}
        size={mode == 'client' ? 'lg' : 'sm'}
        className={`${
          loading ? 'opacity-70 cursor-wait' : 'cursor-pointer'
        } bg-red-500/80  py-3 text-white font-bold border-b-2 min-h-12 rounded-[2.6px] ${
          mode == 'client' ? 'w-[100%]  ' : ' w-[50%] mx-auto'
        }  gap-2 hover:bg-red-600 dark:bg-red-500/60  border-[#5d5959]  dark:border-gray-700 transition-all  duration-300  
         ${(mode = 'client' ? '' : ' absolute right-2 top-2')}
       
         
         justify-center  flex items-center  `}
        onClick={() => setConfirm(true)}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="w-4 h-5 animate-spin" />
        ) : (
          <Trash className="w-5 h-5" />
        )}
      </button>

      {confirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-[2.6px] shadow-xl p-6 w-full max-w-sm">
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
